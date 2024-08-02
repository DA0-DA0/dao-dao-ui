import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { CreateDaoPermitProps, ProfileCardWrapperProps } from '@dao-dao/types'

import { ProfileCardWrapper } from './ProfileCardWrapper'

export type ProfileCreatePermitCardProps = Omit<
  ProfileCardWrapperProps,
  | 'children'
  | 'underHeaderComponent'
  | 'childContainerClassName'
  | 'established'
  | 'compact'
> & {
  CreatePermit: ComponentType<CreateDaoPermitProps>
}

export const ProfileCreatePermitCard = ({
  CreatePermit,
  ...wrapperProps
}: ProfileCreatePermitCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      compact
      underHeaderComponent={
        <p className="caption-text text-text-secondary truncate">
          {t('info.missingPermit')}
        </p>
      }
      {...wrapperProps}
    >
      <CreatePermit className="!gap-4 !items-stretch" />
    </ProfileCardWrapper>
  )
}
