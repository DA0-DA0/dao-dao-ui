import { ArrowOutward, Code, Twitter } from '@mui/icons-material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { DiscordIcon } from '@dao-dao/ui'

import { ButtonLink } from '../buttons'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className="text-text-tertiary">
      <p className="py-4">{t('splash.footerBeta')}</p>
      <div className="flex flex-col gap-1">
        <FooterItem
          href="https://docs.daodao.zone"
          icon={<Code className="!h-4 !w-4" />}
          name={t('title.documentation')}
        />
        <FooterItem
          href="https://twitter.com/DA0_DA0"
          icon={<Twitter className="!h-4 !w-4" />}
          name={t('title.twitter')}
        />
        <FooterItem
          href="https://discord.gg/sAaGuyW3D2"
          icon={<DiscordIcon className="!h-4 !w-4" />}
          name={t('title.discord')}
        />
      </div>
    </div>
  )
}

interface FooterItemProps {
  href: string
  icon: ReactNode
  name: string
}

const FooterItem = ({ href, icon, name }: FooterItemProps) => (
  <ButtonLink
    contentContainerClassName="justify-between"
    href={href}
    variant="ghost"
  >
    <div className="flex flex-row items-center gap-2">
      {icon}
      <p>{name}</p>
    </div>

    <ArrowOutward className="!h-4 !w-4" />
  </ButtonLink>
)
