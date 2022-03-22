import { useState } from 'react'

import { PlusIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'
import { Button, Modal } from '@dao-dao/ui'

import SvgAirplane from '@components/icons/Airplane'
import { daoCreateTooltipsGetter } from '@components/TooltipsDisplay/daoCreate'

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
    <Modal>
      <div
        className={clsx(
          'flex relative flex-col gap-3 items-center p-6 max-w-md h-min bg-white',
          'rounded-lg border border-focus'
        )}
      >
        <button
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
          onClick={onClose}
          type="button"
        >
          <XIcon className="w-4 h-4" />
        </button>
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
            tooltip={daoCreateTooltipsGetter(label).content}
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
            Done <SvgAirplane color="currentColor" />
          </Button>
        </div>
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
}

export function ImageSelector<FieldValues, FieldName extends Path<FieldValues>>(
  props: ImageSelectorProps<FieldName, FieldValues>
) {
  const { label, register, error, validation, imageUrl } = props

  const [showImageSelect, setShowImageSelect] = useState(false)
  return (
    <>
      <button
        className={clsx(
          'flex justify-center items-center mx-auto mt-12 w-24 h-24 bg-center bg-cover',
          'rounded-full border border-inactive',
          'hover:ring transition',
          { 'ring ring-error': error }
        )}
        onClick={() => setShowImageSelect(true)}
        style={{ backgroundImage: `url(${imageUrl})` }}
        type="button"
      >
        <PlusIcon className="w-4" />
      </button>
      <div className={clsx({ hidden: !showImageSelect })}>
        <ImageSelectorModal
          error={error}
          imageUrl={imageUrl}
          label={label}
          onClose={() => setShowImageSelect(false)}
          register={register}
          validation={validation}
        />
      </div>
    </>
  )
}
