import { Check } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyToClipboard,
  IbcDestinationChainPicker,
  InputErrorMessage,
  Loader,
  WarningCard,
  useChain,
} from '@dao-dao/stateless'
import { LoadingDataWithError } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
} from '@dao-dao/types/actions'
import {
  getDisplayNameForChainId,
  getImageUrlForChainId,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

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
  allActionsWithData,
}) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<CreateIcaData>()
  const { chain_id: sourceChainId } = useChain()
  const { context } = useActionOptions()

  const destinationChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const imageUrl =
    destinationChainId && getImageUrlForChainId(destinationChainId)

  const registerActionExists =
    isCreating &&
    !!destinationChainId &&
    allActionsWithData.some(
      ({ actionKey, data }) =>
        actionKey === ActionKey.ManageIcas &&
        objectMatchesStructure(data, {
          chainId: {},
          register: {},
        }) &&
        data.chainId === destinationChainId &&
        data.register
    )

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

          {isCreating &&
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

                    {addAction && context.type === ActionContextType.Dao && (
                      <div className="flex flex-col items-start gap-2">
                        <p className="body-text max-w-prose">
                          {t('info.createIcaRegister')}
                        </p>

                        <Button
                          disabled={registerActionExists}
                          onClick={() =>
                            addAction?.({
                              actionKey: ActionKey.ManageIcas,
                              data: {
                                chainId: destinationChainId,
                                register: true,
                              },
                            })
                          }
                        >
                          {registerActionExists
                            ? t('button.addedRegisterAction')
                            : t('button.addRegisterAction')}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            ))}
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
            <WarningCard
              content={
                createdAddressLoading.error instanceof Error
                  ? createdAddressLoading.error.message
                  : `${createdAddressLoading.error}`
              }
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

      <WarningCard
        className="mt-6 max-w-xl"
        content={t('info.icaExperimental')}
      />
    </>
  )
}
