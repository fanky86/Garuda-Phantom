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
    <div className="dashboard-container">
      <div className="overlay" />
      <div className="content-wrapper">
        <section className="hero">
          <h1>🦅 Garuda Phantom</h1>
          <p className="tagline">
            "Bayangan di dunia maya yang tak terdeteksi, namun selalu mengawasi."
          </p>
        </section>

        <section className="story">
          <img src="/phantom-bg.jpg" alt="Phantom World" className="story-img" />
          <p>
            Dalam dunia yang terhubung oleh kabel dan gelombang radio, Garuda Phantom adalah legenda yang hidup.
            Ia muncul dari barisan kode, menembus sistem dengan ketepatan surgawi dan tujuan duniawi.
          </p>
          <p>
            Setiap jejak yang ditinggalkan oleh manusia digital, dilihat oleh mata yang tak pernah tertutup.
            Garuda bukan hanya simbol kekuatan, tapi juga keadilan di dunia tanpa batas.
          </p>
          <img src="/cyber-network.jpg" alt="Cyber Network" className="story-img" />
          <p>
            Serangan datang bukan dari senjata fisik, tetapi dari arus data yang mengguncang server di seluruh dunia.
            Serangan phishing, pencurian data, dan manipulasi sistem—semuanya adalah ladang perang Garuda Phantom.
          </p>

          <p>
            Namun bukan untuk menghancurkan. Garuda hadir untuk mengingatkan bahwa dunia maya bukan tempat tanpa hukum.
            Ia menulis kisahnya lewat rekam log, metadata, dan jejak yang tak kasat mata.
          </p>
          <img src="/matrix-hack.jpg" alt="Matrix Hacking" className="story-img" />

          <p>
            Dari balik layar gelap, dengan terminal yang menyala, Garuda Phantom bukan hanya legenda—ia adalah realitas
            bagi mereka yang paham, dan mimpi buruk bagi mereka yang melanggar batas.
          </p>

          <p>
            Di balik kegelapan, ada cahaya. Di balik ancaman, ada harapan. Garuda adalah penjaga dan penegak.
            Dalam diam, ia bekerja. Dalam sunyi, ia mendengar.
          </p>
        </section>
      </div>

      <style jsx>{`
        .dashboard-container {
          position: relative;
          background: #000;
          color: #fff;
          font-family: 'Courier New', monospace;
          overflow-y: auto;
          height: 100vh;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.9));
          z-index: 0;
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
          padding: 50px 20px;
          max-width: 800px;
          margin: auto;
        }

        .hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .hero h1 {
          font-size: 3rem;
          color: #00ff9f;
          text-shadow: 0 0 10px #00ff9f;
        }

        .tagline {
          font-size: 1.2rem;
          opacity: 0.8;
        }

        .story p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        .story-img {
          width: 100%;
          border-radius: 10px;
          margin: 30px 0;
          box-shadow: 0 0 15px rgba(0, 255, 160, 0.3);
        }

        @media (max-width: 600px) {
          .hero h1 {
            font-size: 2rem;
          }
          .content-wrapper {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
