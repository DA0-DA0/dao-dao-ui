import { useTranslation } from 'react-i18next'

import { ProposalRelayState } from '@dao-dao/types'

import { InfoCard } from '../InfoCard'

export type ProposalCrossChainRelayStatusProps = {
  state: ProposalRelayState
}

export const ProposalCrossChainRelayStatus = ({
  state: { hasCrossChainMessages, needsSelfRelay, unrelayedMsgs, timedOutMsgs },
}: ProposalCrossChainRelayStatusProps) => {
  const { t } = useTranslation()

  if (!hasCrossChainMessages) {
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
