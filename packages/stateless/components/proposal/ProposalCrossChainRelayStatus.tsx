import { useTranslation } from 'react-i18next'

import { ProposalPolytoneState } from '@dao-dao/types'

import { InfoCard } from '../InfoCard'

export type ProposalCrossChainRelayStatusProps = {
  state: ProposalPolytoneState
}

export const ProposalCrossChainRelayStatus = ({
  state: { hasPolytoneMessages, anyUnrelayed, needsSelfRelay },
}: ProposalCrossChainRelayStatusProps) => {
  const { t } = useTranslation()

  if (!hasPolytoneMessages) {
    return null
  }

  return anyUnrelayed ? (
    !needsSelfRelay ? (
      <InfoCard
        content={t('info.relayingCrossChainMessages')}
        style="loading"
      />
    ) : null
  ) : (
    <InfoCard
      content={t('success.crossChainMessagesRelayed')}
      style="success"
    />
  )
}
