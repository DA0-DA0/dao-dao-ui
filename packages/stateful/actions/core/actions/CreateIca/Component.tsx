import { Check } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyToClipboard,
  IbcDestinationChainPicker,
  InputErrorMessage,
  Loader,
  StatusCard,
  useActionOptions,
  useChain,
} from '@dao-dao/stateless'
import { LoadingDataWithError } from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
} from '@dao-dao/types/actions'
import { getDisplayNameForChainId, getImageUrlForChainId } from '@dao-dao/utils'

export type CreateIcaData = {
  chainId: string
}

export type CreateIcaOptions = {
  createdAddressLoading: LoadingDataWithError<string | undefined>
  icaHostSupported: LoadingDataWithError<boolean>
}

export const CreateIcaComponent: ActionComponent<CreateIcaOptions> = ({
  fieldNamePrefix,
  isCreating,
  errors,
  options: { createdAddressLoading, icaHostSupported },
  addAction,
  remove,
  index,
}) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<CreateIcaData>()
  const { chainId: sourceChainId } = useChain()
  const { context, chainContext } = useActionOptions()

  const destinationChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const imageUrl =
    destinationChainId && getImageUrlForChainId(destinationChainId)

  // Exclude polytone chain IDs and encourage them to use polytone instead.
  const polytoneChainIds =
    chainContext.type === ActionChainContextType.Supported
      ? Object.keys(chainContext.config.polytone || {})
      : []

  return (
    <>
      {isCreating ? (
        <>
          <IbcDestinationChainPicker
            buttonClassName="self-start"
            includeSourceChain={false}
            onSelect={(chainId) => {
              // Type-check. None option is disabled so should not be possible.
              if (!chainId) {
                return
              }

              setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
            }}
            selectedChainId={destinationChainId}
            sourceChainId={sourceChainId}
          />

          {polytoneChainIds.includes(destinationChainId) &&
          context.type === ActionContextType.Dao &&
          remove ? (
            <StatusCard
              className="max-w-xl"
              content={t('info.useNativeCrossChainAccountInstead')}
              style="warning"
            >
              <Button
                onClick={() => {
                  remove()
                  addAction(
                    {
                      actionKey: ActionKey.CreateCrossChainAccount,
                      data: {
                        chainId: destinationChainId,
                      },
                    },
                    index
                  )
                }}
              >
                {t('button.switchAction')}
              </Button>
            </StatusCard>
          ) : (
            isCreating &&
            !!destinationChainId &&
            (icaHostSupported.loading ||
            icaHostSupported.updating ||
            createdAddressLoading.loading ||
            createdAddressLoading.updating ? (
              <Loader className="self-start" fill={false} size={24} />
            ) : (
              <>
                <InputErrorMessage className="-mt-2" error={errors?.chainId} />

                {!icaHostSupported.errored && icaHostSupported.data && (
                  <>
                    <div className="flex flex-row items-center gap-3">
                      <p className="primary-text">
                        {t('info.icaHostSupported')}
                      </p>

                      <Check className="!h-5 !w-5" />
                    </div>
                  </>
                )}
              </>
            ))
          )}
        </>
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-md bg-background-secondary px-4 py-3">
          <div className="flex flex-row items-center gap-2">
            {imageUrl && (
              <div
                className="h-6 w-6 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
              ></div>
            )}

            <p className="primary-text shrink-0">
              {getDisplayNameForChainId(destinationChainId)}
            </p>
          </div>

          {createdAddressLoading.loading ? (
            <Loader fill={false} size={28} />
          ) : createdAddressLoading.errored ? (
            <StatusCard
              content={
                createdAddressLoading.error instanceof Error
                  ? createdAddressLoading.error.message
                  : `${createdAddressLoading.error}`
              }
              style="warning"
            />
          ) : createdAddressLoading.data ? (
            <CopyToClipboard
              className="min-w-0"
              takeN={18}
              tooltip={t('button.clickToCopyAddress')}
              value={createdAddressLoading.data}
            />
          ) : (
            <p className="secondary-text">{t('info.pending')}</p>
          )}
        </div>
      )}

      <StatusCard
        className="max-w-xl"
        content={t('info.icaExperimental')}
        style="warning"
      />
    </>
  )
}
