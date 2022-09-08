import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { useCallback, useState } from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
  useFieldArray,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Action,
  ActionCardLoader,
  ActionKey,
  ActionKeyAndData,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/actions'
import { SuspenseLoader } from '@dao-dao/common'
import { Airplane } from '@dao-dao/icons'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { decodedMessagesString } from '@dao-dao/utils'

import {
  ActionSelector,
  Button,
  CosmosMessageDisplay,
  Loader,
  Logo,
  PageHeader,
  Tooltip,
} from '../components'

export interface WalletForm {
  title: string
  description: string
  actionData: ActionKeyAndData[]
}

export interface WalletProps {
  connected: boolean
  actions: Action[]
  actionsWithData: Partial<
    Record<
      ActionKey,
      {
        action: Action
        transform: ReturnType<UseTransformToCosmos>
        defaults: ReturnType<UseDefaults>
      }
    >
  >
  formMethods: UseFormReturn<WalletForm, object>
  execute: (messages: CosmosMsgFor_Empty[]) => Promise<void>
  walletAddress: string
  loading: boolean
}

enum SubmitValue {
  Preview = 'Preview',
  Submit = 'Submit',
}

export const Wallet = ({
  connected,
  actions,
  actionsWithData,
  formMethods,
  execute,
  walletAddress,
  loading,
}: WalletProps) => {
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods

  const proposalActionData = watch('actionData')

  const { append, remove } = useFieldArray({
    name: 'actionData',
    control,
    shouldUnregister: true,
  })

  const [showPreview, setShowPreview] = useState(false)
  const [showSubmitErrorNote, setShowSubmitErrorNote] = useState(false)

  const onSubmitForm: SubmitHandler<WalletForm> = useCallback(
    ({ actionData }, event) => {
      setShowSubmitErrorNote(false)

      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      if (submitterValue === SubmitValue.Preview) {
        setShowPreview((p) => !p)
        return
      }

      const messages = actionData
        .map(({ key, data }) => actionsWithData[key]?.transform(data))
        // Filter out undefined messages.
        .filter(Boolean) as CosmosMsgFor_Empty[]

      execute(messages)
    },
    [execute, actionsWithData]
  )

  const onSubmitError: SubmitErrorHandler<WalletForm> = useCallback(
    () => setShowSubmitErrorNote(true),
    [setShowSubmitErrorNote]
  )

  return (
    <div className="flex flex-col items-stretch px-6 mx-auto max-w-5xl">
      <PageHeader title={t('title.wallet')} />

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)}>
          {/* <div className="bg-background-tertiary rounded-lg">
            <div className="flex flex-row gap-6 justify-between items-center py-4 px-6 border-b border-border-secondary">
              <p className="text-text-body primary-text">
                {t('form.proposalsName')}
              </p>

              <div className="flex flex-col grow">
                <TextInput
                  error={errors.title}
                  fieldName="title"
                  placeholder={t('form.proposalsNamePlaceholder')}
                  register={register}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors.title} />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-6 pt-5">
              <p className="text-text-body primary-text">
                {t('form.description')}
                <span className="text-text-tertiary">
                  {' – '}
                  {t('info.supportsMarkdownFormat')}
                </span>
              </p>

              <div className="flex flex-col">
                <TextAreaInput
                  error={errors.description}
                  fieldName="description"
                  placeholder={t('form.proposalsDescriptionPlaceholder')}
                  register={register}
                  rows={5}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors.description} />
              </div>
            </div>
          </div> */}

          <p className="my-6 text-text-body title-text">
            {t('title.actions', { count: proposalActionData.length })}
          </p>

          {proposalActionData.length > 0 && (
            <div className="flex flex-col gap-1 mb-4">
              {proposalActionData.map((actionData, index) => {
                const Component =
                  actionsWithData[actionData.key]?.action?.Component
                if (!Component) {
                  throw new Error(
                    `Error detecting action type "${actionData.key}".`
                  )
                }

                return (
                  <SuspenseLoader
                    key={index}
                    fallback={<ActionCardLoader Loader={Loader} />}
                  >
                    <Component
                      Loader={Loader}
                      Logo={Logo}
                      allActionsWithData={proposalActionData}
                      coreAddress={walletAddress}
                      data={actionData.data}
                      errors={errors.actionData?.[index]?.data || {}}
                      fieldNamePrefix={`actionData.${index}.data.`}
                      index={index}
                      isCreating
                      onRemove={() => remove(index)}
                    />
                  </SuspenseLoader>
                )
              })}
            </div>
          )}

          <div className="mb-6">
            <ActionSelector
              actions={actions}
              onSelectAction={({ key }) => {
                append({
                  key,
                  data: actionsWithData[key]?.defaults ?? {},
                })
              }}
            />
          </div>

          <div className="flex flex-row gap-6 justify-between items-center py-6 border-y border-border-secondary">
            <p className="text-text-body title-text">
              {t('info.reviewYourTransaction')}
            </p>

            <div className="flex flex-row gap-2 justify-end items-center">
              <Button
                disabled={loading}
                type="submit"
                value={SubmitValue.Preview}
                variant="secondary"
              >
                {showPreview ? (
                  <>
                    {t('button.hidePreview')}
                    <EyeOffIcon className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    {t('button.preview')}
                    <EyeIcon className="w-5 h-5" />
                  </>
                )}
              </Button>

              <Tooltip
                title={
                  connected ? undefined : t('error.connectWalletToContinue')
                }
              >
                <Button
                  disabled={!connected}
                  loading={loading}
                  type="submit"
                  value={SubmitValue.Submit}
                >
                  {t('button.execute') + ' '}
                  <Airplane className="w-4 h-4" />
                </Button>
              </Tooltip>
            </div>
          </div>

          {showSubmitErrorNote && (
            <p className="mt-2 text-right text-text-error secondary-text">
              {t('error.createProposalSubmitInvalid')}
            </p>
          )}

          {showPreview && (
            <CosmosMessageDisplay
              value={decodedMessagesString(
                proposalActionData
                  .map(({ key, data }) => actionsWithData[key]?.transform(data))
                  // Filter out undefined messages.
                  .filter(Boolean) as CosmosMsgFor_Empty[]
              )}
            />
          )}
        </form>
      </FormProvider>
    </div>
  )
}
