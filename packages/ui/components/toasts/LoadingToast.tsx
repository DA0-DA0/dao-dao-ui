import { Toast } from 'react-hot-toast'

import { Loader } from '../Loader'
import { Logo } from '../Logo'
import { ToastCard } from './ToastCard'

export interface LoadingToastProps {
  toast: Toast
}

export const LoadingToast = (props: LoadingToastProps) => (
  <ToastCard
    containerClassName="text-light text-sm bg-dark"
    preMessage={
      <Loader
        Logo={(props) => <Logo {...props} invert />}
        fill={false}
        // Height equal to text height (text-sm, 1.25rem, 20px)
        size={20}
      />
    }
    {...props}
  />
)
