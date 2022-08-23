import clsx from 'clsx'
import {
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

export interface RadioInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> {
  options: {
    label: string
    value: UnpackNestedValue<PathValue<FV, FieldName>>
  }[]
  fieldName: FieldName
  watch: UseFormWatch<FV>
  setValue: UseFormSetValue<FV>
  className?: string
}

export const RadioInput = <FV extends FieldValues, FieldName extends Path<FV>>({
  options,
  fieldName,
  watch,
  setValue,
  className,
}: RadioInputProps<FV, FieldName>) => (
  <div className={clsx('flex flex-row gap-2 items-stretch', className)}>
    {options.map(({ label: optionLabel, value }, index) => {
      const selected = value === watch(fieldName)

      return (
        <RadioButton
          key={index}
          background
          label={optionLabel}
          onClick={() => setValue(fieldName, value)}
          selected={selected}
        />
      )
    })}
  </div>
)

export interface RadioButtonProps {
  selected: boolean
  onClick?: () => void
  label?: string
  background?: boolean
  className?: string
}

export const RadioButton = ({
  selected,
  onClick,
  label,
  background,
  className,
}: RadioButtonProps) => (
  <div
    className={clsx(
      'flex flex-row gap-3 items-center transition',
      {
        'py-3 px-4 hover:bg-tab-hover rounded-md': background,
        'bg-card': background && selected,
        'cursor-pointer': onClick,
      },
      className
    )}
    onClick={onClick}
  >
    <div className="aspect-square flex justify-center items-center w-5 h-5 rounded-full border border-default">
      <div
        className={clsx('w-3 h-3 bg-brand rounded-full transition', {
          'opacity-0': !selected,
          'opacity-100': selected,
        })}
      ></div>
    </div>

    {!!label && <p className="primary-text">{label}</p>}
  </div>
)
