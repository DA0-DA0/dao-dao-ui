import { Toaster } from 'react-hot-toast'

import { successOptions, errorOptions } from '@/util'

export const Notifications = () => (
  <Toaster
    toastOptions={{
      style: {
        wordBreak: 'break-word',
      },
      success: successOptions,
      error: errorOptions,
      duration: 5000,
    }}
  />
)
