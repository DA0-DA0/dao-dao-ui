import { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'

import { MembersTab as StatelessMembersTab } from '@dao-dao/stateless'
import { ActionKey } from '@dao-dao/types'

import { useActionForKey } from '../../../../actions'
import { ButtonLink, DaoMemberCard } from '../../../../components'
import {
  useEncodedCwdProposalSinglePrefill,
  useVotingModule,
} from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const { isMember = false, totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  if (totalVotingWeight === undefined || !members) {
    throw new Error(t('error.loadingData'))
  }

  const manageMembersAction = useActionForKey(ActionKey.ManageMembers)
  // Prefill URL only valid if action exists.
  const prefillValid = !!manageMembersAction
  const encodedProposalPrefill = useEncodedCwdProposalSinglePrefill({
    actions: manageMembersAction
      ? [
          {
            action: manageMembersAction,
            data: {
              toAdd: [{ addr: '', weight: NaN }],
              toRemove: [],
            },
          },
        ]
      : [],
  })

  const memberCards: ComponentPropsWithoutRef<typeof DaoMemberCard>[] =
    members.map(({ addr, weight }) => ({
      address: addr,
      votingPowerPercent: (weight / totalVotingWeight) * 100,
    }))

  return (
    <StatelessMembersTab
      ButtonLink={ButtonLink}
      DaoMemberCard={DaoMemberCard}
      addMemberHref={
        prefillValid && encodedProposalPrefill
          ? `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefill}`
          : undefined
      }
      isMember={isMember}
      members={memberCards}
    />
  )
}
