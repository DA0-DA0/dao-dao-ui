import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { matchAdapter as matchProposalModuleAdapter } from '@dao-dao/stateful/proposal-module-adapter'
import { ProposalModule, TypedOption } from '@dao-dao/types'

import { useDaoInfoContext } from '../../hooks'
import { SegmentedControls } from '../inputs/SegmentedControls'

export type ProposalModuleSelectorProps = {
  selected: ProposalModule
  setSelected: (proposalModule: ProposalModule) => void
}

export const ProposalModuleSelector = ({
  selected,
  setSelected,
}: ProposalModuleSelectorProps) => {
  const { t } = useTranslation()
  const { proposalModules } = useDaoInfoContext()

  // List of proposal modules available, using the adapter ID to derive a label
  // to display in the selector.
  const options = useMemo(
    () =>
      proposalModules
        .map((proposalModule): TypedOption<ProposalModule> | undefined => {
          const adapter = matchProposalModuleAdapter(
            proposalModule.contractName
          )

          return (
            adapter && {
              label: t(`proposalModuleLabel.${adapter.id}`),
              value: proposalModule,
            }
          )
        })
        .filter((item): item is TypedOption<ProposalModule> => !!item),
    [proposalModules, t]
  )

  return (
    <div className="flex flex-row flex-wrap items-center gap-x-8 gap-y-4">
      <p className="title-text">{t('title.proposalType')}</p>

      <SegmentedControls
        className="w-max"
        onSelect={setSelected}
        selected={selected}
        tabs={options}
      />
    </div>
  )
}
