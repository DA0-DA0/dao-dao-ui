/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: [
    './**/*.{js,jsx,ts,tsx}',
    '../{proposal,voting}-module-adapter/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('./tailwind/config')],
}

module.exports = tailwindConfig
