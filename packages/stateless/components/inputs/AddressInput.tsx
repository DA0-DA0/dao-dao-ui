import { Code, Wallet } from '@mui/icons-material'
import clsx from 'clsx'
import { ChangeEventHandler, ComponentPropsWithoutRef, ReactNode } from 'react'
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormRegister,
  Validate,
  useFormContext,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ProfileDisplay } from '@dao-dao/stateful'

export interface AddressInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends Omit<ComponentPropsWithoutRef<'input'>, 'required'> {
  fieldName: FieldName
  register: UseFormRegister<FV>
  onChange?: ChangeEventHandler<HTMLInputElement>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  error?: FieldError | string
  disabled?: boolean
  required?: boolean
  containerClassName?: string
  iconType?: 'wallet' | 'contract'
  rightNode?: ReactNode
}

export const AddressInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  fieldName,
  register,
  error,
  validation,
  onChange,
  disabled,
  required,
  className,
  containerClassName,
  iconType = 'wallet',
  rightNode,
  ...rest
}: AddressInputProps<FV, FieldName>) => {
  const { t } = useTranslation()
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  const Icon = iconType === 'wallet' ? Wallet : Code

  // 🫡
  const { watch } = useFormContext()
  const self = watch(fieldName)

  if (!disabled) {
    return (
      <div
        className={clsx(
          'secondary-text flex items-center gap-2 rounded-md bg-transparent py-3 px-4 font-mono text-sm ring-1 transition focus-within:outline-none focus-within:ring-2',
          error
            ? 'ring-border-interactive-error'
            : 'ring-border-primary focus:ring-border-interactive-focus',
          containerClassName
        )}
      >
        <Icon className="!h-5 !w-5" />
        <input
          className={clsx(
            'ring-none body-text w-full border-none bg-transparent outline-none',
            className
          )}
          disabled={disabled}
          placeholder={t('form.address')}
          type="text"
          {...rest}
          {...register(fieldName, {
            required: required && 'Required',
            validate,
            onChange,
          })}
        />
        {rightNode}
      </div>
    )
  } else {
    return <ProfileDisplay address={self} />
  }
}
