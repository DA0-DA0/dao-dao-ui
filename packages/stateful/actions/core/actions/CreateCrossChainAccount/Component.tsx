import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainPickerPopup,
  CopyToClipboard,
  InfoLineCard,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
} from '@dao-dao/types/actions'
import {
  MAINNET,
  getDisplayNameForChainId,
  getImageUrlForChainId,
} from '@dao-dao/utils'

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
    chainContext.type !== ActionChainContextType.Supported
  ) {
    throw new Error('Invalid context for this action.')
  }

  if (!chainContext.config.polytone) {
    throw new Error(
      `Cross-chain accounts have not been enabled for ${
        name || (MAINNET ? 'this chain' : 'testnets')
      }.`
    )
  }

  const missingChainIds = Object.keys(chainContext.config.polytone).filter(
    (chainId) => !(chainId in context.dao.info.polytoneProxies)
  )
  const createdAddress = context.dao.info.polytoneProxies[chainId]

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
        <InfoLineCard
          imageUrl={imageUrl}
          label={name}
          value={
            createdAddress ? (
              <CopyToClipboard
                className="min-w-0"
                takeN={18}
                tooltip={t('button.clickToCopyAddress')}
                value={createdAddress}
              />
            ) : (
              t('info.pending')
            )
          }
          valueClassName="!secondary-text"
        />
      )}
    </>
  )
}
