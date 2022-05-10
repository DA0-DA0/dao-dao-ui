import { Logo } from './Logo'

export const Loader = ({ size = 42 }: { size?: number }) => (
  <div className="flex justify-center items-center p-4 w-full h-full">
    <div className="animate-spin">
      <Logo height={size} width={size} />
    </div>
  </div>
)
