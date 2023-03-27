import clsx from 'clsx'
import { FieldValues, Path, useFormContext } from 'react-hook-form'

import { SegmentedControls, SegmentedControlsProps } from '@dao-dao/stateless'

export type SegmentedControlsTitleProps<
  T extends unknown,
  FV extends FieldValues,
  FieldName extends Path<FV>
> = Omit<SegmentedControlsProps<T>, 'selected' | 'onSelect'> & {
  isCreating: boolean
  fieldName: FieldName
}

// Show segmented controls when creating and title of selected tab otherwise.
export const SegmentedControlsTitle = <
  T extends unknown,
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  isCreating,
  fieldName,
  ...props
}: SegmentedControlsTitleProps<T, FV, FieldName>) => {
  const { watch, setValue } = useFormContext<FV>()
  const value = watch(fieldName)

  const selectedTab = props.tabs.find((tab) => tab.value === value)

  return (
    <>
      {isCreating ? (
        <SegmentedControls<T>
          {...props}
          onSelect={(value) => setValue(fieldName, value as any)}
          selected={value}
        />
      ) : (
        <p className={clsx('title-text', props.className)}>
          {selectedTab?.label}
        </p>
      )}
    </>
  )
}
