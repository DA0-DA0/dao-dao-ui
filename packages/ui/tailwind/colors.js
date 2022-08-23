// TODO: REMOVE OLD COLOR SYSTEM BEFORE MERGE
const generateColorClass = (variable, opacity) =>
  `rgba(var(--${variable}), ${opacity})`

const colors = {
  // TODO: REMOVE OLD COLOR SYSTEM BEFORE MERGE
  black: generateColorClass('black', 1),
  dark: generateColorClass('dark', 1),
  light: generateColorClass('light', 1),
  white: generateColorClass('white', 1),
  error: generateColorClass('error', 1),
  valid: generateColorClass('valid', 1),
  brand: generateColorClass('brand', 0.9),
  juno: 'rgba(251, 156, 134, 1)',

  btn: generateColorClass('dark', 0.95),
  'btn-secondary': generateColorClass('dark', 0.08),
  'btn-hover': generateColorClass('black', 1),
  'btn-pressed': generateColorClass('dark', 0.85),
  'btn-disabled': generateColorClass('dark', 0.3),

  'btn-secondary-hover': generateColorClass('dark', 0.12),
  'btn-secondary-pressed': generateColorClass('dark', 0.05),
  'btn-secondary-disabled': generateColorClass('dark', 0.03),

  'btn-ghost-hover': generateColorClass('dark', 0.05),
  'btn-active': generateColorClass('active', 0.1),

  // NEW V2 COLOR SYSTEM
  ...[
    'color-vanta',
    'color-black',
    'color-dark',
    'color-light',
    'color-white',
    'color-brand',
    'color-active',
    'color-error',
    'color-valid',

    /* Text */
    'text-primary',
    'text-body',
    'text-secondary',
    'text-tertiary',
    'text-brand',
    'text-interactive-disabled',
    'text-interactive-active',
    'text-interactive-error',
    'text-interactive-valid',
    'text-button-primary',
    'text-button-disabled',

    /* Icon */
    'icon-primary',
    'icon-secondary',
    'icon-tertiary',
    'icon-brand',
    'icon-interactive-disabled',
    'icon-interactive-active',
    'icon-interactive-error',
    'icon-interactive-valid',
    'icon-button-primary',
    'icon-button-disabled',

    /* Border */
    'border-base',
    'border-primary',
    'border-secondary',
    'border-interactive-hover',
    'border-interactive-selected',
    'border-interactive-focus',
    'border-interactive-disabled',
    'border-interactive-active',
    'border-interactive-error',

    /* Background */
    'background-primary',
    'background-secondary',
    'background-tertiary',
    'background-button',
    'background-base',
    'background-overlay',
    'background-interactive-hover',
    'background-interactive-selected',
    'background-interactive-pressed',
    'background-interactive-disabled',
    'background-interactive-active',
    'background-interactive-error',
    'background-button-hover',
    'background-button-pressed',
    'background-button-progress',
    'background-button-disabled',
    'background-button-active',
    /* Extra */
    'background-button-secondary-default',
    'background-button-secondary-hover',
    'background-button-secondary-pressed',
    'background-button-secondary-disabled',

    /* Component */
    'component-modal',
    'component-dropdown',
    'component-tooltip',
    'component-toast',
    'component-widget',
    'component-badge-primary',
    'component-badge-brand',
    'component-badge-valid',
    'component-badge-error',
  ].reduce(
    (acc, name) => ({
      ...acc,
      [name]: `var(--${name})`,
    }),
    {}
  ),
}

// TODO: REMOVE OLD COLOR SYSTEM BEFORE MERGE
const textColor = {
  primary: generateColorClass('black', 1),
  body: generateColorClass('dark', 0.95),
  secondary: generateColorClass('dark', 0.8),
  tertiary: generateColorClass('dark', 0.6),
  disabled: generateColorClass('dark', 0.4),
  accent: generateColorClass('accent', 1),
}

// TODO: REMOVE OLD COLOR SYSTEM BEFORE MERGE
const backgroundColor = {
  base: generateColorClass('white', 1),
  disabled: generateColorClass('dark', 0.03),
  primary: generateColorClass('dark', 0.05),
  secondary: generateColorClass('dark', 0.2),
  tertiary: generateColorClass('dark', 0.3),
  toast: generateColorClass('dark', 0.85),
  card: generateColorClass('dark', 0.08),
  'accent-transparent': generateColorClass('accent', 0.08),
  'very-light': generateColorClass('very-light', 1),
  tab: generateColorClass('light', 0.7),
  'tab-hover': generateColorClass('brand', 0.2),
  'brand-active': generateColorClass('brand-active', 0.15),
}

// TODO: REMOVE OLD COLOR SYSTEM BEFORE MERGE
const borderColor = {
  disabled: generateColorClass('dark', 0.03),
  inactive: generateColorClass('dark', 0.05),
  default: generateColorClass('dark', 0.15),
  focus: generateColorClass('dark', 0.25),
  selected: generateColorClass('dark', 0.25),
  error: generateColorClass('error', 0.6),
}

module.exports = {
  colors,
  textColor,
  backgroundColor,
  borderColor,
}
