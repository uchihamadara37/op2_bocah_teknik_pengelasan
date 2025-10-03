import React from 'react';

// 1. Definisikan tipe untuk props
interface WaveSeparatorProps {
  waveColor?: 'lime' | 'blue'; // Prop 'waveColor' opsional
}

// 2. Tipekan komponen sebagai React.FC (Functional Component)
const WaveSeparator: React.FC<WaveSeparatorProps> = ({ waveColor = "lime" }) => {
  const mainWaveColor = waveColor === "lime" ? "#84cc16" : "#2563eb"; // lime-500
  const secondaryWaveColor = waveColor === "lime" ? "#65a30d" : "#1d4ed8"; // lime-600
  const tertiaryWaveColor = waveColor === "lime" ? "#84cc16" : "#1e40af"; // lime-700

  const css = `
    .parallax > use {
      /* Mengaktifkan animasi 'move-forever' */
      animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
    }
    .parallax > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 9s;
    }
    .parallax > use:nth-child(2) {
      animation-delay: -4s;
      animation-duration: 9s;
    }
    .parallax > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }
    .parallax > use:nth-child(4) {
      animation-delay: -4s;
      animation-duration: 17s;
    }
    .parallax > use:nth-child(5) {
      animation-delay: -6s;
      animation-duration: 15s;
    }
    
    /* Keyframes untuk animasi gelombang bergerak */
    @keyframes move-forever {
      0% {
        transform: translate3d(-90px,0,0);
      }
      100% { 
        transform: translate3d(85px,0,0);
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      {/* Gunakan SVG untuk membuat gelombang */}
      {/* Sesuaikan warna gelombang berdasarkan prop 'waveColor' */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        className="waves relative w-full h-[15vh] -mb-1"
        shapeRendering={"auto"}
      >
        <defs>
          <path
            id='gentle-wave'
            d="M-160 44c30 0 58-20 88-20s 58 20 88 20 58-20 88-20 58 20 88 20 58-20 88-20 58 20 88 20 58-20 88-20 58 20 88 20 v48h-352z"
          />
        </defs>
        <g className='parallax'>
          <use
            xlinkHref='#gentle-wave'
            x='48'
            y='0'
            fill={"rgba(154,230,0,0.4)"}
          />
          <use
            xlinkHref='#gentle-wave'
            x='48'
            y='1'
            fill={"rgba(154,230,0,0.5)"}
          />
          <use
            xlinkHref='#gentle-wave'
            x='48'
            y='3'
            fill={"rgba(154,230,0,0.3)"}
          />
          <use
            xlinkHref='#gentle-wave'
            x='48'
            y='5'
            fill={"rgba(154,230,0,0.7)"}
          />
          <use
            xlinkHref='#gentle-wave'
            x='48'
            y='8'
            fill={"rgba(154,230,0,1)"}
          />
        </g>

        {/* <defs>
        <linearGradient id="limeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: mainWaveColor, stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: secondaryWaveColor, stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="darkLimeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: secondaryWaveColor, stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: tertiaryWaveColor, stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      <path
        fill={`url(#limeGradient)`}
        d="M0,192L80,197.3C160,203,320,213,480,218.7C640,224,800,224,960,218.7C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
      <path
        fill={`url(#darkLimeGradient)`}
        d="M0,128L80,144C160,160,320,192,480,186.7C640,181,800,128,960,122.7C1120,117,1280,160,1360,181.3L1440,203L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
      <path
        fill={tertiaryWaveColor}
        d="M0,96L80,106.7C160,117,320,139,480,138.7C640,139,800,117,960,117.3C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path> */}
      </svg>
    </>
  );
};

export default WaveSeparator;