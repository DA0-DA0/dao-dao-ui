import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

import { NftCardProps, NftCard as StatelessNftCard } from '@dao-dao/stateless'

import { EntityDisplay } from './EntityDisplay'

export const NftCard = (props: Omit<NftCardProps, 'EntityDisplay'>) => (
  <StatelessNftCard {...props} EntityDisplay={EntityDisplay} />
)

export const StakedNftCard = (props: ComponentProps<typeof NftCard>) => {
  const { t } = useTranslation()
  return <NftCard ownerLabel={t('title.staker')} {...props} />
}
