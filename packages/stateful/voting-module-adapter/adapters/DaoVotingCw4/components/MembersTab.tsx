import { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Loader,
  MembersTab as StatelessMembersTab,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import {
  ButtonLink,
  DaoMemberCard,
  SuspenseLoader,
} from '../../../../components'
import { useMembership } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useLoadingVotingModule } from '../hooks/useLoadingVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const { isMember = false, totalVotingWeight } = useMembership({
    coreAddress,
  })
  const votingModule = useLoadingVotingModule(coreAddress, {
    fetchMembers: true,
  })

  const memberCards: ComponentPropsWithoutRef<typeof DaoMemberCard>[] =
    votingModule.loading || votingModule.errored || !votingModule.data.members
      ? []
      : votingModule.data.members.map(({ addr, weight }) => ({
          address: addr,
          balance: {
            label: t('title.votingWeight'),
            value: {
              loading: false,
              data: weight.toLocaleString(),
            },
          },
          votingPowerPercent:
            totalVotingWeight === undefined
              ? { loading: true }
              : {
                  loading: false,
                  data: (weight / totalVotingWeight) * 100,
                },
        }))

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={votingModule.loading || votingModule.errored}
    >
      <StatelessMembersTab
        ButtonLink={ButtonLink}
        DaoMemberCard={DaoMemberCard}
        addMemberHref={getDaoProposalPath(coreAddress, 'create', {
          prefill: getDaoProposalSinglePrefill({
            actions: [
              {
                actionKey: ActionKey.ManageMembers,
                data: {
                  toAdd: [{ addr: '', weight: NaN }],
                  toRemove: [],
                },
              },
            ],
          }),
        })}
        isMember={isMember}
        members={memberCards}
        membersFailedToLoad={false}
        topVoters={{
          show: false,
        }}
      />
    </SuspenseLoader>
  )
}
