import { PlusIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useState } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  PathValue,
  UseFormRegister,
  UseFormWatch,
  Validate,
} from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import { Airplane } from '@dao-dao/icons'

import { Button } from '../Button'
import { Modal } from '../Modal'
import { InputErrorMessage } from './InputErrorMessage'
import { InputLabel } from './InputLabel'
import { TextInput } from './TextInput'

// Return the field name paths that have type string.
export type StringFieldNames<FieldValues> = {
  [Property in Path<FieldValues>]: PathValue<FieldValues, Property> extends
    | string
    | undefined
    ? Property
    : never
}[Path<FieldValues>]

export interface ImageSelectorModalProps<
  FieldValues,
  StringFieldName extends StringFieldNames<FieldValues>
> {
  fieldName: StringFieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, StringFieldName>>[]
  watch: UseFormWatch<FieldValues>
  error?: FieldError
  onClose: () => void
}

export const ImageSelectorModal = <
  FieldValues,
  StringFieldName extends StringFieldNames<FieldValues>
>({
  fieldName,
  register,
  error,
  validation,
  watch,
  onClose,
}: ImageSelectorModalProps<FieldValues, StringFieldName>) => {
  const { t } = useTranslation()
  const imageUrl = watch(fieldName) ?? ''

  return (
    <Modal
      containerClassName="flex flex-col gap-3 items-center"
      onClose={onClose}
    >
      <div
        aria-label={t('daosLogo')}
        className="w-[95px] h-[95px] bg-center bg-cover rounded-full border border-inactive"
        role="img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="flex flex-col gap-1">
        <InputLabel
          mono
          name={t('Image URL')}
          tooltip={t('Image URL tooltip')}
        />
        <TextInput
          autoFocus
          error={error}
          fieldName={fieldName}
          onKeyDown={(e) => {
            // Prevent submitting form on enter.
            if (e.key === 'Enter') {
              e.preventDefault()
              onClose()
            }
          }}
          register={register}
          validation={validation}
        />
        <InputErrorMessage error={error} />
      </div>
      <div className="w-full text-right">
        <Button onClick={onClose} size="sm" type="button">
          {t('done')} <Airplane color="currentColor" />
        </Button>
      </div>
    </Modal>
  )
}

export interface ImageSelectorProps<
  FieldValues,
  StringFieldName extends StringFieldNames<FieldValues>
> {
  fieldName: StringFieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, StringFieldName>>[]
  watch: UseFormWatch<FieldValues>
  disabled?: boolean
  error?: FieldError
  className?: string
  size?: string | number
  center?: boolean
}

export const ImageSelector = <
  FieldValues,
  StringFieldName extends StringFieldNames<FieldValues>
>({
  fieldName,
  register,
  error,
  validation,
  watch,
  className,
  disabled,
  size,
  center = true,
}: ImageSelectorProps<FieldValues, StringFieldName>) => {
  const [showImageSelect, setShowImageSelect] = useState(false)
  const imageUrl = watch(fieldName) ?? ''

  return (
    <>
      <button
        className={clsx(
          'flex shrink-0 bg-center bg-cover rounded-full border border-inactive transition',
          {
            'hover:ring': !disabled,
            'justify-center items-center mx-auto': center,
            'ring ring-error': error,
            'w-24 h-24': size === undefined,
          },
          className
        )}
        disabled={disabled}
        onClick={() => setShowImageSelect(true)}
        style={{
          backgroundImage: `url(${imageUrl})`,
          ...(size !== undefined && { width: size, height: size }),
        }}
        type="button"
      >
        {!imageUrl && <PlusIcon className="w-4" />}
      </button>

      {showImageSelect && (
        <ImageSelectorModal
          error={error}
          fieldName={fieldName}
          onClose={() => setShowImageSelect(false)}
          register={register}
          validation={validation}
          watch={watch}
        />
      )}
    </>
  )
}
