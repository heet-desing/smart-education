"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Calendar,
  Users,
  Download,
  Printer,
  RotateCcw,
  FlaskConical,
  BookOpen,
  Filter,
  AlertCircle,
  X,
  Edit2
} from "lucide-react";
import { LUNCH_BREAK_SLOT, defaultTimeSlots } from "@/data/mockData";
import { findConflicts } from "@/lib/scheduler";

// Color mappings for subject tags
const COLOR_MAP = {
  indigo: {
    bg: "bg-indigo-50/90",
    border: "border-indigo-200",
    text: "text-indigo-950",
    badge: "bg-indigo-100 text-indigo-700"
  },
  emerald: {
    bg: "bg-emerald-50/90",
    border: "border-emerald-200",
    text: "text-emerald-950",
    badge: "bg-emerald-100 text-emerald-700"
  },
  amber: {
    bg: "bg-amber-50/90",
    border: "border-amber-200",
    text: "text-amber-950",
    badge: "bg-amber-100 text-amber-700"
  },
  purple: {
    bg: "bg-purple-50/90",
    border: "border-purple-200",
    text: "text-purple-950",
    badge: "bg-purple-100 text-purple-700"
  },
  rose: {
    bg: "bg-rose-50/90",
    border: "border-rose-200",
    text: "text-rose-950",
    badge: "bg-rose-100 text-rose-700"
  },
  blue: {
    bg: "bg-blue-50/90",
    border: "border-blue-200",
    text: "text-blue-950",
    badge: "bg-blue-100 text-blue-700"
  },
  teal: {
    bg: "bg-teal-50/90",
    border: "border-teal-200",
    text: "text-teal-950",
    badge: "bg-teal-100 text-teal-700"
  }
};

