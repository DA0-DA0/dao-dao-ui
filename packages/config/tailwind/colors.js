const colors = [
  /* Constants */
  'color-vanta',
  'color-black',
  'color-dark',
  'color-light',
  'color-white',
  'color-brand',
  'color-active',
  'color-error',
  'color-valid',
  'color-warning',

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
  'text-interactive-warning-title',
  'text-interactive-warning-body',
  'text-button-primary',
  'text-button-disabled',
  'text-component-primary',
  'text-component-secondary',

  /* Icon */
  'icon-primary',
  'icon-secondary',
  'icon-tertiary',
  'icon-brand',
  'icon-interactive-disabled',
  'icon-interactive-active',
  'icon-interactive-error',
  'icon-interactive-valid',
  'icon-interactive-warning',
  'icon-button-primary',
  'icon-button-disabled',
  'icon-component-secondary',

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
  'border-component-primary',

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
  'background-interactive-valid',
  'background-interactive-warning',
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
  'component-pill',
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
)

module.exports = {
  colors,
}
