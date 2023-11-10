import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeBurnNftAction } from './BurnNft'
import { makeCreateNftCollectionAction } from './CreateNftCollection'
import { makeManageCw721Action } from './ManageCw721'
import { makeMintNftAction } from './MintNft'
import { makeTransferNftAction } from './TransferNft'

export const makeManageNftsActionCategory: ActionCategoryMaker = ({
  t,
  context,
  chainContext: {
    config: { noCosmWasm },
  },
}) =>
  // Chains without CosmWasm cannot use NFTs.
  !noCosmWasm
    ? {
        key: ActionCategoryKey.Nfts,
        label: t('actionCategory.nftsLabel'),
        description: t('actionCategory.nftsDescription', {
          context: context.type,
        }),
        actionMakers: [
          makeCreateNftCollectionAction,
          makeMintNftAction,
          makeTransferNftAction,
          makeBurnNftAction,
          makeManageCw721Action,
        ],
      }
    : null
