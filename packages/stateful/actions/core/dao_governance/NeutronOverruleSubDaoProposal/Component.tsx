import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputLabel, useDaoNavHelpers } from '@dao-dao/stateless'
import {
  StatefulEntityDisplayProps,
  StatefulProposalLineProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

import { useActionOptions } from '../../../react'

export type NeutronOverruleSubDaoProposalData = {
  coreAddress: string
  proposalId: string
}

export type NeutronOverruleSubDaoProposalOptions = {
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  ProposalLine: ComponentType<StatefulProposalLineProps>
}

export const NeutronOverruleSubDaoProposalComponent: ActionComponent<
  NeutronOverruleSubDaoProposalOptions
> = ({ fieldNamePrefix, options: { EntityDisplay, ProposalLine } }) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()
  const { watch } = useFormContext<NeutronOverruleSubDaoProposalData>()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const coreAddress = watch((fieldNamePrefix + 'coreAddress') as 'coreAddress')
  const proposalId = watch((fieldNamePrefix + 'proposalId') as 'proposalId')

  return (
    <>
      <div className="flex flex-col gap-1">
        <InputLabel name={t('title.subDao')} />

        <EntityDisplay address={coreAddress} />
      </div>

      <div className="flex flex-col gap-2">
        <InputLabel name={t('title.proposal')} />

        <ProposalLine
          chainId={chainId}
          coreAddress={coreAddress}
          isPreProposeProposal={false}
          proposalId={proposalId}
          proposalViewUrl={getDaoProposalPath(coreAddress, proposalId)}
        />
      </div>
    </>
  )
}
