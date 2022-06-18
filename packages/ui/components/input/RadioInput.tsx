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
        <RadioButton
          key={index}
          background
          label={optionLabel}
          onClick={() => setValue(label, value)}
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
