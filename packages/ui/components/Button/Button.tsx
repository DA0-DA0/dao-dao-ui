import { ComponentPropsWithoutRef } from 'react'

import {
  ButtonifiedChildren,
  ButtonifierProps,
  getButtonifiedClassNames,
} from './Buttonifier'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & ButtonifierProps

export const Button = ({ children, ...props }: ButtonProps) => {
  props.disabled ||= props.loading
  props.type ||= 'button'

  return (
    <button {...props} className={getButtonifiedClassNames(props)}>
      <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
    </button>
  )
}
