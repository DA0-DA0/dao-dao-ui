import clsx from 'clsx'

export interface CornerGradientProps {
  color: string
  gradientShape?: string
  className?: string
}

/*
 * A corner gradient for cards. COLOR is a CSS color string. For best results
 * your color should likely have an opacity of about 10%.
 *
 * This component expects that its parent has position relative.
 */
export const CornerGradient = ({
  color,
  gradientShape = '86.22% 102.08% at 0% 114.93%',
  className,
}: CornerGradientProps) => (
  <div
    className={clsx(
      'pointer-events-none absolute top-0 left-0 h-full w-full -scale-y-100 rounded-lg',
      className
    )}
    style={{
      backgroundImage: `radial-gradient(${gradientShape}, ${color} 0%, #00000000 100%)`,
    }}
  ></div>
)
