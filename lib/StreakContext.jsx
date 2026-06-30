"use client";

import React, { createContext, useContext, useState } from "react";

const StreakContext = createContext(undefined);

const defaultDays = [
  { name: "Sun", active: true, min: "40m" },
  { name: "Mon", active: true, min: "50m" },
  { name: "Tue", active: false, min: "-", isToday: true },
  { name: "Wed", active: false, min: "-" },
  { name: "Thu", active: false, min: "-" },
  { name: "Fri", active: false, min: "-" },
  { name: "Sat", active: false, min: "-" },
];

export function StreakProvider({ children }) {
  const [streakData, setStreakData] = useState(defaultDays);
  const [totalStreak, setTotalStreak] = useState(2);

  React.useEffect(() => {
    try {
      const savedData = localStorage.getItem("stry_streak_data");
      if (savedData) {
        setStreakData(JSON.parse(savedData));
      }
      const savedStreak = localStorage.getItem("stry_total_streak");
      if (savedStreak) {
        setTotalStreak(parseInt(savedStreak, 10) || 2);
      }
    } catch (e) {
      console.error("Error loading streak data from localStorage", e);
    }
  }, []);

  const markAsCompleted = () => {
    const todayIndex = streakData.findIndex((day) => day.isToday);
    if (todayIndex !== -1 && !streakData[todayIndex].active) {
      const updatedData = [...streakData];
      updatedData[todayIndex] = {
        ...updatedData[todayIndex],
        active: true,
        min: "30m",
      };

      const newTotal = totalStreak + 1;
      setStreakData(updatedData);
      setTotalStreak(newTotal);

      // Save to localStorage
      localStorage.setItem("stry_total_streak", newTotal.toString());
      localStorage.setItem("stry_streak_data", JSON.stringify(updatedData));
    }
  };

  return (
    <StreakContext.Provider
      value={{ streakData, totalStreak, markAsCompleted }}
    >
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error("useStreak must be used within a StreakProvider");
  }
  return context;
}
