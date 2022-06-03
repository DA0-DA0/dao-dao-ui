import { EyeIcon, EyeOffIcon, PlusIcon } from '@heroicons/react/outline'
import { useCallback, useState } from 'react'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import { Airplane } from '@dao-dao/icons'
import {
  useWallet,
  useProposalModule,
  walletCw20BalanceSelector,
} from '@dao-dao/state'
import {
  pauseInfoSelector,
  votingPowerAtHeightSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  Template,
  TemplateKey,
  useTemplatesForVotingModuleType,
  UseTransformToCosmos,
} from '@dao-dao/templates'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import {
  Button,
  MarkdownPreview,
  CosmosMessageDisplay,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  Tooltip,
  TextInput,
} from '@dao-dao/ui'
import { validateRequired, decodedMessagesString } from '@dao-dao/utils'

import ConnectWalletButton from '../ConnectWalletButton'
import { useOrgInfoContext } from '../OrgPageWrapper'
import { SuspenseLoader } from '../SuspenseLoader'
import { TemplateSelector } from '../TemplateSelector'

interface TemplateKeyAndData {
  key: TemplateKey
  data: any
}

interface FormProposalData {
  title: string
  description: string
  templateData: TemplateKeyAndData[]
}

export interface ProposalData extends Omit<FormProposalData, 'templateData'> {
  messages: CosmosMsgFor_Empty[]
}

interface CreateProposalFormProps {
  onSubmit: (data: ProposalData) => void
  loading: boolean
}

