import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Cari user dengan username "admin"
      const q = query(collection(db, 'users'), where('username', '==', username));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // Username tidak ditemukan
        res.writeHead(302, { Location: '/?error=1' });
        return res.end();
      }

      const user = snapshot.docs[0].data();

      if (user.role !== 'admin') {
        // Bukan admin
        res.writeHead(302, { Location: '/?error=2' });
        return res.end();
      }

      if (user.password !== password) {
        // Password salah
        res.writeHead(302, { Location: '/?error=3' });
        return res.end();
      }

      // Jika valid & role admin → set cookie dan redirect
      res.setHeader('Set-Cookie', serialize('session', '1', {
        path: '/',
        httpOnly: true,
        maxAge: 3600
      }));

      res.writeHead(302, { Location: '/dashboard' });
      res.end();

    } catch (err) {
      console.error('Login error:', err);
      res.status(500).send('Internal Server Error');
    }

  } else {
    res.status(405).send('Method Not Allowed');
  }
}
