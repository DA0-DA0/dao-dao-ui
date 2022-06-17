// elsehow 13331
const en = {
  // words - mere words
  //
  On: 'On',
  Off: 'Off',
  None: 'None',
  Back: 'Back',
  Continue: 'Continue',
  Review: 'Review',
  // as opposed to 'Disabled'
  Enabled: 'Enabled',
  Preview: 'Preview',
  'Hide preview': 'Hide preview', // a command
  Create: 'Create',

  // DAO vocabulary
  //
  DAOs: 'DAOs',
  Members: 'Members',
  Addresses: 'Addresses',
  Treasury: 'Treasury',
  Info: 'Info',

  Proposals: 'Proposals',
  proposal_zero: '{{count}} proposals created',
  proposal_one: '{{count}} proposal created',
  proposal_other: '{{count}} proposals created',
  'Proposal title': 'Proposal title',
  'Proposal description': 'Proposal description',
  'Proposal action_one': 'Proposal action',
  'Proposal action_other': 'Proposal actions',
  Action_one: 'Action',
  Action_other: 'Actions',

  'Voting configuration': 'Voting configuration',
  'Voting power': 'Voting power',

  'Governance token_one': 'Governance token',
  'Governance token_other': 'Governance tokens',

  Staking: 'Staking', // noun
  Staked: 'Staked', // adjective
  Stake: 'Stake', // imperative verb
  Unstaking: 'Unstaking', // noun and adjective
  Unstake: 'Unstake', // imperative verb
  Claim: 'Claim', // verb
  Unclaimed: 'Unclaimed', // adjective
  'Percent staked':
    '{{percent, number(minimumFractionDigits:0)}}% ${{tokenSymbol}} staked',

  // Staking modal
  'Stake tokens': 'Stake tokens',
  'Stake Tokens': 'Stake Tokens',
  'Unstake tokens': 'Unstake tokens',
  'Unstake Tokens': 'Unstake Tokens',
  'Claim tokens': 'Claim tokens',
  'Claim Tokens': 'Claim Tokens',
  'Stake all but proposal deposit':
    'Stake all but the {{proposalDeposit}} ${{tokenSymbol}} proposal deposit',
  // Balance cards
  'You are not a member yet!': 'You are not a member of {{daoName}} yet!',
  stakeTokensToJoin:
    'Stake your <2>{{amount}} ${{tokenSymbol}}</2> to join and vote in {{daoName}}.',
  'You are a member!': 'You are a member of {{daoName}}!',
  votingPowerStakedTokens:
    'Your voting power is <2>{{powerPercent}}%</2> (<5>{{amount}} ${{tokenSymbol}} staked</5>).',
  'You could have more voting power': 'You could have more voting power.',
  stakeRemainingForVotingPower:
    'Stake your <2>remaining {{amount}} ${{tokenSymbol}}</2> to gain voting power in {{daoName}}.',
  'Your tokens have unstaked': 'Your ${{tokenSymbol}} tokens have unstaked.',

  'Governance token name': 'Token name',
  'Governance token placeholder': 'A token name (e.g., "DogDAO token")',

  'Ticker symbol': 'Ticker symbol',
  'Ticker symbol placeholder': 'A ticker symbol (e.g., "DOG")',

  'Token image': 'Token image',
  'Treasury balance': 'Treasury balance',

  'Total supply': 'Total supply',
  'Total supply amount': '{{amount}} ${{tokenSymbol}} total supply',

  'Governance token address': 'Governance token address',
  'Token contract address': 'Token contract address',

  'Voting duration': 'Voting duration',
  'Voting duration description':
    'The amount of time that a proposal will remain open for voting. After this time elapses, the proposal will either pass or fail.',

  'Proposal deposit': 'Proposal deposit',
  'Proposal deposit description':
    'The number of governance tokens that must be deposited in order to create a proposal. Setting this high may deter spam, but setting it too high may limit broad participation.',

  'Unstaking period': 'Unstaking period',
  'Unstaking period description':
    "In order to vote, members must stake their tokens with the DAO. Members who would like to leave the DAO or trade their governance tokens must first unstake them. This setting configures how long members have to wait after unstaking their tokens for those tokens to become available. The longer you set this duration, the more sure you can be that people who register their tokens are keen to participate in your DAO's governance.",
  'Unstaking mechanics':
    'If you unstake now, it will take {{humanReadableTime}} until they are available to you. During that time, you will not recieve staking rewards. You will not be able to cancel the unbonding.',

  'Passing threshold': 'Passing threshold',
  'Passing threshold description':
    "The percentage of votes that must be 'yes' in order for a proposal to pass. For example, with a 50% passing threshold, half of the voting power must be in favor of a proposal to pass it.",

  Quorum: 'Quorum',
  'Quorum description':
    'The minumum percentage of voting power that must vote on a proposal for it to be considered. For example, in the US House of Representatives, 218 members must be present for a vote. If you have an org with many inactive members, setting this value too high may make it difficult to pass proposals.',

  'Proposal deposit refund': 'Refund failed proposals',
  'Proposal deposit refund description':
    'Should a failed proposal have its deposit refunded to the proposer? (Proposals that pass will always have their deposit returned). Turning this on, particularly when proposal deposits are high, may encourage members to deliberate with other members before creating a proposal.',
  // this is the "mass noun" of a Proposal deposit refund - like "issuing lots of refunds"
  Refunds: 'Refunds',

  // votes
  'Vote status': 'Vote status',
  'Ratio of votes': 'Ratio of votes',
  Yes: 'Yes',
  No: 'No',
  Abstain: 'Abstain',
  Passing: 'Passing',
  Failing: 'Failing',
  Turnout: 'Turnout',
  Reached: 'Reached',
  Majority: 'Majority',
  'Not met': 'Not met',
  'All abstain': 'All abstain',
  'All abstain clarification': 'When all abstain, a proposal will fail',

  // DAO DAO UI
  //
  //
  // Names for UI ideas
  Favorited: 'Favorited',
  Favorite: 'Favorite',
  Featured: 'Featured',

  // Names for UI states
  //
  'Dark theme': 'Dark theme',
  'Light theme': 'Light theme',
  // 'Remaining' as in: 'Remaining: 5 hours'
  'Remaining (time)': '{{time}} remaining',
  // Names for UI places
  'Home page': 'Home',
  Documentation: 'Documentation',
  Feedback: 'Feedback',

  // Viewing your relationship to a DAO
  'You are a member': "You're a member",
  'Your equity': 'Your equity',
  'Member voting powers': 'Member voting powers',
  'Your balance': 'Your balance',
  'Your voting power': 'Your voting power',
  'You are about to unstake': 'You are about to unstake governance tokens',
  'You must have voting power to create a proposal':
    'You must have voting power to create a proposal. Stake tokens to get voting power.',

  // Names for UI actions
  // (think: names for things you can use the UI *do*)
  //
  'Explore DAOs': 'Explore all DAOs',
  'Create a DAO': 'Create a DAO',
  'Create DAO': 'Create DAO',
  'Add an image': 'Add an image',
  'Prompt to create a DAO':
    "You're not a member of any DAOs. Why not create one?",
  Search: 'Search',
  'Search placeholder': 'Search for a DAO',
  'Manage staking': 'Manage staking',
  'Choose token amount': 'Choose number of tokens',
  'Stake your tokens': 'Stake your tokens', // imperative verb
  'Add to Keplr': 'Add token to Keplr',
  'Create a proposal': 'Create a proposal',
  'Create first proposal prompt':
    'This DAO has no proposals. Why not create one?',
  'Add an action': 'Add an action',
  'Publish proposal': 'Publish proposal', // a command
  'Add another tier prompt':
    'Want to add members with different voting power? Add another tier.',

  // Confirmations
  //
  // 'ok.' 'understood.' 'alright.'
  'Got it': 'Got it',
  // 'warning!' 'danger!' 'pay attention!'
  'Watch out!': 'Watch out!',
  // acknowledge that you have understood the danger.
  'I accept the danger': 'I accept the danger',
  // acknowledge that you have accepted a binding agreement
  'I accept the terms': 'I accept the terms',

  // DAO creation steps
  //
  'Choose a structure': 'Choose a structure',
  'Describe the DAO': 'Describe the DAO',
  'Configure voting': 'Configure voting',
  'Configure voting description':
    'Add members, configure voting thresholds, and (optionally) use governance tokens to determine voting share.',
  'Review and submit': 'Review and submit',
  'Token distribution': 'Token distribution',

  // Choosing a DAO's structure
  'Membership-based DAO': 'Membership-based DAO',
  'Membership-based DAO description':
    'Small organization with a few members who are likely to stick around. Members can be added and removed by a vote of existing members.',
  'Governance Token-based DAO': 'Governance Token-based DAO',
  'Governance Token-based DAO description':
    'Fluid organization with many members who leave and join frequently. Members can join and leave by exchanging governance shares.',

  // Configuring a DAO's description
  'DAO Name': 'DAO Name',
  'DAO Description': 'DAO Description',
  'Image URL': 'Image URL',
  'Image URL tooltip':
    'A link an image. For example: https://moonphase.is/image.svg',

  // Configuring a DAO's membership and voting system
  //
  'Member address placeholder': "Member's address",
  'Add member': 'Add member',
  'per member': 'per member',
  // tiers of members
  Tier_one: 'Tier',
  Tier_other: 'Tiers',
  'Tier name': 'Tier name',
  'Tier description':
    'The "class" of member. For example: "Core developers" or "friends and family." These names are only for your reference.',
  'Add tier': 'Add tier',
  'Default tier name': 'Core contributors',
  // governance token configuration
  'Create a token': 'Create a token',
  'Use existing token': 'Use an existing token',
  // TODO smarter / more localized ways to do percentages?
  'Treasury balance description':
    "{{numberOfTokensMinted, number}} tokens will be minted. {{memberPercent, number(minimumFractionDigits:2)}}% will be sent to members according to the distribution above. The reamining {{treasuryPercent, number(minimumFractionDigits:2)}}% will go to the DAO's treasury, where they can be distributed later via governance proposal.",
  // advanced voting configuration
  'Advanced voting configuration': 'Advanced configuration',
  'Advanced voting configuration description':
    'Configure passing threshold and quorum.',
  'Advanced configuration warning':
    'This is an advanced feature. Threshold and quorum can interact in counterintuitive ways. If you configure them without fully understanding how they work, you can lock your DAO, making it impossible for proposals to pass.',

  // Managing the user's connection to a wallet
  //
  // NOTE: We need to communicate with users about wallets because
  // wallets are poorly designed, poorly supported by major browsers,
  // and poorly understood, in that order. I recommend literal
  // translations here, even if they're clunky.
  //
  'Connect wallet': 'Connect wallet',
  'Need wallet to continue': "You'll need a wallet to continue",
  'Need wallet to continue (long)':
    'Your wallet is your digital identity on the blockchain. Having one lets you interact with web3 applications like DAO DAO.\nWe recommend the Keplr wallet',
  'Install Keplr': 'Install Keplr',
  'Configure wallet to continue': 'Configure your wallet to continue',
  'Configure wallet to continue (long)':
    "You have Keplr installed, but it doesn't seem like you've set up a wallet. To continue, open the Keplr extension and set up a wallet.\nTo open the Keplr extension press the puzzle icon in the top right of your browser and then press the Keplr button. Once you've done that, a new page will open where you'll be able to create a new account. Configure your wallet to continue",

  // Beta warning
  'Beta warning':
    'DAO DAO is in beta, and has not yet been audited. Do not keep large sums of money in your DAO, and do not use your DAO for anything mission critical.',

  // ToS
  'Terms of service':
    'DAO DAO TOOLING IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. No developer or entity involved in creating the DAO DAO UI or smart contracts will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of DAO DAO tooling, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.',

  // Landing page
  landingPage: {
    'short tagline': 'DAOs for everyone.',
    'long tagline':
      'Simple, capable, and free DAO tooling. Built with love, by DAO DAO, on Juno.',
    CTA: 'Enter the app',
    'Create DAOs': 'Create DAOs.',
    'Create DAOs tagline':
      'Create and grow a DAO for your community with a simple user interface. No command line required.',
    'Propose and vote': 'Propose and vote',
    'Propose and vote tagline':
      'Proposals can do anything you can do on chain. They pass when the community votes on them.',
    'IBC enabled': 'IBC enabled',
    'IBC enabled tagline':
      'DAOs can manage IBC assets, instantiate smart contracts, and manage entire protocols.',
    'Powered by Juno': 'Powered by Juno',
  },

  // Success!
  //
  success: {
    voteCast: 'Vote successfully cast.',
    proposalExecuted: 'Executed successfully.',
    addedToken: 'Added token to Keplr.',
  },

  // Errors
  //
  error: {
    loadingData: 'Failed to load data.',
    invalidAddress: 'Invalid address.', // TODO search for and replace these
    invalidCosmosMessage: 'Invalid Cosmos message.', // TODO search for and replace these
    DAONotFound: 'DAO not found.',
    proposalNotfound: 'Proposal not found.',
    noVotingPower:
      'You have not given anyone voting power. Add some members to your DAO.',
    noMembers: "You haven't added any members to your DAO",
    noGovTokenInfo:
      "You didn't give enough information about your governance token.",
    noGovTokenAddr: "You didn't provide an address for your governance token.",
    fieldRequired: 'This field is required.', // TODO find and replace
    cannotStakeMoreThanYouHave:
      "You can't stake or unstake more tokens than you have.",
    cannotTxZeroTokens: "You can't stake, unstake, or claim zero tokens.",
    notEnoughForDeposit:
      'You do not have enough tokens in your balance to pay the proposal deposit',
    daoIsPaused: 'You cannot create a proposal when the DAO is paused.',
    mustBeMemberToCreateProposal:
      'You must be a member of the DAO to create a proposal',
    noProposalsFound: 'No proposals found.',
    noProposalModule: 'This DAO does not have a proposal module.',
  },
}

export default en
