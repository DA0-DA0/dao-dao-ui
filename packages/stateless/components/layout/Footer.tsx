import { ArrowOutwardRounded, Code, Twitter } from '@mui/icons-material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonLink } from '../buttons'
import { GithubIcon } from '../icons'
import { DiscordIcon } from '../icons/DiscordIcon'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-1 text-text-tertiary">
      <FooterItem
        href="https://docs.daodao.zone"
        icon={<Code className="!h-4 !w-4" />}
        name={t('title.documentation')}
      />
      <FooterItem
        href="https://github.com/DA0-DA0"
        icon={<GithubIcon className="!h-4 !w-4" />}
        name={t('title.github')}
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

    <ArrowOutwardRounded className="!h-4 !w-4" />
  </ButtonLink>
)
