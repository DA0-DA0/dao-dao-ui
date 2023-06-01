import { useWalletManager } from '@noahsaso/cosmodal'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import {
  installWarningVisibleAtom,
  noKeplrAccountAtom,
} from '@dao-dao/state/recoil'
import { InstallKeplrModal, NoKeplrAccountModal } from '@dao-dao/stateless'

import { PfpkNftSelectionModal } from '../PfpkNftSelectionModal'
import { CosmodalUi } from './CosmodalUi'
import { Web3AuthPromptModal } from './Web3AuthPromptModal'

export const WalletModals = () => {
  //! WALLET CONNECTION ERROR MODALS
  const { error } = useWalletManager()
  const [installWarningVisible, setInstallWarningVisible] = useRecoilState(
    installWarningVisibleAtom
  )
  const [noKeplrAccount, setNoKeplrAccount] = useRecoilState(noKeplrAccountAtom)
  useEffect(() => {
    setInstallWarningVisible(
      error instanceof Error &&
        error.message === 'Failed to retrieve wallet client.'
    )
    setNoKeplrAccount(
      error instanceof Error && error.message === "key doesn't exist"
    )
  }, [error, setInstallWarningVisible, setNoKeplrAccount])

  return (
    <>
      {/* Wallet connection UI for cosmodal. */}
      <CosmodalUi />

      <InstallKeplrModal
        onClose={() => setInstallWarningVisible(false)}
        visible={installWarningVisible}
      />
      <NoKeplrAccountModal
        onClose={() => setNoKeplrAccount(false)}
        visible={noKeplrAccount}
      />

      {/* CosmodalUi may open above this, so it must be after that. And it may need the Web3AuthPromptModal to confirm, so it must be before that. */}
      <PfpkNftSelectionModal />

      {/* For rejecting/approving web3auth wallet transactions. */}
      <Web3AuthPromptModal />
    </>
  )
}
