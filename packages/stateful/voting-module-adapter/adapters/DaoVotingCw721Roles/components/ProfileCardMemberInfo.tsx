import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { TokenAmountDisplay, useDao } from '@dao-dao/stateless'
import { BaseProfileCardMemberInfoProps } from '@dao-dao/types'
import { formatPercentOf100, humanReadableList } from '@dao-dao/utils'

import {
  useDaoGovernanceToken,
  useMembership,
  useWallet,
} from '../../../../hooks'
import { useCw721RolesMembers } from '../hooks'

export const ProfileCardMemberInfo = ({
  cantVoteOnProposal,
}: BaseProfileCardMemberInfoProps) => {
  const { t } = useTranslation()
  const { chainId, name: daoName } = useDao()
  const { address: walletAddress = '' } = useWallet({ chainId })
  const token = useDaoGovernanceToken() ?? undefined
  const { loading, walletVotingWeight, totalVotingWeight } = useMembership()
  const members = useCw721RolesMembers()

  const walletMember =
    members.loading || members.errored || !walletAddress
      ? undefined
      : members.data.find(({ address }) => address === walletAddress)

  const votingPowerPercent =
    walletVotingWeight && totalVotingWeight && !totalVotingWeight.isZero()
      ? walletVotingWeight.div(totalVotingWeight).times(100).toNumber()
      : 0

  if (cantVoteOnProposal) {
    return (
      <p className="legend-text break-words">
        {t('info.tokenDaoNotMemberInfo', {
          context: 'proposal',
          tokenSymbol: token?.symbol ?? '...',
          daoName,
        })}
      </p>
    )
  }

  const isMember = !!walletVotingWeight?.isPositive()

  return (
    <div className="secondary-text space-y-3">
      {!loading && !isMember && (
        <p className="secondary-text mb-4 break-words text-text-body">
          {t('info.tokenDaoNotMemberInfo', {
            context: 'dao',
            tokenSymbol: token?.symbol ?? '...',
            daoName,
          })}
        </p>
      )}

      <div className="flex flex-row items-center justify-between gap-6">
        <p>{t('title.votingWeight')}</p>

        <TokenAmountDisplay
          amount={
            loading
              ? { loading: true }
              : (walletVotingWeight ?? HugeDecimal.zero)
          }
          className="text-right font-mono"
          decimals={0}
          hideSymbol={!token}
          symbol={token?.symbol}
        />
      </div>

      {(loading || votingPowerPercent > 0) && (
        <div className="flex flex-row items-center justify-between gap-6">
          <p>{t('title.votingPower')}</p>

          <p className="text-right font-mono text-text-brand-secondary">
            {loading ? '...' : formatPercentOf100(votingPowerPercent)}
          </p>
        </div>
      )}

      {(members.loading || !!walletMember?.roles.length) && (
        <div className="flex flex-row items-center justify-between gap-6">
          <p>{t('title.roles')}</p>

          <p className="text-right font-mono">
            {members.loading
              ? '...'
              : humanReadableList(walletMember?.roles ?? [])}
          </p>
        </div>
      )}
    </div>
  )
}
