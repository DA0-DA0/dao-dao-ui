import { Logo } from './Logo'

export const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="inline-block animate-spin-medium">
        <Logo height={64} width={64} />
      </div>
    </div>
  )
}
