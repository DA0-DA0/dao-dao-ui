const icons = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="flex-shrink-0 w-6 h-6 mx-2 stroke-current flex-shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      ></path>
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 mx-2 stroke-current flex-shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      ></path>
    </svg>
  ),
}

function LineAlert({
  variant,
  msg,
  className = '',
}: {
  variant: 'success' | 'error'
  msg: string
  className?: string
}) {
  const alertClassName = [
    'alert',
    variant === 'success' ? 'alert-success' : 'alert-error',
    className,
  ].join(' ')
  return (
    <div className={alertClassName}>
      <div className="flex-1 items-center">
        {icons[variant]}
        <label className="flex-grow break-all text-center">{msg}</label>
      </div>
    </div>
  )
}

export default LineAlert
