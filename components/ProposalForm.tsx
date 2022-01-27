import { PlusIcon } from '@heroicons/react/outline'
import { useFieldArray, useForm } from 'react-hook-form'
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
import {
  customTemplate,
  Message,
  mintTemplate,
  spendTemplate,
} from './ProposalTemplates'

export interface ProposalData {
  title: string
  description: string
  messages: Message[]
}

export function ProposalForm({
  onSubmit,
  govTokenDenom,
}: {
  onSubmit: (d: ProposalData) => void
  govTokenDenom: string
}) {
  const wallet = useRecoilValue(walletAddress)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    name: 'messages',
    control,
    shouldUnregister: true,
  })

  return (
    <form className="" onSubmit={handleSubmit<ProposalData>(onSubmit)}>
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
          const render = (data as any).render

          // A wrapper for the register method that will opaquely
          // register inputs in the subcomponent as nested fields
          // in the messages list.
          const wrappedRegister = (fieldName: string, options: any) => {
            const field = `messages.${index}.${fieldName}`
            return register(field, options)
          }

          const getRealLabel = (fieldName: string) => {
            return `messages.${index}.${fieldName}`
          }

          return (
            render && (
              <li key={data.id}>
                {render(
                  control,
                  wrappedRegister,
                  () => {
                    remove(index)
                  },
                  (errors.messages && errors.messages[index]) || {},
                  getRealLabel
                )}
              </li>
            )
          )
        })}
      </ul>
      <div className="dropdown dropdown-right mt-2">
        <div
          tabIndex={0}
          className="m-1 btn normal-case btn-sm btn-outline rounded-md"
        >
          <PlusIcon className="h-5 inline mr-1" /> Add message
        </div>
        <ul
          tabIndex={0}
          className="p-2 shadow menu dropdown-content rounded-md"
        >
          <li>
            <button
              onClick={() => append(spendTemplate(wallet, govTokenDenom))}
            >
              Spend
            </button>
          </li>
          <li>
            <button onClick={() => append(mintTemplate(wallet, govTokenDenom))}>
              Mint
            </button>
          </li>
          <li>
            <button onClick={() => append(customTemplate())}>Custom</button>
          </li>
        </ul>
      </div>
      <div className="mt-3">
        <Button variant="primary" size="lg">
          Submit
        </Button>
      </div>
    </form>
  )
}
