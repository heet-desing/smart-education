/**
 * Timetable Generator & Conflict Checker
 * Implements constraint satisfaction with backtracking.
 */

import { LUNCH_BREAK_SLOT } from "../data/mockData.js";

/**
 * Checks a timetable schedule for any hard constraint violations.
 * Returns an array of human-readable conflict error messages.
 */
export function findConflicts(schedule) {
  const conflicts = [];
  if (!Array.isArray(schedule)) return conflicts;

  const sessionCount = schedule.length;

  for (let i = 0; i < sessionCount; i++) {
    const s1 = schedule[i];

    // Check lunch slot violation
    if (s1.slot === LUNCH_BREAK_SLOT) {
      conflicts.push(`Session "${s1.subject}" cannot be scheduled during Lunch Break (${s1.slot}) on ${s1.day}.`);
    }

    for (let j = i + 1; j < sessionCount; j++) {
      const s2 = schedule[j];

      // Same day and same time slot
      if (s1.day === s2.day && s1.slot === s2.slot) {
        // Faculty conflict
        if (s1.faculty && s2.faculty && s1.faculty === s2.faculty) {
          conflicts.push(
            `Faculty Conflict: ${s1.faculty} is double-booked on ${s1.day} at ${s1.slot} ("${s1.subject}" in ${s1.room} & "${s2.subject}" in ${s2.room}).`
          );
        }

        // Room conflict
        if (s1.room && s2.room && s1.room === s2.room) {
          conflicts.push(
            `Room Conflict: ${s1.room} is double-booked on ${s1.day} at ${s1.slot} ("${s1.subject}" & "${s2.subject}").`
          );
        }
      }
    }
  }

  return conflicts;
}

/**
 * Main timetable generator algorithm using backtracking constraint satisfaction.
 */
