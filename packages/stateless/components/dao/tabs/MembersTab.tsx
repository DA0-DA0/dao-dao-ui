import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonLinkProps } from '../../buttons'
import { GridCardContainer } from '../../GridCardContainer'

export interface MembersTabProps<D> {
  DaoMemberCard: ComponentType<D>
  members: D[]
  isMember: boolean
  addMemberHref?: string
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const MembersTab = <D extends {}>({
  DaoMemberCard,
  members,
  isMember,
  addMemberHref,
  ButtonLink,
}: MembersTabProps<D>) => {
  const { t } = useTranslation()

  return (
    <>
      {/* header min-height of 3.5rem standardized across all tabs */}
      {addMemberHref && (
        <div className="mb-6 flex min-h-[3.5rem] flex-row items-center justify-between gap-8 border-b border-b-border-secondary pb-6">
          <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
            <p className="title-text text-text-body">{t('title.newMember')}</p>
            <p className="secondary-text">{t('info.newMemberExplanation')}</p>
          </div>

          <ButtonLink
            className="shrink-0"
            disabled={!isMember}
            href={addMemberHref}
          >
            <Add className="!h-4 !w-4" />
            {t('button.addMembers')}
          </ButtonLink>
        </div>
      )}

      <div
        className={clsx(
          'pb-6',
          // header min-height of 3.5rem standardized across all tabs
          !addMemberHref && 'flex min-h-[3.5rem] flex-row items-center '
        )}
      >
        <p className="title-text text-text-body">
          {t('title.numMembers', { count: members.length })}
        </p>
      </div>

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
