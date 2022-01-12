import { Logo } from 'components/Logo'

function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin inline-block">
        <Logo height={64} width={64} />
      </div>
    </div>
  )
}

export default LoadingScreen
