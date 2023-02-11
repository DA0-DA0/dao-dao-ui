import {
  Paid,
  SavingsRounded,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  refreshHiddenBalancesAtom,
  refreshNativeTokenStakingInfoAtom,
} from '@dao-dao/state'
import {
  TokenCard as StatelessTokenCard,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { TokenCardInfo, TokenType } from '@dao-dao/types'
import {
  JUNO_USDC_DENOM,
  KVPK_API_BASE,
  loadableToLoadingData,
  processError,
} from '@dao-dao/utils'

import { useCfWorkerAuthPostRequest } from '../hooks'
import {
  HIDDEN_BALANCE_PREFIX,
  hiddenBalancesSelector,
  temporaryHiddenBalancesAtom,
  tokenCardLazyInfoSelector,
} from '../recoil'
import { ButtonLink } from './ButtonLink'
import { WalletFiatRampModal } from './WalletFiatRampModal'

export const WalletTokenCard = (props: TokenCardInfo) => {
  const { t } = useTranslation()
  const { address: walletAddress = '', publicKey } = useWallet()

  const lazyInfoLoadable = useCachedLoadable(
    tokenCardLazyInfoSelector({
      walletAddress,
      token: props.token,
    })
  )

  //! Loadable errors.
  useEffect(() => {
    if (lazyInfoLoadable.state === 'hasError') {
      console.error(lazyInfoLoadable.contents)
    }
  }, [lazyInfoLoadable.contents, lazyInfoLoadable.state])

  // Refresh staking info.
  const setRefreshNativeTokenStakingInfo = useSetRecoilState(
    refreshNativeTokenStakingInfoAtom(walletAddress)
  )
  const refreshNativeTokenStakingInfo = useCallback(
    () => setRefreshNativeTokenStakingInfo((id) => id + 1),
    [setRefreshNativeTokenStakingInfo]
  )

  const { ready: hiddenBalancesReady, postRequest: postHiddenBalancesRequest } =
    useCfWorkerAuthPostRequest(KVPK_API_BASE, 'Hidden Balances')

  const setRefreshHidden = useSetRecoilState(refreshHiddenBalancesAtom)
  const refreshHidden = useCallback(
    () => setRefreshHidden((id) => id + 1),
    [setRefreshHidden]
  )

  const setTemporaryHiddenBalances = useSetRecoilState(
    temporaryHiddenBalancesAtom(publicKey?.hex ?? '')
  )
  const hiddenBalancesLoadable = useCachedLoadable(
    publicKey?.hex ? hiddenBalancesSelector(publicKey.hex) : undefined
  )
  const isHidden =
    hiddenBalancesLoadable.state === 'hasValue'
      ? hiddenBalancesLoadable.contents.includes(props.token.denomOrAddress)
      : undefined

  const [savingHidden, setSavingHidden] = useState(false)

  const setBalanceHidden = async (hidden: boolean) => {
    if (!hiddenBalancesReady) {
      toast.error(t('error.connectWalletToContinue'))
    }

    setSavingHidden(true)
    try {
      const key = HIDDEN_BALANCE_PREFIX + props.token.denomOrAddress
      // Delete the key if hidden is false.
      const value = hidden ? 1 : null

      await postHiddenBalancesRequest('/set', {
        key,
        value,
      })

      setTemporaryHiddenBalances((prev) => ({
        ...prev,
        [key]: value,
      }))
      refreshHidden()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setSavingHidden(false)
    }
  }

  const isUsdc =
    props.token.type === TokenType.Native &&
    props.token.denomOrAddress === JUNO_USDC_DENOM

  // Set this to a value to show the fiat ramp modal defaulted to that option.
  const [fiatRampDefaultModeVisible, setFiatRampDefaultModeVisible] = useState<
    'buy' | 'sell' | undefined
  >()

  return (
    <>
      <StatelessTokenCard
        {...props}
        ButtonLink={ButtonLink}
        actions={{
          token: [
            ...(isUsdc
              ? [
                  {
                    Icon: Paid,
                    label: t('button.depositFiat'),
                    onClick: () => setFiatRampDefaultModeVisible('buy'),
                  },
                  {
                    Icon: SavingsRounded,
                    label: t('button.withdrawFiat'),
                    onClick: () => setFiatRampDefaultModeVisible('sell'),
                  },
                ]
              : []),
          ],
          extraSections:
            isHidden === undefined
              ? undefined
              : [
                  {
                    label: t('title.visibility'),
                    buttons: [
                      {
                        Icon: isHidden ? Visibility : VisibilityOff,
                        label: isHidden ? t('button.unhide') : t('button.hide'),
                        onClick: () => setBalanceHidden(!isHidden),
                        loading: savingHidden,
                      },
                    ],
                  },
                ],
        }}
        lazyInfo={loadableToLoadingData(lazyInfoLoadable, {
          usdcUnitPrice: undefined,
          stakingInfo: undefined,
        })}
        refreshUnstakingTasks={refreshNativeTokenStakingInfo}
      />

      {isUsdc && (
        <WalletFiatRampModal
          defaultMode={fiatRampDefaultModeVisible}
          onClose={() => setFiatRampDefaultModeVisible(undefined)}
          visible={fiatRampDefaultModeVisible !== undefined}
        />
      )}
    </>
  )
}
