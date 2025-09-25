import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Aplikasi Express
const app = express();
app.use(cors());
app.use(express.json());

// Inisialisasi Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// =================================================================
// --- API ENDPOINTS ---
// =================================================================

// Endpoint #1: Tes dasar untuk API
app.get('/api', (req, res) => {
  res.send('✅ Backend API aktif dan berjalan!');
});

// Endpoint #2: Autentikasi & Registrasi Pengguna
app.post('/api/auth', async (req, res) => {
  const { telegramId, username } = req.body;
  if (!telegramId) {
    return res.status(400).json({ error: 'telegramId dibutuhkan' });
  }

  try {
    let { data: user } = await supabase
      .from('User')
      .select('*')
      .eq('telegramId', telegramId)
      .single();

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from('User')
        .insert([{ telegramId, username }])
        .select()
        .single();

      if (createError) throw createError;
      user = newUser;
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.code !== 'PGRST116') {
      console.error('Authentication error:', error.message);
      return res.status(500).json({ error: 'Terjadi kesalahan di server', details: error.message });
    }
  }
});

// Endpoint #3: Mengatur Peran Pengguna (Publisher/Advertiser) -- TELAH DIPERBAIKI
app.post('/api/set-role', async (req, res) => {
  const { telegramId, role } = req.body;

  if (!telegramId || !role) {
    return res.status(400).json({ error: 'telegramId dan role dibutuhkan' });
  }
  if (role !== 'publisher' && role !== 'advertiser') {
    return res.status(400).json({ error: 'Peran tidak valid.' });
  }

  try {
    const { data: updatedUser, error } = await supabase
      .from('User')
      .update({ role: role })
      .eq('telegramId', telegramId)
      .select(); // <-- Menghapus .single()

    // Cek jika update gagal atau tidak ada user yang ter-update
    if (error) throw error;
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan untuk diperbarui.' });
    }
    
    // Kirim data user yang berhasil diupdate (ambil item pertama dari array)
    res.status(200).json(updatedUser[0]);

  } catch (error) {
    console.error('Set role error:', error.message);
    res.status(500).json({ error: 'Gagal memperbarui peran pengguna.' });
  }
});

// Endpoint #4: Check-in Harian
app.post('/api/check-in', async (req, res) => {
  const { telegramId } = req.body;
  if (!telegramId) {
    return res.status(400).json({ error: 'telegramId dibutuhkan' });
  }

  try {
    const { data: user, error: findError } = await supabase
      .from('User')
      .select('userId, balance, lastCheckIn')
      .eq('telegramId', telegramId)
      .single();

    if (findError || !user) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }

    const now = new Date();
    if (user.lastCheckIn) {
      const lastCheckInDate = new Date(user.lastCheckIn);
      now.setHours(0, 0, 0, 0);
      lastCheckInDate.setHours(0, 0, 0, 0);

      if (lastCheckInDate.getTime() === now.getTime()) {
        return res.status(400).json({ message: 'Anda sudah melakukan check-in hari ini.' });
      }
    }

    const checkInReward = 100;
    const newBalance = parseFloat(user.balance) + checkInReward;

    const { data: updatedUser, error: updateError } = await supabase
      .from('User')
      .update({ balance: newBalance, lastCheckIn: new Date().toISOString() })
      .eq('telegramId', telegramId)
      .select()
      .single();

    if (updateError) throw updateError;

    res.status(200).json({ message: `Check-in berhasil! Anda mendapatkan ${checkInReward} poin.`, user: updatedUser });

  } catch (error) {
    console.error('Check-in error:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan di server saat check-in.' });
  }
});

// =================================================================
// --- Menjalankan Server untuk Development Lokal ---
// =================================================================
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server lokal berjalan di http://localhost:${port}`);
});

export default app;

