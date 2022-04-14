const generateColorClass = (variable, opacity) => `rgba(var(--${variable}), ${opacity})`

const colors = {
    black: generateColorClass("black", 1),
    dark: generateColorClass("dark", 1),
    light: generateColorClass("light", 1),
    white: generateColorClass("white", 1),
    error: generateColorClass("error", 1),
    valid: generateColorClass("valid", 1),
    brand: generateColorClass("brand", 0.9),
    juno: 'rgba(251, 156, 134, 1)',

    btn: generateColorClass("dark", 0.95),
    'btn-secondary': generateColorClass('dark', 0.1),
    'btn-hover': generateColorClass("black", 1),
    'btn-pressed': generateColorClass("dark", 0.85),
    'btn-disabled': generateColorClass("dark", 0.3),

    'btn-secondary-hover': generateColorClass("dark", 0.15),
    'btn-secondary-pressed': generateColorClass("dark", 0.05),
    'btn-active': generateColorClass("active", 0.1),
}

const textColor = {
    primary: generateColorClass("black", 1),
    body: generateColorClass("dark", 0.95),
    secondary: generateColorClass("dark", 0.8),
    tertiary: generateColorClass("dark", 0.6),
    disabled: generateColorClass("dark", 0.4)
}

const backgroundColor = {
    base: generateColorClass("white", 1),
    disabled: generateColorClass("dark", 0.03),
    primary: generateColorClass("dark", 0.05),
    secondary: generateColorClass("dark", 0.2),
    tertiary: generateColorClass("dark", 0.3),
    toast: generateColorClass("dark", 0.85),
    card: generateColorClass("dark", 0.08),
}

const borderColor = {
    inactive: generateColorClass("dark", 0.05),
    default: generateColorClass("dark", 0.15),
    focus: generateColorClass("dark", 0.25),
    selected: generateColorClass("dark", 0.25),
    error: generateColorClass("error", 0.6),
}

module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  options: {
    safelist: [/data-theme$/],
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
	sans: 'inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'JetBrains Mono, monospace, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    extend: {
      boxShadow: {
        slider: '0 0 0 5px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial-t':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(ellipse, var(--tw-gradient-stops))',
        'gradient-radial-t-wide':
          'radial-gradient(80% 50% at top, var(--tw-gradient-stops))',
        'gradient-test':
          'linear-gradient(270deg, #06090B 0%, rgba(6, 9, 11, 0) 49.62%, rgba(6, 9, 11, 0) 51.87%, #06090B 100%)',
      },
      animation: {
        'spin-slow': 'spin 10s cubic-bezier(.6,1.15,.89,.81) infinite',
        'spin-medium': 'spin 3s cubic-bezier(.6,1.15,.89,.81) infinite',
        // Dropdown menu
        'scale-in': 'scale-in 0.2s ease-in-out',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade':
          'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        // Navigation menu
        'enter-from-right': 'enter-from-right 0.25s ease',
        'enter-from-left': 'enter-from-left 0.25s ease',
        'exit-to-right': 'exit-to-right 0.25s ease',
        'exit-to-left': 'exit-to-left 0.25s ease',
        'scale-in-content': 'scale-in-content 0.2s ease',
        'scale-out-content': 'scale-out-content 0.2s ease',
        'fade-in': 'fade-in 0.2s ease',
        'fade-out': 'fade-out 0.2s ease',
        // Toast
        'toast-hide': 'toast-hide 100ms ease-in forwards',
        'toast-slide-in-right':
          'toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-slide-in-bottom':
          'toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-swipe-out': 'toast-swipe-out 100ms ease-out forwards',
      },
      keyframes: {
        // Dropdown menu
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        // Navigation menu
        'enter-from-right': {
          '0%': { transform: 'translateX(200px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'enter-from-left': {
          '0%': { transform: 'translateX(-200px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'exit-to-right': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(200px)', opacity: 0 },
        },
        'exit-to-left': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-200px)', opacity: 0 },
        },
        'scale-in-content': {
          '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
          '100%': { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
        },
        'scale-out-content': {
          '0%': { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
          '100%': { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        // Toast
        'toast-hide': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'toast-slide-in-right': {
          '0%': { transform: `translateX(calc(100% + 1rem))` },
          '100%': { transform: 'translateX(0)' },
        },
        'toast-slide-in-bottom': {
          '0%': { transform: `translateY(calc(100% + 1rem))` },
          '100%': { transform: 'translateY(0)' },
        },
        'toast-swipe-out': {
          '0%': { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          '100%': {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
      },
      colors,
      textColor,
      backgroundColor,
      borderColor,
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('./tailwind/button'),
    require('@tailwindcss/typography'),
  ],
}
