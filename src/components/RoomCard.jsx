"use client";

import React from "react";
import {
  Users,
  Tv,
  Presentation,
  Cpu,
  Wind,
  Monitor,
  Volume2,
  Video,
  Server,
  Layers,
  Sparkles,
  CheckCircle2
} from "lucide-react";

// Helper function to pick icon for equipment chip
function getEquipmentIcon(name) {
  const lower = name.toLowerCase();
  if (lower.includes("board")) return Presentation;
  if (lower.includes("projector") || lower.includes("display")) return Tv;
  if (lower.includes("sensor") || lower.includes("iot")) return Cpu;
  if (lower.includes("ac")) return Wind;
  if (lower.includes("computer") || lower.includes("workstation") || lower.includes("gpu")) return Monitor;
  if (lower.includes("audio") || lower.includes("mic")) return Volume2;
  if (lower.includes("video") || lower.includes("conf")) return Video;
  if (lower.includes("server") || lower.includes("network")) return Server;
  return Sparkles;
}

export default function RoomCard({ room, onClick }) {
  const isActive = room.status === "Active";
  const occupancyPercent = room.capacity > 0 && room.currentStrength
    ? Math.min(100, Math.round((room.currentStrength / room.capacity) * 100))
    : 0;

  return (
    <div
      onClick={() => onClick && onClick(room)}
      className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between relative"
    >
      <div>
        {/* Header: Room ID, Type and Status Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {room.id}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                <Layers className="w-3 h-3 text-slate-500" />
                {room.type}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Capacity: {room.capacity} seats</span>
            </div>
          </div>

          {/* Status Badge */}
          {isActive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Available
            </span>
          )}
        </div>

        {/* Live Class or Free Status */}
        <div className="my-4 p-3 rounded-xl bg-slate-50 border border-slate-150">
          {isActive ? (
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-800 truncate">
                  {room.currentClass || "Ongoing Session"}
                </span>
                <span className="font-bold text-indigo-700 shrink-0">
                  {room.currentStrength}/{room.capacity}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${occupancyPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 py-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free right now</span>
            </div>
          )}
        </div>

        {/* Equipment Chips */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Smart Equipment
          </p>
          <div className="flex flex-wrap gap-1.5">
            {room.equipment?.map((item) => {
              const EquipIcon = getEquipmentIcon(item);
              return (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100/90 text-slate-700 border border-slate-200/80"
                >
                  <EquipIcon className="w-3 h-3 text-slate-500" />
                  <span>{item}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Footer: Quick telemetry teaser */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Temp: {room.temperature}&deg;C</span>
        <span className="font-medium text-indigo-600 group-hover:underline">
          View Live Telemetry &rarr;
        </span>
      </div>
    </div>
  );
}
