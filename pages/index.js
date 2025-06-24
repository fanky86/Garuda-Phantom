export default function LoginPage() {
  return (
    <div className="container">
      <h1>Garuda Phantom</h1>
      <form action="/api/login" method="post">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <input type="submit" value="Login" />
      </form>
      <div className="footer">⚡ Operated by Shadow | ID: Phantom-01</div>
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
        .footer {
          margin-top: 20px;
          font-size: 0.8rem;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
