import { useTranslation } from 'react-i18next'

import { ProposalCardProps } from '@dao-dao/types'
import { SITE_URL } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import {
  ItemCreatedModal,
  ItemCreatedModalProps,
} from '../modals/ItemCreatedModal'
import { ProposalCard } from './ProposalCard'

export type ProposalCreatedModalProps = Omit<
  ItemCreatedModalProps<ProposalCardProps>,
  'Item' | 'header' | 'url'
>

export const ProposalCreatedModal = (props: ProposalCreatedModalProps) => {
  const { t } = useTranslation()
  const { getDaoProposalPath } = useDaoNavHelpers()

  return (
    <ItemCreatedModal<ProposalCardProps>
      {...props}
      Item={ProposalCard}
      header={{
        title: t('title.congratsOnProposal', {
          name: `${t('title.proposal')} ${props.itemProps.id}`,
        }),
        subtitle: t('info.easilyShareLink'),
      }}
      url={
        SITE_URL +
        getDaoProposalPath(props.itemProps.dao.coreAddress, props.itemProps.id)
      }
    />
  )
}
