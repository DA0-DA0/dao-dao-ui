let config = require('@dao-dao/ui/tailwind.config')

module.exports = {
  ...config,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
}
