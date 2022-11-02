/** @type {import("tailwindcss/plugin").TailwindPluginCreator} */
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.sm': {
      '@apply px-2 py-1 text-xs leading-4 rounded': {},
    },
    '.md': {
      '@apply py-1.5': {},
    },
    '.lg': {
      '@apply py-2.5': {},
    },
    '.xl': {
      '@apply px-6 py-5 text-lg leading-5': {},
    },
    '.md, .lg': {
      fontSize: 13,
      '@apply px-4 leading-5 rounded-md': {},
    },
    '.light': {
      '&.primary': {
        background: 'rgba(25, 29, 32, 0.95)',
        color: 'rgba(255, 255, 255)',
        '.btn-icon': {
          color: 'rgba(255, 255, 255)',
        },
        '&:hover': {
          background: 'rgba(25, 29, 32)',
        },
        '&:active': {
          background: 'rgba(25, 29, 32, 0.85)',
        },
        '&:focus': {
          outline: '2px solid rgba(25, 29, 32, 0.3)',
        },
        '&:disabled': {
          background: 'rgba(25, 29, 32, 0.3)',
          color: 'rgba(243, 246, 248, 0.95)',
        },
      },
      '&.secondary': {
        background: 'rgba(25, 29, 32, 0.1)',
        color: 'rgba(6, 9, 11)',
        '&:hover': {
          background: 'rgba(25, 29, 32, 0.15)',
        },
        '&:active': {
          background: 'rgba(25, 29, 32, 0.05)',
        },
        '&:focus': {
          outline: '2px solid rgba(25, 29, 32, 0.3)',
        },
        '&:disabled': {
          background: 'rgba(25, 29, 32, 0.05)',
          color: 'rgba(25, 29, 32, 0.3)',
        },
      },
      '&.ghost': {
        background: 'rgba(255, 255, 255)',
        color: 'rgba(25, 29, 32, 0.75)',
        '&:hover': {
          background: 'rgba(25, 29, 32, 0.1)',
        },
        '&:active': {
          background: 'rgba(25, 29, 32, 0.05)',
        },
        '&:focus': {
          outline: '2px solid rgba(25, 29, 32, 0.3)',
        },
        '&:disabled': {
          color: 'rgba(25, 29, 32, 0.3)',
        },
      },
    },
    '.dark': {
      '&.primary': {
        background: 'rgba(243, 246, 248, 0.95)',
        color: 'rgba(6, 9, 11)',
        '.btn-icon': {
          color: 'rgba(6, 9, 11)',
        },
        '&:hover': {
          background: 'rgba(255, 255, 255)',
        },
        '&:active': {
          background: 'rgba(243, 246, 248, 0.85)',
        },
        '&:focus': {
          outline: '2px solid rgba(243, 246, 248, 0.3)',
        },
        '&:disabled': {
          background: 'rgba(243, 246, 248, 0.3)',
          color: 'rgba(25, 29, 32, 0.95)',
        },
      },
      '&.secondary': {
        background: 'rgba(243, 246, 248, 0.1)',
        color: 'rgba(255, 255, 255)',
        '&:hover': {
          background: 'rgba(243, 246, 248, 0.15)',
        },
        '&:active': {
          background: 'rgba(243, 246, 248, 0.05)',
        },
        '&:focus': {
          outline: '2px solid rgba(243, 246, 248, 0.3)',
        },
        '&:disabled': {
          background: 'rgba(243, 246, 248, 0.05)',
          color: 'rgba(243, 246, 248, 0.3)',
        },
      },
      '&.ghost': {
        background: 'rgba(6, 9, 11)',
        color: 'rgba(243, 246, 248, 0.75)',
        '&:hover': {
          background: 'rgba(243, 246, 248, 0.1)',
        },
        '&:active': {
          background: 'rgba(243, 246, 248, 0.05)',
        },
        '&:focus': {
          outline: '2px solid rgba(243, 246, 248, 0.3)',
        },
        '&:disabled': {
          color: 'rgba(243, 246, 248, 0.3)',
        },
      },
    },
    '.light, .dark': {
      '&.btn': {
        '@apply block h-full min-h-full font-medium normal-case border-none':
          {},
      },
    },
  })
})
