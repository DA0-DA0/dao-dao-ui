import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

import { ArrowUpRight } from '@dao-dao/icons'
import { Button } from '@dao-dao/ui'

interface EnterAppButtonProps {
  small?: boolean
}

export const EnterAppButton: FC<EnterAppButtonProps> = ({ small }) => {
  const { t } = useTranslation()

  return (
    <Link href="/home">
      <a>
        <Button size={small ? 'sm' : 'lg'}>
          {t('splash.cta')}
          <ArrowUpRight color="currentColor" height="10px" width="10px" />
        </Button>
      </a>
    </Link>
  )
}
