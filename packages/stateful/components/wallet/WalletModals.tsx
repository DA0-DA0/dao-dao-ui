import { PfpkNftSelectionModal } from '../PfpkNftSelectionModal'
import { MergeProfilesModal } from '../profile'
import { Web3AuthPromptModal } from './Web3AuthPromptModal'

export const WalletModals = () => (
  <>
    {/* This may need the Web3AuthPromptModal to confirm, so this must be before that. */}
    <MergeProfilesModal />

    {/* This may need the Web3AuthPromptModal to confirm, so this must be before that. */}
    <PfpkNftSelectionModal />

    {/* For rejecting/approving web3auth wallet transactions. Must be last. */}
    <Web3AuthPromptModal />
  </>
)
