import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { StatefulChainStatusProps } from '@dao-dao/types'
import { getSupportedChains } from '@dao-dao/utils'

import { PageHeaderContent } from '../components'

export type StatusProps = {
  ChainStatus: ComponentType<StatefulChainStatusProps>
}

export const Status = ({ ChainStatus }: StatusProps) => {
  const { t } = useTranslation()

  const chains = getSupportedChains().filter((c) => !c.noIndexer)

  return (
    <>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        title={t('title.status')}
      />

      <div className="mx-auto flex max-w-5xl flex-col gap-2">
        <p className="primary-text mb-4">{t('info.statusPageDescription')}</p>

        {chains.map(({ chainId }) => (
          <ChainStatus key={chainId} chainId={chainId} />
        ))}
      </div>
    </>
  )
}
