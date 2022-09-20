import { PlusIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

import { ButtonLink } from '../../Button'
import { GridCardContainer } from '../../GridCardContainer'
import { DaoMemberCard, DaoMemberCardProps } from '../DaoMemberCard'

export interface MembersTabProps {
  members: DaoMemberCardProps[]
  isMember: boolean
  addMemberHref?: string
}

export const MembersTab = ({
  members,
  isMember,
  addMemberHref,
}: MembersTabProps) => {
  const { t } = useTranslation()

  return (
    <>
      {addMemberHref && (
        <div className="flex flex-row gap-8 justify-between items-center pb-6 mb-6 border-b border-b-border-secondary">
          <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center">
            <p className="text-text-body title-text">{t('title.newMember')}</p>
            <p className="secondary-text">{t('info.newMemberExplanation')}</p>
          </div>

          <ButtonLink
            className="shrink-0"
            disabled={!isMember}
            href={addMemberHref}
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
