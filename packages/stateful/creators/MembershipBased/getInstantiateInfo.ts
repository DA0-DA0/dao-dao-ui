import { DaoCreatorGetInstantiateInfo } from '@dao-dao/types'
import { Member } from '@dao-dao/types/contracts/DaoVotingCw4'
import { isSecretNetwork } from '@dao-dao/utils'

import { Cw4VotingModule } from '../../clients/voting-module/Cw4VotingModule'
import { SecretCw4VotingModule } from '../../clients/voting-module/Cw4VotingModule.secret'
import { CreatorData } from './types'

export const getInstantiateInfo: DaoCreatorGetInstantiateInfo<CreatorData> = ({
  chainConfig: { chainId },
  newDao: { name },
  data: { tiers },
}) =>
  (isSecretNetwork(chainId)
    ? SecretCw4VotingModule
    : Cw4VotingModule
  ).generateModuleInstantiateInfo(chainId, name, {
    new: {
      members: tiers.flatMap(({ weight, members }) =>
        members.map(
          ({ address }): Member => ({
            addr: address,
            weight,
          })
        )
      ),
    },
  })
