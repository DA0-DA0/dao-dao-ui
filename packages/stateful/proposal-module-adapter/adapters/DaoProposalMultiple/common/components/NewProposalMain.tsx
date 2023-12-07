import { Add, Block, Circle } from '@mui/icons-material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useLoadedActionsAndCategories } from '../../../../../actions'
import { SuspenseLoader } from '../../../../../components'
import {
  MULTIPLE_CHOICE_OPTION_COLORS,
  MultipleChoiceOptionEditor,
} from '../../components/MultipleChoiceOptionEditor'
import { NewProposalForm } from '../../types'

export const NewProposalMain = () => {
  const { t } = useTranslation()
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<NewProposalForm>()
  const { loadedActions, categories } = useLoadedActionsAndCategories()

  const {
    fields: multipleChoiceFields,
    append: addOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: 'choices',
    shouldUnregister: true,
  })

  const choices = watch('choices') ?? []

  return (
    <>
      {choices.length > 0 && (
        <div className="flex flex-col items-stretch gap-6">
          {multipleChoiceFields.map(({ id }, index) => (
            <MultipleChoiceOptionEditor
              key={id}
              SuspenseLoader={SuspenseLoader}
              addOption={addOption}
              categories={categories}
              control={control}
              descriptionFieldName={`choices.${index}.description`}
              errorsOption={errors?.choices?.[index]}
              loadedActions={loadedActions}
              optionIndex={index}
              registerOption={register}
              removeOption={() => removeOption(index)}
              titleFieldName={`choices.${index}.title`}
            />
          ))}
        </div>
      )}

      <div>
        <div
          className="flex cursor-pointer flex-row items-center gap-2 border-t border-border-secondary py-10"
          onClick={() =>
            addOption({
              title: '',
              description: '',
              actionData: [],
            })
          }
        >
          <Add className="!h-6 !w-6 text-icon-primary" />

          <Circle
            className="!h-4 !w-4"
            style={{
              color:
                MULTIPLE_CHOICE_OPTION_COLORS[
                  choices.length % MULTIPLE_CHOICE_OPTION_COLORS.length
                ],
            }}
          />

          <p className="title-text">{t('button.addNewOption')}</p>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-secondary pt-10 pb-4">
          <div className="flex flex-row items-center gap-2">
            <div className="h-6 w-6"></div>

            <Block className="!h-4 !w-4 text-icon-primary" />

            <p className="title-text">{t('title.noneOfTheAbove')}</p>
          </div>

          <p className="caption-text ml-14">
            {t('info.cannotRemoveNoneOption')}
          </p>
        </div>
      </div>
    </>
  )
}
