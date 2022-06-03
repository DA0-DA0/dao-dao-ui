/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: ['*.{js,jsx,ts,tsx}'],
  content: [
    './{components,templates}/**/*.{js,jsx,ts,tsx}',
    '../{ui,state}/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('@dao-dao/ui/tailwind/config')],
}

module.exports = tailwindConfig
