import { ReactNode } from 'react'

import { ArrowUpRight, Code, Discord, Twitter } from '@dao-dao/icons'
import { useTranslation } from 'react-i18next'

export interface FooterProps {}

const FooterItem = ({ icon, name }: { icon: ReactNode; name: string }) => (
  <div className="flex flex-row justify-between items-center p-2 hover:bg-background-interactive-hover rounded-md cursor-pointer">
    <div className="flex flex-row gap-2 items-center text-text-tertiary">
      <div>{icon}</div>
      <p>{name}</p>
    </div>

    <ArrowUpRight className="text-text-tertiary" height={12} width={12} />
  </div>
)

export const Footer = ({}: FooterProps) => {
  const { t } = useTranslation()
  return (
    <div className="max-w-sm text-text-tertiary">
      <p className="py-4">{t('splash.footerBeta')}</p>
      <div className="flex flex-col">
        <FooterItem
          icon={<Code className="w-4 h-4" />}
          name={t('title.documentation')}
        />
        <FooterItem icon={<Twitter className="w-4 h-4" />} name="Twitter" />
        <FooterItem icon={<Discord className="w-4 h-4" />} name="Discord" />
      </div>
    </div>
  )
}
