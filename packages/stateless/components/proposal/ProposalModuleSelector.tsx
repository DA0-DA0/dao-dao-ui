import clsx from 'clsx'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  PreProposeModuleType,
  ProposalModule,
  ProposalModuleAdapter,
  TypedOption,
} from '@dao-dao/types'
import { ContractName } from '@dao-dao/utils'

import { useDaoInfoContext } from '../../contexts'
import { SegmentedControls } from '../inputs/SegmentedControls'

export type ProposalModuleSelectorProps = {
  /**
   * Address of the selected proposal module.
   */
  selected: string
  setSelected: (proposalModule: ProposalModule) => void
  matchAdapter: (
    contractNameToMatch: string
  ) => ProposalModuleAdapter | undefined
  /**
   * Optional class name for the container.
   */
  className?: string
}

export const ProposalModuleSelector = ({
  selected: _selected,
  setSelected,
  matchAdapter,
  className,
}: ProposalModuleSelectorProps) => {
  const { t } = useTranslation()
  const { proposalModules } = useDaoInfoContext()

  // List of proposal modules available, using the adapter ID to derive a label
  // to display in the selector.
  const options = useMemo(
    () =>
      proposalModules
        // Disallow selecting Neutron overrule proposal module, as it is used
        // automatically in SubDAOs.
        .filter(
          ({ prePropose }) =>
            prePropose?.type !== PreProposeModuleType.NeutronOverruleSingle
        )
        .map((proposalModule): TypedOption<ProposalModule> | undefined => {
          const adapter = matchAdapter(proposalModule.contractName)

          return (
            adapter && {
              label: t(`proposalModuleLabel.${adapter.id}`),
              value: proposalModule,
            }
          )
        })
        .filter((item): item is TypedOption<ProposalModule> => !!item)
        // Ignore proposals with an approver pre-propose since those are
        // automatically managed by a pre-propose-approval contract in another
        // DAO.
        .filter(
          ({ value: { prePropose } }) =>
            prePropose?.contractName !== ContractName.PreProposeApprover
        )
        // Sort proposal modules by prefix.
        .sort((a, b) => a.value.prefix.localeCompare(b.value.prefix)),
    [matchAdapter, proposalModules, t]
  )

  const selected = proposalModules.find((m) => m.address === _selected)

  return (
    <div
      className={clsx(
        'flex flex-row flex-wrap items-center gap-x-4 gap-y-2',
        className
      )}
    >
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
