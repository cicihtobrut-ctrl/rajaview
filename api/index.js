import express from 'express';
import 'dotenv/config';
import cors from 'cors'; // <-- Impor cors
import { createClient } from '@supabase/supabase-js';

// Inisialisasi
const app = express();
app.use(cors()); // <-- Terapkan cors untuk semua request
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
      console.log(`User baru terdeteksi: ${telegramId}, membuat entri baru...`);
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

// --- Menjalankan Server ---
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

export default app;

