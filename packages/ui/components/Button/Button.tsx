import { ComponentPropsWithoutRef } from 'react'

import {
  ButtonifiedChildren,
  ButtonifierProps,
  getButtonifiedClassNames,
} from './Buttonifier'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & ButtonifierProps

export const Button = ({
  children,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button {...props} className={getButtonifiedClassNames(props)} type={type}>
    <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
  </button>
)
