// /pages/api/login.js
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const adminCache = new Map(); // username => password
let cacheLoaded = false;

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

  try {
    if (!cacheLoaded) {
      const snapshot = await getDocs(collection(db, 'admins'));
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.username && data.password) {
          adminCache.set(data.username, data.password);
        }
      });
      cacheLoaded = true;
    }

    if (!adminCache.has(username)) {
      res.writeHead(302, { Location: '/?error=1' });
      res.end();
      return;
    }

    if (adminCache.get(username) !== password) {
      res.writeHead(302, { Location: '/?error=3' });
      res.end();
      return;
    }

    res.setHeader('Set-Cookie', `session=1; Path=/; HttpOnly`);
    res.writeHead(302, { Location: '/dashboard' });
    res.end();

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Internal Server Error');
  }
}
