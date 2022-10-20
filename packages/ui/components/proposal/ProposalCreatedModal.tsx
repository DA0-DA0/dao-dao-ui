import { useTranslation } from 'react-i18next'

import { ProposalCardProps } from '@dao-dao/tstypes'
import { SITE_URL } from '@dao-dao/utils'

import { ItemCreatedModal, ItemCreatedModalProps } from '../modals/ItemCreatedModal'
import { ProposalCard } from './ProposalCard'

export type ProposalCreatedModalProps = Omit<
  ItemCreatedModalProps<ProposalCardProps>,
  'Item' | 'header' | 'url'
>

export const ProposalCreatedModal = (props: ProposalCreatedModalProps) => {
  const { t } = useTranslation()

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
        `/dao/${props.itemProps.dao.coreAddress}/proposals/${props.itemProps.id}`
      }
    />
  )
}
