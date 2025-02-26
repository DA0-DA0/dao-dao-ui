import clsx from 'clsx'

import { ButtonifierProps } from '@dao-dao/types'

import { Loader } from '../logo'

const defaultVariant = 'primary'
const defaultSize = 'md'

// Variants that use pulse animation instead of loader when in loading state
const PULSE_LOADING_VARIANTS: ButtonifierProps['variant'][] = [
  'underline',
  'none',
]

/**
 * Filters out Buttonifier-specific props and passes through native props. Also
 * handles disabled state based on loading state.
 */
export const getPassthroughProps = <P extends ButtonifierProps>({
  // Remove Buttonifier specific props
  variant: _variant,
  size: _size,
  contentContainerClassName: _contentContainerClassName,
  pressed: _pressed,
  hovering: _hovering,
  showBadge: _showBadge,
  className: _className,
  children: _children,
  center: _center,
  circular: _circular,
  noRounding: _noRounding,
  focused: _focused,
  loadingVariant: _loadingVariant,
  // Process these props
  loading,
  disabled,
  allowClickWhileLoading,
  // Pass through the rest
  ...props
}: P) => ({
  ...props,
  disabled: disabled || (!allowClickWhileLoading && loading),
})

/**
 * Generates className based on button variant, size, and state.
 */
export const getButtonifiedClassNames = ({
  variant = defaultVariant,
  size = defaultSize,
  pressed,
  disabled,
  loading,
  loadingVariant,
  allowClickWhileLoading,
  circular,
  noRounding,
  focused,
  className,
}: ButtonifierProps) => {
  const disabledOrLoading = disabled || (!allowClickWhileLoading && loading)
  const shouldPulse =
    loading &&
    ((PULSE_LOADING_VARIANTS.includes(variant) && !loadingVariant) ||
      loadingVariant === 'pulse')

  // Base classes that apply to all buttons
  const baseClasses = clsx(
    // Put transparent rings so it animates when a ring appears.
    'relative block ring-1 ring-inset ring-transparent transition-all focus:outline-2 focus:outline-background-button-disabled',

    // No cursor pointer if disabled or loading.
    disabledOrLoading && 'cursor-default',

    focused && '!ring-2 !ring-border-interactive-focus',

    // Pulse if loading for a variant that we don't display the loader.
    shouldPulse && 'animate-pulse'
  )

  // Shape classes
  const shapeClasses = clsx({
    // Rounded if circular.
    'aspect-square rounded-full': circular,
    'rounded-md':
      !circular && !noRounding && variant !== 'none' && variant !== 'underline',
  })

  // Size classes
  const sizeClasses = clsx({
    // Let variants take color precedence over the text classes used here since
    // the variants are more specific, so just use the font text styling here.
    // Sizes.
    'button-text py-[10px] px-[14px]': size === 'lg',
    'button-text-sm py-1 px-2': size === 'sm',
    'link-text py-[6px] px-[10px]': size === 'md',
    // Always no padding for underline/none variants
    '!p-0': variant === 'underline' || variant === 'none',
  })

  // Variant specific classes
  let variantClasses = ''

  switch (variant) {
    case 'primary':
      variantClasses = clsx(
        // Default
        !disabledOrLoading &&
          'bg-background-button text-text-button-primary hover:bg-background-button-hover active:bg-background-button-pressed',
        // Disabled
        disabledOrLoading &&
          'bg-background-button-disabled text-text-button-disabled'
      )
      break

    case 'primary_outline':
      variantClasses = clsx(
        '!ring-2',
        // Default
        !disabledOrLoading &&
          'text-background-button !ring-background-button hover:bg-background-button-hover hover:text-text-button-primary hover:!ring-0 active:bg-background-button-pressed active:text-text-button-primary active:!ring-0',
        // Disabled
        disabledOrLoading &&
          'text-background-button-disabled !ring-background-button-disabled'
      )
      break

    case 'secondary':
      variantClasses = clsx(
        // Default
        !disabledOrLoading &&
          'hover:bg-background-button-secondary-hover active:bg-background-button-secondary-pressed',
        // Default, not pressed
        !disabledOrLoading &&
          !pressed &&
          'bg-background-button-secondary-default text-icon-primary',
        // Disabled, not pressed
        disabledOrLoading &&
          !pressed &&
          'bg-background-button-secondary-disabled text-text-interactive-disabled',
        // Default or disabled, pressed
        pressed &&
          'bg-background-interactive-active text-text-interactive-active'
      )
      break

    case 'ghost':
    case 'ghost_outline':
      variantClasses = clsx(
        // Default
        !disabledOrLoading &&
          'hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
        // Outline
        (variant === 'ghost_outline' || loading) && '!ring-border-primary',
        variant === 'ghost_outline' && !disabledOrLoading && 'hover:!ring-0',
        // Default, not pressed
        !disabledOrLoading && !pressed && 'bg-transparent text-text-secondary',
        // Disabled, not pressed
        disabledOrLoading &&
          !pressed &&
          'bg-transparent text-text-interactive-disabled',
        // Default or disabled, pressed
        pressed && 'bg-transparent text-text-brand'
      )
      break

    case 'brand':
      variantClasses = clsx(
        // Default
        !disabledOrLoading &&
          'bg-border-interactive-active text-text-body hover:opacity-90 active:opacity-80',
        // Disabled
        disabledOrLoading &&
          'bg-background-interactive-active text-text-tertiary'
      )
      break

    case 'brand_outline':
      variantClasses = clsx(
        // Default
        !disabledOrLoading &&
          'text-text-interactive-active !ring-border-interactive-active hover:bg-background-button-active hover:text-text-button-primary hover:!ring-0 active:bg-text-interactive-active active:text-text-button-primary active:!ring-0',
        // Disabled
        disabledOrLoading &&
          'bg-background-interactive-active text-text-button-primary'
      )
      break

    case 'brand_ghost':
      variantClasses = clsx(
        // Default
        !disabledOrLoading &&
          'text-text-interactive-active hover:bg-background-interactive-active active:bg-background-interactive-active',
        // Outline
        loading && '!ring-border-interactive-active',
        // Disabled, not pressed
        disabledOrLoading && 'bg-transparent text-text-interactive-disabled'
      )
      break

    case 'underline':
    case 'none':
      variantClasses = clsx(
        // Underline only when not disabled and the variant is 'underline'
        variant === 'underline' && !disabledOrLoading && 'underline',
        // Default
        !disabledOrLoading && 'hover:opacity-80 active:opacity-70',
        // Disabled
        disabledOrLoading && 'text-text-button-disabled'
      )
      break
  }

  return clsx(baseClasses, shapeClasses, sizeClasses, variantClasses, className)
}

