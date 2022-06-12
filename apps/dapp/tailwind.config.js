/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: [
    './{components,pages,services}/**/*.{js,jsx,ts,tsx}',
    '../../packages/{ui,state,actions,common}/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('@dao-dao/ui/tailwind/config')],
}

module.exports = tailwindConfig
