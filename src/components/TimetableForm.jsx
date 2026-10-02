"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  Trash2,
  AlertTriangle,
  Building,
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { departments } from "@/data/mockData";

export default function TimetableForm({ onGenerate, isGenerating }) {
  // 1. Department
  const [selectedDept, setSelectedDept] = useState("Computer Engineering");

  // 2. Faculty list (prefilled with 5 realistic faculty)
  const [facultyList, setFacultyList] = useState([
    { id: "f1", name: "Dr. Meera Shah", expertise: "Machine Learning", maxHours: 16 },
    { id: "f2", name: "Prof. Rahul Patel", expertise: "Data Structures", maxHours: 16 },
    { id: "f3", name: "Prof. Anita Desai", expertise: "Database Systems", maxHours: 14 },
    { id: "f4", name: "Dr. Kiran Joshi", expertise: "Computer Networks", maxHours: 14 },
    { id: "f5", name: "Prof. Neha Trivedi", expertise: "Operating Systems", maxHours: 14 }
  ]);
  const [newFacultyName, setNewFacultyName] = useState("");
  const [newFacultyExpertise, setNewFacultyExpertise] = useState("");
  const [newFacultyMaxHours, setNewFacultyMaxHours] = useState(14);

  // 3. Rooms & capacities (prefilled with 4 rooms)
  const [roomsList, setRoomsList] = useState([
    { id: "Room-204", type: "Classroom", capacity: 60 },
    { id: "Room-101", type: "Classroom", capacity: 60 },
    { id: "Lab-302", type: "Lab", capacity: 30 },
    { id: "Lab-105", type: "Lab", capacity: 30 }
  ]);
  const [newRoomId, setNewRoomId] = useState("");
  const [newRoomType, setNewRoomType] = useState("Classroom");
  const [newRoomCapacity, setNewRoomCapacity] = useState(60);

  // 4. Subjects (prefilled with 8 lecture & lab subjects)
  const [subjectsList, setSubjectsList] = useState([
    { id: "s1", name: "Machine Learning", type: "Lecture", weeklyHours: 3, faculty: "Dr. Meera Shah", color: "indigo" },
    { id: "s2", name: "Machine Learning Lab", type: "Lab", weeklyHours: 2, faculty: "Dr. Meera Shah", color: "indigo" },
    { id: "s3", name: "Data Structures", type: "Lecture", weeklyHours: 3, faculty: "Prof. Rahul Patel", color: "emerald" },
    { id: "s4", name: "Data Structures Lab", type: "Lab", weeklyHours: 2, faculty: "Prof. Rahul Patel", color: "emerald" },
    { id: "s5", name: "Database Systems", type: "Lecture", weeklyHours: 3, faculty: "Prof. Anita Desai", color: "amber" },
    { id: "s6", name: "Database Systems Lab", type: "Lab", weeklyHours: 2, faculty: "Prof. Anita Desai", color: "amber" },
    { id: "s7", name: "Computer Networks", type: "Lecture", weeklyHours: 3, faculty: "Dr. Kiran Joshi", color: "purple" },
    { id: "s8", name: "Operating Systems", type: "Lecture", weeklyHours: 3, faculty: "Prof. Neha Trivedi", color: "rose" }
  ]);
  const [newSubName, setNewSubName] = useState("");
  const [newSubType, setNewSubType] = useState("Lecture");
  const [newSubHours, setNewSubHours] = useState(3);
  const [newSubFaculty, setNewSubFaculty] = useState("Dr. Meera Shah");

  // 5. Working days
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [workingDays, setWorkingDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ]);

  // 6. Working hours & class strengths
  const [classStrength, setClassStrength] = useState(50);
  const [labStrength, setLabStrength] = useState(30);

  // Collapsible sections state
  const [activeTab, setActiveTab] = useState("all");

  // Validation state
  const [validationError, setValidationError] = useState("");

  // Handlers for Faculty
  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!newFacultyName.trim() || !newFacultyExpertise.trim()) return;
    setFacultyList((prev) => [
      ...prev,
      {
        id: `f-${Date.now().toString(36)}`,
        name: newFacultyName.trim(),
        expertise: newFacultyExpertise.trim(),
        maxHours: Number(newFacultyMaxHours) || 14
      }
    ]);
    setNewFacultyName("");
    setNewFacultyExpertise("");
  };

  const handleRemoveFaculty = (id) => {
    if (facultyList.length <= 1) {
      setValidationError("At least 1 faculty member is required.");
      return;
    }
    setFacultyList((prev) => prev.filter((f) => f.id !== id));
  };

  // Handlers for Rooms
  const handleAddRoom = (e) => {
    e.preventDefault();
    if (!newRoomId.trim()) return;
    setRoomsList((prev) => [
      ...prev,
      {
        id: newRoomId.trim(),
        type: newRoomType,
        capacity: Number(newRoomCapacity) || 40
      }
    ]);
    setNewRoomId("");
  };

  const handleRemoveRoom = (id) => {
    if (roomsList.length <= 1) {
      setValidationError("At least 1 room is required.");
      return;
    }
    setRoomsList((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateRoomCapacity = (id, newCap) => {
    setRoomsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, capacity: Number(newCap) } : r))
    );
  };

  // Handlers for Subjects
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    const colors = ["indigo", "emerald", "amber", "purple", "rose", "blue", "teal"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setSubjectsList((prev) => [
      ...prev,
      {
        id: `s-${Date.now().toString(36)}`,
        name: newSubName.trim(),
        type: newSubType,
        weeklyHours: Number(newSubHours) || 1,
        faculty: newSubFaculty || (facultyList[0]?.name ?? "Dr. Meera Shah"),
        color: randomColor
      }
    ]);
    setNewSubName("");
  };

  const handleRemoveSubject = (id) => {
    if (subjectsList.length <= 1) {
      setValidationError("At least 1 subject is required.");
      return;
    }
    setSubjectsList((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateSubjectHours = (id, hours) => {
    setSubjectsList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, weeklyHours: Math.max(1, Number(hours)) } : s))
    );
  };

  // Handlers for Working Days Checkboxes
  const toggleWorkingDay = (day) => {
    setWorkingDays((prev) => {
      if (prev.includes(day)) {
        if (prev.length <= 1) {
          setValidationError("At least 1 working day must be selected.");
          return prev;
        }
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  // Trigger Timetable Generation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (workingDays.length === 0) {
      setValidationError("Please select at least 1 working day.");
      return;
    }
    if (facultyList.length === 0) {
      setValidationError("Please add at least 1 faculty member.");
      return;
    }
    if (roomsList.length === 0) {
      setValidationError("Please add at least 1 room.");
      return;
    }
    if (subjectsList.length === 0) {
      setValidationError("Please add at least 1 subject.");
      return;
    }

    const totalHoursToSchedule = subjectsList.reduce(
      (sum, s) => sum + (Number(s.weeklyHours) || 1),
      0
    );
    // 7 teaching slots per day (8 slots minus 1 lunch)
    const availableSlots = workingDays.length * 7 * roomsList.length;
    if (totalHoursToSchedule > availableSlots) {
      setValidationError(
        `Total weekly sessions (${totalHoursToSchedule}) exceeds available room-slots (${availableSlots}). Add more days or rooms.`
      );
      return;
    }

    // Call generator callback
    onGenerate({
      department: selectedDept,
      days: workingDays,
      faculty: facultyList,
      rooms: roomsList,
      subjects: subjectsList,
      classStrength: Number(classStrength),
      labStrength: Number(labStrength)
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>Timetable Constraints & Input</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Configure academic parameters. All fields are pre-populated with ready-to-run defaults.
        </p>
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* 1. Department Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Department
          </label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium text-slate-800"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Working Days */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
            Working Days (Mon - Sat)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {allDays.map((day) => {
              const isChecked = workingDays.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleWorkingDay(day)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border text-center ${
                    isChecked
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Daily Hours & Lunch Slot Info */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-700">
            <span className="font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              Hours: 09:00 - 17:00
            </span>
            <span className="text-slate-500">1h Lecture Duration</span>
          </div>
          <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200">
            <span>Lunch Break:</span>
            <span className="font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              13:00 - 14:00 (Always Free)
            </span>
          </div>
        </div>

        {/* 4. Batch Size Capacities */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Lecture Strength
            </label>
            <input
              type="number"
              min="10"
              max="150"
              value={classStrength}
              onChange={(e) => setClassStrength(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Lab Batch Strength
            </label>
            <input
              type="number"
              min="5"
              max="60"
              value={labStrength}
              onChange={(e) => setLabStrength(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 5. Faculty Management in Constraints */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Faculty ({facultyList.length})</span>
            </label>
            <span className="text-[11px] text-slate-400">Max Hrs/Wk</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {facultyList.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
              >
                <div className="truncate mr-2">
                  <span className="font-semibold text-slate-800 block truncate">
                    {f.name}
                  </span>
                  <span className="text-[11px] text-slate-500 truncate">
                    {f.expertise}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[11px]">
                    {f.maxHours}h
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaculty(f.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    aria-label={`Remove ${f.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick add faculty */}
          <div className="mt-2 pt-2 border-t border-dashed border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Faculty Name (e.g. Dr. Roy)"
              value={newFacultyName}
              onChange={(e) => setNewFacultyName(e.target.value)}
              className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Expertise"
              value={newFacultyExpertise}
              onChange={(e) => setNewFacultyExpertise(e.target.value)}
              className="w-28 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={handleAddFaculty}
              className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg shrink-0"
            >
              Add
            </button>
          </div>
        </div>

        {/* 6. Rooms & Capacities */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-indigo-600" />
              <span>Rooms & Capacities ({roomsList.length})</span>
            </label>
            <span className="text-[11px] text-slate-400">Seats</span>
          </div>

          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {roomsList.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{room.id}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                    {room.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    min="15"
                    max="300"
                    value={room.capacity}
                    onChange={(e) => handleUpdateRoomCapacity(room.id, e.target.value)}
                    className="w-14 px-1.5 py-0.5 text-center text-xs bg-white border border-slate-200 rounded font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(room.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    aria-label={`Remove room ${room.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick add room */}
          <div className="mt-2 pt-2 border-t border-dashed border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Room ID"
              value={newRoomId}
              onChange={(e) => setNewRoomId(e.target.value)}
              className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <select
              value={newRoomType}
              onChange={(e) => setNewRoomType(e.target.value)}
              className="w-24 px-1.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="Classroom">Classroom</option>
              <option value="Lab">Lab</option>
            </select>
            <input
              type="number"
              placeholder="Cap"
              value={newRoomCapacity}
              onChange={(e) => setNewRoomCapacity(e.target.value)}
              className="w-14 px-1 py-1 text-xs text-center bg-slate-50 border border-slate-200 rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddRoom}
              className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg shrink-0"
            >
              Add
            </button>
          </div>
        </div>

        {/* 7. Subjects List */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Subjects & Hours ({subjectsList.length})</span>
            </label>
            <span className="text-[11px] text-slate-400">Weekly Hrs</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {subjectsList.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
              >
                <div className="truncate mr-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-semibold text-slate-800 truncate">
                      {sub.name}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                        sub.type === "Lab"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {sub.type}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate block">
                    {sub.faculty}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={sub.weeklyHours}
                    onChange={(e) => handleUpdateSubjectHours(sub.id, e.target.value)}
                    className="w-12 px-1.5 py-0.5 text-center text-xs bg-white border border-slate-200 rounded font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(sub.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    aria-label={`Remove ${sub.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick add subject */}
          <div className="mt-2 pt-2 border-t border-dashed border-slate-200 flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Subject Name"
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              className="flex-1 min-w-[130px] px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <select
              value={newSubType}
              onChange={(e) => setNewSubType(e.target.value)}
              className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="Lecture">Lecture</option>
              <option value="Lab">Lab</option>
            </select>
            <input
              type="number"
              min="1"
              max="6"
              value={newSubHours}
              onChange={(e) => setNewSubHours(e.target.value)}
              className="w-12 px-1 py-1 text-xs text-center bg-slate-50 border border-slate-200 rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddSubject}
              className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg shrink-0"
            >
              Add
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-650 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md shadow-indigo-600/25 hover:shadow-lg transition-all duration-200 active:scale-98"
          >
            <Sparkles className="w-5 h-5 text-indigo-200" />
            <span>
              {isGenerating ? "Solving Constraints..." : "Generate Optimized Timetable"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
