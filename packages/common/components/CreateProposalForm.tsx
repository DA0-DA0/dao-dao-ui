import { EyeIcon, EyeOffIcon, PlusIcon } from '@heroicons/react/outline'
import { ReactNode, useCallback, useState } from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Action,
  ActionKey,
  ActionSelector,
  FormProposalData,
  UseDefaults,
  UseTransformToCosmos,
  useActionsForVotingModuleType,
} from '@dao-dao/actions'
import { Airplane } from '@dao-dao/icons'
import {
  useProposalModule,
  useVotingModule,
  useWallet,
  walletCw20BalanceSelector,
} from '@dao-dao/state'
import { pauseInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import {
  Button,
  CosmosMessageDisplay,
  InputErrorMessage,
  InputLabel,
  MarkdownPreview,
  TextAreaInput,
  TextInput,
  Tooltip,
} from '@dao-dao/ui'
import {
  VotingModuleType,
  decodedMessagesString,
  validateRequired,
} from '@dao-dao/utils'

enum ProposeSubmitValue {
  Preview = 'Preview',
  Submit = 'Submit',
}

export interface ProposalData extends Omit<FormProposalData, 'actionData'> {
  messages: CosmosMsgFor_Empty[]
}

export interface CreateProposalFormProps {
  onSubmit: (data: ProposalData) => void
  loading: boolean
  coreAddress: string
  votingModuleType: VotingModuleType
  connectWalletButton?: ReactNode
}

export const CreateProposalForm = ({
  onSubmit,
  loading,
  coreAddress,
  votingModuleType,
  connectWalletButton,
}: CreateProposalFormProps) => {
  const { connected } = useWallet()

  const { proposalModuleConfig } = useProposalModule(coreAddress)
  const { isMember } = useVotingModule(coreAddress)

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

  // Info about if the DAO is paused.
  const pauseInfo = useRecoilValue(
    pauseInfoSelector({ contractAddress: coreAddress })
  )
  const isPaused = pauseInfo && 'Paused' in pauseInfo

  const formMethods = useForm<FormProposalData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      actionData: [],
    },
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
  const [showActionSelector, setShowActionSelector] = useState(false)
  const [showSubmitErrorNote, setShowSubmitErrorNote] = useState(false)

  const proposalDescription = watch('description')
  const proposalTitle = watch('title')
  const proposalActionData = watch('actionData')

  const { append, remove } = useFieldArray({
    name: 'actionData',
    control,
    shouldUnregister: true,
  })

  const actions = useActionsForVotingModuleType(votingModuleType)
  // Call relevant action hooks in the same order every time.
  const actionsWithData: Partial<
    Record<
      ActionKey,
      {
        action: Action
        transform: ReturnType<UseTransformToCosmos>
        defaults: ReturnType<UseDefaults>
      }
    >
  > = actions.reduce(
    (acc, action) => ({
      ...acc,
      [action.key]: {
        action,
        transform: action.useTransformToCosmos(coreAddress),
        defaults: action.useDefaults(coreAddress),
      },
    }),
    {}
  )

  const onSubmitForm: SubmitHandler<FormProposalData> = useCallback(
    ({ actionData, ...data }, event) => {
      setShowSubmitErrorNote(false)

      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      if (submitterValue === ProposeSubmitValue.Preview) {
        setShowPreview((p) => !p)
        return
      }

      onSubmit({
        ...data,
        messages: actionData
          .map(({ key, data }) => actionsWithData[key]?.transform(data))
          // Filter out undefined messages.
          .filter(Boolean) as CosmosMsgFor_Empty[],
      })
    },
    [onSubmit, actionsWithData]
  )

  const onSubmitError: SubmitErrorHandler<FormProposalData> = useCallback(
    () => setShowSubmitErrorNote(true),
    [setShowSubmitErrorNote]
  )

  return (
    <FormProvider {...formMethods}>
      <form
        className="max-w-[800px]"
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
      >
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
                proposalActionData
                  .map(({ key, data }) => actionsWithData[key]?.transform(data))
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
            {proposalActionData.map((actionData, index) => {
              const Component =
                actionsWithData[actionData.key]?.action?.Component
              if (!Component) {
                throw new Error(`Error detecting action type ${actionData.key}`)
              }

              return (
                <li key={index}>
                  <Component
                    allActionsWithData={proposalActionData}
                    coreAddress={coreAddress}
                    errors={errors.actionData?.[index]?.data || {}}
                    getLabel={(fieldName) =>
                      `actionData.${index}.data.${fieldName}`
                    }
                    index={index}
                    onRemove={() => remove(index)}
                  />
                </li>
              )
            })}
          </ul>
          <div className="mt-2">
            <Button
              onClick={() => setShowActionSelector((s) => !s)}
              type="button"
              variant="secondary"
            >
              <PlusIcon className="inline h-4" /> Add action
            </Button>
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          {connected ? (
            <Tooltip
              label={
                !isMember
                  ? 'You must be a member of the org to create a proposal.'
                  : !canPayDeposit
                  ? 'You do not have enough unstaked tokens to pay the proposal deposit.'
                  : isPaused
                  ? 'The DAO is paused.'
                  : undefined
              }
            >
              <Button
                disabled={!isMember || !canPayDeposit || isPaused}
                loading={loading}
                type="submit"
                value={ProposeSubmitValue.Submit}
              >
                Publish{' '}
                <Airplane color="currentColor" height="14px" width="14px" />
              </Button>
            </Tooltip>
          ) : (
            connectWalletButton
          )}
          <Button
            type="submit"
            value={ProposeSubmitValue.Preview}
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
        {showSubmitErrorNote && (
          <p className="mt-2 text-right text-error secondary-text">
            Correct the errors above before previewing or publishing.
          </p>
        )}
      </form>

      {showActionSelector && (
        <ActionSelector
          onClose={() => setShowActionSelector(false)}
          onSelectAction={({ key }) => {
            append({
              key,
              data: actionsWithData[key]?.defaults ?? {},
            })
            setShowActionSelector(false)
          }}
          votingModuleType={votingModuleType}
        />
      )}
    </FormProvider>
  )
}
