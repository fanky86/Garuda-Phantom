import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
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

    try {
      const q = query(
        collection(db, 'admins'),
        where('username', '==', username),
        where('password', '==', password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // ❌ Username atau password salah
        res.writeHead(302, { Location: '/?error=3' });
        res.end();
        return;
      }

      // ✅ Login berhasil
      res.setHeader('Set-Cookie', `session=1; Path=/; HttpOnly`);
      res.writeHead(302, { Location: '/dashboard' });
      res.end();
    } catch (err) {
      console.error('Firebase login error:', err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
