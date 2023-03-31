import { Add, Circle, Close, CopyAllOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { ComponentType, useState } from 'react'
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

import {
  ActionCategorySelector,
  ActionsEditor,
  Button,
  DropdownIconButton,
  IconButton,
  InputErrorMessage,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import {
  ActionCategoryWithLabel,
  LoadedActions,
  SuspenseLoaderProps,
} from '@dao-dao/types'
import { validateRequired } from '@dao-dao/utils'

import { MultipleChoiceOptionFormData, NewProposalForm } from '../../types'

export interface MultipleChoiceOptionEditorProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> {
  titleFieldName: FieldName
  descriptionFieldName: FieldName
  errorsOption?: FieldErrors<MultipleChoiceOptionFormData>
  registerOption: UseFormRegister<FV>
  optionIndex: number
  control: Control<FV>
  categories: ActionCategoryWithLabel[]
  removeOption: () => void
  addOption: (value: Partial<MultipleChoiceOptionFormData>) => void
  loadedActions: LoadedActions
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const MultipleChoiceOptionEditor = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  titleFieldName,
  descriptionFieldName,
  errorsOption,
  registerOption,
  optionIndex,
  categories,
  removeOption,
  addOption,
  loadedActions,
  SuspenseLoader,
}: MultipleChoiceOptionEditorProps<FV, FieldName>) => {
  const { t } = useTranslation()

  const { control, watch, getValues } = useFormContext<NewProposalForm>()

  const [expanded, setExpanded] = useState(true)
  const toggleExpanded = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded)
  }

  const description = watch(`choices.${optionIndex}.description`)

  const { append } = useFieldArray({
    name: `choices.${optionIndex}.actionData`,
    control,
    shouldUnregister: true,
  })

  // Default to if description exists, in case of duplication.
  const [showingDescription, setShowingDescription] = useState(!!description)

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-6">
        <div className="flex grow flex-row items-center gap-2">
          <DropdownIconButton open={expanded} toggle={toggleExpanded} />

          <Circle
            className="!h-4 !w-4"
            style={{
              color:
                MULTIPLE_CHOICE_OPTION_COLORS[
                  optionIndex % MULTIPLE_CHOICE_OPTION_COLORS.length
                ],
            }}
          />

          <div className="flex grow flex-col gap-1">
            <TextInput
              className="!title-text"
              error={errorsOption?.title}
              fieldName={titleFieldName}
              ghost
              maxLength={64}
              placeholder={t('form.multipleChoiceOptionTitlePlaceholder')}
              register={registerOption}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errorsOption?.title} />
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <IconButton
            Icon={CopyAllOutlined}
            onClick={() =>
              addOption(cloneDeep(getValues(`choices.${optionIndex}`)))
            }
            variant="ghost"
          />
          <IconButton Icon={Close} onClick={removeOption} variant="ghost" />
        </div>
      </div>

      <div
        className={clsx('ml-[calc(0.75rem-1.5px)] mt-4', !expanded && 'hidden')}
      >
        <div className="flex flex-col gap-4 border-l-[3px] border-border-interactive-focus pt-1 pl-5">
          {showingDescription ? (
            <>
              <p className="primary-text text-text-body">
                {t('form.description')}
              </p>

              <div className="flex flex-col">
                <TextAreaInput
                  autoFocus
                  error={errorsOption?.description}
                  fieldName={descriptionFieldName}
                  placeholder={t(
                    'form.multipleChoiceOptionDescriptionPlaceholder'
                  )}
                  register={registerOption}
                  rows={5}
                />
                <InputErrorMessage error={errorsOption?.description} />
              </div>
            </>
          ) : (
            <Button
              className="self-start"
              onClick={() => setShowingDescription(true)}
              variant="ghost"
            >
              <Add className="text-icon-secondary" />
              {t('button.addADescriptionOptional')}
            </Button>
          )}

          <ActionsEditor
            SuspenseLoader={SuspenseLoader}
            actionDataErrors={errorsOption?.actionData}
            actionDataFieldName={`choices.${optionIndex}.actionData`}
            categories={categories}
            loadedActions={loadedActions}
          />
        </div>

        <div className="border-l-[3px] border-dashed border-border-interactive-focus pt-4 pb-2 pl-5">
          <ActionCategorySelector
            categories={categories}
            // There will be many action selector buttons on-screen, so the
            // keybind wouldn't know which one to open.
            disableKeybind
            onSelectCategory={({ key }) => {
              append({
                categoryKey: key,
              })
            }}
          />
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
