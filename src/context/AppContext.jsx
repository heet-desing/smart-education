"use client";

import React, { createContext, useContext, useState } from "react";
import {
  initialRooms,
  initialFaculty,
  defaultTimetable
} from "@/data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Shared state across all pages and widgets
  const [rooms, setRooms] = useState(initialRooms);
  const [faculty, setFaculty] = useState(initialFaculty);
  const [timetable, setTimetable] = useState(defaultTimetable);
  const [schedulesGenerated, setSchedulesGenerated] = useState(128);

  // Increment generated schedules counter
  const incrementSchedules = () => {
    setSchedulesGenerated((prev) => prev + 1);
  };

  // Toggle room status between Active and Available
  const toggleRoomStatus = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          const nextStatus = room.status === "Active" ? "Available" : "Active";
          return {
            ...room,
            status: nextStatus,
            currentClass: nextStatus === "Active" ? "Study Group / Ad-hoc" : null,
            currentStrength: nextStatus === "Active" ? Math.floor(room.capacity * 0.7) : 0
          };
        }
        return room;
      })
    );
  };

  // Add a new faculty member
  const addFaculty = (newFacultyMember) => {
    setFaculty((prev) => [
      ...prev,
      {
        ...newFacultyMember,
        id: `fac-${Date.now().toString(36)}`,
        assignedHours: 0,
        status: "Available"
      }
    ]);
  };

  // Remove a faculty member
  const removeFaculty = (facultyId) => {
    setFaculty((prev) => prev.filter((f) => f.id !== facultyId));
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        setRooms,
        faculty,
        setFaculty,
        timetable,
        setTimetable,
        schedulesGenerated,
        incrementSchedules,
        toggleRoomStatus,
        addFaculty,
        removeFaculty
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
