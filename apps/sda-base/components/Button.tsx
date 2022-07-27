import { ButtonProps, Button as OriginalButton } from '@dao-dao/ui'

import { Logo } from '@/components'

export const Button = (props: Omit<ButtonProps, 'Logo'>) => (
  <OriginalButton Logo={Logo} {...props} />
)
