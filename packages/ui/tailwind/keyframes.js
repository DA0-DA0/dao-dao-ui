const keyframes = {
  // Imported from globals.css
  rumble: {
    '0%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'translate(2px, 0px) rotate(-3deg)' },
    '50%': { transform: 'translate(0px, -2px) rotate(0deg)' },
    '75%': { transform: 'translate(-2px, 0px) rotate(3deg)' },
    '100%': { transform: 'translate(0px, 2px) rotate(0deg)' },
  },
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
}

module.exports = { keyframes }
