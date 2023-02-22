import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { EntityDisplay } from '@dao-dao/stateful'
import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { EntityType } from '@dao-dao/types'

import { AddressInput } from './AddressInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / AddressInput',
  component: AddressInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof AddressInput>

const Template: ComponentStory<typeof AddressInput> = (args) => {
  const { register } = useFormContext()
  return <AddressInput {...args} register={register} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'fieldName' as any,
  placeholder: 'juno...',
  EntityDisplay,
}

export const AutofillProfile = Template.bind({})
AutofillProfile.args = {
  fieldName: 'fieldName' as any,
  placeholder: 'juno...',
  type: 'wallet',
  EntityDisplay,
  autofillEntities: {
    loading: false,
    entities: [
      {
        type: EntityType.Wallet,
        address: 'peepobaked',
        name: 'peepobaked',
        imageUrl:
          'ipfs://bafybeigwkqqhatvnlmeetnjrupemktzirlcj5j7lubnt76uxe3byzk5gbm/blob',
      },
      {
        type: EntityType.Wallet,
        address: 'peepodab',
        name: 'peepodab',
        imageUrl:
          'ipfs://bafybeiajdpcrfbr5vr76xbeumt64wuzrqrbavnmzj5juenmu5d2uuimzo4/blob',
      },
      {
        type: EntityType.Wallet,
        address: 'peeponothing',
        name: 'peeponothing',
        imageUrl: '/placeholder/1.svg',
      },
      {
        type: EntityType.Wallet,
        address: 'peepopraying',
        name: 'peepopraying',
        imageUrl:
          'ipfs://bafybeie7bh35eok2h2u67hmhyyw7kgmsmpubm3zhynyog2kcqfrejbwoei/blob',
      },
      {
        type: EntityType.Wallet,
        address: 'peepoturbo',
        name: 'peepoturbo',
        imageUrl:
          'ipfs://bafybeiay2jgeusl63sie2lgocybux63nhy3viflkfkem2ove7nwmfxygkq/blob',
      },
    ],
  },
}
