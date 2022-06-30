import clsx from 'clsx'
import { FC } from 'react'
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
  fieldName: FieldName
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  className?: string
}

export const RadioInput = <FieldValues, FieldName extends Path<FieldValues>>({
  options,
  fieldName,
  watch,
  setValue,
  className,
}: RadioInputProps<FieldValues, FieldName>) => (
  <div className={clsx('flex flex-row items-stretch gap-2', className)}>
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

export const RadioButton: FC<RadioButtonProps> = ({
  selected,
  onClick,
  label,
  background,
  className,
}) => (
  <div
    className={clsx(
      'flex flex-row items-center gap-3 transition',
      {
        'rounded-md py-3 px-4 hover:bg-tab-hover': background,
        'bg-card': background && selected,
        'cursor-pointer': onClick,
      },
      className
    )}
    onClick={onClick}
  >
    <div className="flex aspect-square h-5 w-5 items-center justify-center rounded-full border border-default">
      <div
        className={clsx('h-3 w-3 rounded-full bg-brand transition', {
          'opacity-0': !selected,
          'opacity-100': selected,
        })}
      ></div>
    </div>

    {!!label && <p className="primary-text">{label}</p>}
  </div>
)
