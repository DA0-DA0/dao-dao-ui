import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ArrowUpRight, Bubble, Code } from '@dao-dao/icons'

import { ButtonLink } from '../Button'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className="text-text-tertiary">
      <p className="py-4">{t('splash.footerBeta')}</p>
      <div className="flex flex-col gap-1">
        <FooterItem
          href="https://docs.daodao.zone"
          icon={<Code className="w-4 h-4" />}
          name={t('title.documentation')}
        />
        <FooterItem
          href="https://twitter.com/DA0_DA0"
          icon={<Bubble className="w-4 h-4" />}
          name={t('title.twitter')}
        />
        <FooterItem
          href="https://discord.gg/sAaGuyW3D2"
          icon={<Bubble className="w-4 h-4" />}
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
    <div className="flex flex-row gap-2 items-center">
      {icon}
      <p>{name}</p>
    </div>

    <ArrowUpRight className="w-3 h-3" />
  </ButtonLink>
)
