import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { ArrowUpRight } from '@dao-dao/icons'
import { Button } from '@dao-dao/ui'

interface EnterAppButtonProps {
  small?: boolean
}

export const EnterAppButton: FC<EnterAppButtonProps> = ({ small }) => {
  const { t } = useTranslation('splash')

  return (
    <Link href="/home">
      <a>
        <Button size={small ? 'sm' : 'lg'}>
          {t('cta')}
          <ArrowUpRight color="currentColor" height="10px" width="10px" />
        </Button>
      </a>
    </Link>
  )
}
