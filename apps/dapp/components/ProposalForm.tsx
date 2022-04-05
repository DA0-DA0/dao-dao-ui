import { useState } from 'react'

import { useRecoilValue } from 'recoil'

import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { EyeIcon, EyeOffIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import { walletAddress } from 'selectors/treasury'
import {
  messageTemplates,
  ContractSupport,
  ToCosmosMsgProps,
  MessageTemplate,
  messageTemplateToCosmosMsg,
} from 'templates/templateList'
import {
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import { validateRequired } from 'util/formValidation'
import { decodedMessagesString } from 'util/messagehelpers'

import { CosmosMessageDisplay } from './CosmosMessageDisplay'
import SvgAirplane from './icons/Airplane'
import { InputErrorMessage } from './input/InputErrorMessage'
import { InputLabel } from './input/InputLabel'
import { TextareaInput } from './input/TextAreaInput'
import { TextInput } from './input/TextInput'
import { MarkdownPreview } from './MarkdownPreview'
import { ProposalTemplateSelector } from './TemplateSelector'
import { Button } from 'ui'

interface FormProposalData {
  title: string
  description: string
  messages: MessageTemplate[]
}

export interface ProposalData extends Omit<FormProposalData, 'messages'> {
  messages: CosmosMsgFor_Empty[]
}

interface ProposalFormProps {
  onSubmit: (data: ProposalData) => void
  contractAddress: string
  loading: boolean
  toCosmosMsgProps: ToCosmosMsgProps
  multisig?: boolean
}

export function ProposalForm({
  onSubmit,
  contractAddress,
  loading,
  toCosmosMsgProps,
  multisig,
}: ProposalFormProps) {
  const wallet = useRecoilValue(walletAddress)
  const contractConfig = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig: !!multisig })
  )
  const wrapper = new ContractConfigWrapper(contractConfig)
  const govTokenDecimals = wrapper.gov_token_decimals

  const formMethods = useForm<FormProposalData>()

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
  const proposalMessages = watch('messages')

  const {
    fields: messageFields,
    append,
    remove,
  } = useFieldArray({
    name: 'messages',
    control,
    shouldUnregister: true,
  })

  return (
    <FormProvider {...formMethods}>
      <form
        className=""
        onSubmit={handleSubmit((d) =>
          onSubmit({
            ...d,
            messages: (d.messages as MessageTemplate[])
              .map((m) => messageTemplateToCosmosMsg(m, toCosmosMsgProps))
              // Filter out undefined messages.
              .filter(Boolean) as CosmosMsgFor_Empty[],
          })
        )}
      >
        {showPreview && (
          <>
            <div className="max-w-prose">
              <h1 className="header-text text-xl my-6">{proposalTitle}</h1>
            </div>
            <div className="mt-[22px] mb-[36px]">
              <MarkdownPreview markdown={proposalDescription} />
            </div>
            <CosmosMessageDisplay
              value={decodedMessagesString(
                proposalMessages
                  .map((m) => messageTemplateToCosmosMsg(m, toCosmosMsgProps))
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
              label="title"
              register={register}
              error={errors.title}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.title} />
          </div>
          <div className="flex flex-col gap-1 my-3">
            <InputLabel name="Description" />
            <TextareaInput
              label="description"
              register={register}
              error={errors.description}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.description} />
          </div>
          <ul className="list-none">
            {messageFields.map((data, index) => {
              const label = (data as any).label
              const template = messageTemplates.find(
                (template) => template.label === label
              )
              if (!template) {
                // We guarantee by construction that this should never
                // happen but might as well make it pretty if it does.
                return (
                  <div className="text-error p-2 border border-error rounded-lg my-3 flex items-center justify-between">
                    <p>Internal error finding template for message.</p>
                    <button onClick={() => remove(index)} type="button">
                      <XIcon className="h-4" />
                    </button>
                  </div>
                )
              }
              const Component = template.component
              return (
                <li key={index}>
                  <Component
                    contractAddress={contractAddress}
                    onRemove={() => remove(index)}
                    getLabel={(fieldName) => `messages.${index}.${fieldName}`}
                    errors={(errors.messages && errors.messages[index]) || {}}
                    multisig={multisig}
                  />
                </li>
              )
            })}
          </ul>
          <div className="mt-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowTemplateSelector((s) => !s)}
            >
              <PlusIcon className="h-4 inline" /> Add component
            </Button>
            {showTemplateSelector && (
              <ProposalTemplateSelector
                multisig={!!multisig}
                templates={messageTemplates}
                onClose={() => setShowTemplateSelector(false)}
                onLabelSelect={(label, getDefaults) => {
                  append({
                    ...getDefaults(wallet, contractConfig, govTokenDecimals),
                    label,
                  })
                  setShowTemplateSelector(false)
                }}
              />
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowPreview((p) => !p)}
          >
            {showPreview ? (
              <>
                Hide preview
                <EyeOffIcon className="inline h-5 stroke-current ml-2" />
              </>
            ) : (
              <>
                Preview
                <EyeIcon className="inline h-5 stroke-current ml-2" />
              </>
            )}
          </Button>
          <div data-tip={!wallet ? 'Connect your wallet to submit' : undefined}>
            <Button type="submit" loading={loading}>
              Publish{' '}
              <SvgAirplane color="currentColor" width="14px" height="14px" />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
