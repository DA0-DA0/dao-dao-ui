import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID } from '@dao-dao/storybook'
import { EntityType, TokenType } from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { EntityDisplay } from '../../../../../../../../components'
import { Complete } from './Complete'
import { makeSurvey } from './Submit.stories'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / RetroactiveCompensation / components / stateless / pages / ProposalCreationForm',
  component: Complete,
} as ComponentMeta<typeof Complete>

const Template: ComponentStory<typeof Complete> = (args) => (
  <Complete {...args} />
)

export const Default = Template.bind({})
Default.args = {
  status: {
    survey: makeSurvey(),
    contribution: 'this is my contribution\n\npls give me money',
    contributionSelfRatings: null,
    rated: false,
  },
  completeRatings: {
    contributions: [
      {
        id: 1,
        contributor: {
          publicKey: 'publicKey1',
          address: 'juno1',
        },
        content: 'I contributed so much of my BLOOD SWEAT AND TEARS',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ratings: [20, 40],
        compensation: {
          contributionId: 1,
          compensationPerAttribute: [
            {
              averageRating: 0,
              nativeTokens: [
                {
                  denomOrAddress: 'ujuno',
                  amount: '0',
                },
              ],
              cw20Tokens: [],
            },
            {
              averageRating: 30,
              nativeTokens: [
                {
                  denomOrAddress: 'ujuno',
                  amount: '10000000000',
                },
              ],
              cw20Tokens: [],
            },
          ],
        },
      },
      {
        id: 2,
        contributor: {
          publicKey: 'publicKey2',
          address: 'juno2',
        },
        content:
          "i did absolutely nothing but i expect money because i'm around",
        ratings: [20, 40],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        compensation: {
          contributionId: 2,
          compensationPerAttribute: [
            {
              averageRating: 100,
              nativeTokens: [
                {
                  denomOrAddress: 'ujuno',
                  amount: '15000000000',
                },
              ],
              cw20Tokens: [],
            },
            {
              averageRating: 75,
              nativeTokens: [
                {
                  denomOrAddress: 'ujuno',
                  amount: '25000000000',
                },
              ],
              cw20Tokens: [],
            },
          ],
        },
      },
    ],
    ratings: [
      {
        rater: {
          publicKey: 'raterPublicKey1',
          address: 'raterAddress1',
        },
        raterVotingPower: '10',
        contributions: [
          {
            id: 1,
            attributes: [null, 10],
          },
          {
            id: 2,
            attributes: [100, 100],
          },
        ],
      },
      {
        rater: {
          publicKey: 'raterPublicKey2',
          address: 'raterAddress2',
        },
        raterVotingPower: '10',
        contributions: [
          {
            id: 1,
            attributes: [null, 50],
          },
          {
            id: 2,
            attributes: [null, 50],
          },
        ],
      },
    ],
    cosmosMsgs: [],
  },
  onComplete: async (data) => alert('complete: ' + JSON.stringify(data)),
  completing: false,
  EntityDisplay,
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
  entity: {
    loading: false,
    data: {
      type: EntityType.Wallet,
      chainId: CHAIN_ID,
      address: 'walletPerson',
      name: 'wallet Person!',
      imageUrl: '/placeholders/1.svg',
    },
  },
}
