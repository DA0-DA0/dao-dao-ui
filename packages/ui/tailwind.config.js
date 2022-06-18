/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: ['./**/*.{js,jsx,ts,tsx}'],
  presets: [require('./tailwind/config')],
}

module.exports = tailwindConfig
