import clsx from 'clsx'
import { ComponentProps, FC, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

import { InputErrorMessage } from '@dao-dao/ui'

import { CornerGradient } from './CornerGradient'

interface CreateDAOConfigCardProps extends ComponentProps<'div'> {
  image: ReactNode
  title: string
  description: string
  error?: FieldError
  accentColor?: string
  childContainerClassName?: string
}

export const CreateDAOConfigCard: FC<CreateDAOConfigCardProps> = ({
  image,
  title,
  description,
  children,
  error,
  childContainerClassName,
  ...props
}) => (
  <CreateDAOConfigCardWrapper {...props}>
    <div className="flex flex-row gap-6 items-start">
      <p className="mt-4 text-[42px]">{image}</p>

      <div className="flex flex-col">
        <p className="primary-text">{title}</p>
        <p className="mt-1 secondary-text">{description}</p>

        <div
          className={clsx(
            'flex flex-row gap-2 items-stretch self-end mt-4',
            childContainerClassName
          )}
        >
          {children}
        </div>

        <InputErrorMessage className="self-end" error={error} />
      </div>
    </div>
  </CreateDAOConfigCardWrapper>
)

export const CreateDAOConfigCardWrapper: FC<
  ComponentProps<'div'> & { accentColor?: string }
> = ({ children, className, accentColor, ...rest }) => (
  <div
    className={clsx(
      'flex relative flex-col items-stretch p-6 bg-disabled rounded-lg',
      className
    )}
    {...rest}
  >
    {accentColor && <CornerGradient color={accentColor} />}

    {children}
  </div>
)
