import { DecoratorFn } from '@storybook/react'
import { useMemo } from 'react'

import { DaoPageWrapper } from '@dao-dao/stateful'
import { ContractVersion, DaoInfo, DaoInfoSerializable } from '@dao-dao/types'
import { CHAIN_BECH32_PREFIX, CHAIN_ID } from '@dao-dao/utils'

export const makeDaoInfo = (): DaoInfo => ({
  chainId: CHAIN_ID,
  bech32Prefix: CHAIN_BECH32_PREFIX,
  coreAddress: CHAIN_BECH32_PREFIX + 'DaoCoreAddress',
  coreVersion: ContractVersion.V2Alpha,
  votingModuleAddress: 'votingModuleAddress',
  votingModuleContractName: 'crates.io:dao-voting-cw20-staked',
  proposalModules: [
    {
      contractName: 'crates.io:dao-proposal-single',
      version: ContractVersion.V2Alpha,
      address: 'proposalModuleAddress',
      prefix: 'A',
      preProposeAddress: 'preProposeModuleAddress',
    },
  ],
  name: 'A Very Real DAO',
  description:
    'This DAO does really important stuff. And sometimes **things**. But *mostly* stuff.',
  imageUrl: 'https://moonphase.is/image.svg',
  // Random date in the past 12 months.
  created: new Date(
    Date.now() - Math.floor(Math.random() * 12 * 30 * 24 * 60 * 60 * 1000)
  ),
  items: {},
  polytoneProxies: {},
  parentDao: null,
})

export const DaoPageWrapperDecorator: DecoratorFn = (Story) => {
  const serializedInfo: DaoInfoSerializable = useMemo(() => {
    const info = makeDaoInfo()
    return {
      ...info,
      created: info.created?.toJSON() ?? null,
    }
  }, [])

  return (
    <DaoPageWrapper
      description={serializedInfo.description}
      serializedInfo={serializedInfo}
      title={serializedInfo.name}
    >
      <Story />
    </DaoPageWrapper>
  )
}