export default function TimetableGrid({
  timetable = [],
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  timeSlots = defaultTimeSlots,
  utilization = 94,
  conflicts = 0,
  onUpdateSchedule,
  onRegenerate,
  facultyList = [],
  roomsList = [],
  subjectsList = []
}) {
  // Mobile day tab
  const [activeMobileDay, setActiveMobileDay] = useState(days[0] || "Monday");

  // Filtering
  const [filterType, setFilterType] = useState("all"); // 'all' | 'faculty' | 'room'
  const [filterValue, setFilterValue] = useState("");

  // Edit Modal State
  const [editingSlot, setEditingSlot] = useState(null); // { day, slot, session }
  const [editSubject, setEditSubject] = useState("");
  const [editFaculty, setEditFaculty] = useState("");
  const [editRoom, setEditRoom] = useState("");
  const [editType, setEditType] = useState("Lecture");
  const [editConflictError, setEditConflictError] = useState("");

  // Open edit modal for a slot
  const handleOpenEdit = (day, slot) => {
    if (slot === LUNCH_BREAK_SLOT) return; // cannot edit lunch break
    const existing = timetable.find((s) => s.day === day && s.slot === slot);
    setEditingSlot({ day, slot, existing });
    setEditConflictError("");

    if (existing) {
      setEditSubject(existing.subject);
      setEditFaculty(existing.faculty);
      setEditRoom(existing.room);
      setEditType(existing.type || "Lecture");
    } else {
      setEditSubject(subjectsList[0]?.name || "Machine Learning");
      setEditFaculty(facultyList[0]?.name || "Dr. Meera Shah");
      setEditRoom(roomsList[0]?.id || "Room-204");
      setEditType("Lecture");
    }
  };

  // Save changes with conflict validation
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingSlot) return;

    const { day, slot, existing } = editingSlot;

    // Build candidate session
    const candidateSession = {
      id: existing ? existing.id : `sess-${Date.now().toString(36)}`,
      day,
      slot,
      subject: editSubject,
      faculty: editFaculty,
      room: editRoom,
      type: editType,
      color: existing?.color || "indigo"
    };

    // Replace or add session in copy of timetable
    const candidateTimetable = timetable
      .filter((s) => !(s.day === day && s.slot === slot))
      .concat(candidateSession);

    // Validate conflicts
    const conflictErrors = findConflicts(candidateTimetable);
    if (conflictErrors.length > 0) {
      setEditConflictError(conflictErrors[0]);
      return;
    }

    // Valid: save and close
    onUpdateSchedule(candidateTimetable);
    setEditingSlot(null);
  };

  // Clear a slot
  const handleClearSlot = () => {
    if (!editingSlot) return;
    const { day, slot } = editingSlot;
    const candidateTimetable = timetable.filter(
      (s) => !(s.day === day && s.slot === slot)
    );
    onUpdateSchedule(candidateTimetable);
    setEditingSlot(null);
  };

  // Filter sessions based on criteria
  const isSessionVisible = (session) => {
    if (!session) return false;
    if (filterType === "faculty" && filterValue) {
      return session.faculty === filterValue;
    }
    if (filterType === "room" && filterValue) {
      return session.room === filterValue;
    }
    return true;
  };

  // CSV Exporter
  const handleDownloadCSV = () => {
    const headers = ["Day", "Time Slot", "Subject", "Type", "Faculty", "Room"];
    const rows = timetable.map((s) => [
      `"${s.day}"`,
      `"${s.slot}"`,
      `"${s.subject}"`,
      `"${s.type}"`,
      `"${s.faculty}"`,
      `"${s.room}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "smart_education_timetable.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print timetable
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Top Header: Title, Summary Badges, Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900">
              Master Academic Timetable
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              AI Optimized
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Click any lecture cell to edit slot details or test constraint validation.
          </p>
        </div>

        {/* Summary Metric Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Conflicts badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              conflicts === 0
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{conflicts} Conflicts</span>
          </span>

          {/* Sessions scheduled */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>{timetable.length} Sessions</span>
          </span>

          {/* Utilization rate */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>{utilization}% Room Utilization</span>
          </span>
        </div>
      </div>

      {/* Control Bar: Filters & Exports */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter View:</span>
          </div>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValue("");
            }}
            className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Sessions</option>
            <option value="faculty">By Faculty</option>
            <option value="room">By Room</option>
          </select>

          {/* Secondary Filter Values */}
          {filterType === "faculty" && (
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select Faculty...</option>
              {facultyList.map((f) => (
                <option key={f.id || f.name} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
          )}

          {filterType === "room" && (
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select Room...</option>
              {roomsList.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} ({r.type})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile Day Selector Tabs (sm:hidden) */}
      <div className="sm:hidden flex gap-1.5 overflow-x-auto pb-1 no-print">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setActiveMobileDay(day)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeMobileDay === day
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Mobile Day-by-Day List View (sm:hidden) */}
      <div className="sm:hidden space-y-3">
        {timeSlots.map((slot) => {
          const isLunch = slot === LUNCH_BREAK_SLOT;
          const session = timetable.find(
            (s) => s.day === activeMobileDay && s.slot === slot
          );
          const visible = session && isSessionVisible(session);

          if (isLunch) {
            return (
              <div
                key={slot}
                className="p-3 rounded-xl bg-slate-100 border border-dashed border-slate-200 text-center text-xs font-semibold text-slate-500"
              >
                13:00 - 14:00 &bull; Campus Lunch Break
              </div>
            );
          }

          const colorTheme = session?.color ? COLOR_MAP[session.color] || COLOR_MAP.indigo : COLOR_MAP.indigo;

          return (
            <div
              key={slot}
              onClick={() => handleOpenEdit(activeMobileDay, slot)}
              className="p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold text-slate-600">{slot}</span>
                <span className="text-[10px] text-indigo-600 font-medium">Click to edit</span>
              </div>

              {session && visible ? (
                <div className={`p-2.5 rounded-lg border ${colorTheme.bg} ${colorTheme.border}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${colorTheme.text}`}>
                      {session.subject}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${colorTheme.badge} flex items-center gap-1`}
                    >
                      {session.type === "Lab" && <FlaskConical className="w-3 h-3" />}
                      {session.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center justify-between">
                    <span>{session.faculty}</span>
                    <span className="font-semibold text-slate-800">{session.room}</span>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  {session && !visible ? "Hidden by Filter" : "Free Slot"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Weekly Matrix View (hidden sm:block) */}
      <div className="hidden sm:block overflow-x-auto print:overflow-visible">
        <table className="w-full border-collapse text-left min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="py-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-28">
                Time Slot
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="py-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-700 text-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {timeSlots.map((slot) => {
              const isLunch = slot === LUNCH_BREAK_SLOT;

              if (isLunch) {
                return (
                  <tr key={slot} className="bg-slate-50/90 text-center">
                    <td className="py-2.5 px-3 text-xs font-semibold text-slate-500 border-r border-slate-100">
                      {slot}
                    </td>
                    <td
                      colSpan={days.length}
                      className="py-2.5 px-3 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100/60"
                    >
                      Campus Lunch & Break Hour
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={slot} className="hover:bg-slate-50/40 transition-colors">
                  {/* Slot label */}
                  <td className="py-3 px-3 text-xs font-semibold text-slate-600 border-r border-slate-100 align-top whitespace-nowrap">
                    {slot}
                  </td>

                  {/* Day Cells */}
                  {days.map((day) => {
                    const session = timetable.find(
                      (s) => s.day === day && s.slot === slot
                    );
                    const visible = session && isSessionVisible(session);
                    const colorTheme = session?.color
                      ? COLOR_MAP[session.color] || COLOR_MAP.indigo
                      : COLOR_MAP.indigo;

                    return (
                      <td
                        key={day}
                        onClick={() => handleOpenEdit(day, slot)}
                        className="p-1.5 align-top min-w-[130px] cursor-pointer group"
                      >
                        {session && visible ? (
                          <div
                            className={`p-2.5 rounded-xl border transition-all duration-150 group-hover:shadow-md group-hover:scale-[1.02] ${colorTheme.bg} ${colorTheme.border} ${
                              session.type === "Lab" ? "border-dashed border-2" : ""
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <span
                                className={`text-xs font-bold line-clamp-1 ${colorTheme.text}`}
                                title={session.subject}
                              >
                                {session.subject}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-1 py-0.2 rounded shrink-0 flex items-center gap-0.5 ${colorTheme.badge}`}
                              >
                                {session.type === "Lab" && (
                                  <FlaskConical className="w-2.5 h-2.5" />
                                )}
                                {session.type}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-600 truncate">
                              {session.faculty}
                            </p>

                            <div className="mt-1 pt-1 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold text-slate-800">
                              <span>{session.room}</span>
                              <Edit2 className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-slate-200/80 bg-slate-50/40 group-hover:bg-indigo-50/30 group-hover:border-indigo-300 transition-colors flex items-center justify-center text-xs text-slate-400">
                            {session && !visible ? (
                              <span className="text-[11px] text-slate-300">
                                Filtered
                              </span>
                            ) : (
                              <span className="opacity-60 group-hover:opacity-100 group-hover:text-indigo-600 font-medium">
                                Free
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Slot Modal */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Edit Scheduled Slot
                </h4>
                <p className="text-xs text-slate-500">
                  {editingSlot.day} &bull; {editingSlot.slot}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingSlot(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message if Conflict Detected */}
            {editConflictError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Scheduling Conflict:</span>
                  <span>{editConflictError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              {/* Subject */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Session Type
                </label>
                <div className="flex gap-2">
                  {["Lecture", "Lab"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEditType(t)}
                      className={`flex-1 py-1.5 rounded-lg border font-semibold ${
                        editType === t
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Faculty */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Assigned Faculty
                </label>
                <select
                  value={editFaculty}
                  onChange={(e) => setEditFaculty(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                >
                  {facultyList.map((f) => (
                    <option key={f.id || f.name} value={f.name}>
                      {f.name} ({f.expertise})
                    </option>
                  ))}
                </select>
              </div>

              {/* Room */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Assigned Room
                </label>
                <select
                  value={editRoom}
                  onChange={(e) => setEditRoom(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                >
                  {roomsList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id} ({r.type}, Cap: {r.capacity})
                    </option>
                  ))}
                </select>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {editingSlot.existing ? (
                  <button
                    type="button"
                    onClick={handleClearSlot}
                    className="px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold"
                  >
                    Clear Slot
                  </button>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSlot(null)}
                    className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                  >
                    Save Slot
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
