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
    <div className="flex flex-row items-start gap-6">
      <p className="mt-4 text-[42px]">{image}</p>

      <div className="flex grow flex-col">
        <p className="primary-text">{title}</p>
        <p className="secondary-text mt-1">{description}</p>

        <div
          className={clsx(
            'mt-4 flex flex-row items-stretch gap-2 self-end',
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
      'relative flex flex-col items-stretch rounded-lg bg-disabled p-6',
      className
    )}
    {...rest}
  >
    {accentColor && <CornerGradient color={accentColor} />}

    {children}
  </div>
)
