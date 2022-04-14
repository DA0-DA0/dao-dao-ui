import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/outline'
import Tooltip from '@reach/tooltip'
import toast from 'react-hot-toast'
import { Button } from 'ui'

import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { daoSelector, unstakingDuration } from 'selectors/daos'
import {
  cw20TokenInfo,
  walletStakedTokenBalance,
  walletTokenBalance,
  walletTokenBalanceUpdateCountAtom,
} from 'selectors/treasury'
import { cleanChainError } from 'util/cleanChainError'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
} from 'util/conversion'

import { Modal } from './Modal'

export enum StakingMode {
  Stake,
  Unstake,
  Claim,
}

function stakingModeString(mode: StakingMode) {
  switch (mode) {
    case StakingMode.Stake:
      return 'stake'
    case StakingMode.Unstake:
      return 'unstake'
    case StakingMode.Claim:
      return 'claim'
    default:
      return 'internal error'
  }
}

function ModeButton({
  onClick,
  active,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  active: boolean
  children: ReactNode
}) {
  return (
    <button
      className={`py-2 px-4 rounded  transition ${
        active
          ? 'bg-btn-secondary border border-inactive'
          : 'hover:bg-btn-secondary'
      } body-text`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function AmountSelector({
  onIncrease,
  onDecrease,
  onChange,
  amount,
  max,
}: {
  onIncrease: MouseEventHandler<HTMLButtonElement>
  onDecrease: MouseEventHandler<HTMLButtonElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  amount: string
  max: number
}) {
  return (
    <div className="relative">
      <button
        className={`absolute top-0 left-0 h-[56px] w-[51px] flex justify-center items-center bg-primary rounded-l ${
          Number(amount) <= 1 ? 'bg-transparent border border-inactive' : ''
        }`}
        disabled={Number(amount) <= 1}
        onClick={onDecrease}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <input
        className="pr-16 pl-16 w-[392px] h-[56px] bg-btn-secondary rounded"
        onChange={onChange}
        type="number"
        value={amount}
      />
      <button
        className={`absolute top-0 right-0 h-[56px] w-[51px] flex justify-center items-center bg-primary rounded-r ${
          Number(amount) + 1 >= max
            ? 'bg-transparent border border-inactive'
            : ''
        }`}
        disabled={Number(amount) + 1 >= max}
        onClick={onIncrease}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

function PercentSelector({
  max,
  amount,
  setAmount,
}: {
  max: number
  amount: number
  setAmount: Dispatch<SetStateAction<string>>
}) {
  const active = (p: number) => max * p == amount
  const getClassName = (p: number) =>
    'rounded-md transition hover:bg-secondary link-text font-normal px-2 py-1' +
    (active(p) ? ' bg-secondary border border-inactive' : '')
  const getOnClick = (p: number) => () => {
    setAmount(
      (p * max)
        // Need to specify 'en' here or otherwise different langauges
        // (ex german) will insert '.' as seperators which will mess
        // with our replace logic :)
        .toLocaleString('en', { maximumFractionDigits: 6 })
        .replaceAll(',', '')
    )
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      <button className={getClassName(0.1)} onClick={getOnClick(0.1)}>
        10%
      </button>
      <button className={getClassName(0.25)} onClick={getOnClick(0.25)}>
        25%
      </button>
      <button className={getClassName(0.5)} onClick={getOnClick(0.5)}>
        50%
      </button>
      <button className={getClassName(0.75)} onClick={getOnClick(0.75)}>
        75%
      </button>
      <button className={getClassName(1)} onClick={getOnClick(1)}>
        100%
      </button>
    </div>
  )
}

function durationIsNonZero(d: Duration) {
  if ('height' in d) {
    return d.height !== 0
  }
  return d.time !== 0
}

function executeUnstakeAction(
  denomAmount: string,
  tokenInfo: TokenInfoResponse,
  stakingAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string,
  setLoading: SetterOrUpdater<boolean>,
  onDone: Function
) {
  if (!signingClient) {
    toast.error('Please connect your wallet')
  }
  const amount = convertDenomToMicroDenomWithDecimals(
    denomAmount,
    tokenInfo.decimals
  )
  setLoading(true)
  signingClient
    ?.execute(
      walletAddress,
      stakingAddress,
      {
        unstake: {
          amount,
        },
      },
      'auto'
    )
    .catch((err) => {
      toast.error(cleanChainError(err.message))
    })
    .finally(() => {
      setLoading(false)
      toast.success(`Unstaked ${denomAmount} tokens`)
      onDone()
    })
}

function executeStakeAction(
  denomAmount: string,
  tokenAddress: string,
  tokenInfo: TokenInfoResponse,
  stakingAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string,
  setLoading: SetterOrUpdater<boolean>,
  onDone: Function
) {
  if (!signingClient) {
    toast.error('Please connect your wallet')
  }
  const amount = convertDenomToMicroDenomWithDecimals(
    denomAmount,
    tokenInfo.decimals
  )
  setLoading(true)
  signingClient
    ?.execute(
      walletAddress,
      tokenAddress,
      {
        send: {
          owner: walletAddress,
          contract: stakingAddress,
          amount: amount,
          msg: btoa('{"stake": {}}'),
        },
      },
      'auto'
    )
    .catch((err) => {
      toast.error(cleanChainError(err.message))
      console.log(err.message)
    })
    .finally(() => {
      setLoading(false)
      toast.success(`Staked ${denomAmount} tokens`)
      onDone()
    })
}

function executeClaimAction(
  denomAmount: number,
  stakingAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string,
  setLoading: SetterOrUpdater<boolean>,
  onDone: Function
) {
  if (!signingClient) {
    toast.error('Please connect your wallet')
  }
  setLoading(true)
  signingClient
    ?.execute(
      walletAddress,
      stakingAddress,
      {
        claim: {},
      },
      'auto'
    )
    .catch((err) => {
      toast.error(cleanChainError(err.message))
    })
    .finally(() => {
      setLoading(false)
      toast.success(`Claimed ${denomAmount} tokens`)
      onDone()
    })
}

export function StakingModal({
  defaultMode,
  contractAddress,
  claimAmount,
  onClose,
  beforeExecute,
  afterExecute,
}: {
  defaultMode: StakingMode
  contractAddress: string
  claimAmount: number
  onClose: MouseEventHandler<HTMLButtonElement>
  beforeExecute: Function
  afterExecute: Function
}) {
  const [mode, setMode] = useState(defaultMode)
  const [amount, setAmount] = useState('0')

  const walletAddress = useRecoilValue(walletAddressSelector)
  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const [loading, setLoading] = useState(false)

  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(cw20TokenInfo(daoInfo?.gov_token))
  const govTokenBalance = convertMicroDenomToDenomWithDecimals(
    useRecoilValue(walletTokenBalance(daoInfo?.gov_token)).amount,
    tokenInfo.decimals
  )

  const stakedGovTokenBalance = convertMicroDenomToDenomWithDecimals(
    useRecoilValue(walletStakedTokenBalance(daoInfo?.staking_contract)).amount,
    tokenInfo.decimals
  )
  const unstakeDuration = useRecoilValue(
    unstakingDuration(daoInfo.staking_contract)
  )
  const setWalletTokenBalanceUpdateCount = useSetRecoilState(
    walletTokenBalanceUpdateCountAtom(walletAddress)
  )

  const maxTx = Number(
    mode === StakingMode.Stake ? govTokenBalance : stakedGovTokenBalance
  )
  const canClaim = claimAmount !== 0

  const invalidAmount = (): string => {
    if (amount === '') {
      return 'Unspecified amount'
    }
    if (Number(amount) > maxTx || Number(amount) <= 0) {
      return `Invalid amount`
    }
    return ''
  }
  const walletDisconnected = (): string => {
    if (!signingClient || !walletAddress) {
      return 'Please connect your wallet'
    }
    return ''
  }

  const error = invalidAmount() || walletDisconnected()
  const ready = !error

  const ActionButton = ({ ready }: { ready: boolean }) => {
    return (
      <Button
        disabled={!ready}
        loading={loading}
        onClick={() => {
          beforeExecute()
          if (mode === StakingMode.Stake) {
            executeStakeAction(
              amount,
              daoInfo.gov_token,
              tokenInfo,
              daoInfo.staking_contract,
              signingClient,
              walletAddress,
              setLoading,
              () => {
                setAmount('0')
                // New staking balances will not appear until the next block has been added.
                setTimeout(() => {
                  setWalletTokenBalanceUpdateCount((p) => p + 1)
                  afterExecute()
                }, 6000)
              }
            )
          } else if (mode === StakingMode.Unstake) {
            executeUnstakeAction(
              amount,
              tokenInfo,
              daoInfo.staking_contract,
              signingClient,
              walletAddress,
              setLoading,
              () => {
                setAmount('0')
                // New staking balances will not appear until the next block has been added.
                setTimeout(() => {
                  setWalletTokenBalanceUpdateCount((p) => p + 1)
                  afterExecute()
                }, 6500)
              }
            )
          } else if (mode === StakingMode.Claim) {
            executeClaimAction(
              convertMicroDenomToDenomWithDecimals(
                claimAmount,
                tokenInfo.decimals
              ),
              daoInfo.staking_contract,
              signingClient,
              walletAddress,
              setLoading,
              () => {
                setTimeout(() => {
                  setWalletTokenBalanceUpdateCount((p) => p + 1)
                  afterExecute()
                }, 6500)
              }
            )
          }
        }}
      >
        <span className="mr-1 capitalize">{stakingModeString(mode)}</span>
      </Button>
    )
  }

  return (
    <Modal>
      <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus">
        <button
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
          onClick={onClose}
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="flex justify-between items-center">
          <h1 className="header-text">Manage staking</h1>
        </div>
        <div className="flex gap-1 py-[20px] mb-2 border-b border-inactive">
          <ModeButton
            active={mode === StakingMode.Stake}
            onClick={() => setMode(StakingMode.Stake)}
          >
            Stake
          </ModeButton>
          <ModeButton
            active={mode === StakingMode.Unstake}
            onClick={() => setMode(StakingMode.Unstake)}
          >
            Unstake
          </ModeButton>
          {canClaim && (
            <ModeButton
              active={mode === StakingMode.Claim}
              onClick={() => setMode(StakingMode.Claim)}
            >
              Claim
            </ModeButton>
          )}
        </div>
        {mode !== StakingMode.Claim && (
          <>
            <div className="flex flex-col mt-[20px]">
              <h2 className="mb-3 primary-text">Choose your token amount</h2>
              <AmountSelector
                amount={amount}
                max={maxTx}
                onChange={(e) => setAmount(e?.target?.value)}
                onDecrease={() => setAmount((a) => (Number(a) - 1).toString())}
                onIncrease={() => setAmount((a) => (Number(a) + 1).toString())}
              />
              {Number(amount) > maxTx && (
                <span className="mt-1 ml-1 text-error caption-text">
                  Can{"'"}t {stakingModeString(mode)} more ${tokenInfo.symbol}{' '}
                  than you own
                </span>
              )}
              <span className="mt-4 font-mono caption-text">
                Max available {maxTx} ${tokenInfo.symbol}
              </span>
              <div className="mt-4">
                <PercentSelector
                  amount={Number(amount)}
                  max={maxTx}
                  setAmount={setAmount}
                />
              </div>
            </div>
            {mode === StakingMode.Unstake &&
              durationIsNonZero(unstakeDuration) && (
                <>
                  <hr className="mt-3" />
                  <div className="mt-3">
                    <h2 className="link-text">
                      Unstaking period: {humanReadableDuration(unstakeDuration)}
                    </h2>
                    <p className="mt-3 secondary-text">
                      There will be {humanReadableDuration(unstakeDuration)}{' '}
                      between the time you decide to unstake your tokens and the
                      time you can redeem them.
                    </p>
                  </div>
                </>
              )}
            <div className="flex justify-end px-3 pt-6">
              <ActionButton ready={ready} />
            </div>
          </>
        )}
        {mode === StakingMode.Claim && (
          <>
            <div className="flex flex-col py-3 px-6 mt-3">
              <h2 className="font-medium">
                {convertMicroDenomToDenomWithDecimals(
                  claimAmount,
                  tokenInfo.decimals
                )}{' '}
                ${tokenInfo.symbol} avaliable
              </h2>
              <p className="mt-3 mb-3 text-sm">
                Claim them to increase your voting power.
              </p>
              <div className="flex justify-end px-3 pt-6">
                <Tooltip label={walletDisconnected()}>
                  <ActionButton ready={!walletDisconnected()} />
                </Tooltip>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
