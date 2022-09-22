import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/common'
import {
  CwProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { NewProposalForm } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/types'
import { useVotingModule } from '@dao-dao/state'
import { ActionKey, ProposalPrefill } from '@dao-dao/tstypes'
import {
  DaoMemberCardProps,
  MembersTab as StatelessMembersTab,
} from '@dao-dao/ui'
import { getFallbackImage } from '@dao-dao/utils'

import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress, proposalModules } = useDaoInfoContext()

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

  // If has single choice proposal module, can create prefill button.
  const singleChoiceProposalModule = proposalModules.some(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.id ===
      CwProposalSingleAdapter.id
  )

  // Only show new member proposal prefill if has single choice proposal module.
  const prefilledProposalFormData:
    | ProposalPrefill<NewProposalForm>
    | undefined = singleChoiceProposalModule
    ? {
        id: CwProposalSingleAdapter.id,
        data: {
          title: '',
          description: '',
          actionData: [
            {
              key: ActionKey.ManageMembers,
              data: {
                toAdd: [{ addr: '', weight: NaN }],
                toRemove: [],
              },
            },
          ],
        },
      }
    : undefined

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
        prefilledProposalFormData &&
        `/dao/${coreAddress}/proposals/create?prefill=${encodeURIComponent(
          JSON.stringify(prefilledProposalFormData)
        )}`
      }
      isMember={isMember}
      members={memberCards}
    />
  )
}
