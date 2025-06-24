import { parse } from 'cookie';

export async function getServerSideProps(context) {
  const cookies = parse(context.req.headers.cookie || '');
  if (cookies.session !== '1') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function Dashboard() {
  return (
    <div style={{
      background: 'linear-gradient(to bottom, #000000, #111111)',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Courier New, monospace'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#00ff9f',
        textShadow: '0 0 10px #00ff9f'
      }}>
        🔥 Selamat Datang di Garuda Phantom 🔥
      </h1>
      <p style={{ marginTop: 20, fontSize: '1rem', opacity: 0.8 }}>
        Sistem dalam mode pengawasan penuh.
      </p>
    </div>
  );
}