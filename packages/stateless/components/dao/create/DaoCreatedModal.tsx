import { useTranslation } from 'react-i18next'

import { SITE_URL } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../../hooks'
import {
  ItemCreatedModal,
  ItemCreatedModalProps,
} from '../../modals/ItemCreatedModal'
import { DaoCard, DaoCardProps } from '../DaoCard'

export type DaoCreatedModalProps = Omit<
  ItemCreatedModalProps<DaoCardProps>,
  'Item' | 'header' | 'url' | ''
> & {
  subDao: boolean
}

export const DaoCreatedModal = ({ subDao, ...props }: DaoCreatedModalProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  return (
    <ItemCreatedModal<DaoCardProps>
      {...props}
      Item={DaoCard}
      header={{
        title: subDao ? t('title.congratsOnSubDao') : t('title.congratsOnDao'),
        subtitle: t('info.easilyShareLink'),
      }}
      url={SITE_URL + getDaoPath(props.itemProps.coreAddress)}
    />
  )
}
