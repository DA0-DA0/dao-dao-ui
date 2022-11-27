import clsx from 'clsx'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
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
  // Override text progress value display.
  overrideText?: ReactNode
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
  overrideText,
}: RangeInputProps<FV, FieldName>) => {
  const value = watch && fieldName ? Number(watch(fieldName) || 0) : _value ?? 0

  // This is the value that we are currently dragging, and will be saved once we
  // let go of the mouse/touch.
  const [pendingNewValue, setPendingNewValue] = useState<number | undefined>()
  const isDragging = pendingNewValue !== undefined
  const barRef = useRef<HTMLDivElement>(null)

  const updatePendingValue = useCallback(
    (mouseX: number) => {
      if (!barRef.current) {
        return
      }

      // Get bounds of the bar.
      const { left, width } = barRef.current.getBoundingClientRect()

      // Get the current mouse offset from the left edge of the bar.
      const offsetX = mouseX - left

      // Get the value based on the bar's width and its bounds.
      const unclampedNewValue = Math.round(
        (offsetX / width) * (max - min) + min
      )

      // Clamp.
      const clampedValue = Math.max(min, Math.min(unclampedNewValue, max))

      // Update the pending value.
      setPendingNewValue(clampedValue)
    },
    [max, min]
  )

  // Add global move handlers to handle dragging.
  useEffect(() => {
    if (disabled || !barRef.current || !isDragging) {
      return
    }

    // On move, update the pending value with the position of the mouse/touch.
    const onMouseMove = (event: MouseEvent) => {
      updatePendingValue(event.clientX)
    }
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches.item(0)
      touch && updatePendingValue(touch.clientX)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [disabled, updatePendingValue, isDragging])

  // Add global mouse/touch up handlers.
  useEffect(() => {
    if (disabled || !barRef.current || !isDragging) {
      return
    }

    // On release, set pending value if different from current value.
    const onRelease = () => {
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

    window.addEventListener('mouseup', onRelease)
    window.addEventListener('touchend', onRelease)

    return () => {
      window.removeEventListener('mouseup', onRelease)
      window.removeEventListener('touchend', onRelease)
    }
  }, [
    disabled,
    fieldName,
    isDragging,
    onChange,
    pendingNewValue,
    setValue,
    updatePendingValue,
    value,
  ])

  // When mouse down or touch start, set state to indicate dragging.
  const onStartDrag = (initialX: number) => {
    // Callback to indicate started dragging.
    onStartChange?.()
    // Initialize at current value.
    updatePendingValue(initialX)
  }

  return (
    <div
      className={clsx(
        'relative h-8 overflow-hidden rounded-sm bg-background-primary transition',
        disabled ? 'pointer-events-none cursor-default' : 'cursor-col-resize',
        className
      )}
      onMouseDown={
        disabled || !barRef.current
          ? undefined
          : (event) => {
              updatePendingValue(event.clientX)
              onStartDrag(event.clientX)
            }
      }
      onTouchStart={
        disabled || !barRef.current
          ? undefined
          : (event) => {
              const touch = event.touches.item(0)
              touch && onStartDrag(touch.clientX)
            }
      }
      ref={barRef}
    >
      {/* Progress bar. */}
      <div
        className={clsx(
          'absolute top-0 left-0 bottom-0 h-full rounded-sm transition',
          disabled || dimmed
            ? 'bg-background-primary'
            : 'bg-background-interactive-active'
        )}
        style={{
          width: `calc(${
            ((pendingNewValue ?? value) - min) / (max - min)
          } * 100%)`,
        }}
      ></div>
      {/* Value */}
      <p
        className={clsx(
          'absolute left-0 top-0 right-0 bottom-0 flex select-none flex-row items-center justify-center font-mono',
          disabled || dimmed ? 'text-text-tertiary' : 'text-text-brand'
        )}
      >
        {overrideText ?? pendingNewValue ?? value}
      </p>
    </div>
  )
}
