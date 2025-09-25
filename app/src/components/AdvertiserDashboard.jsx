import React from 'react';

function AdvertiserDashboard({ user }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dasbor Pengiklan</h1>
      <p>Selamat datang, {user.username || 'Pengiklan'}!</p>
      <p>Fitur untuk membuat kampanye iklan akan segera tersedia di sini.</p>
    </div>
  );
}

export default AdvertiserDashboard;

