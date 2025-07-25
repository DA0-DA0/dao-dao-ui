import { Check, CopyAll } from '@mui/icons-material'
import clsx from 'clsx'
import JSON5 from 'json5'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  AddressInputProps,
  ContractSummary,
  LoadingDataWithError,
  QuerierForm,
  WalletChainSwitcherProps,
} from '@dao-dao/types'
import {
  makeValidateAddress,
  processError,
  validateRequired,
} from '@dao-dao/utils'

import { useChainContext } from '../contexts'
import { Button } from './buttons'
import { IconButton } from './icon_buttons'
import { CodeMirrorInput, InputErrorMessage, InputLabel } from './inputs'
import { Loader } from './logo'
import { RawJsonDisplay } from './RawJsonDisplay'
import { Tooltip } from './tooltip'

export type QuerierProps = {
  queryContractSmart: (contractAddress: string, query: any) => Promise<any>
  contractSummary: LoadingDataWithError<ContractSummary>
  availableQueries: LoadingDataWithError<string[]>
  AddressInput: ComponentType<AddressInputProps<QuerierForm>>
  WalletChainSwitcher: ComponentType<WalletChainSwitcherProps>
}

export const Querier = ({
  queryContractSmart,
  contractSummary,
  availableQueries,
  AddressInput,
  WalletChainSwitcher,
}: QuerierProps) => {
  const { t } = useTranslation()
  const {
    chain: { bech32Prefix },
  } = useChainContext()

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    register,
    setValue,
  } = useFormContext<QuerierForm>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string>('')
  const [hasResult, setHasResult] = useState(false)

  const onSubmitForm: SubmitHandler<QuerierForm> = useCallback(
    async ({ contractAddress, query }) => {
      setLoading(true)
      try {
        const result = await queryContractSmart(contractAddress, query)
        console.log('Result', result)
        setResult(JSON.stringify(result, null, 2))
        setError(null)
        setHasResult(true)
      } catch (err) {
        console.error(err)
        setError(
          processError(err, {
            forceCapture: false,
          })
        )
        setHasResult(false)
      } finally {
        setLoading(false)
      }
    },
    [queryContractSmart]
  )

  const contractAddress = watch('contractAddress')
  const query = watch('query')
  let queryJsonFormatError
  try {
    JSON5.parse(query)
  } catch (err) {
    queryJsonFormatError = err instanceof Error ? err.message : `${err}`
  }

  // Unset copied after 2 seconds unless it gets clicked again, then reset.
  const [copied, setCopied] = useState(0)
  useEffect(() => {
    if (!copied) {
      return
    }
    const timeout = setTimeout(() => setCopied(0), 2_000)
    return () => clearTimeout(timeout)
  }, [copied])

  const CopyIcon = copied > 0 ? Check : CopyAll

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-end">
        <WalletChainSwitcher headerMode type="configured" />
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="flex flex-col gap-2">
          <InputLabel name={t('title.contractAddress')} title />

          <AddressInput
            error={errors?.contractAddress || contractSummary.errored}
            fieldName="contractAddress"
            register={register}
            type="contract"
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          />
          <InputErrorMessage error={errors?.contractAddress} />

          {!contractSummary.loading &&
            (contractSummary.errored ? (
              <InputErrorMessage error={contractSummary.error} />
            ) : (
              contractSummary.data.address === contractAddress && (
                <RawJsonDisplay
                  loading={contractSummary.updating}
                  value={JSON.stringify(contractSummary.data, null, 2)}
                />
              )
            ))}
        </div>

        {!availableQueries.loading &&
          !availableQueries.errored &&
          !availableQueries.updating &&
          availableQueries.data.length > 0 && (
            <div className="flex flex-col gap-2">
              <InputLabel name={t('title.detectedQueries')} primary />

              <div className="flex flex-row flex-wrap gap-1">
                {availableQueries.data.map((query) => (
                  <Button
                    key={query}
                    onClick={() =>
                      setValue(
                        'query',
                        JSON.stringify({ [query]: {} }, null, 2)
                      )
                    }
                    size="sm"
                    variant="secondary"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <div className="flex flex-col gap-2 min-w-0 basis-1/2 grow">
            <InputLabel name={t('title.query')} title />

            <CodeMirrorInput
              className="styled-scrollbar max-h-[min(32rem,50vh)] overflow-y-scroll"
              control={control}
              error={errors?.query || queryJsonFormatError}
              fieldName="query"
            />

            <InputErrorMessage error={queryJsonFormatError} />

            <Button
              center
              className="mt-2"
              disabled={loading}
              size="lg"
              type="submit"
              variant="brand"
            >
              {t('button.query')}
            </Button>
          </div>

          <div className="flex flex-col gap-2 min-w-0 basis-1/2 grow">
            <div className="flex flex-row items-center gap-2">
              <InputLabel
                name={error ? t('title.error') : t('title.result')}
                title
              />

              {loading ? (
                <Loader fill={false} size={18} />
              ) : (
                hasResult && (
                  <Tooltip title={t('button.copyToClipboard')}>
                    <IconButton
                      Icon={CopyIcon}
                      onClick={() => {
                        navigator.clipboard.writeText(result)
                        setCopied((copied) => copied + 1)
                        toast.success(t('info.copiedToClipboard'))
                      }}
                      size="sm"
                      variant="ghost"
                    />
                  </Tooltip>
                )
              )}
            </div>

            <RawJsonDisplay
              className={clsx(
                'styled-scrollbar max-h-[min(32rem,50vh)] overflow-y-scroll',
                loading && 'animate-pulse',
                error && 'text-text-interactive-error'
              )}
              value={hasResult ? result : error || ''}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
