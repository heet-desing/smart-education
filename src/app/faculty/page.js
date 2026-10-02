"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Mail,
  Building,
  GraduationCap,
  Clock,
  CheckCircle2,
  X,
  AlertCircle
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { departments } from "@/data/mockData";
import SectionHeading from "@/components/SectionHeading";

export default function FacultyPage() {
  const { faculty, addFaculty, removeFaculty } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  // Modal State for Adding Faculty
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [expertise, setExpertise] = useState("");
  const [maxHours, setMaxHours] = useState(16);
  const [office, setOffice] = useState("");

  // Delete Confirmation State
  const [facultyToDelete, setFacultyToDelete] = useState(null);

  // Filtered faculty list
  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.expertise.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept =
      selectedDept === "all" ? true : f.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  // Calculate status counts
  const availableCount = faculty.filter((f) => f.status === "Available").length;
  const inClassCount = faculty.filter((f) => f.status === "In Class").length;
  const onLeaveCount = faculty.filter((f) => f.status === "On Leave").length;

  // Handle Add Form Submission
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !expertise.trim()) return;

    // Generate 2 initials from name
    const initials = name
      .replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, "")
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "FC";

    addFaculty({
      name: name.trim(),
      department,
      expertise: expertise.trim(),
      maxHours: Number(maxHours) || 14,
      assignedHours: Math.min(10, Number(maxHours)),
      office: office.trim() || "Main Academic Complex",
      avatar: initials,
      email: `${name.toLowerCase().replace(/[^a-z]/g, "")}@smartedu.ac.in`
    });

    // Reset and close
    setName("");
    setExpertise("");
    setOffice("");
    setIsAddModalOpen(false);
  };

  // Handle Delete Confirmation
  const confirmDelete = () => {
    if (facultyToDelete) {
      removeFaculty(facultyToDelete.id);
      setFacultyToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeading
          badge="Faculty Directory"
          title="Faculty Management"
          subtitle="Manage academic staff, workloads, subject proficiencies, and scheduling allocations."
          className="mb-0"
        />

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm hover:shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
            Total Faculty
          </span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
            {faculty.length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wider block">
            Available Now
          </span>
          <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">
            {availableCount}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider block">
            In Active Class
          </span>
          <span className="text-2xl font-extrabold text-indigo-700 mt-1 block">
            {inClassCount}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
            On Leave
          </span>
          <span className="text-2xl font-extrabold text-slate-600 mt-1 block">
            {onLeaveCount}
          </span>
        </div>
      </div>

      {/* Control Bar: Search & Department Filter */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by faculty name or subject expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFaculty.map((f) => {
          const loadPercent = Math.min(
            100,
            Math.round(((f.assignedHours || 10) / (f.maxHours || 16)) * 100)
          );

          return (
            <div
              key={f.id}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar + Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black text-sm flex items-center justify-center shadow-sm shadow-indigo-600/20">
                    {f.avatar || "FC"}
                  </div>

                  {f.status === "Available" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Available
                    </span>
                  )}
                  {f.status === "In Class" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      In Class
                    </span>
                  )}
                  {f.status === "On Leave" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      On Leave
                    </span>
                  )}
                </div>

                {/* Name & Department */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {f.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {f.department}
                </p>

                {/* Subject Expertise Badge */}
                <div className="mt-3">
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-150">
                    {f.expertise}
                  </span>
                </div>

                {/* Contact & Office info */}
                <div className="mt-4 space-y-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{f.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{f.office || "Main Academic Block"}</span>
                  </div>
                </div>

                {/* Workload Progress Bar */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Workload
                    </span>
                    <span className="font-bold text-slate-800">
                      {f.assignedHours || 10}/{f.maxHours} hrs
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        loadPercent > 85 ? "bg-amber-500" : "bg-indigo-600"
                      }`}
                      style={{ width: `${loadPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action: Delete */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setFacultyToDelete(f)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-xs"
                  aria-label={`Delete ${f.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[11px]">Remove</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Faculty Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Add Faculty Member
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name &amp; Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subject Expertise
                </label>
                <input
                  type="text"
                  placeholder="e.g. Artificial Intelligence"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Max Hours / Week
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="30"
                    value={maxHours}
                    onChange={(e) => setMaxHours(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Office / Cabin
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Block C-204"
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                >
                  Add Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {facultyToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Remove Faculty Member?
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove <strong>{facultyToDelete.name}</strong> from the campus roster? This will also update timetable constraints.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setFacultyToDelete(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
