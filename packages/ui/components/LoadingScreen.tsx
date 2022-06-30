import { Logo } from './Logo'

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="inline-block animate-spin">
        <Logo height={64} width={64} />
      </div>
    </div>
  )
}
