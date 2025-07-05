import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative w-full h-64 sm:h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          opacity: 0.6,
        }}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2 sm:mb-4 text-center select-none flex flex-col items-center">
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
        <p className="text-base sm:text-xl md:text-2xl text-green-100 font-medium text-center max-w-xs sm:max-w-2xl animate-pulse px-2 sm:px-0">
          "Every love story is beautiful, but ours is my favorite."
        </p>
      </motion.div>
    </div>
  );
}
