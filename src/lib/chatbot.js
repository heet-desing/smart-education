/**
 * Rule-based intelligent campus chatbot engine.
 * Answers queries about timetables, room availability, and faculty schedules.
 */

export function processUserMessage(userMessage, contextData) {
  const { timetable = [], rooms = [], faculty = [] } = contextData || {};
  const query = userMessage.toLowerCase().trim();

  // 1. Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/.test(query)) {
    return {
      text: "Hello! 👋 I'm your **SmartSchedule Campus Assistant**. How can I assist you today? You can ask me about lecture schedules, room availability, or faculty timetables.",
      suggestions: [
        "Next Machine Learning lecture in Room 204?",
        "Is Lab-302 free?",
        "Show Dr. Shah's schedule",
        "How many rooms are active?"
      ]
    };
  }

  // 2. "Show timetable" or "go to timetable"
  if (query.includes("show timetable") || query.includes("view timetable") || query.includes("open timetable")) {
    return {
      text: "You can view, customize, and export the full conflict-free schedule on our **[AI Timetable Generator](/timetable)** page.",
      link: "/timetable",
      suggestions: ["Is Lab-302 free?", "How many rooms are active?"]
    };
  }

  // 3. "How many rooms are active?" or "active rooms"
  if (query.includes("how many rooms") || query.includes("active rooms") || query.includes("rooms active")) {
    const activeRooms = rooms.filter((r) => r.status === "Active");
    return {
      text: `There are currently **${activeRooms.length} active classrooms/labs** hosting sessions out of ${rooms.length} total campus spaces. Active spaces include: ${activeRooms.map((r) => `**${r.name || r.id}**`).join(", ")}.`,
      suggestions: ["Is Room-101 free?", "Available rooms", "Show Dr. Shah's schedule"]
    };
  }

  // 4. "How many faculty?"
  if (query.includes("how many faculty") || query.includes("total faculty") || query.includes("faculty count")) {
    return {
      text: `Our institution currently has **${faculty.length} faculty members** across engineering and technology departments.`,
      suggestions: ["Show Dr. Shah's schedule", "Show Prof. Rahul Patel's schedule"]
    };
  }

  // 5. "Available rooms" or "free rooms"
  if (
    query.includes("available rooms") ||
    query.includes("which rooms are free") ||
    query.includes("free rooms") ||
    query.includes("empty rooms")
  ) {
    const freeRooms = rooms.filter((r) => r.status === "Available");
    if (freeRooms.length === 0) {
      return {
        text: "All classrooms and labs are currently occupied.",
        suggestions: ["Next Machine Learning lecture in Room 204?"]
      };
    }
    const list = freeRooms.map((r) => `• **${r.name || r.id}** (${r.type}, capacity ${r.capacity})`).join("\n");
    return {
      text: `The following **${freeRooms.length} rooms** are currently free and available:\n\n${list}`,
      suggestions: ["Is Lab-302 free?", "Next Machine Learning lecture in Room 204?"]
    };
  }

  // 6. "When is the next [Subject] lecture [in Room X]?" or generic subject schedule lookup
  const knownSubjects = [
    "machine learning",
    "data structures",
    "database systems",
    "computer networks",
    "operating systems",
    "cloud computing",
    "embedded systems",
    "cyber security"
  ];

  const matchedSubjectName = knownSubjects.find((sub) => query.includes(sub));
  const isLectureQuery = query.includes("lecture") || query.includes("class") || query.includes("session");
  const isWhenOrNext = query.includes("when") || query.includes("next") || query.includes("upcoming");

  if (matchedSubjectName || (isLectureQuery && isWhenOrNext)) {
    let matchedSessions = timetable;

    if (matchedSubjectName) {
      matchedSessions = matchedSessions.filter((s) =>
        s.subject.toLowerCase().includes(matchedSubjectName)
      );
    }

    // Check if room was also specified (e.g. "in Room 204", "Room-204", "Lab-302")
    const roomSubMatch = query.match(/\b(room[- ]?\d+|lab[- ]?\d+|hall[- ]?[a-z]|seminar[- ]?\d+)\b/i);
    if (roomSubMatch) {
      const targetRoom = roomSubMatch[1].replace(/\s+/g, "-").toUpperCase();
      matchedSessions = matchedSessions.filter(
        (s) => s.room && s.room.replace(/\s+/g, "-").toUpperCase() === targetRoom
      );
    }

    if (matchedSessions.length > 0) {
      const first = matchedSessions[0];
      const remaining = matchedSessions.slice(1);

      let responseText = `The next **${first.subject}** (${first.type}) is scheduled on **${first.day}, ${first.slot}** in **${first.room}**, taught by **${first.faculty}**.`;

      if (remaining.length > 0) {
        responseText += `\n\n**Additional sessions scheduled this week:**\n` +
          remaining.map((s) => `• **${s.day}** ${s.slot} (${s.room}, ${s.faculty})`).join("\n");
      }

      return {
        text: responseText,
        suggestions: ["Is Lab-302 free?", `Show ${first.faculty}'s schedule`, "Available rooms"]
      };
    }
  }

  // 7. Faculty schedule: "<faculty>'s schedule", "what is Prof. Patel teaching", etc.
  const matchedFaculty = faculty.find((f) => {
    const fLower = f.name.toLowerCase();
    const lastName = fLower.split(" ").slice(-1)[0];
    return query.includes(fLower) || (lastName.length > 2 && query.includes(lastName));
  });

  if (matchedFaculty && (query.includes("schedule") || query.includes("teaching") || query.includes("class") || query.includes("when") || query.includes("timetable"))) {
    const fSessions = timetable.filter((s) => s.faculty && s.faculty.toLowerCase().includes(matchedFaculty.name.toLowerCase()));

    if (fSessions.length === 0) {
      return {
        text: `**${matchedFaculty.name}** does not have any scheduled classes in the current timetable.`,
        suggestions: ["Show Dr. Shah's schedule", "Show Prof. Rahul Patel's schedule"]
      };
    }

    const sessionList = fSessions
      .map((s) => `• **${s.day}** at **${s.slot}**: *${s.subject}* (${s.type}) in **${s.room}**`)
      .join("\n");

    return {
      text: `Weekly schedule for **${matchedFaculty.name}** (${matchedFaculty.expertise}):\n\n${sessionList}`,
      suggestions: ["Is Lab-302 free?", "How many rooms are active?"]
    };
  }

  // 8. "Is [Room] free?" (e.g. "Is Lab-302 free?", "Is Room 204 free?", "Status of Room 101")
  const roomMatch = query.match(/\b(room[- ]?\d+|lab[- ]?\d+|hall[- ]?[a-z]|seminar[- ]?\d+)\b/i);
  if (roomMatch && (query.includes("free") || query.includes("available") || query.includes("vacant") || query.includes("status") || query.startsWith("is "))) {
    const rawTarget = roomMatch[1].replace(/\s+/g, "-").toUpperCase();
    const foundRoom = rooms.find(
      (r) => (r.id && r.id.replace(/\s+/g, "-").toUpperCase() === rawTarget) ||
             (r.name && r.name.replace(/\s+/g, "-").toUpperCase() === rawTarget)
    );

    if (foundRoom) {
      if (foundRoom.status === "Available") {
        return {
          text: `Yes! **${foundRoom.name || foundRoom.id}** (${foundRoom.type}, Capacity: ${foundRoom.capacity}) is currently **Free & Available** for immediate booking.`,
          suggestions: ["Available rooms", "Next Machine Learning lecture in Room 204?"]
        };
      } else {
        const currentInfo = foundRoom.currentClass
          ? `It is currently in use for **${foundRoom.currentClass}** (Occupancy: ${foundRoom.currentStrength || 0}/${foundRoom.capacity}).`
          : "It is currently marked as in session.";
        return {
          text: `No, **${foundRoom.name || foundRoom.id}** is currently **Active**. ${currentInfo}`,
          suggestions: ["Available rooms", "Is Room-101 free?"]
        };
      }
    }
  }

  // 9. Friendly fallback
  return {
    text: "I didn't quite catch that. I can provide real-time campus intelligence on lecture timetables, room occupancy, and faculty schedules.\n\nTry asking me:\n• *When is the next Machine Learning lecture in Room 204?*\n• *Is Lab-302 free?*\n• *Show Dr. Meera Shah's schedule*\n• *How many rooms are active?*",
    suggestions: [
      "Next Machine Learning lecture in Room 204?",
      "Is Lab-302 free?",
      "Show Dr. Shah's schedule",
      "Available rooms"
    ]
  };
}
