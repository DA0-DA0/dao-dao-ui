import { Add, HomeOutlined, InboxOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { CommandModalContextSection } from '@dao-dao/types'

export const useNavigationSection = (): CommandModalContextSection => {
  const { t } = useTranslation()
  const router = useRouter()

  const navigationSection: CommandModalContextSection<{
    href: string
  }> = {
    name: t('title.navigation'),
    onChoose: ({ href }) => router.push(href),
    items: [
      {
        name: t('title.home'),
        Icon: HomeOutlined,
        href: '/home',
      },
      {
        name: t('title.inbox'),
        Icon: InboxOutlined,
        href: '/inbox',
      },
      {
        name: t('title.createADAO'),
        Icon: Add,
        href: '/dao/create',
      },
    ],
  }

  return navigationSection
}
