import React, { useEffect, useState } from 'react';

export default function TypewriterText({ text, className = '' }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [text]);

  return <p className={className}>{displayed}</p>;
}
