"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Building2, CheckCircle2, ShieldCheck, Zap, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-200/50 via-blue-100/40 to-emerald-100/30 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-12 -right-12 -z-10 w-96 h-96 bg-indigo-100/60 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Next-Gen Campus Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Transforming Education with{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                AI & Smart Infrastructure.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Generate conflict-free academic timetables in seconds, monitor live classroom telemetry with IoT sensors, and streamline faculty resource allocation effortlessly.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/timetable"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-650 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 transition-all duration-200 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Generate Timetable</span>
              </Link>

              <Link
                href="/classrooms"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-95"
              >
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>Explore Smart Classrooms</span>
              </Link>
            </div>

            {/* Feature Bullets */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero scheduling clashes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>94% Resource utilization</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Real-time room telemetry</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Preview Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Live Timetable Engine
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>0 Conflicts Found</span>
                </span>
              </div>

              {/* Mini Timetable Stack */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-150/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      ML
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Machine Learning
                      </p>
                      <p className="text-xs text-slate-500">
                        Dr. Meera Shah &bull; Room-204
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-indigo-700 block">
                      Mon 09:00
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      Lecture
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-150/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      DS
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Data Structures
                      </p>
                      <p className="text-xs text-slate-500">
                        Prof. Rahul Patel &bull; Room-101
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-emerald-700 block">
                      Mon 10:00
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      Lecture
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-150/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                      CN
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Computer Networks
                      </p>
                      <p className="text-xs text-slate-500">
                        Dr. Kiran Joshi &bull; Room-204
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-purple-700 block">
                      Mon 11:00
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      Lecture
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Status Pill */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Backtracking CSP Solver</span>
                </div>
                <span className="font-semibold text-indigo-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> &lt; 0.4s compute
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
