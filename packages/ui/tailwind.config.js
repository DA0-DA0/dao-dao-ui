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
    'btn-hover': generateColorClass("black", 1),
    'btn-pressed': generateColorClass("dark", 0.85),
    'btn-disabled': generateColorClass("dark", 0.3),

    'btn-secondary-hover': generateColorClass("dark", 0.15),
    'btn-secondary-pressed': generateColorClass("dark", 0.05),
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
      backgroundImage: {
        'gradient-radial-t':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(ellipse, var(--tw-gradient-stops))',
        'gradient-radial-t-wide':
          'radial-gradient(80% 50% at top, var(--tw-gradient-stops))',
	  'gradient-test': 'linear-gradient(270deg, #06090B 0%, rgba(6, 9, 11, 0) 49.62%, rgba(6, 9, 11, 0) 51.87%, #06090B 100%)',
      },
      animation: {
        'spin-slow': 'spin 10s cubic-bezier(.6,1.15,.89,.81) infinite',
        'spin-medium': 'spin 3s cubic-bezier(.6,1.15,.89,.81) infinite',
      },
      colors,
      textColor,
      backgroundColor,
      borderColor
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('./tailwind/button'),
    require('@tailwindcss/typography'),
  ],
}
