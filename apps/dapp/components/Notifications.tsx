import { successOptions, errorOptions } from 'util/toast'

import { Toaster } from 'react-hot-toast'

const Notifications = () => (
  <Toaster
    toastOptions={{
      // https://github.com/timolins/react-hot-toast/issues/110
      style: {
        wordBreak: 'break-all',
      },
      success: successOptions,
      error: errorOptions,
      duration: 5000,
    }}
  />
)

export default Notifications
