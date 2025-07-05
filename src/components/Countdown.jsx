import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const Countdown = () => {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAnniversaryPopup, setShowAnniversaryPopup] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let year = now.getFullYear();
      let anniversaryDate = new Date(year, 7, 1); // August 1st of this year
      if (now < anniversaryDate) {
        anniversaryDate = new Date(year - 1, 7, 1); // Use last year's anniversary if not reached yet
      }
      // Calculate difference
      let years = now.getFullYear() - anniversaryDate.getFullYear();
      let months = now.getMonth() - anniversaryDate.getMonth();
      let days = now.getDate() - anniversaryDate.getDate();
      if (days < 0) {
        months -= 1;
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      // Time of day
      let hours = now.getHours() - anniversaryDate.getHours();
      let minutes = now.getMinutes() - anniversaryDate.getMinutes();
      let seconds = now.getSeconds() - anniversaryDate.getSeconds();
      if (seconds < 0) {
        minutes -= 1;
        seconds += 60;
      }
      if (minutes < 0) {
        hours -= 1;
        minutes += 60;
      }
      if (hours < 0) {
        days -= 1;
        hours += 24;
      }
      setTime({ years, months, days, hours, minutes, seconds });

      // Confetti for new year or on anniversary day
      if (now.getMonth() === 7 && now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() < 3) {
        setShowConfetti(true);
        setShowAnniversaryPopup(true);
        setTimeout(() => setShowConfetti(false), 8000);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relative w-full">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={400} />}
      <div
        className="w-full text-center text-white bg-gradient-to-r from-green-950 to-black rounded-xl shadow-lg py-4 px-6 mb-4 text-lg md:text-xl font-semibold tracking-wide border-2 border-green-950/60 animate-fade-in"
      >
        {time.years} <span className="font-bold text-white">years</span>, {time.months}{' '}
        <span className="font-bold text-white">months</span>, {time.days}{' '}
        <span className="font-bold text-white">days</span> <br />
        <span className="text-white">{time.hours}h {time.minutes}m {time.seconds}s</span>
      </div>
      {showAnniversaryPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-green-700 mb-4">Happy Anniversary!</h2>
            <p className="text-lg text-green-900 mb-4">Wishing you another year of love and happiness together! 💚</p>
            <button
              className="btn btn-success px-6 py-2 rounded-xl text-white font-bold mt-2"
              onClick={() => setShowAnniversaryPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
