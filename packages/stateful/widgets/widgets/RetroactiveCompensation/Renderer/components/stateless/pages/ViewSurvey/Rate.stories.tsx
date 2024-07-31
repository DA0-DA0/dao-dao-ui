import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import {
  AddressInput,
  EntityDisplay,
  Trans,
} from '../../../../../../../../components'
import { Rate } from './Rate'
import { makeSurvey } from './Submit.stories'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / RetroactiveCompensation / components / stateless / Rate',
  component: Rate,
} as ComponentMeta<typeof Rate>

const Template: ComponentStory<typeof Rate> = (args) => <Rate {...args} />

export const Default = Template.bind({})
Default.args = {
  status: {
    survey: makeSurvey(),
    contribution: 'this is my contribution\n\npls give me money',
    contributionSelfRatings: null,
    rated: false,
  },
  state: {
    contributions: [
      {
        id: 1,
        contributor: {
          publicKey: 'publicKey1',
          address: 'juno1',
        },
        content: 'I did stuff',
        ratings: [20, 40],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        contributor: {
          publicKey: 'publicKey2',
          address: 'juno2',
        },
        content: 'I did other stuff\n:D',
        ratings: [20, 40],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    existingRatings: [],
  },
  onSubmit: async (data) =>
    alert('submit: ' + JSON.stringify(data, undefined, 2)),
  loadingSubmit: false,
  EntityDisplay,
  AddressInput,
  Trans,
  tokenPrices: [
    {
      token: {
        chainId: CHAIN_ID,
        type: TokenType.Cw20,
        denomOrAddress: 'dao',
        symbol: 'DAO',
        decimals: 6,
        imageUrl: '/daodao.png',
        source: {
          chainId: CHAIN_ID,
          type: TokenType.Cw20,
          denomOrAddress: 'dao',
        },
      },
      usdPrice: 1,
      timestamp: new Date(),
    },
    {
      token: getNativeTokenForChainId(CHAIN_ID),
      usdPrice: 1,
      timestamp: new Date(),
    },
  ],
}
