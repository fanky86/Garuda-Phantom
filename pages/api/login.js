import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const adminCache = new Map(); // username => password
let lastCacheTime = 0;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  let body = '';
  await new Promise((resolve) => {
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', resolve);
  });

  const params = new URLSearchParams(body);
  const username = params.get('username');
  const password = params.get('password');
  const remember = params.get('remember') === '1';

  try {
    // Refresh cache jika sudah lebih dari 5 menit
    const now = Date.now();
    if (now - lastCacheTime > 5 * 60 * 1000) {
      adminCache.clear();
      const snapshot = await getDocs(collection(db, 'admins'));
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.username && data.password) {
          adminCache.set(data.username, data.password);
        }
      });
      lastCacheTime = now;
    }

    // Cek login dari cache
    if (!adminCache.has(username)) {
      res.writeHead(302, { Location: '/?error=1' }); // ❌ Username tidak ditemukan
      res.end();
      return;
    }

    if (adminCache.get(username) !== password) {
      res.writeHead(302, { Location: '/?error=3' }); // ❌ Password salah
      res.end();
      return;
    }

    // ✅ Login berhasil
    res.setHeader(
      'Set-Cookie',
      remember
        ? `session=1; Path=/; HttpOnly; Max-Age=604800` // 7 hari
        : `session=1; Path=/; HttpOnly`
    );
    res.writeHead(302, { Location: '/dashboard' });
    res.end();

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Internal Server Error');
  }
}
