import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { Close } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useFormContext,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/common'
import { Airplane } from '@dao-dao/icons'
import { useWalletProfile } from '@dao-dao/state'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import { CosmosMsgFor_Empty } from '@dao-dao/tstypes/contracts/common'
import {
  ActionCardLoader,
  ActionSelector,
  Button,
  CosmosMessageDisplay,
  FilterableItemPopup,
  IconButton,
  InputErrorMessage,
  ProposalContentDisplay,
  TextAreaInput,
  TextInput,
  Tooltip,
} from '@dao-dao/ui'
import { decodedMessagesString, validateRequired } from '@dao-dao/utils'

import {
  BaseNewProposalProps,
  IProposalModuleAdapterCommonOptions,
} from '../../../../types'
import { NewProposalData, NewProposalForm } from '../../types'

enum ProposeSubmitValue {
  Preview = 'Preview',
  Submit = 'Submit',
}

export interface NewProposalProps
  extends Pick<
    BaseNewProposalProps<NewProposalForm>,
    | 'draft'
    | 'saveDraft'
    | 'drafts'
    | 'loadDraft'
    | 'unloadDraft'
    | 'draftSaving'
    | 'deleteDraft'
  > {
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
}

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
  draft,
  saveDraft,
  drafts,
  loadDraft,
  unloadDraft,
  draftSaving,
  deleteDraft,
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
  } = useFormContext<NewProposalForm>()

  const [showPreview, setShowPreview] = useState(false)
  const [showSubmitErrorNote, setShowSubmitErrorNote] = useState(false)

  const { walletAddress = '', walletProfile } = useWalletProfile()

  const proposalDescription = watch('description')
  const proposalTitle = watch('title')
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

  const proposalName = watch('title')

  return (
    <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)}>
      <div className="bg-background-tertiary rounded-lg">
        <div className="border-border-secondary flex flex-row items-center justify-between gap-6 border-b py-4 px-6">
          <p className="primary-text text-text-body">
            {t('form.proposalsName')}
          </p>

          <div className="flex grow flex-col">
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

      <p className="title-text text-text-body my-6">
        {t('title.actions', { count: proposalActionData.length })}
      </p>

      {proposalActionData.length > 0 && (
        <div className="mb-4 flex flex-col gap-1">
          {proposalActionData.map((actionData, index) => {
            const Component = actionsWithData[actionData.key]?.action?.Component
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

      <ActionSelector
        actions={actions}
        onSelectAction={({ key }) => {
          append({
            key,
            data: actionsWithData[key]?.defaults ?? {},
          })
        }}
      />

      <div className="border-border-secondary mt-6 flex flex-col gap-2 border-y py-6">
        <div className="flex flex-row items-center justify-between gap-6">
          <p className="text-text-body title-text">
            {t('info.reviewYourProposal')}
          </p>

          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              disabled={loading}
              type="submit"
              value={ProposeSubmitValue.Preview}
              variant="secondary"
            >
              {showPreview ? (
                <>
                  {t('button.hidePreview')}
                  <EyeOffIcon className="h-5 w-5" />
                </>
              ) : (
                <>
                  {t('button.preview')}
                  <EyeIcon className="h-5 w-5" />
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
                <Airplane className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>

        {showSubmitErrorNote && (
          <p className="text-text-interactive-error secondary-text text-right">
            {t('error.createProposalSubmitInvalid')}
          </p>
        )}

        {showPreview && (
          <div className="border-border-secondary mt-4 rounded-md border p-6">
            <ProposalContentDisplay
              actionDisplay={
                proposalActionData.length ? (
                  <CosmosMessageDisplay
                    value={decodedMessagesString(
                      proposalActionData
                        .map(({ key, data }) =>
                          actionsWithData[key]?.transform(data)
                        )
                        // Filter out undefined messages.
                        .filter(Boolean) as CosmosMsgFor_Empty[]
                    )}
                  />
                ) : undefined
              }
              createdAt={new Date()}
              creator={{
                address: walletAddress,
                name: walletProfile.loading
                  ? walletProfile
                  : { loading: false, data: walletProfile.data.name },
              }}
              description={proposalDescription}
              title={proposalTitle}
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-row items-center justify-end gap-2">
        {draft ? (
          <>
            <p
              className={clsx(
                'caption-text italic',
                draftSaving && 'animate-pulse'
              )}
            >
              {draftSaving
                ? t('info.draftSaving')
                : t('info.draftSavedAtTime', {
                    time: new Date(draft.lastUpdatedAt).toLocaleTimeString(),
                  })}
            </p>

            <Tooltip
              title={draftSaving ? undefined : t('info.draftStillSaved')}
            >
              <Button
                className="caption-text -ml-1"
                disabled={draftSaving}
                onClick={unloadDraft}
                variant="underline"
              >
                {t('button.resetQuestion')}
              </Button>
            </Tooltip>
          </>
        ) : (
          <>
            {drafts.length > 0 && (
              <FilterableItemPopup
                Trigger={({ open, ...props }) => (
                  <Button pressed={open} variant="secondary" {...props}>
                    {t('button.loadDraft')}
                  </Button>
                )}
                filterableItemKeys={FILTERABLE_KEYS}
                items={drafts.map(
                  ({ name, createdAt, lastUpdatedAt }, index) => ({
                    key: createdAt,
                    label: name,
                    description: (
                      <>
                        Created: {new Date(createdAt).toLocaleString()}
                        <br />
                        Last updated: {new Date(lastUpdatedAt).toLocaleString()}
                      </>
                    ),
                    rightNode: (
                      <Tooltip title={t('button.deleteDraft')}>
                        <IconButton
                          Icon={Close}
                          onClick={(event) => {
                            // Don't click on item button.
                            event.stopPropagation()
                            deleteDraft(index)
                          }}
                          variant="ghost"
                        />
                      </Tooltip>
                    ),
                  })
                )}
                onSelect={(_, index) => loadDraft(index)}
                popupClassName="!w-[24rem] max-w-[96vw] max-h-[96vh]"
                position="left"
                searchPlaceholder={t('info.searchDraftPlaceholder')}
              />
            )}

            <Tooltip
              title={
                proposalName ? undefined : t('info.enterNameBeforeSavingDraft')
              }
            >
              <Button
                disabled={!proposalName}
                onClick={saveDraft}
                variant="secondary"
              >
                {t('button.saveDraft')}
              </Button>
            </Tooltip>
          </>
        )}
      </div>
    </form>
  )
}

const FILTERABLE_KEYS = ['name']
