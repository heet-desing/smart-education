"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  linkText = "Learn more",
  badge
}) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/80 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 shadow-sm">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
