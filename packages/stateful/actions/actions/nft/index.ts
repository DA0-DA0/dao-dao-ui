import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeBurnNftAction } from './BurnNft'
import { makeMintNftAction } from './makeMintNftAction'
import { makeManageCw721Action } from './ManageCw721'
import { makeTransferNftAction } from './TransferNft'

export const makeManageNftsActionCategory: ActionCategoryMaker = ({ t }) => ({
  key: ActionCategoryKey.Nfts,
  label: t('actionCategory.nftsLabel'),
  description: t('actionCategory.nftsDescription'),
  actionMakers: [
    makeMintNftAction,
    makeTransferNftAction,
    makeBurnNftAction,
    makeManageCw721Action,
  ],
})
