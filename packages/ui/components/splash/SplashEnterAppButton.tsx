// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { ArrowUpRight } from '@dao-dao/icons'
import { Button } from '@dao-dao/ui'

export interface SplashEnterAppButtonProps {
  small?: boolean
}

export const SplashEnterAppButton = ({ small }: SplashEnterAppButtonProps) => {
  const { t } = useTranslation()

  return (
    <Link href="/home">
      <a>
        <Button size={small ? 'sm' : 'lg'}>
          {t('splash.cta')}
          <ArrowUpRight height="10px" width="10px" />
        </Button>
      </a>
    </Link>
  )
}
