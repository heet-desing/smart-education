"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  CheckCircle2,
  Activity,
  Presentation,
  CalendarDays,
  LineChart,
  ArrowRight,
  Sliders,
  Cpu,
  DownloadCloud
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import Hero from "@/components/Hero";
import StatCard from "@/components/StatCard";
import FeatureCard from "@/components/FeatureCard";
import SectionHeading from "@/components/SectionHeading";

export default function Dashboard() {
  const { rooms, faculty, schedulesGenerated } = useApp();

  // Dynamic statistics computed from shared state
  const activeClassroomsCount = rooms.filter((r) => r.status === "Active").length;
  const totalFacultyCount = faculty.length;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Live Campus Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Live Campus Pulse"
          title="Real-Time Infrastructure Overview"
          subtitle="Dynamic metrics tracked across physical facilities and academic scheduling engines."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Classrooms"
            value={activeClassroomsCount}
            targetNumber={activeClassroomsCount}
            icon={Building2}
            badge={`${rooms.length} Total Spaces`}
            badgeColor="emerald"
            description="Currently in session"
          />

          <StatCard
            title="Total Faculty"
            value={totalFacultyCount}
            targetNumber={totalFacultyCount}
            icon={Users}
            badge="5 Departments"
            badgeColor="indigo"
            description="Active teaching professors"
          />

          <StatCard
            title="Schedules Generated"
            value={schedulesGenerated}
            targetNumber={schedulesGenerated}
            icon={CheckCircle2}
            badge="0 Conflicts"
            badgeColor="emerald"
            description="Validated by AI engine"
          />

          <StatCard
            title="Resource Utilization"
            value={94}
            targetNumber={94}
            suffix="%"
            icon={Activity}
            isProgress={true}
            progressValue={94}
            badge="Optimal"
            badgeColor="emerald"
            description="Average campus space efficiency"
          />
        </div>
      </section>

      {/* 3. Platform Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Pillars"
          title="Platform Highlights"
          subtitle="Everything modern higher education institutions need to automate administrative operations."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Smart Classrooms"
            description="Real-time environmental monitoring (temp, humidity, AQI), computer vision attendance, and digital whiteboards."
            icon={Presentation}
            href="/classrooms"
            linkText="Explore Smart Spaces"
            badge="IoT Enabled"
          />

          <FeatureCard
            title="AI Timetable Generator"
            description="Constraint satisfaction backtracking algorithm that creates zero-conflict master timetables across all batches and labs in seconds."
            icon={CalendarDays}
            href="/timetable"
            linkText="Launch Timetable Generator"
            badge="AI Powered"
          />

          <FeatureCard
            title="Campus Analytics"
            description="Visual heatmaps, room occupancy distribution, lecture vs lab breakdown, and automated optimization tips."
            icon={LineChart}
            href="/analytics"
            linkText="View Performance Insights"
            badge="Real-time Telemetry"
          />
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12">
          <SectionHeading
            badge="Simple 3-Step Workflow"
            title="How Conflict-Free Scheduling Works"
            subtitle="Our intelligent solver eliminates timetable bottlenecks with zero manual trial-and-error."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-extrabold text-xl shadow-xs mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Input Constraints
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add faculty availability, room types, student batch sizes, and course credit hours.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-indigo-600/30 mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Generate with AI
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Backtracking engine rigorously verifies hard constraints to guarantee zero clashes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-extrabold text-xl shadow-xs mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Review &amp; Export
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inspect the weekly matrix, make fine-tuned edits with collision guards, or export as CSV/PDF.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/timetable"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <span>Try the Timetable Generator Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
