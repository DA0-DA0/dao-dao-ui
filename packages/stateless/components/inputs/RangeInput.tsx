import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

export interface RangeInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> {
  // Required fields
  min: number
  max: number
  // react-hook-form connectors
  fieldName?: FieldName
  watch?: UseFormWatch<FV>
  setValue?: UseFormSetValue<FV>
  // Manual value handling
  value?: number
  onChange?: (value: number) => void
  // Other
  className?: string
  disabled?: boolean
  // Looks like disabled but still allows interaction.
  dimmed?: boolean
  onStartChange?: () => void
}

export const RangeInput = <FV extends FieldValues, FieldName extends Path<FV>>({
  fieldName,
  watch,
  value: _value,
  setValue,
  onChange,
  className,
  min,
  max,
  disabled,
  dimmed,
  onStartChange,
}: RangeInputProps<FV, FieldName>) => {
  const value = watch && fieldName ? Number(watch(fieldName) || 0) : _value ?? 0

  // When defined, we are dragging. Used to offset mouse so that the thumb
  // doesn't jump to a weird offset of the mouse position. This is the
  // difference between the mouse's apparent value and the actual value.
  const [initialValueDelta, setInitialValueDelta] = useState<number>()
  // This is the value that we are currently dragging, and will be saved once we
  // let go of the mouse.
  const [pendingNewValue, setPendingNewValue] = useState<number | undefined>()
  const barRef = useRef<HTMLDivElement>(null)

  // Returns the value within the input's bounds given the mouse relative to the
  // bar.
  const getValueForMousePosition = useCallback(
    (mouseX: number) => {
      if (!barRef.current) {
        return 0
      }

      // Get bounds of the bar.
      const { clientLeft, clientWidth } = barRef.current

      // Get the current mouse offset from the left edge of the bar.
      const offsetX = mouseX - clientLeft

      // Get the value based on the bar's width and its bounds.
      const value = Math.round((offsetX / clientWidth) * (max - min) + min)
      return value
    },
    [max, min]
  )

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (disabled || initialValueDelta === undefined || !barRef.current) {
        return
      }

      // Get the new value for the mouse position.
      const unclampedNewValue =
        getValueForMousePosition(event.clientX) - initialValueDelta
      // Clamp.
      const clampedValue = Math.max(min, Math.min(unclampedNewValue, max))

      setPendingNewValue(clampedValue)
    },
    [disabled, getValueForMousePosition, initialValueDelta, max, min]
  )

  // Add global mouse up and move handler to handle dragging.
  useEffect(() => {
    if (initialValueDelta === undefined) {
      return
    }

    // On mouse release, set pending value if different from current value.
    const onMouseUp = () => {
      setInitialValueDelta(undefined)

      if (pendingNewValue !== undefined && pendingNewValue !== value) {
        if (setValue && fieldName) {
          setValue(fieldName, pendingNewValue as any)
        }
        if (onChange) {
          onChange(pendingNewValue)
        }
      }

      setPendingNewValue(undefined)
    }
    window.addEventListener('mouseup', onMouseUp)

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [
    fieldName,
    initialValueDelta,
    onChange,
    onMouseMove,
    pendingNewValue,
    setValue,
    value,
  ])

  return (
    <div className={clsx('flex h-4 flex-col justify-center px-2', className)}>
      {/* Background bar. */}
      <div
        className={clsx(
          'relative h-2 rounded-full transition',
          disabled || dimmed
            ? 'bg-background-interactive-disabled'
            : 'bg-background-primary'
        )}
        ref={barRef}
      >
        {/* Orb slider. */}
        <div
          className={clsx(
            'absolute top-1/2 -mt-2 -ml-2 h-4 w-4 rounded-full shadow-dp2 transition',
            disabled || dimmed
              ? 'bg-background-button-disabled'
              : 'bg-background-button',
            disabled
              ? 'pointer-events-none'
              : 'cursor-pointer hover:bg-background-button-hover active:bg-background-button-pressed'
          )}
          onMouseDown={
            disabled || !barRef.current
              ? undefined
              : (event) => {
                  // Initialize at current value.
                  setPendingNewValue(value)
                  setInitialValueDelta(
                    getValueForMousePosition(event.clientX) - value
                  )
                  // Callback to indicate started dragging.
                  onStartChange?.()
                }
          }
          style={{
            left: `calc(${
              ((pendingNewValue ?? value) - min) / (max - min)
            } * 100%)`,
          }}
        ></div>
      </div>
    </div>
  )
}
