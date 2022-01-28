import { PlusIcon } from '@heroicons/react/outline'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { walletAddress } from 'selectors/treasury'
import { validateRequired } from 'util/formValidation'
import { Button } from './Button'
import {
  InputErrorMessage,
  InputLabel,
  TextareaInput,
  TextInput,
} from './InputField'
import { Message, messageTemplates } from './ProposalTemplates'

export interface ProposalData {
  title: string
  description: string
  messages: Message[]
}

export function ProposalForm({
  onSubmit,
  govTokenDenom,
}: {
  onSubmit: (data: ProposalData) => void
  govTokenDenom: string
}) {
  const wallet = useRecoilValue(walletAddress)

  const formMethods = useForm()

  // Unpack here because we use these at the top level as well as
  // inside of nested components.
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods

  const { fields, append, remove } = useFieldArray({
    name: 'messages',
    control,
    shouldUnregister: true,
  })

  return (
    <FormProvider {...formMethods}>
      <form
        className=""
        onSubmit={handleSubmit<ProposalData>((d) =>
          onSubmit(d as ProposalData)
        )}
      >
        <div className="form-control">
          <InputLabel name="Title" />
          <TextInput
            label="title"
            register={register}
            error={errors.title}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors.title} />
        </div>
        <div className="form-control">
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
          {fields.map((data, index) => {
            const Render = (data as any).Render

            const getRealLabel = (fieldName: string) => {
              return `messages.${index}.${fieldName}`
            }

            return (
              Render && (
                <li key={data.id}>
                  <Render
                    getLabel={getRealLabel}
                    onRemove={() => remove(index)}
                    errors={(errors.messages && errors.messages[index]) || {}}
                  />
                </li>
              )
            )
          })}
        </ul>
        <div className="dropdown dropdown-right mt-2">
          <div
            tabIndex={0}
            className="m-1 btn normal-case btn-sm rounded-md bg-base-300 text-primary border-none hover:bg-base-200"
          >
            <PlusIcon className="h-5 inline mr-1" /> Add message
          </div>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content rounded-md bg-base-300 border border-secondary w-40"
          >
            {messageTemplates.map(({ label, template }, index) => (
              <li
                key={index}
                className="transition hover:bg-base-200 text-lg p-1 rounded"
              >
                <button
                  className="text-left"
                  onClick={() => append(template(wallet, govTokenDenom))}
                  type="button"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3">
          <Button variant="primary" size="lg">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
