/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: [
    '../{ui,proposal-module-adapter,voting-module-adapter}/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('./tailwind/config')],
}

module.exports = tailwindConfig
