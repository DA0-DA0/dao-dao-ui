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
import { validateUrl } from 'util/formValidation'

import { InputErrorMessage } from './InputErrorMessage'
import { InputLabel } from './InputLabel'
import { TextInput } from './TextInput'

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
        type="button"
        className={`w-24 h-24 rounded-full border mt-12 mx-auto border-inactive flex items-center justify-center hover:ring transition bg-center bg-cover ${
          error ? 'ring ring-error' : ''
        }`}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        onClick={() => setShowImageSelect(true)}
      >
        <PlusIcon className="w-4" />
      </button>
      <div className={`${showImageSelect ? '' : 'hidden'}`}>
        <Modal>
          <div className="bg-white h-min max-w-md p-6 rounded-lg border border-focus relative flex flex-col items-center gap-3">
            <button
              className="hover:bg-secondary transition rounded-full p-1 absolute right-2 top-2"
              type="button"
              onClick={() => setShowImageSelect(false)}
            >
              <XIcon className="h-4 w-4" />
            </button>
            <div
              className="rounded-full bg-center bg-cover w-[95px] h-[95px] border border-inactive"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
              role="img"
              aria-label="DAO's Custom Logo"
            ></div>
            <div className="flex flex-col gap-1">
              <InputLabel name="Image URL" mono />
              <TextInput
                label={label}
                register={register}
                error={error}
                validation={validation}
              />
              <InputErrorMessage error={error} />
            </div>
            <div className="text-right w-full">
              <Button
                type="button"
                size="sm"
                onClick={() => setShowImageSelect(false)}
              >
                Done <SvgAirplane color="currentColor" />
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
