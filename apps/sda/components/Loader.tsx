import { Logo } from '@/components'

export const Loader = ({ size = 42 }: { size?: number }) => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="animate-spin">
      <Logo height={size} width={size} />
    </div>
  </div>
)
