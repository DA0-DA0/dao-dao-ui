import { PlusIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

import { ActionKey, FormProposalData } from '@dao-dao/actions'
import { DaoInfo } from '@dao-dao/common'

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

  const prefilledProposalFormData: FormProposalData = {
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
  }

  return (
    <>
      {showAddMember && (
        <div className="flex flex-row gap-8 justify-between items-center pb-6 mb-6 border-b border-b-border-secondary">
          <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center">
            <p className="text-text-body title-text">{t('title.newMember')}</p>
            <p className="secondary-text">{t('info.newMemberExplanation')}</p>
          </div>

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
