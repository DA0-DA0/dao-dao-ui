import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import { DiscordNotifierConfigureModal } from './DiscordNotifierConfigureModal'

export default {
  title:
    'DAO DAO / packages / stateless / components / modals / DiscordNotifierConfigureModal',
  component: DiscordNotifierConfigureModal,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof DiscordNotifierConfigureModal>

const Template: ComponentStory<typeof DiscordNotifierConfigureModal> = (
  args
) => <DiscordNotifierConfigureModal {...args} />

export const Default = Template.bind({})
Default.args = {
  visible: true,
  onClose: () => alert('close'),
  setup: () => alert('setup'),
  doRegister: () => alert('register'),
  registrations: [],
  loadingRegistration: false,
  finishingRegistration: false,
  connected: true,
  ConnectWallet: () => <div>ConnectWallet</div>,
}
