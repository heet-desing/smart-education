"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Smart Education Platform
              </p>
              <p className="text-xs text-slate-500">
                Intelligent campus management & conflict-free scheduling
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <Link href="/classrooms" className="hover:text-indigo-600 transition-colors">
              Classrooms
            </Link>
            <Link href="/timetable" className="hover:text-indigo-600 transition-colors">
              Timetable AI
            </Link>
            <Link href="/faculty" className="hover:text-indigo-600 transition-colors">
              Faculty
            </Link>
            <Link href="/analytics" className="hover:text-indigo-600 transition-colors">
              Analytics
            </Link>
          </div>

          {/* Copyright & Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>&copy; 2026 Smart Education System. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
