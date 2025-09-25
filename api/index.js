import express from 'express';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi
const app = express();
app.use(express.json());

// Koneksi Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- API ENDPOINTS ---

// Endpoint dasar untuk tes
app.get('/api', (req, res) => {
  res.send('✅ Backend API aktif dan berjalan!');
});

// Endpoint untuk mendapatkan semua user
app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase.from('User').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Endpoint untuk membuat user baru
app.post('/api/users', async (req, res) => {
  const { telegramId, username } = req.body;
  if (!telegramId) {
    return res.status(400).json({ error: 'telegramId dibutuhkan' });
  }

  const { data, error } = await supabase
    .from('User')
    .insert([{ telegramId, username }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// --- Menjalankan Server ---
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

export default app;
