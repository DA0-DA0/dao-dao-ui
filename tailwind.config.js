module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  options: {
    safelist: [/data-theme$/],
  },
  darkMode: 'media',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-t':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(ellipse, var(--tw-gradient-stops))',
        'gradient-radial-t-wide':
          'radial-gradient(80% 40% at top, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 10s cubic-bezier(.6,1.15,.89,.81) infinite',
        'spin-medium': 'spin 3s cubic-bezier(.6,1.15,.89,.81) infinite',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
  daisyui: {
    themes: [require('./styles/daisyui-themes.json')],
  },
}
