// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import { DecoratorFn } from '@storybook/react'
import { useMemo } from 'react'

import { DaoInfo, DaoPageWrapper } from '@dao-dao/common'

export const DaoPageWrapperDecorator: DecoratorFn = (Story) => {
  const info: DaoInfo = useMemo(
    () => ({
      coreAddress: 'daoCoreAddress',
      votingModuleAddress: 'votingModuleAddress',
      votingModuleContractName: 'crates.io:cw20-staked-balance-voting',
      proposalModules: [
        {
          contractName: 'crates.io:cw-govmod-single',
          address: 'proposalModuleAddress',
          prefix: 'A',
        },
      ],
      name: 'DAO Name',
      description: 'DAO Description',
      imageUrl: 'https://moonphase.is/image.svg',
      // Random date in the past 12 months.
      created: new Date(
        Date.now() - Math.floor(Math.random() * 12 * 30 * 24 * 60 * 60 * 1000)
      ),
    }),
    []
  )

  return (
    <DaoPageWrapper
      description={info.description}
      info={info}
      title={info.name}
    >
      <Story />
    </DaoPageWrapper>
  )
}
