import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SegmentedControls } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'

export type VetoOrEarlyExecuteDaoProposalOptions = {}

export type VetoOrEarlyExecuteDaoProposalData = {
  chainId: string
  coreAddress: string
  proposalModuleAddress: string
  proposalNumber: number
  action: 'veto' | 'earlyExecute'
}

export const VetoOrEarlyExecuteDaoProposalComponent: ActionComponent<
  VetoOrEarlyExecuteDaoProposalOptions
> = ({ fieldNamePrefix, errors, isCreating, options: {} }) => {
  const { t } = useTranslation()
  const { register, watch, setValue } =
    useFormContext<VetoOrEarlyExecuteDaoProposalData>()

  return (
    <>
      <SegmentedControls<VetoOrEarlyExecuteDaoProposalData['action']>
        disabled={!isCreating}
        onSelect={(value) =>
          setValue((fieldNamePrefix + 'action') as 'action', value)
        }
        selected={watch((fieldNamePrefix + 'action') as 'action')}
        tabs={[
          {
            label: t('button.veto'),
            value: 'veto',
          },
          {
            label: t('button.earlyExecute'),
            value: 'earlyExecute',
          },
        ]}
      />
    </>
  )
}
