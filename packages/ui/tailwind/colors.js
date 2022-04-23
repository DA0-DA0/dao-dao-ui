const generateColorClass = (variable, opacity) =>
  `rgba(var(--${variable}), ${opacity})`

const colors = {
  black: generateColorClass('black', 1),
  dark: generateColorClass('dark', 1),
  light: generateColorClass('light', 1),
  white: generateColorClass('white', 1),
  error: generateColorClass('error', 1),
  valid: generateColorClass('valid', 1),
  brand: generateColorClass('brand', 0.9),
  juno: 'rgba(251, 156, 134, 1)',

  btn: generateColorClass('dark', 0.95),
  'btn-secondary': generateColorClass('dark', 0.1),
  'btn-hover': generateColorClass('black', 1),
  'btn-pressed': generateColorClass('dark', 0.85),
  'btn-disabled': generateColorClass('dark', 0.3),

  'btn-secondary-hover': generateColorClass('dark', 0.15),
  'btn-secondary-pressed': generateColorClass('dark', 0.05),
  'btn-active': generateColorClass('active', 0.1),
}

const textColor = {
  primary: generateColorClass('black', 1),
  body: generateColorClass('dark', 0.95),
  secondary: generateColorClass('dark', 0.8),
  tertiary: generateColorClass('dark', 0.6),
  disabled: generateColorClass('dark', 0.4),
  accent: generateColorClass('accent', 1),
}

const backgroundColor = {
  base: generateColorClass('white', 1),
  disabled: generateColorClass('dark', 0.03),
  primary: generateColorClass('dark', 0.05),
  secondary: generateColorClass('dark', 0.2),
  tertiary: generateColorClass('dark', 0.3),
  toast: generateColorClass('dark', 0.85),
  card: generateColorClass('dark', 0.08),
  'dark-accent': generateColorClass('dark-accent', 1),
  'very-light': generateColorClass('very-light', 1),
}

const borderColor = {
  inactive: generateColorClass('dark', 0.05),
  default: generateColorClass('dark', 0.15),
  focus: generateColorClass('dark', 0.25),
  selected: generateColorClass('dark', 0.25),
  error: generateColorClass('error', 0.6),
}

module.exports = {
  generateColorClass,
  colors,
  textColor,
  backgroundColor,
  borderColor,
}
