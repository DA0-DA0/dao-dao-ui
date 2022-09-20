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

import { SuspenseLoader } from '@dao-dao/common'
import { Airplane } from '@dao-dao/icons'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import {
  ActionCardLoader,
  ActionSelector,
  Button,
  InputErrorMessage,
  TextAreaInput,
  TextInput,
  Tooltip,
} from '@dao-dao/ui'
import { validateRequired } from '@dao-dao/utils'

import { IProposalModuleAdapterCommonOptions } from '../../../../types'
import { NewProposalData, NewProposalForm } from '../../types'

enum ProposeSubmitValue {
  Preview = 'Preview',
  Submit = 'Submit',
}

export interface NewProposalProps {
  options: IProposalModuleAdapterCommonOptions
  createProposal: (newProposalData: NewProposalData) => Promise<void>
  loading: boolean
  isPaused: boolean
  isMember: boolean
  depositUnsatisfied: boolean
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
  formMethods: UseFormReturn<NewProposalForm, object>
}

// TODO: Add prefilling in stateful version.
// TODO: Figure out where to put preview logic.
export const NewProposal = ({
  options: { coreAddress, Loader, Logo },
  createProposal,
  loading,
  isPaused,
  isMember,
  depositUnsatisfied,
  connected,
  actions,
  actionsWithData,
  formMethods,
}: NewProposalProps) => {
  const { t } = useTranslation()

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
  const [showSubmitErrorNote, setShowSubmitErrorNote] = useState(false)

  const proposalActionData = watch('actionData')

  const { append, remove } = useFieldArray({
    name: 'actionData',
    control,
    shouldUnregister: true,
  })

  const onSubmitForm: SubmitHandler<NewProposalForm> = useCallback(
    ({ actionData, ...data }, event) => {
      setShowSubmitErrorNote(false)

      const nativeEvent = event?.nativeEvent as SubmitEvent
      const submitterValue = (nativeEvent?.submitter as HTMLInputElement)?.value

      if (submitterValue === ProposeSubmitValue.Preview) {
        setShowPreview((p) => !p)
        return
      }

      createProposal({
        ...data,
        msgs: actionData
          .map(({ key, data }) => actionsWithData[key]?.transform(data))
          // Filter out undefined messages.
          .filter(Boolean) as CosmosMsgFor_Empty[],
      })
    },
    [createProposal, actionsWithData]
  )

  const onSubmitError: SubmitErrorHandler<NewProposalForm> = useCallback(
    () => setShowSubmitErrorNote(true),
    [setShowSubmitErrorNote]
  )

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)}>
        <div className="rounded-lg bg-background-tertiary">
          <div className="flex flex-row gap-6 justify-between items-center py-4 px-6 border-b border-border-secondary">
            <p className="primary-text text-text-body">
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
            <p className="primary-text text-text-body">
              {t('form.description')}
              <span className="text-text-tertiary">
                {/* eslint-disable-next-line i18next/no-literal-string */}
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
        </div>

        <p className="my-6 title-text text-text-body">
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
                    coreAddress={coreAddress}
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
            {t('info.reviewYourProposal')}
          </p>

          <div className="flex flex-row gap-2 justify-end items-center">
            <Button
              disabled={loading}
              type="submit"
              value={ProposeSubmitValue.Preview}
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
                !connected
                  ? t('error.connectWalletToContinue')
                  : !isMember
                  ? t('error.mustBeMemberToCreateProposal')
                  : depositUnsatisfied
                  ? t('error.notEnoughForDeposit')
                  : isPaused
                  ? t('error.daoIsPaused')
                  : undefined
              }
            >
              <Button
                disabled={
                  !connected || !isMember || depositUnsatisfied || isPaused
                }
                loading={loading}
                type="submit"
                value={ProposeSubmitValue.Submit}
              >
                <p>{t('button.publish')}</p>
                <Airplane className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </div>

        {showSubmitErrorNote && (
          <p className="mt-2 text-right text-text-interactive-error secondary-text">
            {t('error.createProposalSubmitInvalid')}
          </p>
        )}
      </form>
    </FormProvider>
  )
}
