import { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  MembersTab as StatelessMembersTab,
  useNavHelpers,
} from '@dao-dao/stateless'

import { useActionOptions } from '../../../../actions'
import { ButtonLink, DaoMemberCard } from '../../../../components'
import { useDaoProposalSinglePrefill, useMembership } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { makeManageMembersAction } from '../actions'
import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { getDaoProposalPath } = useNavHelpers()

  const { isMember = false, totalVotingWeight } = useMembership({
    coreAddress,
  })
  const { members } = useCw4VotingModule(coreAddress, { fetchMembers: true })

  // Should never happen. Type-check.
  if (!members) {
    throw new Error(t('error.loadingData'))
  }

  const options = useActionOptions()
  const manageMembersAction = makeManageMembersAction(options)
  // Prefill URL only valid if action exists.
  const prefillValid = !!manageMembersAction
  const addMemberProposalPrefill = useDaoProposalSinglePrefill({
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
      addMemberHref={
        prefillValid && addMemberProposalPrefill
          ? getDaoProposalPath(coreAddress, 'create', {
              prefill: addMemberProposalPrefill,
            })
          : undefined
      }
      isMember={isMember}
      members={memberCards}
      membersFailedToLoad={false}
      topVoters={{
        show: false,
      }}
    />
  )
}
