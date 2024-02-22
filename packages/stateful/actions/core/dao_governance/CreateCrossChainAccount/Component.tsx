import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ChainPickerPopup, CopyToClipboard } from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
} from '@dao-dao/types/actions'
import { getDisplayNameForChainId, getImageUrlForChainId } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export type CreateCrossChainAccountData = {
  chainId: string
}

export const CreateCrossChainAccountComponent: ActionComponent = ({
  fieldNamePrefix,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<CreateCrossChainAccountData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const imageUrl = getImageUrlForChainId(chainId)
  const name = getDisplayNameForChainId(chainId)

  const { context, chainContext } = useActionOptions()
  if (
    context.type !== ActionContextType.Dao ||
    // Type check.
    chainContext.type !== ActionChainContextType.Supported ||
    !chainContext.config.polytone
  ) {
    throw new Error('Invalid context for this action.')
  }

  const missingChainIds = Object.keys(chainContext.config.polytone).filter(
    (chainId) => !(chainId in context.info.polytoneProxies)
  )
  const createdAddress = context.info.polytoneProxies[chainId]

  return (
    <>
      <p className="max-w-prose">
        {t('info.createCrossChainAccountExplanation')}
      </p>

      {isCreating ? (
        missingChainIds.length > 0 ? (
          <ChainPickerPopup
            buttonClassName="self-start"
            chains={{
              type: 'custom',
              chainIds: missingChainIds,
            }}
            labelMode="chain"
            onSelect={(chainId) => {
              // Type-check. None option is disabled so should not be possible.
              if (!chainId) {
                return
              }

              setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
            }}
            selectedChainId={chainId}
          />
        ) : (
          <p className="text-text-interactive-error">
            {t('info.allCrossChainAccountsCreated')}
          </p>
        )
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

            <p className="primary-text shrink-0">{name}</p>
          </div>

          {createdAddress ? (
            <CopyToClipboard
              className="min-w-0"
              takeN={18}
              tooltip={t('button.clickToCopyAddress')}
              value={createdAddress}
            />
          ) : (
            <p className="secondary-text">{t('info.pending')}</p>
          )}
        </div>
      )}
    </>
  )
}
