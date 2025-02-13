// Import komponen dan fungsi yang diperlukan
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Membuat root aplikasi React dan merender komponen App
// StrictMode digunakan untuk mendeteksi potensi masalah dalam aplikasi
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
