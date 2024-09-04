import { CheckBoxOutlineBlankRounded } from '@mui/icons-material'
import { ChangeEvent, ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  FilterableItemPopup,
  InputErrorMessage,
  InputLabel,
  Loader,
  NoContent,
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
  extractProposalInfo,
  getChainForChainId,
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils'

export type VetoProposalData = {
  chainId: string
  coreAddress: string
  proposalModuleAddress: string
  proposalId: number
}

export type VetoProposalOptions = {
  selectedDaoInfo: LoadingDataWithError<DaoInfo>
  daoVetoableProposals: LoadingDataWithError<DaoWithVetoableProposals[]>
  AddressInput: ComponentType<AddressInputProps<VetoProposalData>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  ProposalLine: ComponentType<StatefulProposalLineProps>
}

export const VetoProposalComponent: ActionComponent<VetoProposalOptions> = ({
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
  const { register, watch, setValue } = useFormContext<VetoProposalData>()
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

  const showingSelectedProposal =
    !!chainId &&
    !!coreAddress &&
    !selectedDaoInfo.loading &&
    !selectedDaoInfo.errored &&
    !selectedDaoInfo.updating &&
    !!selectedProposalModule &&
    !!selectedProposal

  const [manualProposalId, setManualProposalId] = useState('')

  // Update fields when manual proposal ID is changed.
  useEffect(() => {
    if (
      !manualProposalId ||
      selectedDaoInfo.loading ||
      selectedDaoInfo.errored
    ) {
      return
    }

    try {
      const { prefix, proposalNumber } = extractProposalInfo(manualProposalId)
      const proposalModule = selectedDaoInfo.data.proposalModules.find(
        (m) => m.prefix === prefix
      )
      if (proposalModule) {
        setValue(
          (fieldNamePrefix +
            'proposalModuleAddress') as 'proposalModuleAddress',
          proposalModule.address
        )
        setValue(
          (fieldNamePrefix + 'proposalId') as 'proposalId',
          proposalNumber
        )
      }
    } catch {}
  }, [fieldNamePrefix, manualProposalId, selectedDaoInfo, setValue])

  return (
    <>
      {!isCreating || (isCreating && daoVetoableProposals.errored) ? (
        <>
          <DaoSupportedChainPickerInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'chainId'}
            onlyDaoChainIds
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
                  makeValidateAddress(
                    getChainForChainId(chainId).bech32_prefix
                  ),
                ]}
              />
            </ChainProvider>

            <InputErrorMessage error={errors?.coreAddress} />
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel name={t('title.proposal')} />

            {isCreating && (
              <TextInput
                className="self-start"
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  setManualProposalId(e.target.value)
                }
                placeholder={t('form.proposalIdPlaceholder')}
                required
                value={manualProposalId}
              />
            )}

            {chainId && coreAddress && selectedProposalModule ? (
              <ProposalLine
                chainId={chainId}
                coreAddress={coreAddress}
                isPreProposeProposal={false}
                openInNewTab
                proposalId={`${selectedProposalModule.prefix}${proposalId}`}
                proposalViewUrl={getDaoProposalPath(
                  coreAddress,
                  `${selectedProposalModule.prefix}${proposalId}`
                )}
              />
            ) : (
              !isCreating && (
                <p className="text-text-interactive-error">
                  {t('error.unexpectedError')}
                </p>
              )
            )}
          </div>
        </>
      ) : daoVetoableProposals.loading || daoVetoableProposals.errored ? (
        <Loader />
      ) : daoVetoableProposals.data.length > 0 ? (
        <>
          <div className="flex flex-col gap-1">
            <InputLabel name={t('title.dao')} />

            <FilterableItemPopup
              filterableItemKeys={FILTERABLE_KEYS}
              items={daoVetoableProposals.data.map((vetoableDao) => ({
                key: getKey(vetoableDao.chainId, vetoableDao.dao, '', -1),
                selected:
                  chainId === vetoableDao.chainId &&
                  coreAddress === vetoableDao.dao,
                label: (
                  <ChainProvider chainId={vetoableDao.chainId}>
                    <EntityDisplay address={vetoableDao.dao} noCopy noLink />
                  </ChainProvider>
                ),
                name: vetoableDao.name,
                value: {
                  chainId,
                  coreAddress: vetoableDao.dao,
                },
                className: '!ring-0',
              }))}
              onSelect={({ value: { chainId, coreAddress } }) => {
                setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
                setValue(
                  (fieldNamePrefix + 'coreAddress') as 'coreAddress',
                  coreAddress
                )
                setValue(
                  (fieldNamePrefix +
                    'proposalModuleAddress') as 'proposalModuleAddress',
                  ''
                )
                setValue((fieldNamePrefix + 'proposalId') as 'proposalId', -1)
              }}
              trigger={{
                type: 'button',
                props: {
                  className: 'self-start',
                  variant:
                    !chainId || !coreAddress ? 'primary' : 'ghost_outline',
                  size: 'lg',
                  children:
                    chainId && coreAddress ? (
                      <ChainProvider chainId={chainId}>
                        <EntityDisplay address={coreAddress} noCopy noLink />
                      </ChainProvider>
                    ) : (
                      t('button.chooseDao')
                    ),
                },
              }}
            />

            <InputErrorMessage error={errors?.coreAddress} />
          </div>

          <div className="flex flex-col items-start gap-2">
            <InputLabel name={t('title.proposal')} />

            {showingSelectedProposal && (
              <div className="self-stretch">
                <ProposalLine
                  chainId={chainId}
                  coreAddress={coreAddress}
                  isPreProposeProposal={false}
                  openInNewTab
                  proposalId={`${selectedProposalModule.prefix}${selectedProposal.id}`}
                  proposalViewUrl=""
                />
              </div>
            )}

            <FilterableItemPopup
              filterableItemKeys={FILTERABLE_KEYS}
              items={daoVetoableProposals.data
                .filter(
                  (vetoableDao) =>
                    vetoableDao.chainId === chainId &&
                    vetoableDao.dao === coreAddress
                )
                .flatMap(({ chainId, dao, proposalsWithModule }) =>
                  proposalsWithModule.flatMap(
                    ({
                      proposalModule: {
                        prefix,
                        address: proposalModuleAddress,
                      },
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
                          value: {
                            chainId,
                            coreAddress: dao,
                            proposalModuleAddress,
                            proposalId: id,
                          },
                          className: '!ring-0',
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
                  variant: showingSelectedProposal ? 'secondary' : 'primary',
                  size: 'lg',
                  disabled: !chainId || !coreAddress,
                  loading:
                    !!chainId &&
                    !!coreAddress &&
                    (selectedDaoInfo.loading ||
                      selectedDaoInfo.errored ||
                      !!selectedDaoInfo.updating),
                  children: showingSelectedProposal
                    ? t('button.changeProposal')
                    : t('button.chooseProposal'),
                },
              }}
            />
          </div>
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

const FILTERABLE_KEYS = ['key', 'label', 'name']

const getKey = (
  chainId: string,
  coreAddress: string,
  proposalModuleAddress: string,
  proposalId: number
) => [chainId, coreAddress, proposalModuleAddress, proposalId].join(':')
