import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CopyToClipboard, RadioInput } from '@dao-dao/stateless'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import {
  POLYTONE_NOTES,
  getDisplayNameForChainId,
  getImageUrlForChainId,
} from '@dao-dao/utils'

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

  const { context } = useActionOptions()
  if (context.type !== ActionContextType.Dao) {
    throw new Error('Invalid context for this action.')
  }

  const missingChainIds = Object.keys(POLYTONE_NOTES).filter(
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
          <RadioInput
            fieldName={(fieldNamePrefix + 'chainId') as 'chainId'}
            options={missingChainIds.map((chainId) => ({
              label: getDisplayNameForChainId(chainId),
              value: chainId,
            }))}
            setValue={setValue}
            watch={watch}
          />
        ) : (
          <p className="text-text-interactive-error">
            {t('info.allAccountsCreated')}
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
