import { forwardRef } from 'react'

import { ButtonProps } from '@dao-dao/types'

import {
  ButtonifiedChildren,
  getButtonifiedClassNames,
  getPassthroughProps,
} from './Buttonifier'

// Forward ref so we can use Tooltip with this element.
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
