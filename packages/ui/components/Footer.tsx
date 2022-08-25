import { ArrowUpRight, Code, Discord, Twitter } from '@dao-dao/icons'
import { ReactNode } from 'react'

export interface FooterProps {}

const FooterItem = ({ icon, name }: { icon: ReactNode; name: string }) => (
  <div className="flex flex-row justify-between items-center hover:bg-background-interactive-hover p-2 rounded-md cursor-pointer">
    <div className="flex flex-row gap-2 text-text-tertiary items-center">
      <div>{icon}</div>
      <div>{name}</div>
    </div>

    <ArrowUpRight className="text-text-tertiary" width={12} height={12} />
  </div>
)

export const Footer = ({}: FooterProps) => {
  return (
    <div className="max-w-sm">
      <div className="text-text-tertiary py-4">
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
