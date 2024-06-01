import { useTranslation } from 'react-i18next'

import { DaoCardProps } from '@dao-dao/types'
import { SITE_URL } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../../hooks'
import {
  ItemCreatedModal,
  ItemCreatedModalProps,
} from '../../modals/ItemCreatedModal'
import { DaoCard } from '../DaoCard'

export type DaoCreatedModalProps = Omit<
  ItemCreatedModalProps<DaoCardProps>,
  'Item' | 'header' | 'url'
>

export const DaoCreatedModal = (props: DaoCreatedModalProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  return (
    <ItemCreatedModal<DaoCardProps>
      {...props}
      Item={DaoCard}
      header={{
        title: props.itemProps.info.parentDao
          ? t('title.congratsOnSubDao')
          : t('title.congratsOnDao'),
        subtitle: t('info.easilyShareLink'),
      }}
      url={SITE_URL + getDaoPath(props.itemProps.info.coreAddress)}
    />
  )
}
