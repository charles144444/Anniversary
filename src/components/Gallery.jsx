import React, { useState, useRef, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import Lightbox from './Lightbox';
import { useAuth } from '../AuthContext';

const IMGBB_API_KEY = '1cdc08b7ff166b042c424267dba83a71';
const API_BASE = 'http://localhost:4000/api';

export default function Gallery() {
  const { token, logout } = useAuth();
  const [images, setImages] = useState([]);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInput = useRef();

  // Fetch gallery images from backend
  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE}/gallery`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401 || res.status === 403) {
          logout();
          return;
        }
        const data = await res.json();
        setImages(data);
      } catch {
        setError('Failed to load images');
      }
      setLoading(false);
    }
    fetchImages();
  }, [token, logout]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileInput.current.files[0];
    if (!file) {
      setError('Please select an image.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }
    setUploading(true);
    setError('Uploading...');
    // Convert file to base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target.result.split(',')[1];
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: new URLSearchParams({ image: base64 }),
        });
        const data = await res.json();
        if (data.success) {
          // Save to backend
          const imgRes = await fetch(`${API_BASE}/gallery`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ src: data.data.url, caption: caption || 'Untitled' }),
          });
          if (imgRes.status === 401 || imgRes.status === 403) {
            logout();
            return;
          }
          if (!imgRes.ok) {
            setError('Failed to save image to gallery');
          } else {
            const newImg = await imgRes.json();
            setImages((prev) => [newImg, ...prev]);
            setCaption('');
            setError('');
            fileInput.current.value = '';
          }
        } else {
          setError('Upload failed. Try again.');
        }
      } catch {
        setError('Upload failed. Try again.');
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        logout();
        return;
      }
      if (!res.ok) {
        setError('Failed to delete image');
      } else {
        setImages((prev) => prev.filter((img) => img.id !== id));
      }
    } catch {
      setError('Failed to delete image');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-16 bg-black/60 backdrop-blur-md border border-green-950 rounded-3xl shadow-2xl p-8">
      <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-green-400 via-green-200 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
        Photo Memories
      </h2>
      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-2 items-center justify-center mb-8 bg-black/40 border border-green-900 rounded-xl p-4 shadow">
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          className="file-input file-input-bordered file-input-success bg-black/80 text-white border-green-950 w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Caption (optional)"
          className="input input-bordered input-success bg-black/80 text-white border-green-950 w-full max-w-xs"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          maxLength={60}
        />
        <button className="btn btn-success btn-sm text-white font-bold" type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Add'}
        </button>
      </form>
      {error && <div className="text-red-400 text-center mb-4">{error}</div>}
      {loading ? (
        <div className="text-green-200 text-center">Loading...</div>
      ) : (
        <>
          <div className="border-t border-green-900/40 mb-8"></div>
          <Fade cascade damping={0.12} triggerOnce>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {images.map((img) => (
                <div key={img.id} className="flex flex-col items-stretch">
                  <div className="card bg-black/80 border border-green-950 shadow-xl hover:scale-105 hover:shadow-emerald-700/40 transition-transform duration-200 rounded-2xl">
                    <figure>
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="object-cover w-full h-48 rounded-t-2xl cursor-pointer"
                        onClick={() => setLightboxImg(img.src)}
                      />
                    </figure>
                    <div className="card-body p-4">
                      <p className="text-white text-center text-base">{img.caption}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      className="rounded-full bg-red-600 text-white p-2 shadow-lg transition hover:bg-red-700 hover:scale-110 hover:shadow-xl border-2 border-white/80"
                      title="Delete image"
                      onClick={() => handleDelete(img.id)}
                      style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </>
      )}
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </div>
  );
}
