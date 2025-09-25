import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi
const app = express();
app.use(cors());
app.use(express.json());

// Koneksi Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- API ENDPOINTS ---

app.get('/api', (req, res) => {
  res.send('✅ Backend API aktif dan berjalan!');
});

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
    console.error('Authentication error:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan di server', details: error.message });
  }
});

// --- ENDPOINT BARU UNTUK CHECK-IN ---
app.post('/api/check-in', async (req, res) => {
  const { telegramId } = req.body;
  if (!telegramId) {
    return res.status(400).json({ error: 'telegramId dibutuhkan' });
  }

  try {
    // 1. Ambil data user
    const { data: user, error: findError } = await supabase
      .from('User')
      .select('userId, balance, lastCheckIn')
      .eq('telegramId', telegramId)
      .single();

    if (findError || !user) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }

    // 2. Cek apakah user sudah check-in hari ini
    const now = new Date();
    if (user.lastCheckIn) {
      const lastCheckInDate = new Date(user.lastCheckIn);
      // Set jam, menit, detik, ms ke 0 untuk membandingkan tanggal saja
      now.setHours(0, 0, 0, 0);
      lastCheckInDate.setHours(0, 0, 0, 0);

      if (lastCheckInDate.getTime() === now.getTime()) {
        return res.status(400).json({ message: 'Anda sudah melakukan check-in hari ini.' });
      }
    }

    // 3. Jika belum, lakukan proses check-in
    const checkInReward = 100; // Jumlah reward
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


// --- Menjalankan Server ---
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server lokal berjalan di http://localhost:${port}`);
});

export default app;

