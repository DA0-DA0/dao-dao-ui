import { DisconnectWallet as StatelessDisconnectWallet } from '@dao-dao/stateless'

import { useWallet } from '../../hooks'

export const DisconnectWallet = () => {
  const { disconnect } = useWallet()

  return (
    <StatelessDisconnectWallet
      className="shrink-0"
      onDisconnect={disconnect}
      variant="secondary"
    />
  )
}
