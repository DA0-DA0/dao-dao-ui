import { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  MembersTab as StatelessMembersTab,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { ButtonLink, DaoMemberCard } from '../../../../components'
import { useMembership } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const { isMember = false, totalVotingWeight } = useMembership({
    coreAddress,
  })
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  // Should never happen. Type-check.
  if (!members) {
    throw new Error(t('error.loadingData'))
  }

  const memberCards: ComponentPropsWithoutRef<typeof DaoMemberCard>[] =
    members.map(({ addr, weight }) => ({
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
  )
}
