import { useWallet } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/common'
import {
  CwProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { useVotingModule } from '@dao-dao/state'
import { ActionKey } from '@dao-dao/tstypes'
import {
  DaoMemberCardProps,
  MembersTab as StatelessMembersTab,
} from '@dao-dao/ui'
import { getFallbackImage } from '@dao-dao/utils'

import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const MembersTab = () => {
  const { t } = useTranslation()
  const { coreAddress, proposalModules } = useDaoInfoContext()

  const { name } = useWallet()
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
  const singleChoiceProposalModule = proposalModules.find(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.contractName ===
      CwProposalSingleAdapter.contractName
  )

  // Only show new member proposal prefill if has single choice proposal module.
  const prefilledProposalFormData = singleChoiceProposalModule && {
    proposalModuleAddress: singleChoiceProposalModule.address,
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
