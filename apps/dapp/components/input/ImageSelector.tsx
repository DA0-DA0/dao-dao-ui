import { useState } from 'react'

import { PlusIcon, XIcon } from '@heroicons/react/outline'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'
import { Button } from 'ui'

import SvgAirplane from '@components/icons/Airplane'
import { Modal } from '@components/Modal'

import { InputErrorMessage } from './InputErrorMessage'
import { InputLabel } from './InputLabel'
import { TextInput } from './TextInput'

export function ImageSelectorModal<
  FieldValues,
  FieldName extends Path<FieldValues>
>({
  label,
  register,
  error,
  validation,
  imageUrl,
  onClose,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  imageUrl: string
  onClose: () => void
}) {
  return (
    <Modal>
      <div className="flex relative flex-col gap-3 items-center p-6 max-w-md h-min bg-white rounded-lg border border-focus">
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
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="flex flex-col gap-1">
          <InputLabel mono name="Image URL" />
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

export function ImageSelector<
  FieldValues,
  FieldName extends Path<FieldValues>
>({
  label,
  register,
  error,
  validation,
  imageUrl,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  imageUrl: string
}) {
  const [showImageSelect, setShowImageSelect] = useState(false)
  return (
    <>
      <button
        className={`w-24 h-24 rounded-full border mt-12 mx-auto border-inactive flex items-center justify-center hover:ring transition bg-center bg-cover ${
          error ? 'ring ring-error' : ''
        }`}
        onClick={() => setShowImageSelect(true)}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        type="button"
      >
        <PlusIcon className="w-4" />
      </button>
      <div className={`${showImageSelect ? '' : 'hidden'}`}>
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
