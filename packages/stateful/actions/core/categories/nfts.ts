import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionChainContextType,
  ActionKey,
  ChainId,
} from '@dao-dao/types'

export const makeManageNftsActionCategory: ActionCategoryMaker = ({
  t,
  context,
  chainContext,
}) =>
  // Chains without CosmWasm cannot use NFTs.
  chainContext.type !== ActionChainContextType.Any &&
  !chainContext.config.noCosmWasm &&
  // OmniFlix doesn't use CW721 NFTs.
  chainContext.chainId !== ChainId.OmniflixHubMainnet
    ? {
        key: ActionCategoryKey.Nfts,
        label: t('actionCategory.nftsLabel'),
        description: t('actionCategory.nftsDescription', {
          context: context.type,
        }),
        actionKeys: [
          ActionKey.CreateNftCollection,
          ActionKey.MintNft,
          ActionKey.TransferNft,
          ActionKey.BurnNft,
          ActionKey.ManageCw721,
        ],
      }
    : null
