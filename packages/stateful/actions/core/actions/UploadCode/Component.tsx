import { fromBase64, toBase64, toHex } from '@cosmjs/encoding'
import { Add, Close, DownloadDone } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyToClipboard,
  FileDropInput,
  IconButton,
  InputLabel,
  RadioInput,
  RadioInputOption,
  useChain,
} from '@dao-dao/stateless'
import { AddressInputProps, TransProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { AccessType } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/types'
import {
  gzipCompress,
  gzipDecompress,
  makeValidateAddress,
  processError,
  validateRequired,
} from '@dao-dao/utils'

export type UploadCodeData = {
  chainId: string
  // Set when file is chosen.
  data?: string
  // Whether or not data is gzipped.
  gzipped?: boolean
  accessType: AccessType
  // Only used when accessType === AccessType.AnyOfAddresses
  allowedAddresses: {
    address: string
  }[]
}

export type UploadCodeOptions = {
  Trans: ComponentType<TransProps>
  AddressInput: ComponentType<AddressInputProps<UploadCodeData>>
}

export const UploadCodeComponent: ActionComponent<UploadCodeOptions> = ({
  isCreating,
  fieldNamePrefix,
  options: { Trans, AddressInput },
  errors,
}) => {
  const { t } = useTranslation()
  const { setValue, watch, control, register } =
    useFormContext<UploadCodeData>()

  const { bech32Prefix } = useChain()

  const accessType = watch((fieldNamePrefix + 'accessType') as 'accessType')
  const {
    fields: allowedAddressesFields,
    append: appendAllowedAddress,
    remove: removeAllowedAddress,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'allowedAddresses') as 'allowedAddresses',
  })

  const data = watch((fieldNamePrefix + 'data') as 'data')
  const gzipped = watch((fieldNamePrefix + 'gzipped') as 'gzipped')
  const [fileName, setFileName] = useState<string | undefined>()
  const [sha256Checksum, setSha256Checksum] = useState<string | undefined>()
  const updateSha256Checksum = useCallback(
    async (
      _data: string | undefined = data,
      _gzipped: boolean | undefined = gzipped
    ) => {
      if (!_data) {
        return
      }

      let rawData = fromBase64(_data)

      // Decompress gzip data if needed.
      if (_gzipped) {
        rawData = await gzipDecompress(rawData)
      }

      const sha256Hash = await crypto.subtle.digest('SHA-256', rawData)
      setSha256Checksum(toHex(new Uint8Array(sha256Hash)))
    },
    [data, gzipped]
  )
  // When data is set, if no hash, compute sha256 hash.
  useEffect(() => {
    if (!sha256Checksum) {
      updateSha256Checksum()
    }
  }, [data, sha256Checksum, updateSha256Checksum])

  const onSelect = async (file: File) => {
    if (!file.name.endsWith('.wasm') && !file.name.endsWith('.wasm.gz')) {
      toast.error(t('error.invalidWasmFile'))
      return
    }
    if (!file.size) {
      toast.error(t('error.emptyFile'))
      return
    }

    try {
      setFileName(file.name)

      const data = await file.arrayBuffer()
      if (!data.byteLength) {
        throw new Error(t('error.emptyFile'))
      }

      const fileData = new Uint8Array(data)
      const alreadyGzipped = file.name.endsWith('.wasm.gz')

      const rawData = alreadyGzipped ? await gzipDecompress(fileData) : fileData

      // Update sha256 hash with raw data.
      await updateSha256Checksum(toBase64(rawData), false)

      // Gzip compress data if not already gzipped.
      const gzippedData = alreadyGzipped
        ? fileData
        : await gzipCompress(rawData)

      setValue((fieldNamePrefix + 'gzipped') as 'gzipped', true)
      setValue((fieldNamePrefix + 'data') as 'data', toBase64(gzippedData))
    } catch (err) {
      console.error(err)
      toast.error(processError(err, { forceCapture: false }))
    }
  }

  return (
    <>
      {!!data && (
        <>
          {!!fileName && (
            <div className="flex flex-col items-start gap-1">
              <InputLabel name={t('form.fileName')} />
              <CopyToClipboard className="font-mono" takeAll value={fileName} />
            </div>
          )}

          <div className="mb-1 flex flex-col items-start gap-1">
            <InputLabel name={t('form.sha256Checksum')} />

            {sha256Checksum ? (
              <CopyToClipboard
                className="font-mono max-w-full"
                takeN={18}
                value={sha256Checksum}
              />
            ) : (
              // If no sha256 checksum yet, it should be loading.
              <CopyToClipboard
                className="animate-pulse"
                noCopy
                takeAll
                value="Computing..."
              />
            )}
          </div>
        </>
      )}

      {isCreating && (
        <FileDropInput
          Icon={data ? DownloadDone : undefined}
          Trans={Trans}
          className={clsx(!!data && 'opacity-60')}
          dragHereOrSelect={data ? t('form.uploadNewFileQuestion') : undefined}
          onSelect={onSelect}
        />
      )}

      <div className="flex flex-col gap-4 rounded-md bg-background-tertiary p-4">
        <InputLabel name={t('form.whoCanUseContract')} />

        <RadioInput
          disabled={!isCreating}
          fieldName={(fieldNamePrefix + 'accessType') as 'accessType'}
          options={(
            [
              {
                label: t('info.anyone'),
                value: AccessType.Everybody,
              },
              {
                label: t('form.noOne'),
                value: AccessType.Nobody,
              },
              {
                label: t('form.oneOrMoreAccounts'),
                value: AccessType.AnyOfAddresses,
              },
            ] as RadioInputOption<AccessType>[]
          )
            // Only show the selected option once created.
            .filter(({ value }) => isCreating || value === accessType)}
          setValue={setValue}
          watch={watch}
        />

        {accessType === AccessType.AnyOfAddresses && (
          <div className={clsx('flex flex-col', isCreating && 'gap-2')}>
            {allowedAddressesFields.map(({ id }, index) => (
              <div key={id} className="flex flex-row items-center gap-2">
                <AddressInput
                  containerClassName="grow"
                  disabled={!isCreating}
                  error={errors?.allowedAddresses?.[index]?.address}
                  fieldName={
                    (fieldNamePrefix +
                      `allowedAddresses.${index}.address`) as `allowedAddresses.${number}.address`
                  }
                  register={register}
                  validation={[
                    validateRequired,
                    makeValidateAddress(bech32Prefix),
                  ]}
                />

                {isCreating && (
                  <IconButton
                    Icon={Close}
                    onClick={() => removeAllowedAddress(index)}
                    size="sm"
                    variant="ghost"
                  />
                )}
              </div>
            ))}

            {isCreating && (
              <Button
                className="self-end"
                onClick={() =>
                  appendAllowedAddress({
                    address: '',
                  })
                }
                variant="secondary"
              >
                <Add className="!h-4 !w-4" />
                {t('button.add')}
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
