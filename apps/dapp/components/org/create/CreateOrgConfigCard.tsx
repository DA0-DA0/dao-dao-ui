import clsx from 'clsx'
import { ComponentProps, ReactNode, FC } from 'react'

interface CreateOrgConfigCardProps extends ComponentProps<'div'> {
  image: ReactNode
  title: string
  description: string
}

export const CreateOrgConfigCard: FC<CreateOrgConfigCardProps> = ({
  image,
  title,
  description,
  children,
  className,
  ...props
}) => (
  <div
    className={clsx(
      'flex flex-col items-stretch p-6 bg-disabled rounded-lg',
      className
    )}
    {...props}
  >
    <div className="flex flex-row gap-6 items-start">
      <p className="mt-4 text-[42px]">{image}</p>

      <div>
        <p className="primary-text">{title}</p>
        <p className="mt-1 secondary-text">{description}</p>
      </div>
    </div>

    <div className="flex flex-row gap-2 items-center self-end mt-4">
      {children}
    </div>
  </div>
)
