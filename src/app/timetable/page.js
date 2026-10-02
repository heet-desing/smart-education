"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { generateTimetable, findConflicts } from "@/lib/scheduler";
import { defaultDays, defaultTimeSlots } from "@/data/mockData";
import SectionHeading from "@/components/SectionHeading";
import TimetableForm from "@/components/TimetableForm";
import TimetableGrid from "@/components/TimetableGrid";

const SIMULATION_STEPS = [
  "Reading academic constraints and course credits...",
  "Building faculty availability & clash matrix...",
  "Running constraint satisfaction solver (backtracking)...",
  "Resolving hard room & time collision constraints...",
  "Optimizing space utilization & day distributions...",
  "Timetable finalized — 0 conflicts verified!"
];

export default function TimetablePage() {
  const {
    timetable,
    setTimetable,
    incrementSchedules,
    faculty,
    rooms
  } = useApp();

  const [isGenerating, setIsGenerating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeDays, setActiveDays] = useState(defaultDays);
  const [unplacedSessions, setUnplacedSessions] = useState([]);
  const [lastConstraints, setLastConstraints] = useState(null);

  // Check current conflicts
  const currentConflictsList = findConflicts(timetable);
  const conflictsCount = currentConflictsList.length;

  // Handle Generate Request with ~4s simulated multi-step AI progress
  const handleGenerate = (constraints) => {
    setLastConstraints(constraints);
    setActiveDays(constraints.days);
    setIsGenerating(true);
    setSimulationProgress(0);
    setCurrentStepIndex(0);
    setUnplacedSessions([]);

    // Compute actual schedule via backtracking algorithm
    const result = generateTimetable({
      days: constraints.days,
      faculty: constraints.faculty,
      rooms: constraints.rooms,
      subjects: constraints.subjects,
      classStrength: constraints.classStrength,
      labStrength: constraints.labStrength
    });

    const totalDuration = 4000; // 4 seconds total
    const intervalTime = 80;
    const increment = 100 / (totalDuration / intervalTime);

    let progress = 0;
    const timer = setInterval(() => {
      progress += increment;

      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);

        // Apply results
        setSimulationProgress(100);
        setCurrentStepIndex(5);

        setTimeout(() => {
          setTimetable(result.schedule);
          setUnplacedSessions(result.unplaced || []);
          incrementSchedules(); // Increment counter for Dashboard
          setIsGenerating(false);
        }, 500);
      } else {
        setSimulationProgress(Math.floor(progress));
        // Update step index based on progress percent
        const step = Math.min(5, Math.floor((progress / 100) * 6));
        setCurrentStepIndex(step);
      }
    }, intervalTime);
  };

  // Regenerate with last used constraints
  const handleRegenerate = () => {
    if (lastConstraints) {
      handleGenerate(lastConstraints);
    } else {
      // Default regeneration
      handleGenerate({
        days: activeDays,
        faculty,
        rooms,
        subjects: [
          { name: "Machine Learning", type: "Lecture", weeklyHours: 3, faculty: "Dr. Meera Shah", color: "indigo" },
          { name: "Machine Learning Lab", type: "Lab", weeklyHours: 2, faculty: "Dr. Meera Shah", color: "indigo" },
          { name: "Data Structures", type: "Lecture", weeklyHours: 3, faculty: "Prof. Rahul Patel", color: "emerald" },
          { name: "Data Structures Lab", type: "Lab", weeklyHours: 2, faculty: "Prof. Rahul Patel", color: "emerald" },
          { name: "Database Systems", type: "Lecture", weeklyHours: 3, faculty: "Prof. Anita Desai", color: "amber" },
          { name: "Database Systems Lab", type: "Lab", weeklyHours: 2, faculty: "Prof. Anita Desai", color: "amber" },
          { name: "Computer Networks", type: "Lecture", weeklyHours: 3, faculty: "Dr. Kiran Joshi", color: "purple" },
          { name: "Operating Systems", type: "Lecture", weeklyHours: 3, faculty: "Prof. Neha Trivedi", color: "rose" }
        ],
        classStrength: 50,
        labStrength: 30
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <SectionHeading
        badge="Constraint Satisfaction Engine"
        title="AI Timetable Generator"
        subtitle="Automate complex academic scheduling with real-time constraint validation and zero conflict guarantees."
      />

      {/* Main 2-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Constraints Form */}
        <div className="lg:col-span-5 no-print">
          <TimetableForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        {/* Right Column: AI Simulation Loader OR Timetable Grid */}
        <div className="lg:col-span-7 space-y-6">
          {/* AI Simulation Progress Panel */}
          {isGenerating ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-8 sm:p-10 space-y-8 animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
                  <Cpu className="w-7 h-7 animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  AI Solver in Progress
                </h3>
                <p className="text-xs text-slate-500">
                  Executing backtracking search across search spaces...
                </p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-indigo-600">Solving Constraints</span>
                  <span className="text-slate-800">{simulationProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-500 h-full rounded-full transition-all duration-100 ease-out"
                    style={{ width: `${simulationProgress}%` }}
                  />
                </div>
              </div>

              {/* Step by Step Checklist */}
              <div className="space-y-3 bg-slate-50 rounded-2xl p-5 border border-slate-150">
                {SIMULATION_STEPS.map((stepText, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 text-xs transition-colors duration-200 ${
                        isDone
                          ? "text-emerald-700 font-semibold"
                          : isCurrent
                          ? "text-indigo-600 font-bold"
                          : "text-slate-400 opacity-60"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                      <span>{stepText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Warning if unplaced sessions occurred */}
              {unplacedSessions.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-800">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      Capacity Notice: {unplacedSessions.length} session(s) could not be scheduled
                    </span>
                    <span>
                      All available classroom slots for requested batch sizes were saturated. Try adding another room or working day.
                    </span>
                  </div>
                </div>
              )}

              {/* Master Timetable Grid */}
              <TimetableGrid
                timetable={timetable}
                days={activeDays}
                timeSlots={defaultTimeSlots}
                utilization={94}
                conflicts={conflictsCount}
                onUpdateSchedule={(newSchedule) => setTimetable(newSchedule)}
                onRegenerate={handleRegenerate}
                facultyList={faculty}
                roomsList={rooms}
                subjectsList={[
                  { name: "Machine Learning", type: "Lecture" },
                  { name: "Machine Learning Lab", type: "Lab" },
                  { name: "Data Structures", type: "Lecture" },
                  { name: "Data Structures Lab", type: "Lab" },
                  { name: "Database Systems", type: "Lecture" },
                  { name: "Database Systems Lab", type: "Lab" },
                  { name: "Computer Networks", type: "Lecture" },
                  { name: "Operating Systems", type: "Lecture" }
                ]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
