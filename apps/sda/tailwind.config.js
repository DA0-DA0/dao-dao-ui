/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: [
    './{components,pages,services,templates}/**/*.{js,jsx,ts,tsx}',
    '../../packages/{ui,state}/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('@dao-dao/ui/tailwind/config')],
  theme: {
    extend: {
      maxWidth: {
        // From Figma
        page: '1118px',
      },
    },
  },
}

module.exports = tailwindConfig
