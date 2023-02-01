import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeActionsProviderDecorator,
  makeDaoInfo,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionContextType } from '@dao-dao/types'

import { MintNftData } from './types'
import { UploadNftMetadata } from './UploadNftMetadata'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / nft / UploadNftMetadata',
  component: UploadNftMetadata,
  decorators: [
    makeReactHookFormDecorator<MintNftData>({
      contractChosen: true,
      collectionAddress: 'junoNftCollection',
      mintMsg: {
        owner: '',
        token_id: '',
      },
    }),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionContextType.Dao,
        info: makeDaoInfo(),
      },
    }),
  ],
} as ComponentMeta<typeof UploadNftMetadata>

const Template: ComponentStory<typeof UploadNftMetadata> = (args) => (
  <div className="max-w-xl">
    <UploadNftMetadata {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
