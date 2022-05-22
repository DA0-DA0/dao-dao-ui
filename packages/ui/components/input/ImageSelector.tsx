import { PlusIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useState } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

import { Airplane } from '@dao-dao/icons'

import { Button } from '../Button'
import { Modal } from '../Modal'
import { InputErrorMessage } from './InputErrorMessage'
import { InputLabel } from './InputLabel'
import { TextInput } from './TextInput'

export type ImageSelectorModalProps<
  FieldName extends Path<FieldValues>,
  FieldValues
> = {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  imageUrl: string
  onClose: () => void
}

export function ImageSelectorModal<
  FieldValues,
  FieldName extends Path<FieldValues>
>(props: ImageSelectorModalProps<FieldName, FieldValues>) {
  const { label, register, error, validation, imageUrl, onClose } = props

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

export type ImageSelectorProps<
  FieldName extends Path<FieldValues>,
  FieldValues
> = {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  imageUrl: string
  className?: string
}

export function ImageSelector<FieldValues, FieldName extends Path<FieldValues>>(
  props: ImageSelectorProps<FieldName, FieldValues>
) {
  const { label, register, error, validation, imageUrl, className } = props

  const [showImageSelect, setShowImageSelect] = useState(false)
  return (
    <>
      <button
        className={clsx(
          'flex justify-center items-center mx-auto w-24 h-24 bg-center bg-cover',
          'rounded-full border border-inactive',
          'hover:ring transition',
          { 'ring ring-error': error },
          className
        )}
        onClick={() => setShowImageSelect(true)}
        style={{ backgroundImage: `url(${imageUrl})` }}
        type="button"
      >
        <PlusIcon className="w-4" />
      </button>

      {showImageSelect && (
        <ImageSelectorModal
          error={error}
          imageUrl={imageUrl}
          label={label}
          onClose={() => setShowImageSelect(false)}
          register={register}
          validation={validation}
        />
      )}
    </>
  )
}
