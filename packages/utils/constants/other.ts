// Constants NOT derived from environment variables.

import { ChainId } from '@dao-dao/types'

export const SITE_IMAGE = '/social.jpg'
export const SITE_TITLE = 'DAO DAO'
export const DEFAULT_SITE_DESCRIPTION =
  'Create a DAO to manage your community, protocol, or entire blockchain in just a few clicks. We support multisig, token-based, and NFT-based DAOs that can be as simple or complex as you want. Set up SubDAOs, manage interchain assets, and interact with dApps across the Cosmos.'
export const CREATE_PAGE_TITLE = 'Create a DAO'
export const CREATE_PAGE_DESCRIPTION =
  'Create a new project, protocol, organization, or community—organized any way you can imagine.'
export const ACCOUNT_PAGE_TITLE = 'Account: ADDRESS'
export const ACCOUNT_PAGE_DESCRIPTION =
  'View tokens and NFTs for the account with address ADDRESS.'
export const NOTIFICATIONS_PAGE_TITLE = 'Notifications'
export const NOTIFICATIONS_PAGE_DESCRIPTION =
  'View notifications in your followed DAOs.'
export const ME_PAGE_TITLE = 'Account'
export const ME_PAGE_DESCRIPTION =
  'View your tokens, NFTs, and DAOs, or execute transactions from your wallet.'
export const STATUS_PAGE_TITLE = 'Status'
export const STATUS_PAGE_DESCRIPTION = "Check the status of DAO DAO's services."

// 3 days
export const IBC_TIMEOUT_SECONDS = 3 * 24 * 60 * 60

// DAO name min/max and description max defined in core.
export const MIN_DAO_NAME_LENGTH = 3
export const MAX_DAO_NAME_LENGTH = 50
export const MAX_META_CHARS_PROPOSAL_DESCRIPTION = 200

export const DAO_STATIC_PROPS_CACHE_SECONDS = 60

export const NEW_DAO_TOKEN_DECIMALS = 6

// This will not change with environment.
export const MAX_NUM_PROPOSAL_CHOICES = 20

// Discord notifier (https://github.com/DA0-DA0/discord-notifier-cf-worker)
export const DISCORD_NOTIFIER_SIGNATURE_TYPE = 'Discord Notifier'

// Following DAOs
export const FOLLOWING_DAOS_PREFIX = 'following:'

// The key for the item in the DAO core contract that contains the payroll
// config.
export const DAO_CORE_PAYROLL_CONFIG_ITEM_KEY = 'payroll'
// The key for the item in the DAO core contract that contains the accent color.
export const DAO_CORE_ACCENT_ITEM_KEY = 'accent'

// The key for the item in the DAO core contract that enables the memo field on
// execute.
export const DAO_CORE_ALLOW_MEMO_ON_EXECUTE_ITEM_KEY = 'allow_memo_on_execute'

// Me balances page
export const HIDDEN_BALANCE_PREFIX = 'hiddenBalance:'

// Supported NFT video extensions. If an NFT image is a video, we'll try to
// render a video player instead of an image.
export const NFT_VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'avi']

// Widgets
// The namespace (prefix) of widgets stored in a DAO's core items list.
export const DAO_WIDGET_ITEM_NAMESPACE = 'widget:'

// The namespace (prefix) of cw721 contracts stored in a DAO's core items list.
// This workaround is necessary for contracts that don't conform to the expected
// contract info response.
export const CW721_WORKAROUND_ITEM_KEY_PREFIX = 'cw721:'
// The namespace (prefix) of cw721 contracts for polytone accounts stored in a
// DAO's core items list. Polytone proxies cannot register cw721s like the DAO
// core contract can, so we need to store this separately.
export const POLYTONE_CW721_ITEM_KEY_PREFIX = 'polytone_cw721:'
// The namespace (prefix) of cw20 contracts for polytone accounts stored in a
// DAO's core items list. Polytone proxies cannot register cw20s like the DAO
// core contract can, so we need to store this separately.
export const POLYTONE_CW20_ITEM_KEY_PREFIX = 'polytone_cw20:'

// Osmosis API
export const OSMOSIS_API_BASE = 'https://api-osmosis.imperator.co'