/**
 * Renders button children with loading state and badge if necessary.
 */
export const ButtonifiedChildren = ({
  variant = defaultVariant,
  size = defaultSize,
  loading = false,
  loadingVariant,
  contentContainerClassName,
  showBadge,
  children,
  center,
}: ButtonifierProps) => {
  // Determine if we should show loader or use pulse animation
  const showLoader =
    loading &&
    ((!PULSE_LOADING_VARIANTS.includes(variant) && !loadingVariant) ||
      loadingVariant === 'loader')

  return (
    <>
      {/* Loader container */}
      {showLoader && (
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center',
            {
              // Match padding of container (by inheriting it) so the logo is
              // the same height as the text.
              'p-[inherit]': size !== 'lg',
              // The container padding makes the logo a bit small on lg size, so
              // manually override.
              'p-2': size === 'lg',
            }
          )}
        >
          <Loader
            invert={variant === 'primary'}
            size={size === 'sm' || size === 'md' ? 18 : 24}
          />
        </div>
      )}

      {/* Content container */}
      <div
        className={clsx(
          // Add `relative` to allow children to be clickable. The absolute
          // container of the loading element above takes over touches if this
          // is not relative; adding relative puts them in the same stacking
          // context.
          'relative flex h-full flex-row items-center gap-2',
          center && 'justify-center',
          showLoader && 'invisible',
          contentContainerClassName
        )}
      >
        {children}
      </div>

      {/* Badge indicator */}
      {showBadge && (
        <div className="absolute top-[3px] right-[3px] box-content h-[6px] w-[6px] rounded-full border-[3px] border-background-base bg-icon-interactive-active"></div>
      )}
    </>
  )
}
