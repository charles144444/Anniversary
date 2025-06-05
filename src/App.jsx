import React, { useState } from 'react';
import Countdown from './components/Countdown';
import LoveStoryPopup from './components/LoveStoryPopup';
import Lightbox from './components/Lightbox';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Guestbook from './components/Guestbook';
import Gallery from './components/Gallery';
import TypewriterText from './components/TypewriterText';
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // tsParticles options for floating hearts
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
      {/* Parallax/Animated Hero Section */}
      <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
            zIndex: 1,
            opacity: 0.25,
          }}
        ></div>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 text-center select-none flex flex-col items-center">
            <motion.span
              className="block"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              <span className="inline-block mr-2">💚</span>
              {['J', 'e', 's', 's', 'i', 'e'].map((char, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: -60 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
              className="block"
            >
              My Forever Love 💚
            </motion.span>
          </h1>
          <p className="text-xl md:text-2xl text-green-100 font-medium text-center max-w-2xl animate-pulse">
            "Every love story is beautiful, but ours is my favorite."
          </p>
        </motion.div>
      </div>
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
            {/* DaisyUI Badge and Progress Bar with framer-motion */}
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
            <button
              className="btn btn-success w-full py-3 mt-6 mb-2 rounded-xl text-green-100 font-bold text-lg shadow-md hover:scale-105 transition-all duration-200 border border-green-950 bg-gradient-to-r from-green-950 to-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              as={motion.button}
              onClick={() => setShowPopup(true)}
            >
              💚 Our Love Story
            </button>
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

export default App;
