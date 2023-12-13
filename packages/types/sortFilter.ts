import { ReactNode } from 'react'

export type SortFn<T> = Parameters<Array<T>['sort']>[0]
export type FilterFn<T> = Parameters<Array<T>['filter']>[0]

export type TypedOption<T> = {
  label: string
  value: T
  tooltip?: NonNullable<ReactNode>
}
