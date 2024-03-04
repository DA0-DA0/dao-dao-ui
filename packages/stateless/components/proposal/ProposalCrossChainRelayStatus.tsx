import { useTranslation } from 'react-i18next'

import { ProposalPolytoneState } from '@dao-dao/types'

import { InfoCard } from '../InfoCard'

export type ProposalCrossChainRelayStatusProps = {
  state: ProposalPolytoneState
}

export const ProposalCrossChainRelayStatus = ({
  state: { hasPolytoneMessages, needsSelfRelay, unrelayedMsgs, timedOutMsgs },
}: ProposalCrossChainRelayStatusProps) => {
  const { t } = useTranslation()

  if (!hasPolytoneMessages) {
    return null
  }

  return unrelayedMsgs.length > 0 ? (
    !needsSelfRelay ? (
      <InfoCard
        content={t('info.relayingCrossChainMessages')}
        style="loading"
      />
    ) : null
  ) : timedOutMsgs.length > 0 ? (
    <InfoCard content={t('error.crossChainMessagesTimedOut')} style="warning" />
  ) : (
    <InfoCard
      content={t('success.crossChainMessagesRelayed')}
      style="success"
    />
  )
}
