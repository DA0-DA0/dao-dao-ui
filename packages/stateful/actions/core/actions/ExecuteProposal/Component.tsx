import { ComponentType, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,
  ErrorPage,
  InputErrorMessage,
  InputLabel,
  Loader,
  Modal,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  DaoInfo,
  DaoProvidersProps,
  LoadingDataWithError,
  StatefulProposalLineProps,
  StatefulProposalListProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  extractProposalInfo,
  getChainForChainId,
  isValidBech32Address,
  makeValidateAddress,
  processError,
  validateRequired,
} from '@dao-dao/utils'

export type ExecuteProposalData = {
  chainId: string
  coreAddress: string
  proposalModuleAddress: string
  proposalId: number
}

export type ExecuteProposalOptions = {
  selectedDaoInfo: LoadingDataWithError<DaoInfo>
  AddressInput: ComponentType<AddressInputProps<ExecuteProposalData>>
  ProposalLine: ComponentType<StatefulProposalLineProps>
  ProposalList: ComponentType<StatefulProposalListProps>
  DaoProviders: ComponentType<DaoProvidersProps>
}

export const ExecuteProposalComponent: ActionComponent<
  ExecuteProposalOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    selectedDaoInfo,
    AddressInput,
    ProposalLine,
    ProposalList,
    DaoProviders,
  },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext<ExecuteProposalData>()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const coreAddress = watch((fieldNamePrefix + 'coreAddress') as 'coreAddress')
  const proposalModuleAddress = watch(
    (fieldNamePrefix + 'proposalModuleAddress') as 'proposalModuleAddress'
  )
  const proposalId = watch((fieldNamePrefix + 'proposalId') as 'proposalId')

  const selectedProposalModule =
    selectedDaoInfo.loading ||
    selectedDaoInfo.errored ||
    selectedDaoInfo.updating ||
    !proposalModuleAddress
      ? undefined
      : selectedDaoInfo.data.proposalModules.find(
          (m) => m.address === proposalModuleAddress
        )

  const [showingProposalList, setShowingProposalList] = useState(false)

  return (
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
              makeValidateAddress(getChainForChainId(chainId).bech32_prefix),
            ]}
          />
        </ChainProvider>

        <InputErrorMessage error={errors?.coreAddress} />
        <InputErrorMessage
          error={selectedDaoInfo.errored ? selectedDaoInfo.error : undefined}
        />
      </div>

      <div className="flex flex-col gap-2">
        <InputLabel name={t('title.proposal')} />

        {chainId && coreAddress && selectedProposalModule ? (
          <ProposalLine
            chainId={chainId}
            coreAddress={coreAddress}
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

        {isCreating && (
          <Button
            className="self-start"
            disabled={
              !isValidBech32Address(coreAddress) || selectedDaoInfo.errored
            }
            loading={
              isValidBech32Address(coreAddress) &&
              (selectedDaoInfo.loading || selectedDaoInfo.updating)
            }
            onClick={() => setShowingProposalList(true)}
            variant={selectedProposalModule ? 'secondary' : 'primary'}
          >
            {selectedProposalModule
              ? t('button.changeProposal')
              : t('button.chooseProposal')}
          </Button>
        )}
      </div>

      <Modal
        containerClassName="min-w-[min(50rem,96dvw)]"
        header={{
          title: t('title.chooseProposal'),
        }}
        onClose={() => setShowingProposalList(false)}
        visible={showingProposalList}
      >
        {selectedDaoInfo.loading ? (
          <Loader />
        ) : selectedDaoInfo.errored ? (
          <ErrorPage error={selectedDaoInfo.error} />
        ) : (
          <DaoProviders
            key={
              selectedDaoInfo.data.chainId + selectedDaoInfo.data.coreAddress
            }
            chainId={selectedDaoInfo.data.chainId}
            coreAddress={selectedDaoInfo.data.coreAddress}
          >
            <ProposalList
              hideNotifier
              hideTitle
              onClick={({ proposalId }) => {
                if (selectedDaoInfo.loading || selectedDaoInfo.errored) {
                  return
                }

                try {
                  const { prefix, proposalNumber } =
                    extractProposalInfo(proposalId)
                  const proposalModule =
                    selectedDaoInfo.data.proposalModules.find(
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
                    setShowingProposalList(false)
                  }
                } catch (err) {
                  console.error(err)
                  toast.error(
                    processError(err, {
                      forceCapture: false,
                    })
                  )
                }
              }}
              onlyExecutable
            />
          </DaoProviders>
        )}
      </Modal>
    </>
  )
}
