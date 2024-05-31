import { Add, HomeOutlined, NotificationsOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { CommandModalContextSection } from '@dao-dao/types'

import { useWallet } from '../../hooks'

export const useNavigationSection = (): CommandModalContextSection => {
  const { t } = useTranslation()
  const router = useRouter()

  const { isWalletConnected } = useWallet()

  const navigationSection: CommandModalContextSection<{
    href: string
  }> = {
    name: t('title.navigation'),
    onChoose: ({ href }) => router.push(href),
    items: [
      {
        name: t('title.home'),
        Icon: HomeOutlined,
        href: '/',
      },
      ...(isWalletConnected
        ? [
            {
              name: t('title.notifications'),
              Icon: NotificationsOutlined,
              href: '/notifications',
            },
          ]
        : []),
      {
        name: t('title.createADAO'),
        Icon: Add,
        href: '/dao/create',
      },
    ],
  }

  return navigationSection
}
