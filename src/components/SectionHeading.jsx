"use client";

import React from "react";

export default function SectionHeading({
  badge,
  title,
  subtitle,
  center = false,
  className = ""
}) {
  return (
    <div className={`mb-8 ${center ? "text-center max-w-2xl mx-auto" : ""} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-full mb-2.5">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
