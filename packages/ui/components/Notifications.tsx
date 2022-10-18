import { Toaster } from 'react-hot-toast'

import { ErrorToast, LoadingToast, SuccessToast } from './toasts'

export const Notifications = () => (
  <Toaster
    position="bottom-right"
    // Looks better when positoned against the bottom of the screen. This makes
    // new toasts stack on top of existing toasts, like cards.
    reverseOrder
    toastOptions={{
      duration: 6000,
      // Show for entire duration of promise.
      loading: {
        duration: Infinity,
      },
      style: {
        borderRadius: '0',
        background: 'none',
        color: '#fff',
        boxShadow: 'none',
      },
    }}
  >
    {(t) =>
      t.type === 'error' ? (
        <ErrorToast toast={t} />
      ) : t.type === 'loading' ? (
        <LoadingToast toast={t} />
      ) : (
        <SuccessToast toast={t} />
      )
    }
  </Toaster>
)
