import { forwardRef } from 'react'

import { ButtonProps } from '@dao-dao/types'

import {
  ButtonifiedChildren,
  getButtonifiedClassNames,
  getPassthroughProps,
} from './Buttonifier'

/**
 * Button component with consistent Button styling.
 *
 * Uses Buttonifier to maintain consistent styling with ButtonLink.
 * Forwards refs to allow integration with Tooltip component.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, type = 'button', ...props }, ref) {
    return (
      <button
        {...getPassthroughProps(props)}
        className={getButtonifiedClassNames(props)}
        ref={ref}
        type={type}
      >
        <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
      </button>
    )
  }
)
