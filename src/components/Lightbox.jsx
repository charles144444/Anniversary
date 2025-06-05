import React from 'react';

const Lightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <img
        src={image}
        alt="Lightbox"
        className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white/40"
      />
    </div>
  );
};

export default Lightbox;
