import { ArrowOutwardRounded, Code, Twitter } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonLink } from '../buttons'
import { GithubIcon } from '../icons'
import { DiscordIcon } from '../icons/DiscordIcon'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-1 text-text-tertiary">
      <FooterItem
        Icon={Code}
        href="https://docs.daodao.zone"
        name={t('title.documentation')}
      />
      <FooterItem
        Icon={Twitter}
        href="https://twitter.com/DA0_DA0"
        name={t('title.twitter')}
      />
      <FooterItem
        Icon={DiscordIcon}
        href="https://discord.daodao.zone"
        name={t('title.discord')}
      />
      <FooterItem
        Icon={GithubIcon}
        href="https://github.com/DA0-DA0"
        name={t('title.github')}
      />
    </div>
  )
}

export interface FooterItemProps {
  href: string
  Icon: ComponentType<{ className: string }>
  name: string
}

export const FooterItem = ({ href, Icon, name }: FooterItemProps) => (
  <ButtonLink
    contentContainerClassName="justify-between"
    href={href}
    variant="ghost"
  >
    <div className="flex flex-row items-center gap-2">
      <Icon className="!h-4 !w-4" />
      <p>{name}</p>
    </div>

    <ArrowOutwardRounded className="!h-4 !w-4" />
  </ButtonLink>
)
