import { Add, Check } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Validate,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { TransProps } from '@dao-dao/types'
import {
  processError,
  toAccessibleImageUrl,
  validateUrlWithIpfs,
} from '@dao-dao/utils'

import { Button } from '../buttons/Button'
import { Modal } from '../modals/Modal'
import { ImageUploadInput } from './ImageUploadInput'
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
  FV extends FieldValues,
  StringFieldName extends StringFieldNames<FV>
> {
  fieldName: StringFieldName
  register: UseFormRegister<FV>
  watch: UseFormWatch<FV>
  setValue: UseFormSetValue<FV>
  error?: FieldError
  onClose: () => void
  Trans: ComponentType<TransProps>
}

export const ImageSelectorModal = <
  FV extends FieldValues,
  StringFieldName extends StringFieldNames<FV>
>({
  fieldName,
  register,
  error,
  setValue,
  watch,
  onClose,
  Trans,
}: ImageSelectorModalProps<FV, StringFieldName>) => {
  const { t } = useTranslation()
  const imageUrl = watch(fieldName) ?? ''

  const [uploadError, setUploadError] = useState<string>()

  return (
    <Modal
      contentContainerClassName="gap-3 items-center"
      onClose={onClose}
      visible
    >
      <div
        aria-label={t('info.daosLogo')}
        className="h-[95px] w-[95px] rounded-full border border-border-secondary bg-cover bg-center"
        role="img"
        style={
          imageUrl
            ? {
                backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})`,
              }
            : {}
        }
      />
      <div className="flex flex-col gap-1 self-stretch">
        <InputLabel
          mono
          name={t('form.enterImageUrl')}
          tooltip={t('form.imageURLTooltip')}
        />
        <TextInput
          // Auto focus does not work on mobile Safari by design
          // (https://bugs.webkit.org/show_bug.cgi?id=195884#c4).
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
          validation={[validateUrlWithIpfs]}
        />
        <InputErrorMessage error={error} />
      </div>

      <div className="flex flex-col gap-2 self-stretch">
        <InputLabel mono name={t('form.orUploadOne')} />
        <ImageUploadInput
          Trans={Trans}
          className="aspect-square max-w-[14rem]"
          onChange={(url) => {
            setUploadError(undefined)
            setValue(fieldName, url as any)
          }}
          onError={(error) =>
            setUploadError(processError(error, { forceCapture: false }))
          }
        />
        <InputErrorMessage error={uploadError} />
      </div>

      <Button className="self-end" onClick={onClose} size="sm" type="button">
        {t('button.done')} <Check className="!h-4 !w-4" />
      </Button>
    </Modal>
  )
}

export interface ImageSelectorProps<
  FV extends FieldValues,
  StringFieldName extends StringFieldNames<FV>
> {
  fieldName: StringFieldName
  register: UseFormRegister<FV>
  validation?: Validate<FieldPathValue<FV, StringFieldName>>[]
  watch: UseFormWatch<FV>
  setValue: UseFormSetValue<FV>
  Trans: ComponentType<TransProps>
  disabled?: boolean
  error?: FieldError
  className?: string
  size?: string | number
}

export const ImageSelector = <
  FV extends FieldValues,
  StringFieldName extends StringFieldNames<FV>
>({
  fieldName,
  error,
  watch,
  className,
  disabled,
  size,
  ...props
}: ImageSelectorProps<FV, StringFieldName>) => {
  const [showImageSelect, setShowImageSelect] = useState(false)
  const imageUrl = watch(fieldName) ?? ''

  return (
    <>
      <button
        className={clsx(
          'flex shrink-0 items-center justify-center rounded-full border border-border-secondary bg-background-secondary bg-cover bg-center transition',
          {
            'hover:ring': !disabled,
            'ring ring-border-interactive-error': error,
            'h-24 w-24': size === undefined,
          },
          className
        )}
        disabled={disabled}
        onClick={() => setShowImageSelect(true)}
        style={{
          backgroundImage: imageUrl
            ? `url(${toAccessibleImageUrl(imageUrl)})`
            : undefined,
          ...(size !== undefined && { width: size, height: size }),
        }}
        type="button"
      >
        {(typeof imageUrl !== 'string' || !imageUrl?.trim()) && (
          <Add className="h-6 w-6 text-icon-primary" />
        )}
      </button>

      {showImageSelect && (
        <ImageSelectorModal
          error={error}
          fieldName={fieldName}
          onClose={() => setShowImageSelect(false)}
          watch={watch}
          {...props}
        />
      )}
    </>
  )
}
