import React, { useState } from 'react';
import Countdown from './components/Countdown';
import LoveStoryPopup from './components/LoveStoryPopup';
import Lightbox from './components/Lightbox';
import Particles from 'react-tsparticles';
import Guestbook from './components/Guestbook';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import Hero from './components/Hero';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';

function AppContent({ showPopup, setShowPopup, lightboxImage, setLightboxImage }) {
  // Floating hearts particles options
  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: 'transparent' },
    particles: {
      number: { value: 30, density: { enable: true, value_area: 800 } },
      color: { value: '#e255a3' },
      shape: {
        type: 'char',
        character: {
          value: ['❤'],
          font: 'Verdana',
          style: '',
          weight: '400',
        },
      },
      opacity: { value: 0.7, random: true },
      size: { value: 24, random: { enable: true, minimumValue: 16 } },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'top',
        random: false,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-black via-green-950 to-black flex flex-col items-center justify-center">
      {/* Hero Section */}
      <Hero />
      <Particles
        id="tsparticles"
        options={particlesOptions}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      />
      <div className="relative z-10 w-full flex flex-col items-center">
        <p className="text-lg md:text-xl font-medium text-green-200 mb-4 text-center animate-pulse">
          We've been together for...
        </p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-md flex flex-col items-center"
        >
          <div className="w-full bg-black/70 backdrop-blur-md border border-green-950 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
            <Countdown />
            <div className="flex flex-col items-center w-full my-4">
              <span className="badge badge-success badge-lg mb-2 text-white text-lg shadow">Anniversary Progress</span>
              <motion.progress
                className="progress progress-success w-full h-4"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                value={80} // Example value
                max={100}
              />
            </div>
            <motion.button
              className="btn btn-success w-full py-3 mt-6 mb-2 rounded-xl text-green-100 font-bold text-lg shadow-md hover:scale-105 transition-all duration-200 border border-green-950 bg-gradient-to-r from-green-950 to-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowPopup(true)}
            >
              💚 Our Love Story
            </motion.button>
            <LoveStoryPopup show={showPopup} onClose={() => setShowPopup(false)} />
          </div>
        </motion.div>
      </div>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      <Gallery />
      <Guestbook />
    </div>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppContent
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            lightboxImage={lightboxImage}
            setLightboxImage={setLightboxImage}
          />
        }
      />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="*" element={<AppContent showPopup={showPopup} setShowPopup={setShowPopup} lightboxImage={lightboxImage} setLightboxImage={setLightboxImage} />} />
    </Routes>
  );
}

export default App;
