import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'

import { ChainGovernanceList as StatelessChainGovernanceList } from '@dao-dao/stateless'
import {
  CHAIN_GOVERNANCE_DESCRIPTION,
  CHAIN_GOVERNANCE_TITLE,
} from '@dao-dao/utils'

import { LazyDaoCard } from '../dao'
import { PageHeaderContent } from '../PageHeaderContent'

export const ChainGovernanceList = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        description={CHAIN_GOVERNANCE_DESCRIPTION}
        openGraph={{
          title: CHAIN_GOVERNANCE_TITLE,
          description: CHAIN_GOVERNANCE_DESCRIPTION,
        }}
        title={CHAIN_GOVERNANCE_TITLE}
      />

      <PageHeaderContent title={t('title.chainGovernance')} />

      <StatelessChainGovernanceList LazyDaoCard={LazyDaoCard} />
    </>
  )
}
