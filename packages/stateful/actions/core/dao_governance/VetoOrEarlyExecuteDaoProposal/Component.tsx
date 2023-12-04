import { CheckBoxOutlineBlankRounded } from '@mui/icons-material'
import { ChangeEvent, ComponentType, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainPickerInput,
  ChainProvider,
  FilterableItemPopup,
  InputErrorMessage,
  InputLabel,
  Loader,
  NoContent,
  SegmentedControls,
  TextInput,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  DaoInfo,
  DaoWithVetoableProposals,
  LoadingDataWithError,
  StatefulEntityDisplayProps,
  StatefulProposalLineProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  getChainForChainId,
  makeValidateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

export type VetoOrEarlyExecuteDaoProposalData = {
  chainId: string
  coreAddress: string
  proposalModuleAddress: string
  proposalId: number
  action: 'veto' | 'earlyExecute'
}

export type VetoOrEarlyExecuteDaoProposalOptions = {
  selectedDaoInfo: LoadingDataWithError<DaoInfo>
  daoVetoableProposals: LoadingDataWithError<DaoWithVetoableProposals[]>
  AddressInput: ComponentType<
    AddressInputProps<VetoOrEarlyExecuteDaoProposalData>
  >
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  ProposalLine: ComponentType<StatefulProposalLineProps>
}

export const VetoOrEarlyExecuteDaoProposalComponent: ActionComponent<
  VetoOrEarlyExecuteDaoProposalOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    selectedDaoInfo,
    daoVetoableProposals,
    AddressInput,
    EntityDisplay,
    ProposalLine,
  },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } =
    useFormContext<VetoOrEarlyExecuteDaoProposalData>()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const coreAddress = watch((fieldNamePrefix + 'coreAddress') as 'coreAddress')
  const proposalModuleAddress = watch(
    (fieldNamePrefix + 'proposalModuleAddress') as 'proposalModuleAddress'
  )
  const proposalId = watch((fieldNamePrefix + 'proposalId') as 'proposalId')

  const selectedKey = getKey(
    chainId,
    coreAddress,
    proposalModuleAddress,
    proposalId
  )
  const selectedProposalModule =
    selectedDaoInfo.loading ||
    selectedDaoInfo.errored ||
    selectedDaoInfo.updating ||
    !proposalModuleAddress
      ? undefined
      : selectedDaoInfo.data.proposalModules.find(
          (m) => m.address === proposalModuleAddress
        )
  const selectedProposal =
    daoVetoableProposals.loading ||
    daoVetoableProposals.errored ||
    !chainId ||
    !coreAddress ||
    !proposalModuleAddress ||
    !proposalId
      ? undefined
      : daoVetoableProposals.data
          .find((d) => d.chainId === chainId && d.dao === coreAddress)
          ?.proposalsWithModule.find(
            ({ proposalModule }) =>
              proposalModule.address === proposalModuleAddress
          )
          ?.proposals.find(({ id }) => id === proposalId)

  const [manualProposalId, setManualProposalId] = useState('')

  return (
    <>
      <SegmentedControls<VetoOrEarlyExecuteDaoProposalData['action']>
        className="max-w-lg"
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

      {!isCreating || (isCreating && daoVetoableProposals.errored) ? (
        <>
          <ChainPickerInput
            className="mb-4"
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'chainId'}
          />

          <div className="flex flex-col gap-1">
            <InputLabel name={t('title.dao')} />

            <ChainProvider chainId={chainId}>
              <AddressInput
                disabled={!isCreating}
                error={errors?.coreAddress}
                fieldName={(fieldNamePrefix + 'coreAddress') as 'coreAddress'}
                register={register}
                validation={[
                  validateRequired,
                  makeValidateContractAddress(
                    getChainForChainId(chainId).bech32_prefix
                  ),
                ]}
              />
            </ChainProvider>

            <InputErrorMessage error={errors?.coreAddress} />
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel name={t('title.proposal')} />

            {isCreating ? (
              <TextInput
                className="self-start"
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  setManualProposalId(e.target.value)
                }
                placeholder={t('form.proposalIdPlaceholder')}
                required
                value={manualProposalId}
              />
            ) : chainId &&
              coreAddress &&
              selectedProposalModule &&
              !selectedDaoInfo.loading &&
              !selectedDaoInfo.errored &&
              !selectedDaoInfo.updating ? (
              <ProposalLine
                chainId={chainId}
                coreAddress={coreAddress}
                isPreProposeProposal={false}
                proposalId={`${selectedProposalModule.prefix}${proposalId}`}
                proposalModules={selectedDaoInfo.data.proposalModules}
                proposalViewUrl={getDaoProposalPath(
                  coreAddress,
                  `${selectedProposalModule.prefix}${proposalId}`
                )}
              />
            ) : (
              <Loader />
            )}
          </div>
        </>
      ) : daoVetoableProposals.loading || daoVetoableProposals.errored ? (
        <Loader />
      ) : daoVetoableProposals.data.length > 0 ? (
        <>
          <InputLabel className="-mb-2" name={t('title.proposal')} />

          <FilterableItemPopup
            filterableItemKeys={FILTERABLE_KEYS}
            items={daoVetoableProposals.data.flatMap(
              ({ chainId, dao, proposalsWithModule }) =>
                proposalsWithModule.flatMap(
                  ({
                    proposalModule: { prefix, address: proposalModuleAddress },
                    proposals,
                  }) =>
                    proposals.map(({ id, proposal }) => {
                      const key = getKey(
                        chainId,
                        dao,
                        proposalModuleAddress,
                        id
                      )

                      return {
                        key,
                        selected: selectedKey === key,
                        label: `${prefix}${id}: ${proposal.title}`,
                        rightNode: (
                          <ChainProvider chainId={chainId}>
                            <EntityDisplay address={dao} />
                          </ChainProvider>
                        ),
                        value: {
                          chainId,
                          coreAddress: dao,
                          proposalModuleAddress,
                          proposalId: id,
                        },
                      }
                    })
                )
            )}
            onSelect={({
              value: {
                chainId,
                coreAddress,
                proposalModuleAddress,
                proposalId,
              },
            }) => {
              setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
              setValue(
                (fieldNamePrefix + 'coreAddress') as 'coreAddress',
                coreAddress
              )
              setValue(
                (fieldNamePrefix +
                  'proposalModuleAddress') as 'proposalModuleAddress',
                proposalModuleAddress
              )
              setValue(
                (fieldNamePrefix + 'proposalId') as 'proposalId',
                proposalId
              )
            }}
            trigger={{
              type: 'button',
              props: {
                className: !selectedProposal ? 'self-start' : undefined,
                variant: 'ghost_outline',
                size: 'lg',
                loading:
                  !!chainId &&
                  !!coreAddress &&
                  (selectedDaoInfo.loading ||
                    selectedDaoInfo.errored ||
                    !!selectedDaoInfo.updating),
                children:
                  chainId &&
                  coreAddress &&
                  !selectedDaoInfo.loading &&
                  !selectedDaoInfo.errored &&
                  !selectedDaoInfo.updating &&
                  selectedProposalModule &&
                  selectedProposal ? (
                    <div className="flex w-full flex-col gap-3">
                      <ChainProvider chainId={chainId}>
                        <EntityDisplay address={coreAddress} />
                      </ChainProvider>

                      <ProposalLine
                        chainId={chainId}
                        coreAddress={coreAddress}
                        isPreProposeProposal={false}
                        proposalId={`${selectedProposalModule.prefix}${selectedProposal.id}`}
                        proposalModules={selectedDaoInfo.data.proposalModules}
                        proposalViewUrl=""
                      />
                    </div>
                  ) : (
                    t('button.chooseProposal')
                  ),
              },
            }}
          />
        </>
      ) : (
        <NoContent
          Icon={CheckBoxOutlineBlankRounded}
          body={t('info.noVetoableProposalsFound')}
          error
        />
      )}
    </>
  )
}

const FILTERABLE_KEYS = ['key', 'label']

const getKey = (
  chainId: string,
  coreAddress: string,
  proposalModuleAddress: string,
  proposalId: number
) => [chainId, coreAddress, proposalModuleAddress, proposalId].join(':')
