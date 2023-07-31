import { PfpkNftSelectionModal } from '../PfpkNftSelectionModal'
import { Web3AuthPromptModal } from './Web3AuthPromptModal'

export const WalletModals = () => (
  <>
    {/* The wallet modal may open above this, so this must be after that. And it may need the Web3AuthPromptModal to confirm, so this must be before that. */}
    <PfpkNftSelectionModal />

    {/* For rejecting/approving web3auth wallet transactions. Must be last. */}
    <Web3AuthPromptModal />
  </>
)
