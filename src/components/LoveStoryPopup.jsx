import React from 'react';
import { Fade } from 'react-awesome-reveal';

const LoveStoryPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-black/80 border border-green-950 text-white shadow-2xl">
        <Fade cascade triggerOnce>
          <h3 className="font-bold text-2xl mb-4 text-center">Our Love Story</h3>
          <p className="text-lg md:text-xl font-medium mb-6 text-center">
            From the moment I met you, my heart knew you were special.<br />
            Every second with you is a treasure.<br />
            <span className="text-pink-400 font-bold">I love you, Jessie! ❤</span>
          </p>
        </Fade>
        <div className="modal-action flex justify-center">
          <button
            onClick={onClose}
            className="btn btn-success px-8 text-lg rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoveStoryPopup;
