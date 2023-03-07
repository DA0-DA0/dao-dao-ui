import {
  ArrowDropDownRounded,
  Close,
  CopyAllOutlined,
} from '@mui/icons-material'
import CircleIcon from '@mui/icons-material/Circle'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { useState } from 'react'
import {
  Control,
  FieldArrayMethodProps,
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
  InputErrorMessage,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import {
  Action,
  ActionKey,
  ActionKeyAndData,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
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
  errorsOption: FieldErrors
  title: FieldName
  description: FieldName
  registerOption: UseFormRegister<FV>
  optionIndex: number
  control: Control<FV>
  actions: Action[]
  removeOption: () => void
  addOption: (
    value:
      | Partial<MultipleChoiceOptionData>
      | Partial<MultipleChoiceOptionData>[],
    options?: FieldArrayMethodProps | undefined
  ) => void
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

export const MultipleChoiceOption = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  title,
  description,
  registerOption,
  optionIndex,
  actions,
  removeOption,
  addOption,
  actionsWithData,
}: MultipleChoiceOptionProps<FV, FieldName>) => {
  const { t } = useTranslation()

  const {
    control,
    watch,
    formState: { errors },
    resetField,
  } = useFormContext<NewProposalForm>()

  const [expanded, setExpanded] = useState(true)
  const toggleExpanded = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded)
  }

  const optionActionData = watch(`choices.${optionIndex}.actionData`)
  const { append: appendAction, remove: removeAction } = useFieldArray({
    name: `choices.${optionIndex}.actionData`,
    control,
    shouldUnregister: true,
  })

  return (
    <div className="flex flex-col gap-4 p-6 pt-5">
      <div className="rounded-lg bg-background-tertiary ">
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
                  //  top-0 right-0 bottom-0 left-5 align-middle text-icon-primary
                  Icon={ArrowDropDownRounded}
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
                error={errors.choices?.[optionIndex]?.title}
                fieldName={title}
                placeholder={t('form.multipleChoiceOptionTitlePlaceholder')}
                register={registerOption}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors.choices?.[optionIndex]?.title} />
              <Button
                onClick={() =>
                  addOption(cloneDeep(watch(`choices.${optionIndex}`)))
                }
                variant="ghost"
              >
                <CopyAllOutlined className="text-icon-secondary" />
              </Button>
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
                error={errors.choices?.[optionIndex]?.description}
                fieldName={description}
                placeholder={t(
                  'form.multipleChoiceOptionDescriptionPlaceholder'
                )}
                register={registerOption}
                rows={5}
                validation={[validateRequired]}
              />
              <InputErrorMessage
                error={errors.choices?.[optionIndex]?.description}
              />
            </div>

            <p className="title-text my-6 text-text-body">
              {t('title.actions', { count: optionActionData?.length })}
            </p>

            {optionActionData?.length > 0 && (
              <div className="mb-4 flex flex-col gap-1">
                {optionActionData.map((actionData, actionIndex) => {
                  const Component =
                    actionsWithData[actionData.key]?.action?.Component

                  if (!Component) {
                    throw new Error(
                      `Error detecting action type "${actionData.key}".`
                    )
                  }

                  return (
                    <SuspenseLoader
                      key={actionIndex}
                      fallback={<ActionCardLoader />}
                    >
                      <Component
                        addAction={appendAction}
                        allActionsWithData={optionActionData}
                        data={actionData.data}
                        errors={
                          errors.choices?.[optionIndex]?.actionData?.[
                            actionIndex
                          ]?.data || {}
                        }
                        fieldNamePrefix={`choices.${optionIndex}.actionData.${actionIndex}.data.`}
                        index={actionIndex}
                        isCreating
                        onRemove={() => {
                          resetField(
                            `choices.${optionIndex}.actionData.${actionIndex}.data.`,
                            {
                              defaultValue: {},
                            }
                          )
                          removeAction(actionIndex)
                        }}
                      />
                    </SuspenseLoader>
                  )
                })}
              </div>
            )}
            <div className="flex flex-row items-center gap-3">
              <div className="flex shrink-0">
                <ActionSelector
                  actions={actions}
                  onSelectAction={({ key }) => {
                    appendAction({
                      key,
                      data: actionsWithData[key]?.defaults ?? {},
                    })
                  }}
                />
              </div>
            </div>
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
