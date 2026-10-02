"use client";

import React, { useEffect, useState } from "react";

export default function StatCard({
  title,
  value,
  targetNumber,
  suffix = "",
  icon: Icon,
  badge,
  badgeColor = "emerald",
  isProgress = false,
  progressValue = 94,
  description
}) {
  const parsedTarget = targetNumber !== undefined ? targetNumber : parseInt(value, 10);
  const [displayCount, setDisplayCount] = useState(() => (!isNaN(parsedTarget) ? 0 : value));

  // Smooth count-up animation on initial client mount
  useEffect(() => {
    const target = targetNumber !== undefined ? targetNumber : parseInt(value, 10);
    if (isNaN(target)) return;

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * target);

      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayCount(target);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [value, targetNumber]);

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Background soft glow on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50/50 to-blue-50/20 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-300" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {displayCount}
            </span>
            {suffix && (
              <span className="text-lg font-bold text-slate-600">
                {suffix}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Progress Bar / Ring if applicable */}
      {isProgress && (
        <div className="mt-4">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer / Badge */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{description}</span>
        {badge && (
          <span
            className={`font-medium px-2 py-0.5 rounded-full ${
              badgeColor === "emerald"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-indigo-50 text-indigo-700 border border-indigo-200"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
