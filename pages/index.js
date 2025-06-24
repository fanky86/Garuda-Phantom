import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { error } = router.query;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append('username', form.username);
    formData.append('password', form.password);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    if (res.redirected) {
      window.location.href = res.url;
    } else {
      setLoading(false); // stop loading if error but not redirected
    }
  };

  return (
    <div className="container">
      <h1>Garuda Phantom</h1>

      {error && (
        <p className="error-message">
          {error === '1' && '❌ Username tidak ditemukan'}
          {error === '2' && '❌ Anda bukan admin'}
          {error === '3' && '❌ Password salah'}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <input type="submit" value={loading ? 'Loading...' : 'Login'} disabled={loading} />
      </form>

      <div className="footer">⚡ Operated by fanky | ID: Phantom-01</div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Courier New', monospace;
        }
        .container {
          background: linear-gradient(to bottom, #0f0f0f, #1a1a1a);
          color: #e0e0e0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #ff0040;
          text-shadow: 0 0 5px #ff0040, 0 0 15px #ff0040;
        }
        .error-message {
          background-color: #2e0000;
          color: #ff4a4a;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
          font-size: 0.85rem;
        }
        form {
          background-color: #1c1c1c;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(255, 0, 64, 0.2);
          width: 300px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }
        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          background-color: #2e2e2e;
          border: none;
          border-radius: 5px;
          color: #fff;
        }
        input[type="submit"] {
          width: 100%;
          padding: 10px;
          background-color: #ff0040;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        input[type="submit"]:hover {
          background-color: #e60038;
        }
        input[type="submit"]:disabled {
          background-color: #444;
          cursor: not-allowed;
        }
        .footer {
          margin-top: 20px;
          font-size: 0.8rem;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
