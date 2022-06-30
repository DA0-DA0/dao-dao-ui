import { Logo } from './Logo'

export const Loader = ({ size = 42 }: { size?: number }) => (
  <div className="flex h-full w-full items-center justify-center p-4">
    <div className="animate-spin-medium">
      <Logo height={size} width={size} />
    </div>
  </div>
)
