import { useTranslation } from 'react-i18next'

import { SITE_URL } from '@dao-dao/utils'

import { ItemCreatedModal, ItemCreatedModalProps } from '../../ItemCreatedModal'
import { DaoCard, DaoCardProps } from '../DaoCard'

export type DaoCreatedModalProps = Omit<
  ItemCreatedModalProps<DaoCardProps>,
  'Item' | 'header' | 'url'
>

export const DaoCreatedModal = (props: DaoCreatedModalProps) => {
  const { t } = useTranslation()

  return (
    <ItemCreatedModal<DaoCardProps>
      {...props}
      Item={DaoCard}
      header={{
        title: t('title.congratsOnDao'),
        subtitle: t('info.easilyShareLink'),
      }}
      url={SITE_URL + `/dao/${props.itemProps.coreAddress}`}
    />
  )
}