export const CreateProposalForm = ({
  onSubmit,
  loading,
}: CreateProposalFormProps) => {
  const { coreAddress, votingModuleType } = useOrgInfoContext()
  const { connected, address: walletAddress } = useWallet()

  const { proposalModuleConfig } = useProposalModule(coreAddress)

  // Info about if deposit can be paid.
  const depositTokenBalance = useRecoilValue(
    proposalModuleConfig?.deposit_info?.deposit &&
      proposalModuleConfig?.deposit_info?.deposit !== '0'
      ? walletCw20BalanceSelector(
          proposalModuleConfig?.deposit_info?.token as string
        )
      : constSelector(undefined)
  )

  const canPayDeposit =
    !proposalModuleConfig?.deposit_info?.deposit ||
    proposalModuleConfig?.deposit_info?.deposit === '0' ||
    Number(depositTokenBalance?.balance) >=
      Number(proposalModuleConfig?.deposit_info?.deposit)

  // Info about if sufficent voting power to create a proposal.
  const votingPowerAtHeight = useRecoilValue(
    walletAddress
      ? votingPowerAtHeightSelector({
          contractAddress: coreAddress,
          params: [
            {
              address: walletAddress,
            },
          ],
        })
      : constSelector(undefined)
  )
  const canPropose = votingPowerAtHeight && votingPowerAtHeight.power !== '0'

  // Info about if the DAO is paused.
  const pauseInfo = useRecoilValue(
    pauseInfoSelector({ contractAddress: coreAddress })
  )
  const isPaused = pauseInfo && 'Paused' in pauseInfo

  const formMethods = useForm<FormProposalData>({
    mode: 'onChange',
  })

  // Unpack here because we use these at the top level as well as
  // inside of nested components.
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods

  const [showPreview, setShowPreview] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)

  const proposalDescription = watch('description')
  const proposalTitle = watch('title')
  const proposalTemplateData = watch('templateData')

  const { append, remove } = useFieldArray({
    name: 'templateData',
    control,
    shouldUnregister: true,
  })

  const templates = useTemplatesForVotingModuleType(votingModuleType)
  // Call relevant template hooks in the same order every time.
  const templatesAndTransforms: Partial<
    Record<
      TemplateKey,
      { template: Template; transform: ReturnType<UseTransformToCosmos> }
    >
  > = templates.reduce(
    (acc, template) => ({
      ...acc,
      [template.key]: {
        template,
        transform: template.useTransformToCosmos(coreAddress),
      },
    }),
    {}
  )

  const onSubmitForm: SubmitHandler<FormProposalData> = useCallback(
    ({ templateData, ...data }) =>
      onSubmit({
        ...data,
        messages: templateData
          .map(({ key, data }) => templatesAndTransforms[key]?.transform(data))
          // Filter out undefined messages.
          .filter(Boolean) as CosmosMsgFor_Empty[],
      }),
    // templatesAndTransforms changes every render, causing unnecessary
    // re-renders, but templates doesn't change, so we can use it as a
    // replacement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSubmit, templates]
  )

  return (
    <FormProvider {...formMethods}>
      <form className="max-w-[800px]" onSubmit={handleSubmit(onSubmitForm)}>
        {showPreview && (
          <>
            <div className="max-w-prose">
              <h1 className="my-6 text-xl header-text">{proposalTitle}</h1>
            </div>
            <div className="mt-[22px] mb-[36px]">
              <MarkdownPreview markdown={proposalDescription} />
            </div>
            <CosmosMessageDisplay
              value={decodedMessagesString(
                proposalTemplateData
                  .map(({ key, data }) =>
                    templatesAndTransforms[key]?.transform(data)
                  )
                  // Filter out undefined messages.
                  .filter(Boolean) as CosmosMsgFor_Empty[]
              )}
            />
          </>
        )}
        <div className={showPreview ? 'hidden' : ''}>
          <div className="flex flex-col gap-1 my-3">
            <InputLabel name="Title" />
            <TextInput
              error={errors.title}
              label="title"
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.title} />
          </div>
          <div className="flex flex-col gap-1 my-3">
            <InputLabel name="Description" />
            <TextAreaInput
              error={errors.description}
              label="description"
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.description} />
          </div>
          <ul className="list-none">
            {(proposalTemplateData ?? []).map(({ key }, index) => {
              const Component = templatesAndTransforms[key]?.template?.Component
              if (!Component) {
                throw new Error(`Error detecting template type ${key}`)
              }

              return (
                <li key={index}>
                  <Component
                    SuspenseLoader={SuspenseLoader}
                    coreAddress={coreAddress}
                    errors={errors.templateData?.[index]?.data || {}}
                    getLabel={(fieldName) =>
                      `templateData.${index}.data.${fieldName}`
                    }
                    onRemove={() => remove(index)}
                  />
                </li>
              )
            })}
          </ul>
          <div className="mt-2">
            <Button
              onClick={() => setShowTemplateSelector((s) => !s)}
              type="button"
              variant="secondary"
            >
              <PlusIcon className="inline h-4" /> Add component
            </Button>
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          {connected ? (
            <Tooltip
              label={
                !canPropose
                  ? 'You must have staked governance tokens to create a proposal'
                  : !canPayDeposit
                  ? 'You do not have enough unstaked tokens to pay the proposal deposit'
                  : isPaused
                  ? 'The DAO is paused'
                  : undefined
              }
            >
              <Button
                disabled={!canPropose || !canPayDeposit || isPaused}
                loading={loading}
                type="submit"
              >
                Publish{' '}
                <Airplane color="currentColor" height="14px" width="14px" />
              </Button>
            </Tooltip>
          ) : (
            <ConnectWalletButton />
          )}
          <Button
            onClick={() => setShowPreview((p) => !p)}
            type="button"
            variant="secondary"
          >
            {showPreview ? (
              <>
                Hide preview
                <EyeOffIcon className="inline ml-2 h-5 stroke-current" />
              </>
            ) : (
              <>
                Preview
                <EyeIcon className="inline ml-2 h-5 stroke-current" />
              </>
            )}
          </Button>
        </div>
      </form>

      {showTemplateSelector && (
        <TemplateSelector
          onClose={() => setShowTemplateSelector(false)}
          onSelectTemplate={({ key, getDefaults }) => {
            append({
              key,
              data: getDefaults({ walletAddress: walletAddress ?? '' }),
            })
            setShowTemplateSelector(false)
          }}
        />
      )}
    </FormProvider>
  )
}
