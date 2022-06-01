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
  label: StringFieldName
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
  label,
  register,
  error,
  validation,
  watch,
  onClose,
}: ImageSelectorModalProps<FieldValues, StringFieldName>) => {
  const imageUrl = watch(label) ?? ''

  return (
    <Modal
      containerClassName="flex flex-col gap-3 items-center"
      onClose={onClose}
    >
      <div
        aria-label="DAO's Custom Logo"
        className="w-[95px] h-[95px] bg-center bg-cover rounded-full border border-inactive"
        role="img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="flex flex-col gap-1">
        <InputLabel
          mono
          name="Image URL"
          tooltip="A link to the image that you would like to use to represent your governance contract. For example, https://moonphase.is/image.svg"
        />
        <TextInput
          autoFocus
          error={error}
          label={label}
          register={register}
          validation={validation}
        />
        <InputErrorMessage error={error} />
      </div>
      <div className="w-full text-right">
        <Button onClick={onClose} size="sm" type="button">
          Done <Airplane color="currentColor" />
        </Button>
      </div>
    </Modal>
  )
}

export interface ImageSelectorProps<
  FieldValues,
  StringFieldName extends StringFieldNames<FieldValues>
> {
  label: StringFieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, StringFieldName>>[]
  watch: UseFormWatch<FieldValues>
  error?: FieldError
  className?: string
  size?: string | number
}

export const ImageSelector = <
  FieldValues,
  StringFieldName extends StringFieldNames<FieldValues>
>({
  label,
  register,
  error,
  validation,
  watch,
  className,
  size,
}: ImageSelectorProps<FieldValues, StringFieldName>) => {
  const [showImageSelect, setShowImageSelect] = useState(false)
  const imageUrl = watch(label) ?? ''

  return (
    <>
      <button
        className={clsx(
          'flex shrink-0 justify-center items-center mx-auto bg-center bg-cover rounded-full border border-inactive hover:ring transition',
          {
            'ring ring-error': error,
            'w-24 h-24': size === undefined,
          },
          className
        )}
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
          label={label}
          onClose={() => setShowImageSelect(false)}
          register={register}
          validation={validation}
          watch={watch}
        />
      )}
    </>
  )
}
