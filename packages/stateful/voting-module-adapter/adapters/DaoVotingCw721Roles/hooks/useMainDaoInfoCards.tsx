import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { TokenAmountDisplay } from '@dao-dao/stateless'
import { DaoInfoCard } from '@dao-dao/types'

import { useDaoGovernanceToken } from '../../../../hooks'
import { useCw721RolesMembers } from './useCw721RolesMembers'

export const useMainDaoInfoCards = (): DaoInfoCard[] => {
  const { t } = useTranslation()
  const token = useDaoGovernanceToken() ?? undefined
  const members = useCw721RolesMembers()

  const totalVotingWeight =
    members.loading || members.errored
      ? HugeDecimal.zero
      : members.data.reduce(
          (sum, member) => sum.plus(member.weight),
          HugeDecimal.zero
        )

  return [
    {
      label: t('title.members'),
      tooltip: t('info.membersTooltip'),
      loading: members.loading,
      value: members.loading
        ? undefined
        : members.errored
          ? '<error>'
          : members.data.length,
    },
    {
      label: t('title.totalVotingWeight'),
      loading: members.loading,
      value: members.loading ? undefined : members.errored ? (
        '<error>'
      ) : (
        <TokenAmountDisplay
          amount={totalVotingWeight}
          decimals={0}
          hideSymbol={!token}
          symbol={token?.symbol}
        />
      ),
    },
  ]
}
