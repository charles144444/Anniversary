import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const anniversaryDate = new Date(2024, 6, 5); // June 5, 2024
    const updateCountdown = () => {
      const now = new Date();
      let diff = now - anniversaryDate;
      if (diff < 0) diff = 0;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ years, months, days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // (Typing animation effect removed as it is not needed and causes errors)

  return (
    <div
      className="w-full text-center text-white bg-gradient-to-r from-green-950 to-black rounded-xl shadow-lg py-4 px-6 mb-4 text-lg md:text-xl font-semibold tracking-wide border-2 border-green-950/60 animate-fade-in"
    >
      {time.years} <span className="font-bold text-white">years</span>, {time.months}{' '}
      <span className="font-bold text-white">months</span>, {time.days}{' '}
      <span className="font-bold text-white">days</span> <br />
      <span className="text-white">{time.hours}h {time.minutes}m {time.seconds}s</span>
    </div>
  );
};

export default Countdown;
