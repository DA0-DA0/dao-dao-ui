import { ComponentPropsWithoutRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoMemberCard } from '@dao-dao/common'
import {
  useEncodedCwdProposalSinglePrefill,
  useVotingModule,
} from '@dao-dao/state'
import { ActionContextType } from '@dao-dao/tstypes'
import {
  MembersTab as StatelessMembersTab,
  useDaoInfoContext,
} from '@dao-dao/ui'

import { makeManageMembersAction } from '../actions'
import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress, coreVersion } = useDaoInfoContext()

  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  const { totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  if (totalVotingWeight === undefined || !members) {
    throw new Error(t('error.loadingData'))
  }

  // Only make the action once.
  // TODO: Get from Actions provider once made.
  const [manageMembersAction] = useState(
    () =>
      makeManageMembersAction({
        t,
        address: coreAddress,
        context: {
          type: ActionContextType.Dao,
          coreVersion,
        },
      })!
  )
  const encodedProposalPrefill = useEncodedCwdProposalSinglePrefill({
    actions: [
      {
        action: manageMembersAction,
        data: {
          toAdd: [{ addr: '', weight: NaN }],
          toRemove: [],
        },
      },
    ],
  })

  const memberCards: ComponentPropsWithoutRef<typeof DaoMemberCard>[] =
    members.map(({ addr, weight }) => ({
      address: addr,
      votingPowerPercent: (weight / totalVotingWeight) * 100,
    }))

  return (
    <StatelessMembersTab
      DaoMemberCard={DaoMemberCard}
      addMemberHref={
        encodedProposalPrefill &&
        `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefill}`
      }
      isMember={isMember}
      members={memberCards}
    />
  )
}
