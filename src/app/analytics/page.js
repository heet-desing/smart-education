"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  TrendingUp,
  Clock,
  Building2,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  Lightbulb,
  ArrowUpRight
} from "lucide-react";
import { analyticsData } from "@/data/mockData";
import SectionHeading from "@/components/SectionHeading";

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  // Trigger smooth chart entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const {
    weeklyUtilization,
    lectureVsLab,
    hourlyOccupancy,
    kpi,
    recommendations
  } = analyticsData;

  // Donut chart stroke math
  // Circumference for r=40 is ~251.32
  const CIRCUMFERENCE = 2 * Math.PI * 40;
  const lectureStroke = (lectureVsLab.lecturePercent / 100) * CIRCUMFERENCE;
  const labStroke = (lectureVsLab.labPercent / 100) * CIRCUMFERENCE;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <SectionHeading
        badge="Campus Intelligence"
        title="Infrastructure & Academic Analytics"
        subtitle="Telemetry metrics, timetable distribution analysis, and automated operational recommendations."
      />

      {/* 1. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Avg Utilization
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {kpi.averageUtilization}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +4.2%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Campus-wide space efficiency rating
          </p>
        </div>

        {/* KPI 2 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Peak Traffic Hour
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              {kpi.peakHour}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            98% active classroom saturation
          </p>
        </div>

        {/* KPI 3 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Most Utilized Room
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {kpi.mostUsedRoom}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            High-spec multi-media amphitheater
          </p>
        </div>

        {/* KPI 4 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Workload Balance
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-900 tracking-tight truncate">
              {kpi.facultyBalance}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Standard deviation under 1.4 hrs
          </p>
        </div>
      </div>

      {/* 2. Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Utilization Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Weekly Space Utilization
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Room usage percentage per instructional day
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
              Mon &ndash; Fri
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4">
            {weeklyUtilization.map((item) => (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
              >
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 mb-1">
                  {item.rate}% ({item.sessions} cls)
                </div>

                {/* Animated Bar */}
                <div className="w-full max-w-[52px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-500 rounded-t-xl group-hover:from-indigo-500 group-hover:to-blue-400 transition-all duration-1000 ease-out"
                    style={{
                      height: mounted ? `${item.rate}%` : "0%"
                    }}
                  />
                </div>

                {/* Day Label */}
                <span className="text-xs font-bold text-slate-600 mt-1">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lecture vs Lab Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Session Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instructional breakdown: Lectures vs Practical Labs
            </p>
          </div>

          {/* Inline SVG Donut Chart */}
          <div className="relative flex items-center justify-center py-4">
            <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-slate-100"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />

              {/* Lecture segment (Indigo) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                strokeWidth="12"
                stroke="#4f46e5"
                fill="transparent"
                strokeDasharray={`${lectureStroke} ${CIRCUMFERENCE}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  strokeDasharray: mounted
                    ? `${lectureStroke} ${CIRCUMFERENCE}`
                    : `0 ${CIRCUMFERENCE}`
                }}
              />

              {/* Lab segment (Emerald) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                strokeWidth="12"
                stroke="#10b981"
                fill="transparent"
                strokeDasharray={`${labStroke} ${CIRCUMFERENCE}`}
                strokeDashoffset={mounted ? `-${lectureStroke}` : "0"}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-slate-900 leading-none">
                {lectureVsLab.lectures + lectureVsLab.labs}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                Total Sessions
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-150 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>Lectures</span>
              </div>
              <p className="text-base font-extrabold text-slate-900 mt-1">
                {lectureVsLab.lecturePercent}%{" "}
                <span className="text-xs font-normal text-slate-500">
                  ({lectureVsLab.lectures} hrs)
                </span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-150 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>Lab Sessions</span>
              </div>
              <p className="text-base font-extrabold text-slate-900 mt-1">
                {lectureVsLab.labPercent}%{" "}
                <span className="text-xs font-normal text-slate-500">
                  ({lectureVsLab.labs} hrs)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hourly Occupancy Trend (Area/Line SVG Chart) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Campus Hourly Occupancy Profile
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live aggregate occupancy percentage by time slot
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-600" /> 09:00 &ndash; 17:00
          </span>
        </div>

        {/* SVG Area Chart */}
        <div className="relative w-full h-56 pt-4">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 700 160"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal guidelines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="80" x2="700" y2="80" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="120" x2="700" y2="120" stroke="#f1f5f9" strokeWidth="1" />

            {/* Area polygon */}
            <polygon
              points="0,160 0,35 100,20 200,8 300,55 400,152 500,24 600,28 700,95 700,160"
              fill="url(#areaGradient)"
            />

            {/* Primary line stroke */}
            <polyline
              fill="none"
              stroke="#4f46e5"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,35 100,20 200,8 300,55 400,152 500,24 600,28 700,95"
            />

            {/* Coordinate Dots */}
            {[
              { x: 0, y: 35, label: "09:00", val: 85 },
              { x: 100, y: 20, label: "10:00", val: 92 },
              { x: 200, y: 8, label: "11:00", val: 98 },
              { x: 300, y: 55, label: "12:00", val: 70 },
              { x: 400, y: 152, label: "13:00", val: 5 },
              { x: 500, y: 24, label: "14:00", val: 90 },
              { x: 600, y: 28, label: "15:00", val: 88 },
              { x: 700, y: 95, label: "16:00", val: 45 }
            ].map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  fill="#ffffff"
                  stroke="#4f46e5"
                  strokeWidth="3"
                />
              </g>
            ))}
          </svg>

          {/* Time Labels */}
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 px-1">
            {hourlyOccupancy.map((h) => (
              <div key={h.hour} className="text-center">
                <span>{h.hour}</span>
                <span className="block text-[10px] text-slate-500 font-bold">
                  {h.rate}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Automated AI Recommendations */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-indigo-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              AI Timetable &amp; Facility Optimization Insights
            </h3>
            <p className="text-xs text-indigo-200">
              Heuristics generated by reviewing schedule constraints and real-time room traffic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((tip) => (
            <div
              key={tip.id}
              className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-md flex flex-col justify-between hover:bg-white/15 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-300" />
                  <span>Recommendation #{tip.id}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {tip.title}
                </h4>
                <p className="text-xs text-indigo-150 leading-relaxed">
                  {tip.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-indigo-300 font-medium">Predicted Efficiency: +7%</span>
                <span className="inline-flex items-center gap-1 font-bold text-white hover:text-indigo-200 cursor-pointer">
                  <span>Review</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
