import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import i18n from '@dao-dao/i18n'

// import { ChevronDownIcon } from '@heroicons/react/outline'
// import { ArrowNarrowRightIcon } from '@heroicons/react/solid'

// import SvgConnect from '@components/icons/Connect'
// import SvgWallet from '@components/icons/Wallet'

import { Button } from './Button'

export default {
  title: 'Design System / Components / Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  size: 'lg',
  disabled: false,
  children: i18n.t('Connect wallet'),
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  variant: 'secondary',
}

export const Ghost = Template.bind({})
Ghost.args = {
  ...Primary.args,
  variant: 'ghost',
}

export const Small = Template.bind({})
Small.args = {
  ...Primary.args,
  size: 'sm',
}

// export const Medium = Template.bind({})
// Medium.args = {
//   ...Primary.args,
//   size: 'md',
// }

export const Large = Template.bind({})
Large.args = {
  ...Primary.args,
  size: 'lg',
}

// export const ExtraLarge = Template.bind({})
// ExtraLarge.args = {
//   ...Primary.args,
//   size: 'xl',
//   iconAfter: (
//     <ArrowNarrowRightIcon
//       className="inline h-4 w-4"
//       style={{ transform: 'rotateY(0deg) rotate(-45deg)' }}
//     />
//   ),
// }

// export const IconBefore = Template.bind({})
// IconBefore.args = {
//   ...Primary.args,
//   variant: 'ghost',
//   iconBefore: <SvgConnect stroke="currentColor" className="inline" />,
// }

// export const IconAfter = Template.bind({})
// IconAfter.args = {
//   ...Primary.args,
//   variant: 'secondary',
//   iconAfter: <ChevronDownIcon className="inline h-4 w-4" />,
// }

// export const BothIcons = Template.bind({})
// BothIcons.args = {
//   ...Primary.args,
//   variant: 'secondary',
//   iconBefore: <SvgWallet fill="currentColor" className="inline" />,
//   iconAfter: <ChevronDownIcon className="inline h-4 w-4" />,
// }

const params = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Suewv4vPJeJSzAa5aI1sOv/Light-Jun%C3%B8?node-id=18%3A260',
  },
}

Primary.parameters = params
Secondary.parameters = params
Ghost.parameters = params
Small.parameters = params
// Medium.parameters = params
Large.parameters = params
// ExtraLarge.parameters = params
// IconBefore.parameters = params
// IconAfter.parameters = params
// BothIcons.parameters = params
