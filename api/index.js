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
      if (!user.referralCode) {
        const newReferralCode = generateReferralCode();
        const { data: updatedUser, error: updateError } = await supabase.from('User').update({ referralCode: newReferralCode }).eq('telegramId', telegramId).select().single();
        if (updateError) throw updateError;
        user = updatedUser;
      }
    } else {
      let referredById = null;
      if (refCode) {
        const { data: referrer } = await supabase.from('User').select('userId, mainBalance').eq('referralCode', refCode).single();
        if (referrer) {
          referredById = referrer.userId;
          const REFERRAL_BONUS = 500;
          const newReferrerBalance = parseFloat(referrer.mainBalance) + REFERRAL_BONUS;
          await supabase.from('User').update({ mainBalance: newReferrerBalance }).eq('userId', referrer.userId);
        }
      }
      const newUserReferralCode = generateReferralCode();
      const { data: newUser, error: createError } = await supabase.from('User').insert([{ telegramId, username, referralCode: newUserReferralCode, referredBy: referredById }]).select().single();
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

app.post('/api/set-role', async (req, res) => {
  const { telegramId, role } = req.body;
  if (!telegramId || !role) {
    return res.status(400).json({ error: 'telegramId dan role dibutuhkan' });
  }
  if (role !== 'publisher' && role !== 'advertiser') {
    return res.status(400).json({ error: 'Peran tidak valid.' });
  }
  try {
    const { data: updatedUser, error } = await supabase.from('User').update({ role: role }).eq('telegramId', telegramId).select();
    if (error) throw error;
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan untuk diperbarui.' });
    }
    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error('Set role error:', error.message);
    res.status(500).json({ error: 'Gagal memperbarui peran pengguna.' });
  }
});

app.post('/api/check-in', async (req, res) => {
  const { telegramId } = req.body;
  if (!telegramId) {
    return res.status(400).json({ error: 'telegramId dibutuhkan' });
  }
  try {
    const { data: user, error: findError } = await supabase.from('User').select('userId, earningBalance, lastCheckIn').eq('telegramId', telegramId).single();
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
    const newBalance = parseFloat(user.earningBalance) + checkInReward;
    const { data: updatedUser, error: updateError } = await supabase.from('User').update({ earningBalance: newBalance, lastCheckIn: new Date().toISOString() }).eq('telegramId', telegramId).select().single();
    if (updateError) throw updateError;
    res.status(200).json({ message: `Check-in berhasil! Anda mendapatkan ${checkInReward} poin.`, user: updatedUser });
  } catch (error) {
    console.error('Check-in error:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan di server saat check-in.' });
  }
});

app.post('/api/reward-ad', async (req, res) => {
    const { telegramId } = req.body;
    if (!telegramId) {
        return res.status(400).json({ error: 'telegramId dibutuhkan' });
    }
    const AD_REWARD = 10;
    const DAILY_AD_LIMIT = 100;
    try {
        let { data: user, error: findError } = await supabase.from('User').select('userId, earningBalance, adsWatchedToday, lastAdWatchedAt').eq('telegramId', telegramId).single();
        if (findError) throw findError;
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let adsWatched = user.adsWatchedToday;
        if (user.lastAdWatchedAt) {
            const lastWatchDate = new Date(user.lastAdWatchedAt);
            if (lastWatchDate < today) {
                adsWatched = 0;
            }
        }
        if (adsWatched >= DAILY_AD_LIMIT) {
            return res.status(400).json({ message: 'Anda telah mencapai batas menonton iklan hari ini.' });
        }
        const newBalance = parseFloat(user.earningBalance) + AD_REWARD;
        const newAdsWatchedCount = adsWatched + 1;
        const { data: updatedUser, error: updateError } = await supabase.from('User').update({ earningBalance: newBalance, adsWatchedToday: newAdsWatchedCount, lastAdWatchedAt: new Date().toISOString() }).eq('telegramId', telegramId).select().single();
        if (updateError) throw updateError;
        res.status(200).json({ message: `Anda mendapatkan ${AD_REWARD} poin!`, user: updatedUser });
    } catch (error) {
        console.error('Ad reward error:', error.message);
        res.status(500).json({ error: 'Terjadi kesalahan di server.' });
    }
});

app.post('/api/convert/earning-to-main', async (req, res) => {
  const { telegramId, amount } = req.body;
  if (!telegramId || !amount) {
    return res.status(400).json({ error: 'telegramId dan amount dibutuhkan' });
  }
  const amountToConvert = parseFloat(amount);
  if (isNaN(amountToConvert) || amountToConvert <= 0) {
    return res.status(400).json({ error: 'Jumlah konversi tidak valid.' });
  }
  try {
    const { data: user, error: findError } = await supabase.from('User').select('userId, earningBalance, mainBalance').eq('telegramId', telegramId).single();
    if (findError || !user) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }
    if (parseFloat(user.earningBalance) < amountToConvert) {
      return res.status(400).json({ error: 'Poin Anda tidak mencukupi.' });
    }
    const newEarningBalance = parseFloat(user.earningBalance) - amountToConvert;
    const newMainBalance = parseFloat(user.mainBalance) + amountToConvert;
    const { data: updatedUser, error: updateError } = await supabase
      .from('User')
      .update({
        earningBalance: newEarningBalance,
        mainBalance: newMainBalance,
      })
      .eq('telegramId', telegramId)
      .select()
      .single();
    if (updateError) throw updateError;
    res.status(200).json({ message: `Berhasil mengkonversi ${amountToConvert} Poin ke Saldo Utama.`, user: updatedUser });
  } catch (error) {
    console.error('Conversion error:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan di server saat konversi.' });
  }
});

// Menjalankan Server untuk Development Lokal
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server lokal berjalan di http://localhost:${port}`);
});

export default app;

