/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: [
    '../{common,ui,proposal-module-adapter,voting-module-adapter}/**/*.{js,jsx,ts,tsx}',
    '../../apps/dapp/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('@dao-dao/ui/tailwind/config')],
}

module.exports = tailwindConfig
