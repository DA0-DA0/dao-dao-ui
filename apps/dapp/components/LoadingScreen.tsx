import { Logo } from 'components/Logo'

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="inline-block animate-spin">
        <Logo height={64} width={64} />
      </div>
    </div>
  )
}

export default LoadingScreen
