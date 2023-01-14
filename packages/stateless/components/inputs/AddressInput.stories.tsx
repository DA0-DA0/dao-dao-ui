import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ProfileDisplay } from '@dao-dao/stateful'
import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

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
  ProfileDisplay,
}

export const AutofillProfile = Template.bind({})
AutofillProfile.args = {
  fieldName: 'fieldName' as any,
  placeholder: 'juno...',
  type: 'wallet',
  ProfileDisplay,
  autofillProfiles: {
    loading: false,
    hits: [
      {
        publicKey: 'peepobaked',
        address: 'peepobaked',
        profile: {
          nonce: 7,
          name: 'peepobaked',
          nft: {
            chainId: 'uni-5',
            collectionAddress:
              'juno17p6u07z9zr4ej6jt55fvafp966v90vm6m8xarejzgjqc7305w58qjmsej2',
            tokenId: 'baked_peepo',
            imageUrl:
              'ipfs://bafybeigwkqqhatvnlmeetnjrupemktzirlcj5j7lubnt76uxe3byzk5gbm/blob',
          },
        },
      },
      {
        publicKey: 'peepodab',
        address: 'peepodab',
        profile: {
          nonce: 65,
          name: 'peepodab',
          nft: {
            chainId: 'uni-5',
            collectionAddress:
              'juno17p6u07z9zr4ej6jt55fvafp966v90vm6m8xarejzgjqc7305w58qjmsej2',
            tokenId: 'deeply_dabbing_peepo',
            imageUrl:
              'ipfs://bafybeiajdpcrfbr5vr76xbeumt64wuzrqrbavnmzj5juenmu5d2uuimzo4/blob',
          },
        },
      },
      {
        publicKey: 'peeponothing',
        address: 'peeponothing',
        profile: {
          nonce: 5,
          name: 'peeponothing',
          nft: null,
        },
      },
      {
        publicKey: 'peepopraying',
        address: 'peepopraying',
        profile: {
          nonce: 4,
          name: 'peepopraying',
          nft: {
            chainId: 'uni-5',
            collectionAddress:
              'juno17p6u07z9zr4ej6jt55fvafp966v90vm6m8xarejzgjqc7305w58qjmsej2',
            tokenId: 'praying_peepo',
            imageUrl:
              'ipfs://bafybeie7bh35eok2h2u67hmhyyw7kgmsmpubm3zhynyog2kcqfrejbwoei/blob',
          },
        },
      },
      {
        publicKey: 'peepoturbo',
        address: 'peepoturbo',
        profile: {
          nonce: 2,
          name: 'peepoturbo',
          nft: {
            chainId: 'uni-5',
            collectionAddress:
              'juno17p6u07z9zr4ej6jt55fvafp966v90vm6m8xarejzgjqc7305w58qjmsej2',
            tokenId: 'turbo_peepo',
            imageUrl:
              'ipfs://bafybeiay2jgeusl63sie2lgocybux63nhy3viflkfkem2ove7nwmfxygkq/blob',
          },
        },
      },
    ],
  },
}
