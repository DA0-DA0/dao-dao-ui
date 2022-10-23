const animation = {
  // Imported from globals.css
  rumble: 'rumble 0.2325s infinite linear',
  'rumble-fast': 'rumble 0.1625s infinite linear',
  'rumble-faster': 'rumble 0.1025s infinite linear',
  'rumble-fastest': 'rumble 0.0625s infinite linear',
  // Spinner
  'spin-slow': `spin 10s cubic-bezier(.6,1.15,.89,.81) infinite`,
  'spin-medium': `spin 3s cubic-bezier(.6,1.15,.89,.81) infinite`,
  // Dropdown menu
  'scale-in': `scale-in 0.2s ease-in-out`,
  'slide-down': `slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
  'slide-up': `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
  // Tooltip
  'slide-up-fade': `slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
  'slide-right-fade': `slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
  'slide-down-fade': `slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
  'slide-left-fade': `slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
  // Navigation menu
  'enter-from-right': `enter-from-right 0.25s ease`,
  'enter-from-left': `enter-from-left 0.25s ease`,
  'exit-to-right': `exit-to-right 0.25s ease`,
  'exit-to-left': `exit-to-left 0.25s ease`,
  'scale-in-content': `scale-in-content 0.2s ease`,
  'scale-out-content': `scale-out-content 0.2s ease`,
  'fade-in': `fade-in 0.2s ease`,
  'fade-out': `fade-out 0.2s ease`,
  // Toast
  'toast-hide': `toast-hide 100ms ease-in forwards`,
  'toast-slide-in-right': `toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  'toast-slide-in-bottom': `toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  'toast-swipe-out': `toast-swipe-out 100ms ease-out forwards`,
}

module.exports = { animation }
