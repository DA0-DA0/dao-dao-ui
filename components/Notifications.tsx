import { Toaster } from 'react-hot-toast'
import { successOptions, errorOptions } from 'util/toast'

const Notifications = () => (
  <Toaster
    toastOptions={{
      // https://github.com/timolins/react-hot-toast/issues/110
      style: {
        wordBreak: 'break-all',
      },
      success: successOptions,
      error: errorOptions,
    }}
  />
)

export default Notifications
