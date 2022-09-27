import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/common'
import { useEncodedProposalPrefill, useVotingModule } from '@dao-dao/state'
import {
  DaoMemberCardProps,
  MembersTab as StatelessMembersTab,
} from '@dao-dao/ui'
import { getFallbackImage } from '@dao-dao/utils'

import { makeManageMembersAction } from '../actions'
import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()

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
  const [manageMembersAction] = useState(() => makeManageMembersAction())
  const encodedProposalPrefill = useEncodedProposalPrefill({
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

  const memberCards: DaoMemberCardProps[] = members.map(({ addr, weight }) => ({
    // TODO: Retrieve.
    imageUrl: getFallbackImage(addr),
    // TODO: Retrieve.
    name: '',
    address: addr,
    votingPowerPercent: (weight / totalVotingWeight) * 100,
  }))

  return (
    <StatelessMembersTab
      addMemberHref={
        encodedProposalPrefill &&
        `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefill}`
      }
      isMember={isMember}
      members={memberCards}
    />
  )
}
