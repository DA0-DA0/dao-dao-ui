import { PfpkNftSelectionModal } from '../PfpkNftSelectionModal'
import { CosmodalUi } from './CosmodalUi'
import { Web3AuthPromptModal } from './Web3AuthPromptModal'

export const WalletModals = () => (
  <>
    {/* Wallet connection UI for cosmodal. */}
    <CosmodalUi />

    {/* Wallet UI may above open this, so it must be after that. And it may need the Web3AuthPromptModal to confirm, so it must be before that. */}
    <PfpkNftSelectionModal />

    {/* For rejecting/approving web3auth wallet transactions. */}
    <Web3AuthPromptModal />
  </>
)
