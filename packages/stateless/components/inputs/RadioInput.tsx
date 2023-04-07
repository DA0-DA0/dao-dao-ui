import clsx from 'clsx'
import { ReactNode } from 'react'
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
  options: ({
    value: UnpackNestedValue<PathValue<FV, FieldName>>
  } & ({ label: string } | { display: ReactNode }))[]
  fieldName: FieldName
  watch: UseFormWatch<FV>
  setValue: UseFormSetValue<FV>
  className?: string
  disabled?: boolean
}

export const RadioInput = <FV extends FieldValues, FieldName extends Path<FV>>({
  options,
  fieldName,
  watch,
  setValue,
  className,
  disabled,
}: RadioInputProps<FV, FieldName>) => (
  <div
    className={clsx('flex flex-row flex-wrap items-stretch gap-2', className)}
  >
    {options.map(({ value, ...labelOrDisplay }, index) => {
      const selected = value === watch(fieldName)

      return (
        <RadioButton
          key={index}
          background
          disabled={disabled}
          onClick={() => setValue(fieldName, value)}
          selected={selected}
          {...labelOrDisplay}
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
  display?: ReactNode
  disabled?: boolean
}

export const RadioButton = ({
  selected,
  onClick,
  label,
  background,
  className,
  display,
  disabled,
}: RadioButtonProps) => (
  <div
    className={clsx(
      'flex flex-row items-center gap-3 transition',
      {
        'rounded-md py-3 px-4': background,
        'bg-background-secondary': background && selected,
        'cursor-pointer hover:bg-background-interactive-active':
          onClick && !disabled,
      },
      className
    )}
    onClick={disabled ? undefined : onClick}
  >
    <div className="flex aspect-square h-5 w-5 items-center justify-center rounded-full border border-border-primary">
      <div
        className={clsx(
          'h-3 w-3 rounded-full bg-background-button-active transition',
          {
            'opacity-0': !selected,
            'opacity-100': selected,
          }
        )}
      ></div>
    </div>

    {!!label && <p className="primary-text">{label}</p>}
    {display}
  </div>
)
