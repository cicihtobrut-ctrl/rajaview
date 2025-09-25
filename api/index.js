import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const generateReferralCode = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// --- API ENDPOINTS ---

app.get('/api', (req, res) => {
  res.send('✅ Backend API aktif dan berjalan!');
});

app.post('/api/auth', async (req, res) => {
  const { telegramId, username, refCode } = req.body;
  if (!telegramId) {
    return res.status(400).json({ error: 'telegramId dibutuhkan' });
  }

  try {
    let { data: user } = await supabase.from('User').select('*').eq('telegramId', telegramId).single();

    if (user) {
      // --- PERBAIKAN UNTUK PENGGUNA LAMA ---
      // Jika pengguna sudah ada tapi belum punya kode referral, buatkan satu.
      if (!user.referralCode) {
        const newReferralCode = generateReferralCode();
        const { data: updatedUser, error: updateError } = await supabase
          .from('User')
          .update({ referralCode: newReferralCode })
          .eq('telegramId', telegramId)
          .select()
          .single();
        
        if (updateError) throw updateError;
        user = updatedUser; // Gunakan data user yang sudah terupdate
      }
      // --- AKHIR PERBAIKAN ---
    } else {
      // Logika untuk pengguna baru (tetap sama)
      let referredById = null;
      if (refCode) {
        const { data: referrer } = await supabase.from('User').select('userId, balance').eq('referralCode', refCode).single();
        if (referrer) {
          referredById = referrer.userId;
          const REFERRAL_BONUS = 500;
          const newReferrerBalance = parseFloat(referrer.balance) + REFERRAL_BONUS;
          await supabase.from('User').update({ balance: newReferrerBalance }).eq('userId', referrer.userId);
        }
      }
      const newUserReferralCode = generateReferralCode();
      const { data: newUser, error: createError } = await supabase
        .from('User')
        .insert([{ telegramId, username, referralCode: newUserReferralCode, referredBy: referredById }])
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

// ... (Endpoint lainnya: /api/set-role, /api/check-in, /api/reward-ad TETAP SAMA)
// ... JANGAN HAPUS DARI FILE ANDA

// --- Menjalankan Server ---
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server lokal berjalan di http://localhost:${port}`);
});

export default app;

