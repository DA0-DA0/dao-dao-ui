import { Close, CopyAllOutlined } from '@mui/icons-material'
import CircleIcon from '@mui/icons-material/Circle'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { useState } from 'react'
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  useFieldArray,
  useFormContext,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { NewProposalForm } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalMultiple/types'
import {
  ActionCardLoader,
  ActionSelector,
  Button,
  DropdownIconButton,
  IconButton,
  InputErrorMessage,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import { Action, ActionKeyAndData, LoadedActions } from '@dao-dao/types'
import { validateRequired } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'

export interface MultipleChoiceOptionData {
  title: string
  description: string
  actionData: ActionKeyAndData[]
}

export interface MultipleChoiceOptionProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> {
  titleFieldName: FieldName
  descriptionFieldName: FieldName
  errorsOption?: FieldErrors<MultipleChoiceOptionData>
  registerOption: UseFormRegister<FV>
  optionIndex: number
  control: Control<FV>
  actions: Action[]
  removeOption: () => void
  addOption: (value: Partial<MultipleChoiceOptionData>) => void
  loadedActions: LoadedActions
}

export const MultipleChoiceOption = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  titleFieldName,
  descriptionFieldName,
  errorsOption,
  registerOption,
  optionIndex,
  actions,
  removeOption,
  addOption,
  loadedActions,
}: MultipleChoiceOptionProps<FV, FieldName>) => {
  const { t } = useTranslation()

  const { control, watch, getValues } = useFormContext<NewProposalForm>()

  const [expanded, setExpanded] = useState(true)
  const toggleExpanded = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded)
  }

  const optionActionData = watch(`choices.${optionIndex}.actionData`) ?? []
  const { append: appendAction, remove: removeAction } = useFieldArray({
    name: `choices.${optionIndex}.actionData`,
    control,
    shouldUnregister: true,
  })

  return (
    <div className="flex flex-col gap-4 p-6 pt-5">
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex flex-row items-center justify-between gap-6 border-b border-border-secondary py-4 px-6">
          <div className="flex grow flex-col">
            <div className="flex flex-row items-center gap-3">
              <div className="relative ml-[-0.5rem] h-auto w-12 pt-2">
                <CircleIcon
                  className="absolute right-0 bottom-0 left-0 top-0 align-middle"
                  style={{
                    color:
                      MULTIPLE_CHOICE_OPTION_COLORS[
                        optionIndex % MULTIPLE_CHOICE_OPTION_COLORS.length
                      ],
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
                <DropdownIconButton
                  className="absolute right-0 bottom-0 left-0 top-0 align-middle"
                  open={expanded}
                  size="xl"
                  style={{
                    zIndex: 1,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  toggle={toggleExpanded}
                />
              </div>
              <TextInput
                error={errorsOption?.title}
                fieldName={titleFieldName}
                placeholder={t('form.multipleChoiceOptionTitlePlaceholder')}
                register={registerOption}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errorsOption?.title} />
              <div className="ml-auto">
                <IconButton
                  Icon={CopyAllOutlined}
                  onClick={() =>
                    addOption(cloneDeep(getValues(`choices.${optionIndex}`)))
                  }
                  variant="ghost"
                />
              </div>
              <Button onClick={removeOption} type="button" variant="ghost">
                <Close className="!h-5 !w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className={clsx(!expanded && 'hidden')}>
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
                error={errorsOption?.description}
                fieldName={descriptionFieldName}
                placeholder={t(
                  'form.multipleChoiceOptionDescriptionPlaceholder'
                )}
                register={registerOption}
                rows={5}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errorsOption?.description} />
            </div>

            <p className="title-text my-6 text-text-body">
              {t('title.actions', { count: optionActionData?.length })}
            </p>

            {optionActionData?.length > 0 && (
              <div className="mb-4 flex flex-col gap-1">
                {optionActionData.map(({ key, data }, actionIndex) => {
                  const Component = loadedActions[key]?.action?.Component
                  if (!Component) {
                    return null
                  }

                  return (
                    <SuspenseLoader
                      key={`${optionIndex}-${actionIndex}-${key}`}
                      fallback={<ActionCardLoader />}
                    >
                      <Component
                        addAction={appendAction}
                        allActionsWithData={optionActionData}
                        data={data}
                        errors={
                          errorsOption?.actionData?.[actionIndex]?.data || {}
                        }
                        fieldNamePrefix={`choices.${optionIndex}.actionData.${actionIndex}.data.`}
                        index={actionIndex}
                        isCreating
                        onRemove={() => removeAction(actionIndex)}
                      />
                    </SuspenseLoader>
                  )
                })}
              </div>
            )}

            <ActionSelector
              actions={actions}
              onSelectAction={({ key }) => {
                appendAction({
                  key,
                  data: loadedActions[key]?.defaults ?? {},
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const MULTIPLE_CHOICE_OPTION_COLORS = [
  '#8B2EFF',
  '#4F00FF',
  '#004EFF',
  '#00B3FF',
  '#00FFAE',
  '#9BFF00',
  '#FCFF67',
  '#D9D9D9',
  '#FFBA00',
  '#FF6E00',
  '#FF2E00',
]
