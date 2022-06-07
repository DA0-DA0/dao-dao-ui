import clsx from 'clsx'
import { ComponentProps, ReactNode, FC } from 'react'
import { FieldError } from 'react-hook-form'

import { InputErrorMessage } from '@dao-dao/ui'
import { CornerGradient } from './CornerGradient'

interface CreateOrgConfigCardProps extends ComponentProps<'div'> {
  image: ReactNode
  title: string
  description: string
  error?: FieldError
  accentColor?: string
}

export const CreateOrgConfigCard: FC<CreateOrgConfigCardProps> = ({
  image,
  title,
  description,
  children,
  error,
  ...props
}) => (
  <CreateOrgConfigCardWrapper {...props}>
    <div className="flex flex-row gap-6 items-start">
      <p className="mt-4 text-[42px]">{image}</p>

      <div>
        <p className="primary-text">{title}</p>
        <p className="mt-1 secondary-text">{description}</p>
      </div>
    </div>

    <div className="flex flex-row gap-2 items-stretch self-end mt-4">
      {children}
    </div>
    <InputErrorMessage className="self-end" error={error} />
  </CreateOrgConfigCardWrapper>
)

export const CreateOrgConfigCardWrapper: FC<
  ComponentProps<'div'> & { accentColor?: string }
> = ({ children, className, accentColor, ...rest }) => (
  <div
    className={clsx(
      'flex flex-col items-stretch p-6 bg-disabled rounded-lg relative',
      className
    )}
    {...rest}
  >
    {accentColor && <CornerGradient color={accentColor} />}

    {children}
  </div>
)
