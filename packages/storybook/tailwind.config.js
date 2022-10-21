/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: [
    '../{common,stateless,proposal-module-adapter,voting-module-adapter}/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('@dao-dao/config/tailwind/config')],
}

module.exports = tailwindConfig
