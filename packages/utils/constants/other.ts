// Constants NOT derived from environment variables.

import { ChainId } from '@dao-dao/types'

export const SITE_IMAGE = '/social.jpg'
export const WC_ICON_PATH = '/daodao.png'

// 3 days
export const POLYTONE_TIMEOUT_SECONDS = 3 * 24 * 60 * 60

// DAO name min/max and description max defined in core.
export const MIN_DAO_NAME_LENGTH = 3
export const MAX_DAO_NAME_LENGTH = 50
export const MAX_META_CHARS_PROPOSAL_DESCRIPTION = 200

// 5 minutes
export const DAO_STATIC_PROPS_CACHE_SECONDS = 60 * 5

export const NEW_DAO_CW20_DECIMALS = 6

// This will not change with environment.
export const MAX_NUM_PROPOSAL_CHOICES = 20

// Discord notifier (https://github.com/DA0-DA0/discord-notifier-cf-worker)
export const DISCORD_NOTIFIER_SIGNATURE_TYPE = 'Discord Notifier'

// Following DAOs
export const FOLLOWING_DAOS_PREFIX = 'following:'

// The key for the item in the DAO core contract that contains the payroll
// config.
export const DAO_CORE_PAYROLL_CONFIG_ITEM_KEY = 'payroll'

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

// Osmosis
export const OSMOSIS_MAINNET_RPC = 'https://rpc.osmosis.zone'
export const OSMOSIS_MAINNET_REST = 'https://lcd.osmosis.zone'
export const OSMOSIS_API_BASE = 'https://api-osmosis.imperator.co'

// Search
export const SearchDaosIndexPerChain: Partial<Record<ChainId, string>> = {
  [ChainId.JunoMainnet]: 'daos',
  [ChainId.JunoTestnet]: 'testnet_daos',
  [ChainId.OsmosisMainnet]: 'osmosis_daos',
  [ChainId.OsmosisTestnet]: 'osmosis_testnet_daos',
}
