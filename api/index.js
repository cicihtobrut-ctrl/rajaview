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

// Fungsi untuk membuat kode referral acak
const generateReferralCode = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// =================================================================
// --- API ENDPOINTS ---
// =================================================================

// Endpoint #1: Tes dasar untuk API
app.get('/api', (req, res) => {
  res.send('✅ Backend API aktif dan berjalan!');
});

// Endpoint #2: Autentikasi & Registrasi Pengguna -- TELAH DIPERBARUI
app.post('/api/auth', async (req, res) => {
  const { telegramId, username, refCode } = req.body; // Terima refCode opsional
  if (!telegramId) {
    return res.status(400).json({ error: 'telegramId dibutuhkan' });
  }

  try {
    let { data: user } = await supabase.from('User').select('*').eq('telegramId', telegramId).single();

    // Jika user tidak ada, buat user baru
    if (!user) {
      let referredById = null;
      // Jika ada kode referral, cari pengundangnya
      if (refCode) {
        const { data: referrer } = await supabase.from('User').select('userId, balance').eq('referralCode', refCode).single();
        if (referrer) {
          referredById = referrer.userId;
          // Beri bonus pada pengundang
          const REFERRAL_BONUS = 500;
          const newReferrerBalance = parseFloat(referrer.balance) + REFERRAL_BONUS;
          await supabase.from('User').update({ balance: newReferrerBalance }).eq('userId', referrer.userId);
        }
      }

      // Buat user baru dengan kode referral unik dan data pengundang (jika ada)
      const newUserReferralCode = generateReferralCode();
      const { data: newUser, error: createError } = await supabase
        .from('User')
        .insert([{ 
            telegramId, 
            username, 
            referralCode: newUserReferralCode, 
            referredBy: referredById 
        }])
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

// ... (Endpoint /api/set-role, /api/check-in, /api/reward-ad tetap sama persis)
// ... JANGAN HAPUS DARI FILE ANDA

// --- Menjalankan Server untuk Development Lokal ---
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server lokal berjalan di http://localhost:${port}`);
});

export default app;

