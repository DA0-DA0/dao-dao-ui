import { ComponentProps, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { NftCardProps, NftCard as StatelessNftCard } from '@dao-dao/stateless'

import { EntityDisplay } from '../EntityDisplay'

export const NftCard = forwardRef<
  HTMLDivElement,
  Omit<NftCardProps, 'EntityDisplay'>
>(function NftCard(props, ref) {
  return <StatelessNftCard {...props} EntityDisplay={EntityDisplay} ref={ref} />
})

export const NftCardNoCollection = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof NftCard>
>(function NftCard(props, ref) {
  return <NftCard {...props} hideCollection ref={ref} />
})

export const StakedNftCard = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof NftCard>
>(function NftCard(props, ref) {
  const { t } = useTranslation()

  return (
    <NftCard
      {...props}
      hideCollection
      ownerLabel={t('title.staker')}
      ref={ref}
    />
  )
})
