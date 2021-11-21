import { Toaster } from 'react-hot-toast'
import { successOptions, errorOptions } from 'util/toast'

const Notifications = () => (
  <Toaster
    toastOptions={{
      success: successOptions,
      error: errorOptions,
    }}
  />
)

export default Notifications
