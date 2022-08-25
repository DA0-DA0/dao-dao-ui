import { ReactNode } from 'react'

import { ArrowUpRight, Code, Discord, Twitter } from '@dao-dao/icons'

export interface FooterProps {}

const FooterItem = ({ icon, name }: { icon: ReactNode; name: string }) => (
  <div className="flex flex-row justify-between items-center p-2 hover:bg-background-interactive-hover rounded-md cursor-pointer">
    <div className="flex flex-row gap-2 items-center text-text-tertiary">
      <div>{icon}</div>
      <div>{name}</div>
    </div>

    <ArrowUpRight className="text-text-tertiary" height={12} width={12} />
  </div>
)

export const Footer = ({}: FooterProps) => {
  return (
    <div className="max-w-sm">
      <div className="py-4 text-text-tertiary">
        Website is currrently in beta. Please let the developers know if you
        encounter any issues.
      </div>
      <div className="flex flex-col">
        <FooterItem
          icon={<Code className="text-text-tertiary" />}
          name="Documentation"
        />
        <FooterItem
          icon={<Twitter className="text-text-tertiary" />}
          name="Twitter"
        />
        <FooterItem
          icon={<Discord className="text-text-tertiary" />}
          name="Discord"
        />
      </div>
    </div>
  )
}
