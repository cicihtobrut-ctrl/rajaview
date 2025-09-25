import React, { useEffect } from 'react';

// Komponen ini tidak akan menampilkan apa-apa, hanya menjalankan script di latar belakang
function AutoAds() {
  useEffect(() => {
    try {
      if (typeof window.show_9929126 === 'function') {
        console.log("Mengaktifkan Iklan In-App Otomatis...");
        // Gunakan kode In-App Interstitial Anda di sini
        window.show_9929126({
          type: 'inApp',
          inAppSettings: {
            frequency: 2,
            capping: 0.1,
            interval: 30,
            timeout: 5,
            everyPage: false
          }
        });
      }
    } catch (e) {
      console.error("Gagal mengaktifkan iklan otomatis:", e);
    }
  }, []); // [] berarti hanya berjalan sekali saat aplikasi dimuat

  return null; // Komponen ini tidak perlu merender elemen visual
}

export default AutoAds;

