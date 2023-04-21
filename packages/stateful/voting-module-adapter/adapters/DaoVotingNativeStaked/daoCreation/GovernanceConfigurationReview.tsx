import { useTranslation } from 'react-i18next'
import { useRecoilValueLoadable } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state'
import { CopyToClipboard, Loader } from '@dao-dao/stateless'
import {
  DaoCreationGovernanceConfigReviewProps,
  TokenType,
} from '@dao-dao/types'

import { DaoCreationConfig } from '../types'

export const GovernanceConfigurationReview = ({
  data: { denom },
}: DaoCreationGovernanceConfigReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  const tokenLoadable = useRecoilValueLoadable(
    genericTokenSelector({
      type: TokenType.Native,
      denomOrAddress: denom,
    })
  )

  return (
    <div className="rounded-lg bg-background-tertiary">
      <div className="flex h-14 flex-row border-b border-border-base p-4">
        <p className="primary-text text-text-body">{t('title.factoryToken')}</p>
      </div>

      <div className="space-y-2 p-4">
        <CopyToClipboard takeAll value={denom} />

        {tokenLoadable.state === 'loading' ? (
          <Loader />
        ) : (
          tokenLoadable.state === 'hasValue' && (
            <p className="primary-text text-text-interactive-valid">
              {t('info.foundSymbol', {
                symbol: tokenLoadable.contents?.symbol,
              })}
            </p>
          )
        )}
      </div>
    </div>
  )
}
