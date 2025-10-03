module.exports = {
  // Beri tahu Tailwind file mana saja yang perlu dipindai
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // Di sinilah tempat yang benar untuk menambahkan plugin Tailwind
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};