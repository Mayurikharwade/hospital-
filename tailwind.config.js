/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // YE SABSE ZAROORI HAI - Ye Tailwind ko purana CSS kharab karne se rokega
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}