// White Whale API
export const WHITE_WHALE_PRICES_API =
  'https://www.api-white-whale.enigma-validator.com/summary/migaloo/all/current'

// Astroport API
export const ASTROPORT_PRICES_API =
  'https://api.astroport.fi/api/tokens/DENOM?chainId=neutron-1'

// Snapper API
export const SNAPPER_API_BASE = 'https://snapper.daodao.zone'

// KVPK prefix for saved Me page transactions.
export const ME_SAVED_TX_PREFIX = 'savedTx:'

// KVPK prefix for registered ICA chains.
export const ICA_CHAINS_TX_PREFIX = 'ica:'

export const CHAIN_GAS_MULTIPLIER = 2

// Neutron DAOs.
export const NEUTRON_GOVERNANCE_DAO =
  'neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff'
export const NEUTRON_SECURITY_SUBDAO =
  'neutron1fuyxwxlsgjkfjmxfthq8427dm2am3ya3cwcdr8gls29l7jadtazsuyzwcc'

export const IPFS_GATEWAY_TEMPLATE = 'https://ipfs.daodao.zone/ipfs/PATH'

// DAOs with these names will be excluded from search.
export const INACTIVE_DAO_NAMES = ['[archived]', '[deleted]']

// The namespace (prefix) of enabled vetoable DAOs stored in the items list.
export const VETOABLE_DAOS_ITEM_KEY_PREFIX = 'showVetoableDao:'

/**
 * The address passed to the historical balance and treasury value selectors to
 * indicate that it should load tokens from the community pool instead.
 */
export const COMMUNITY_POOL_ADDRESS_PLACEHOLDER = 'COMMUNITY_POOL'

// 1-10 linear from purple to orange/yellow. Intersperse colors so similar
// colors are not adjacent.
export const DISTRIBUTION_COLORS = [
  '#5B58E2', // 1
  '#954FE7', // 4
  '#FC81A4', // 7
  '#F1B671', // 10
  '#4744AC', // 2
  '#BA73DD', // 5
  '#EE7969', // 8
  '#6642CE', // 3
  '#DE73C0', // 6
  '#F4925A', // 9
]

export const DISTRIBUTION_COLORS_ORDERED = [
  '#5B58E2', // 1
  '#4744AC', // 2
  '#6642CE', // 3
  '#954FE7', // 4
  '#BA73DD', // 5
  '#DE73C0', // 6
  '#FC81A4', // 7
  '#EE7969', // 8
  '#F4925A', // 9
  '#F1B671', // 10
]

export const DISTRIBUTION_COLORS_EVERY_OTHER = [
  '#4744AC', // 2
  '#954FE7', // 4
  '#DE73C0', // 6
  '#EE7969', // 8
  '#F1B671', // 10
  '#5B58E2', // 1
  '#6642CE', // 3
  '#BA73DD', // 5
  '#FC81A4', // 7
  '#F4925A', // 9
]

// Legitimate SubDAOs with the chain governance module set as their admin. This
// is necessray because chains cannot recognize SubDAOs as they are not DAO
// contracts, and we need to establish which SubDAOs of a DAO are legitimate for
// safety.
export const CHAIN_SUBDAOS: Record<string, string[] | undefined> = {
  [ChainId.JunoMainnet]: [
    'juno1nmezpepv3lx45mndyctz2lzqxa6d9xzd2xumkxf7a6r4nxt0y95qypm6c0',
    'juno1gyjl26rnqqyk6cuh6nqtvx8t885jgqagusvpqpvtgaygcjg2wjdqz0rzle',
    'juno1n34v729jqgysm5w0unukpt4kvqu4wqyacsv4krmd40f7pz5ruzwqau7e6m',
    'juno1mjsgk02jyn72jm2x7fgw72uu9wj7xy0v6pnuj2jd3aq7rgeqg5qq4dnhes',
  ],
}

/**
 * Error substrings that indicate a contract is invalid or does not exist.
 */
export const INVALID_CONTRACT_ERROR_SUBSTRINGS = [
  'Error parsing into type',
  'no such contract',
  'not found: invalid request',
  'unknown query path',
  'decoding bech32 failed',
]
