import { Toaster } from 'react-hot-toast'

import { ErrorToast, SuccessToast } from '@dao-dao/ui'

export const Notifications = () => (
  <Toaster
    position="top-center"
    reverseOrder={false}
    toastOptions={{
      duration: 6000,
      style: {
        borderRadius: '0',
        background: 'none',
        color: '#fff',
        boxShadow: 'none',
      },
    }}
  >
    {(t) =>
      t.type === 'error' ? <ErrorToast toast={t} /> : <SuccessToast toast={t} />
    }
  </Toaster>
)
