import { PlusIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

import { DaoInfo } from '@dao-dao/common'
import {
  CwProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { ActionKey } from '@dao-dao/tstypes'

import { ButtonLink } from '../../Button'
import { GridCardContainer } from '../../GridCardContainer'
import { DaoMemberCard, DaoMemberCardProps } from '../DaoMemberCard'

export interface MembersTabProps {
  members: DaoMemberCardProps[]
  isMember: boolean
  daoInfo: DaoInfo
  showAddMember: boolean
}

export const MembersTab = ({
  members,
  isMember,
  daoInfo,
  showAddMember,
}: MembersTabProps) => {
  const { t } = useTranslation()

  // If has single choice proposal module, can create prefill button.
  const singleChoiceProposalModule = daoInfo.proposalModules.find(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.contractName ===
      CwProposalSingleAdapter.contractName
  )

  const prefilledProposalFormData = {
    proposalModuleAddress: singleChoiceProposalModule?.address,
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

  return (
    <>
      {showAddMember && (
        <div className="flex flex-row gap-8 justify-between items-center pb-6 mb-6 border-b border-b-border-secondary">
          <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center">
            <p className="text-text-body title-text">{t('title.newMember')}</p>
            <p className="secondary-text">{t('info.newMemberExplanation')}</p>
          </div>

          {/* Only show new member proposal prefill if has single choice proposal module. */}
          {singleChoiceProposalModule && (
            <ButtonLink
              className="shrink-0"
              disabled={!isMember}
              href={`/dao/${
                daoInfo.coreAddress
              }/proposals/create?prefill=${encodeURIComponent(
                JSON.stringify(prefilledProposalFormData)
              )}`}
            >
              <PlusIcon className="w-4 h-4" />
              {t('button.addMembers')}
            </ButtonLink>
          )}
        </div>
      )}

      <p className="mb-6 text-text-body title-text">
        {t('title.numMembers', { count: members.length })}
      </p>

      {members.length ? (
        <GridCardContainer>
          {members.map((props, index) => (
            <DaoMemberCard {...props} key={index} />
          ))}
        </GridCardContainer>
      ) : (
        <p className="secondary-text">{t('info.noSubDaos')}</p>
      )}
    </>
  )
}
