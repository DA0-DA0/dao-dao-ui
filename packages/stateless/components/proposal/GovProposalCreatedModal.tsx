import { useTranslation } from 'react-i18next'

import { ProposalCardProps } from '@dao-dao/types'
import { SITE_URL, getGovProposalPath } from '@dao-dao/utils'

import {
  ItemCreatedModal,
  ItemCreatedModalProps,
} from '../modals/ItemCreatedModal'
import { ProposalCard } from './ProposalCard'

export type GovProposalCreatedModalProps = Omit<
  ItemCreatedModalProps<ProposalCardProps>,
  'Item' | 'header' | 'url'
>

export const GovProposalCreatedModal = (
  props: GovProposalCreatedModalProps
) => {
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
        getGovProposalPath(
          props.itemProps.dao.coreAddressOrId,
          props.itemProps.id
        )
      }
    />
  )
}
