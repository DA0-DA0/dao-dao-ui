import { fromBase64, toBase64, toHex } from '@cosmjs/encoding'
import { DownloadDone } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CopyToClipboard, FileDropInput, InputLabel } from '@dao-dao/stateless'
import { TransProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { processError } from '@dao-dao/utils'

export type UploadCodeData = {
  chainId: string
  // Set when file is chosen.
  data?: string
}

export type UploadCodeOptions = {
  Trans: ComponentType<TransProps>
}

export const UploadCodeComponent: ActionComponent<UploadCodeOptions> = ({
  isCreating,
  fieldNamePrefix,
  options: { Trans },
}) => {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext<UploadCodeData>()

  const data = watch((fieldNamePrefix + 'data') as 'data')
  const [fileName, setFileName] = useState<string | undefined>()
  const [sha256Checksum, setSha256Checksum] = useState<string | undefined>()
  const updateSha256Checksum = useCallback(
    async (_data: string | undefined = data) => {
      if (!_data) {
        return
      }

      const sha256Hash = await crypto.subtle.digest(
        'SHA-256',
        fromBase64(_data)
      )
      setSha256Checksum(toHex(new Uint8Array(sha256Hash)))
    },
    [data]
  )
  // When data is set, if no hash, compute sha256 hash.
  useEffect(() => {
    if (!sha256Checksum) {
      updateSha256Checksum()
    }
  }, [data, sha256Checksum, updateSha256Checksum])

  const onSelect = async (file: File) => {
    if (!file.name.endsWith('.wasm')) {
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

      const newData = toBase64(new Uint8Array(data))
      await updateSha256Checksum(newData)

      setValue((fieldNamePrefix + 'data') as 'data', newData)
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
                className="font-mono"
                takeAll
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
    </>
  )
}
