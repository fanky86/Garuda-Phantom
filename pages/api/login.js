export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    res.setHeader('Set-Cookie', `session=1; Path=/; HttpOnly`);
    res.writeHead(302, { Location: '/dashboard' });
    res.end();
  } else {
    res.status(405).send('Method Not Allowed');
  }
}