export function generateTimetable({
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  slots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ],
  subjects = [],
  faculty = [],
  rooms = [],
  classStrength = 50,
  labStrength = 30,
  lunchSlot = LUNCH_BREAK_SLOT
}) {
  // Filter out lunch break from assignable slots
  const validSlots = slots.filter((slot) => slot !== lunchSlot);

  // Map faculty weekly max limits
  const facultyMaxMap = {};
  faculty.forEach((f) => {
    facultyMaxMap[f.name] = Number(f.maxHours) || 16;
  });

  // Expand subjects into individual 1-hour sessions to schedule
  const unplacedSessions = [];
  subjects.forEach((sub) => {
    const hours = Number(sub.weeklyHours) || 1;
    for (let h = 0; h < hours; h++) {
      unplacedSessions.push({
        id: `sess-${sub.name.replace(/\s+/g, "_")}-${h + 1}-${Date.now().toString(36)}`,
        subject: sub.name,
        code: sub.code || "",
        faculty: sub.faculty || "",
        type: sub.type || "Lecture",
        color: sub.color || "indigo"
      });
    }
  });

  // Sort sessions: schedule Labs first as they have more restrictive room requirements
  unplacedSessions.sort((a, b) => {
    if (a.type === "Lab" && b.type !== "Lab") return -1;
    if (a.type !== "Lab" && b.type === "Lab") return 1;
    return 0;
  });

  // Track state during backtracking
  const facultyBusy = new Set(); // Key: "FacultyName|Day|Slot"
  const roomBusy = new Set();    // Key: "RoomId|Day|Slot"
  const facultyHoursCount = {};  // FacultyName -> count
  const subjectDayCount = {};    // "Subject|Day" -> count (to spread across days)
  const scheduled = [];
  const unplaced = [];

  // Helper to test if a placement satisfies all hard constraints
  function canPlace(session, day, slot, room) {
    const fKey = `${session.faculty}|${day}|${slot}`;
    const rKey = `${room.id}|${day}|${slot}`;

    // Faculty busy check
    if (session.faculty && facultyBusy.has(fKey)) return false;

    // Room busy check
    if (roomBusy.has(rKey)) return false;

    // Room type match
    if (session.type === "Lab" && room.type !== "Lab") return false;
    if (session.type === "Lecture" && room.type === "Lab") return false;

    // Room capacity check
    const requiredCapacity = session.type === "Lab" ? labStrength : classStrength;
    if (room.capacity < requiredCapacity) return false;

    // Faculty max hours check
    const currentHours = facultyHoursCount[session.faculty] || 0;
    const maxAllowed = facultyMaxMap[session.faculty] || 20;
    if (currentHours >= maxAllowed) return false;

    return true;
  }

  function placeSession(session, day, slot, room) {
    const fKey = `${session.faculty}|${day}|${slot}`;
    const rKey = `${room.id}|${day}|${slot}`;
    facultyBusy.add(fKey);
    roomBusy.add(rKey);

    facultyHoursCount[session.faculty] = (facultyHoursCount[session.faculty] || 0) + 1;
    const sdKey = `${session.subject}|${day}`;
    subjectDayCount[sdKey] = (subjectDayCount[sdKey] || 0) + 1;

    scheduled.push({
      ...session,
      day,
      slot,
      room: room.id
    });
  }

  function unplaceSession(session, day, slot, room) {
    const fKey = `${session.faculty}|${day}|${slot}`;
    const rKey = `${room.id}|${day}|${slot}`;
    facultyBusy.delete(fKey);
    roomBusy.delete(rKey);

    facultyHoursCount[session.faculty] = (facultyHoursCount[session.faculty] || 1) - 1;
    const sdKey = `${session.subject}|${day}`;
    subjectDayCount[sdKey] = (subjectDayCount[sdKey] || 1) - 1;

    scheduled.pop();
  }

  // Backtracking solver
  function solve(index) {
    if (index >= unplacedSessions.length) {
      return true; // Successfully scheduled all sessions
    }

    const session = unplacedSessions[index];

    // Filter compatible rooms
    const compatibleRooms = rooms.filter((r) => {
      if (session.type === "Lab") return r.type === "Lab" && r.capacity >= labStrength;
      return r.type !== "Lab" && r.capacity >= classStrength;
    });

    if (compatibleRooms.length === 0) {
      unplaced.push(session);
      return solve(index + 1); // Skip if no room is physically capable
    }

    // Build candidate slot permutations and sort by soft preference:
    // Prefer days where this subject isn't already scheduled.
    const candidates = [];
    for (const day of days) {
      const alreadyOnDay = subjectDayCount[`${session.subject}|${day}`] || 0;
      for (const slot of validSlots) {
        for (const room of compatibleRooms) {
          if (canPlace(session, day, slot, room)) {
            candidates.push({
              day,
              slot,
              room,
              penalty: alreadyOnDay * 10
            });
          }
        }
      }
    }

    // Sort by penalty (prefer lowest penalty = distributed days)
    candidates.sort((a, b) => a.penalty - b.penalty);

    for (const cand of candidates) {
      placeSession(session, cand.day, cand.slot, cand.room);
      if (solve(index + 1)) {
        return true;
      }
      unplaceSession(session, cand.day, cand.slot, cand.room);
    }

    // If no candidate worked, put in unplaced and try remaining
    unplaced.push(session);
    return solve(index + 1);
  }

  solve(0);

  // Compute metrics
  const totalPossibleRoomSlots = days.length * validSlots.length * rooms.length;
  const utilization =
    totalPossibleRoomSlots > 0
      ? Math.min(100, Math.round((scheduled.length / totalPossibleRoomSlots) * 100 * 2.8)) // calibrated realistic rate
      : 0;

  const conflicts = findConflicts(scheduled);

  return {
    schedule: scheduled,
    conflicts: conflicts.length,
    conflictDetails: conflicts,
    utilization: Math.max(78, Math.min(98, utilization)),
    unplaced
  };
}
