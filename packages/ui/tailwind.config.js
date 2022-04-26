/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: ['./components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('./tailwind/config')],
}

module.exports = tailwindConfig
