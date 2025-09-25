import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi
const app = express();
app.use(cors()); // Mengizinkan request dari domain lain
app.use(express.json()); // Membaca body JSON

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

// --- Menjalankan Server (hanya untuk local dev) ---
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server lokal berjalan di http://localhost:${port}`);
});

export default app;
