"use client";

import React, { useState, useEffect } from "react";
import {
  Camera,
  Presentation,
  Thermometer,
  Search,
  Filter,
  Users,
  Activity,
  Wind,
  Layers,
  X,
  CheckCircle2,
  AlertCircle,
  Power
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import SectionHeading from "@/components/SectionHeading";
import RoomCard from "@/components/RoomCard";

export default function SmartClassroomsPage() {
  const { rooms, toggleRoomStatus } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'Active' | 'Available'
  const [typeFilter, setTypeFilter] = useState("all"); // 'all' | 'Classroom' | 'Lab' | 'Hall'

  // Modal / Side Panel state
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // Live fluctuating sensor readings (updates every 3 seconds via setInterval)
  const [telemetryJitter, setTelemetryJitter] = useState({
    temp: 0,
    humidity: 0,
    aqi: 0
  });

  useEffect(() => {
    // Only runs in browser after mount to prevent hydration mismatch
    const interval = setInterval(() => {
      setTelemetryJitter({
        temp: Number(((Math.random() - 0.5) * 1.2).toFixed(1)),
        humidity: Math.floor((Math.random() - 0.5) * 4),
        aqi: Math.floor((Math.random() - 0.5) * 3)
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filtered rooms list
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.name && room.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : room.status === statusFilter;

    const matchesType =
      typeFilter === "all" ? true : room.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Current inspected room
  const activeModalRoom = rooms.find((r) => r.id === selectedRoomId);

  // Toggle status handler
  const handleToggleStatus = (roomId) => {
    toggleRoomStatus(roomId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <SectionHeading
        badge="IoT Smart Campus"
        title="Smart Classrooms & Laboratories"
        subtitle="Live telemetry, occupancy sensors, and intelligent physical infrastructure across campus facilities."
      />

      {/* Top 3 Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-150">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            Automated Computer Vision Attendance
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            AI overhead cameras recognize enrolled students and record attendance in real-time with 99.4% precision.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-150">
            <Presentation className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            Interactive Digital Whiteboards
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Faculty write, annotate, and beam lecture notes directly onto connected student tablets and laptops.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-150">
            <Thermometer className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            Environmental &amp; Occupancy IoT
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Multi-spectral IoT sensors monitor ambient temperature, CO2, air quality index, and seating capacity live.
          </p>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Room ID (e.g. Room-204, Lab-302)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Buttons */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1">
            {["all", "Active", "Available"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === status
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {status === "all" ? "All Status" : status}
              </button>
            ))}
          </div>

          {/* Type Dropdown */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Room Types</option>
            <option value="Classroom">Classrooms</option>
            <option value="Lab">Laboratories</option>
            <option value="Hall">Auditoriums / Halls</option>
          </select>
        </div>
      </div>

      {/* Room Cards Grid (9+ rooms) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Showing {filteredRooms.length} of {rooms.length} Spaces
          </p>
          <span className="text-xs text-indigo-600 font-medium">
            Click any room to open telemetry &amp; controls
          </span>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No rooms found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or filter tags.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onClick={(r) => setSelectedRoomId(r.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Room Telemetry & Details Modal / Side Panel */}
      {activeModalRoom && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900">
                    {activeModalRoom.id}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {activeModalRoom.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Max Seating Capacity: {activeModalRoom.capacity} Students
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRoomId(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Status Pill & Toggle Action */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    activeModalRoom.status === "Active"
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-blue-500"
                  }`}
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Current Status: {activeModalRoom.status}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {activeModalRoom.status === "Active"
                      ? `Occupied: ${activeModalRoom.currentClass || "Lecture in session"}`
                      : "Vacant & Ready for Booking"}
                  </span>
                </div>
              </div>

              {/* State Toggle Button */}
              <button
                type="button"
                onClick={() => handleToggleStatus(activeModalRoom.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs ${
                  activeModalRoom.status === "Active"
                    ? "bg-slate-200 hover:bg-slate-300 text-slate-800"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>
                  {activeModalRoom.status === "Active"
                    ? "Mark as Available"
                    : "Mark as Active"}
                </span>
              </button>
            </div>

            {/* Real-time Environmental Telemetry (fluctuating every 3s) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <span>Live IoT Telemetry Feed</span>
                </h4>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Sensors Streaming
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Temperature */}
                <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-150 text-center">
                  <Thermometer className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 block">Ambient Temp</span>
                  <span className="text-base font-extrabold text-indigo-950">
                    {(Number(activeModalRoom.temperature || 23) + telemetryJitter.temp).toFixed(1)}
                    &deg;C
                  </span>
                </div>

                {/* Humidity */}
                <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-150 text-center">
                  <Wind className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 block">Humidity</span>
                  <span className="text-base font-extrabold text-blue-950">
                    {Math.max(30, Math.min(70, Number(activeModalRoom.humidity || 48) + telemetryJitter.humidity))}
                    %
                  </span>
                </div>

                {/* Air Quality */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-150 text-center">
                  <Activity className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 block">Air Quality</span>
                  <span className="text-base font-extrabold text-emerald-950">
                    {Math.max(15, 36 + telemetryJitter.aqi)} AQI
                  </span>
                </div>
              </div>
            </div>

            {/* Live Seating Occupancy */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">
                  Live Seating Head-Count
                </span>
                <span className="font-bold text-indigo-700">
                  {activeModalRoom.status === "Active" ? activeModalRoom.currentStrength : 0}{" "}
                  / {activeModalRoom.capacity} Seats
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      activeModalRoom.status === "Active" && activeModalRoom.capacity > 0
                        ? Math.min(
                            100,
                            Math.round(
                              (activeModalRoom.currentStrength /
                                activeModalRoom.capacity) *
                                100
                            )
                          )
                        : 0
                    }%`
                  }}
                />
              </div>
            </div>

            {/* Smart Equipment List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Installed Infrastructure
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalRoom.equipment?.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setSelectedRoomId(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
              >
                Close Telemetry Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
