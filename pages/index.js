import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { error } = router.query;
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new URLSearchParams();
    formData.append('username', form.username.value);
    formData.append('password', form.password.value);
    formData.append('remember', remember ? '1' : '0');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (res.redirected) {
      window.location.href = res.url;
    } else {
      setLoading(false);
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

      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <label className="remember">
          <input
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember Me
        </label>

        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="spinner">
              <span className="dot one"></span>
              <span className="dot two"></span>
              <span className="dot three"></span>
            </span>
          ) : (
            'Login'
          )}
        </button>
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
        input[type='text'],
        input[type='password'] {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          background-color: #2e2e2e;
          border: none;
          border-radius: 5px;
          color: #fff;
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #ff0040;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          font-family: 'Courier New', monospace;
          font-size: 1rem;
        }
        button:hover {
          background-color: #e60038;
        }
        button:disabled {
          background-color: #444;
          cursor: not-allowed;
        }
        .footer {
          margin-top: 20px;
          font-size: 0.8rem;
          opacity: 0.6;
        }
        .remember {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          font-size: 0.85rem;
          color: #aaa;
        }
        .remember input {
          margin-right: 8px;
        }
        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .dot {
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
          margin: 0 3px;
          animation: blink 1.4s infinite both;
        }
        .dot.one {
          animation-delay: -0.32s;
        }
        .dot.two {
          animation-delay: -0.16s;
        }
        @keyframes blink {
          0%, 80%, 100% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
