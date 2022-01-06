import toast from 'react-hot-toast'

export const successNotify = (message: string) => {
  const toastMessage = message || 'Success!'
  toast.success(toastMessage)
}

export const errorNotify = (message: string) => {
  const toastMessage = message || 'An error occurred'
  toast.error(toastMessage)
}

export const successOptions = {
  style: {
    border: 'none',
    padding: '16px',
    color: '#06090B',
    background: '#CFF1EE',
  },
  iconTheme: {
    primary: '#53D0C9',
    secondary: '#CFF1EE',
  },
}

export const errorOptions = {
  style: {
    border: 'none',
    padding: '16px',
    color: '#06090B',
    background: '#FBCCD6',
  },
  iconTheme: {
    primary: '#ED5276',
    secondary: '#FBCCD6',
  },
}
