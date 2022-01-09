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
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [require('./styles/daisyui-themes.json')],
  },
}
