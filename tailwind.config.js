/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // we’ll rely mostly on Tailwind defaults, but add short aliases
        brand: {
          black: "#000000",
          red: "#ef4444",     // red-500
          green: "#22c55e",   // green-500
          yellow: "#facc15",  // yellow-400 (cleaner on black)
        },
      },
      container: { center: true, padding: "1rem" },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: { soft: "0 10px 30px -10px rgba(0,0,0,0.5)" },
    },
  },
  plugins: [],
};
