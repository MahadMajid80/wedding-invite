"use client";

import { useState, useEffect } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const days = differenceInDays(targetDate, now);
      const hours = differenceInHours(targetDate, now) % 24;
      const minutes = differenceInMinutes(targetDate, now) % 60;
      const seconds = differenceInSeconds(targetDate, now) % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="bg-navy-800/50 backdrop-blur-sm rounded-2xl p-8 luxury-shadow border border-champagne-500/20">
      <h3 className="font-serif text-2xl text-champagne-300 mb-6 text-center">
        Countdown to Our Special Day
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-champagne-500/10 to-champagne-600/10 border border-champagne-500/20"
          >
            <div className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-2">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-champagne-300/70 uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

