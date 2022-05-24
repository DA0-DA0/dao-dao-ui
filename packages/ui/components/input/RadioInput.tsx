import clsx from 'clsx'
import {
  Path,
  PathValue,
  UnpackNestedValue,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

export interface RadioInputProps<
  FieldValues,
  FieldName extends Path<FieldValues>
> {
  options: {
    label: string
    value: UnpackNestedValue<PathValue<FieldValues, FieldName>>
  }[]
  label: FieldName
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  className?: string
}

export const RadioInput = <FieldValues, FieldName extends Path<FieldValues>>({
  options,
  label,
  watch,
  setValue,
  className,
}: RadioInputProps<FieldValues, FieldName>) => (
  <div className={clsx('flex flex-row gap-2 items-stretch', className)}>
    {options.map(({ label: optionLabel, value }, index) => {
      const selected = value === watch(label)

      return (
        <div
          key={index}
          className={clsx(
            'flex flex-row gap-3 items-center py-3 px-4 hover:bg-tab-hover rounded-md cursor-pointer',
            {
              'bg-card': selected,
            }
          )}
          onClick={() => setValue(label, value)}
        >
          <div className="aspect-square flex justify-center items-center w-5 h-5 rounded-full border border-default">
            {selected && <div className="w-3 h-3 bg-brand rounded-full"></div>}
          </div>

          <p className="primary-text">{optionLabel}</p>
        </div>
      )
    })}
  </div>
)
