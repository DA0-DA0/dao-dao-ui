// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: [
    './{components,pages,services}/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/actions/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/command/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/components/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/creation-extensions/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/creators/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/feed/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/hooks/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/modules/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/proposal-module-adapter/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateful/voting-module-adapter/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateless/components/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateless/hooks/**/*.{js,jsx,ts,tsx}',
    '../../packages/stateless/pages/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('@dao-dao/config/tailwind/config')],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.8)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        fadein: 'fadein 0.12s',
      },
    },
  },
}

module.exports = tailwindConfig
