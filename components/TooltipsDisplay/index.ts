import { ReactNode, useState } from 'react'

import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

import { TooltipsDisplay } from './TooltipsDisplay'

export interface TooltipResponse {
  label: string
  content: ReactNode
}

export function useTooltipsRegister<
  TFieldName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues
>(
  register: UseFormRegister<TFieldValues>,
  tooltipGetter: (label: string) => TooltipResponse,
  defaultField: string
): [TooltipResponse, UseFormRegister<TFieldValues>] {
  const [selected, setSelected] = useState(tooltipGetter(defaultField))

  const newRegister = (
    label: TFieldName,
    options?: RegisterOptions<TFieldValues, TFieldName>
  ) => {
    return {
      onSelect: () => setSelected(tooltipGetter(label)),
      ...register(label, options),
    }
  }

  return [selected, newRegister as UseFormRegister<TFieldValues>]
}

export default TooltipsDisplay
