// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ArrowOutward } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ButtonLink } from '../buttons/ButtonLink'

export interface SplashEnterAppButtonProps {
  small?: boolean
}

export const SplashEnterAppButton = ({ small }: SplashEnterAppButtonProps) => {
  const { t } = useTranslation()

  return (
    <ButtonLink href="/home" size={small ? 'sm' : 'lg'}>
      {t('splash.cta')}
      <ArrowOutward className="!h-4 !w-4" />
    </ButtonLink>
  )
}
