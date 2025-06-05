import React from 'react';

const themes = [
  'dark',
  'forest',
  'luxury',
  'dracula',
  'night',
  'emerald',
  'synthwave',
];

export default function ThemeSwitcher() {
  const handleChange = (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-white font-semibold">Theme:</span>
      <select
        className="select select-success select-sm bg-black/80 text-white border-green-950"
        onChange={handleChange}
        defaultValue={document.documentElement.getAttribute('data-theme') || 'dark'}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme} className="bg-black text-white">
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
