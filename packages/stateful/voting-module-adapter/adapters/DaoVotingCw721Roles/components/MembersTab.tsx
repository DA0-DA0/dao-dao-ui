import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  MembersTab as StatelessMembersTab,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  LoadingDataWithError,
  StatefulDaoMemberCardProps,
} from '@dao-dao/types'
import { formatPercentOf100, humanReadableList } from '@dao-dao/utils'

import {
  ButtonLink,
  DaoMemberCard,
  EntityDisplay,
  NftCard,
} from '../../../../components'
import { useDaoGovernanceToken, useEntityMap } from '../../../../hooks'
import { Cw721RolesNft, useCw721RolesMembers } from '../hooks'

type Cw721RolesMemberCardProps = StatefulDaoMemberCardProps & {
  nfts: Cw721RolesNft[]
  roles: string[]
  tokenCount: number
}

const Cw721RolesMemberCard = ({
  address,
  balance,
  nfts,
  roles,
  tokenCount,
  votingPowerPercent,
}: Cw721RolesMemberCardProps) => {
  const { t } = useTranslation()
  const representativeNft = nfts[0]

  // Fall back to the standard member card if NFT data is unexpectedly missing.
  if (!representativeNft) {
    return (
      <DaoMemberCard
        address={address}
        balance={balance}
        balanceLabel={
          roles.length ? humanReadableList(roles) : t('title.votingWeight')
        }
        votingPowerPercent={votingPowerPercent}
      />
    )
  }

  const votingPower = votingPowerPercent.loading ? 0 : votingPowerPercent.data
  const roleLabel = roles.length ? humanReadableList(roles) : t('title.roles')

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-background-primary">
      <NftCard
        {...representativeNft}
        banner={
          tokenCount > 1 ? t('title.numNfts', { count: tokenCount }) : undefined
        }
        className="rounded-b-none"
        hideCollection
        owner={address}
        ownerLabel={t('title.member')}
      />

      <div className="flex flex-col gap-3 border-t border-border-secondary p-6">
        <div className="flex flex-row items-start justify-between gap-4">
          <p className="secondary-text">{t('title.roles')}</p>
          <p className="primary-text text-right font-mono">{roleLabel}</p>
        </div>

        <div className="flex flex-row items-start justify-between gap-4">
          <p className="secondary-text">{t('title.votingWeight')}</p>
          <TokenAmountDisplay
            amount={balance.loading ? { loading: true } : balance.data.amount}
            className="text-right font-mono"
            decimals={balance.loading ? 0 : (balance.data.token?.decimals ?? 0)}
            hideSymbol={balance.loading || !balance.data.token}
            symbol={balance.loading ? undefined : balance.data.token?.symbol}
          />
        </div>

        <div className="flex flex-row items-start justify-between gap-4">
          <p className="secondary-text">{t('title.votingPower')}</p>
          <p className="primary-text text-right font-mono text-text-brand-secondary">
            {votingPowerPercent.loading
              ? '...'
              : formatPercentOf100(votingPower)}
          </p>
        </div>
      </div>
    </div>
  )
}

export const MembersTab = () => {
  const { t } = useTranslation()
  const token = useDaoGovernanceToken() ?? undefined
  const cw721RolesMembers = useCw721RolesMembers()

  const totalVotingWeight =
    cw721RolesMembers.loading || cw721RolesMembers.errored
      ? HugeDecimal.zero
      : cw721RolesMembers.data.reduce(
          (sum, { weight }) => sum.plus(weight),
          HugeDecimal.zero
        )

  const members: LoadingDataWithError<Cw721RolesMemberCardProps[]> =
    cw721RolesMembers.loading
      ? { loading: true, errored: false }
      : cw721RolesMembers.errored
        ? {
            loading: false,
            errored: true,
            error: cw721RolesMembers.error,
          }
        : {
            loading: false,
            errored: false,
            data: cw721RolesMembers.data.map((member) => ({
              address: member.address,
              balanceLabel: member.roles.length
                ? humanReadableList(member.roles)
                : t('title.votingWeight'),
              balance: {
                loading: false,
                data: {
                  amount: member.weight,
                  token,
                },
              },
              votingPowerPercent: {
                loading: false,
                data: totalVotingWeight.isZero()
                  ? 0
                  : member.weight.div(totalVotingWeight).times(100).toNumber(),
              },
              nfts: member.nfts,
              roles: member.roles,
              tokenCount: member.tokenCount,
            })),
          }

  const { map: entityMap } = useEntityMap({
    addresses:
      members.loading || members.errored
        ? []
        : members.data.map((member) => member.address),
  })

  return (
    <StatelessMembersTab
      ButtonLink={ButtonLink}
      DaoMemberCard={Cw721RolesMemberCard as typeof DaoMemberCard}
      entityMap={entityMap}
      members={members}
      topVoters={{
        show: true,
        EntityDisplay,
      }}
    />
  )
}
