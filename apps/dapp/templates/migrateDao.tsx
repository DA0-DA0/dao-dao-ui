import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  nativeBalancesSelector,
  signingCosmWasmClientSelector,
  walletAddressSelector,
} from '@dao-dao/state'
import {
  Config,
  ConfigResponse,
  Duration,
  CosmosMsgFor_Empty,
} from '@dao-dao/types/contracts/cw3-dao'
import { Button } from '@dao-dao/ui'
import {
  convertDenomToHumanReadableDenom,
  getDaoThresholdAndQuorum,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  V1_CORE_ID,
  V1_CW20_ID,
  V1_CW20_STAKE_ID,
  V1_FACTORY_CONTRACT_ADDRESS,
  V1_PROPOSAL_SINGLE_ID,
  V1_STAKED_VOTING_ID,
  V1_URL,
} from '@dao-dao/utils'

import {
  cw20TokensList,
  cw20TokenInfo,
  cw20Balances as cw20BalancesSelector,
} from 'selectors/treasury'

import { SpendLine } from './migrateMultisig'
import { TemplateComponent, ToCosmosMsgProps } from './templateList'
import { DEFAULT_MAX_VOTING_PERIOD_SECONDS } from '@/pages/dao/create'
import { unstakingDuration as unstakingDurationSelector } from '@/selectors/daos'
import { makeWasmMessage } from '@/util/messagehelpers'

interface MigrateData {
  name: string
  description: string
  imageUrl: string | undefined

  maxVotingPeriod: number

  proposalDeposit: string
  refundFailedProposals: boolean

  threshold: string
  quorum: string | undefined

  stakingAddress: string
  govToken: string

  spends: { to: string; amount: number; denom: string }[]

  newDao: string

  // Used during cosmos message construction to add an update config message.
  oldConfig: Config

  unstakingDuration: Duration | undefined
}

export const migrateDaoDefaults = (
  _wallet: string,
  configResponse: ConfigResponse
): MigrateData => {
  const config = configResponse.config

  const maxVotingPeriod =
    'time' in config.max_voting_period
      ? config.max_voting_period.time
      : Number(DEFAULT_MAX_VOTING_PERIOD_SECONDS)

  const { threshold, quorum } = getDaoThresholdAndQuorum(config.threshold)

  return {
    name: config.name,
    description: config.description,
    imageUrl: config.image_url || undefined,
    maxVotingPeriod,
    proposalDeposit: config.proposal_deposit,
    threshold: threshold ?? '51',
    quorum: quorum ?? '10',
    refundFailedProposals: !!config.refund_failed_proposals,
    stakingAddress: configResponse.staking_contract,
    govToken: configResponse.gov_token,
    spends: [],
    newDao: '',
    oldConfig: config,
    unstakingDuration: undefined,
  }
}

export const MigrateDaoComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  contractAddress,
}) => {
  const [loading, setLoading] = useState(false)
  const [looksGood, setLooksGood] = useState(false)
  const [newAddress, setNewAddress] = useState('')

  const { watch, setValue } = useFormContext()

  const formData: MigrateData = watch(getLabel(''))
  const proposalDescription = watch('description')
  const spends = watch(getLabel('spends'))

  const signingClient = useRecoilValue(signingCosmWasmClientSelector)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const tokenList = useRecoilValue(cw20TokensList(contractAddress))
  const cw20Info = useRecoilValue(
    waitForAll(tokenList.map((address) => cw20TokenInfo(address)))
  )

  const nativeBalances = useRecoilValue(nativeBalancesSelector(contractAddress))
  const cw20Balances = useRecoilValue(cw20BalancesSelector(contractAddress))
  const cw20BalanceInfo = cw20Balances.map((balance, index) => ({
    balance,
    info: cw20Info[index],
  }))

  const unstakingDuration = useRecoilValue(
    unstakingDurationSelector(formData.stakingAddress)
  )

  useEffect(
    () => setValue(getLabel('unstakingDuration'), unstakingDuration),
    [setValue, unstakingDuration]
  )

  const instantiateV1Dao = () => {
    if (!(signingClient && walletAddress)) {
      toast.error('Please connect your wallet.')
    }

    setLoading(true)

    const thresholdPercent =
      formData.threshold === '50' || formData.threshold === '51'
        ? { majority: {} }
        : { percent: (Number(formData.threshold) / 100).toString() }

    const threshold = formData.quorum
      ? {
          threshold_quorum: {
            threshold: thresholdPercent,
            quorum: { percent: (Number(formData.quorum) / 100).toString() },
          },
        }
      : {
          absolute_percentage: {
            percentage: thresholdPercent,
          },
        }

    const core_msg = {
      name: formData.name,
      description: formData.description,
      ...(formData.imageUrl !== '' && { image_url: formData.imageUrl }),
      automatically_add_cw20s: false,
      automatically_add_cw721s: false,

      voting_module_instantiate_info: {
        code_id: V1_STAKED_VOTING_ID,
        admin: { core_contract: {} },
        label: `${formData.name} voting module`,
        msg: btoa(
          JSON.stringify({
            token_info: {
              existing: {
                address: formData.govToken,
                staking_contract: {
                  existing: {
                    staking_contract_address: formData.stakingAddress,
                  },
                },
              },
            },
          })
        ),
      },

      proposal_modules_instantiate_info: [
        {
          code_id: V1_PROPOSAL_SINGLE_ID,
          admin: { core_contract: {} },
          label: `${formData.name} proposal module`,
          msg: btoa(
            JSON.stringify({
              threshold,
              max_voting_period: { time: formData.maxVotingPeriod },
              only_members_execute: true,
              allow_revoting: false,
            })
          ),
        },
      ],
    }

    const factory_msg = {
      instantiate_contract_with_self_admin: {
        code_id: V1_CORE_ID,
        label: formData.name,
        instantiate_msg: btoa(JSON.stringify(core_msg)),
      },
    }

    signingClient
      ?.execute(
        walletAddress as string,
        V1_FACTORY_CONTRACT_ADDRESS,
        factory_msg,
        'auto'
      )
      .then((response: void | ExecuteResult) => {
        if (!response) {
          return
        }
        const contractAddress = findAttribute(
          response.logs,
          'wasm',
          'set contract admin as itself'
        ).value

        setNewAddress(contractAddress)
        setValue(
          'description',
          proposalDescription +
            `\n\nThis proposal will migrate this DAO to a new v1 DAO. The new V1 DAO has been instantiated and can be viewed [here](https://${V1_URL}/dao/${contractAddress}). This proposal will transfer the DAO's treasury to the new v1 DAO. Before voting yes:\n\n1. Confirm that your voting power in the new DAO is the same.\n2. Confirm that the new v1 DAO's voting configuration is accurate. Remember to check the passing threshold and proposal duration.\n3. Confirm that the address receiving the DAO's treasury is the v1 DAO that you validated.`
        )
        setValue(getLabel('newDao'), contractAddress)
        toast.success('Instantiated new contract')
      })
      .catch((err: any) => {
        toast.error(
          'Failed to instantiate contract. Check the console for more details.'
        )
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="p-3 my-2 bg-primary rounded-lg">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl">☯️</h2>
          <h2>Upgrade to v1 DAO.</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-row gap-3 items-center my-2">
        <div className="flex justify-center items-center p-2 w-6 h-6 rounded-full border">
          1
        </div>
        <Button
          disabled={!!newAddress}
          loading={loading}
          onClick={instantiateV1Dao}
          type="button"
        >
          {newAddress ? (
            <>
              <CheckIcon className="w-4 h-4" /> Done!
            </>
          ) : (
            'Create v1 DAO'
          )}
        </Button>
      </div>
      {newAddress && (
        <div className="flex flex-row gap-3 items-center my-2">
          <div className="flex justify-center items-center p-2 w-6 h-6 rounded-full border">
            2
          </div>
          <p>
            <a
              className="underline"
              href={`https://${V1_URL}/dao/${newAddress}`}
              rel="noreferrer"
              target="_blank"
            >
              Visit your v1 DAO
            </a>{' '}
            and check the box if the configuration looks good.
          </p>
          <div className="flex flex-row gap-1 items-center py-1 px-2 bg-card rounded">
            <input
              defaultChecked={false}
              onChange={(e) => {
                setLooksGood(e.target.checked)
                if (e.target.checked) {
                  // This is really only a form in the sense that it
                  // uses the react-hook-form API. There is no actual
                  // user input. Here, we add spend messages for all
                  // of the multisigs treasury tokens.
                  const nativeSpends = nativeBalances?.map(
                    ({ amount, denom }) => ({
                      to: newAddress,
                      amount,
                      denom,
                    })
                  )
                  const cw20Spends = cw20BalanceInfo
                    .map(({ balance: { amount } }, index) => ({
                      to: newAddress,
                      amount,
                      denom: tokenList[index],
                    }))
                    .filter(({ amount }) => amount !== '0')
                  setValue(getLabel('spends'), [
                    ...(nativeSpends ?? []),
                    ...cw20Spends,
                  ])
                } else {
                  // No ack, no spend 😤.
                  setValue(getLabel('spends'), [])
                }
              }}
              role="switch"
              type="checkbox"
            />
            <p>Looks good 👍</p>
          </div>
        </div>
      )}
      {looksGood && (
        <div className="flex flex-row gap-3 items-center my-2">
          <div className="flex justify-center items-center p-2 w-6 h-6 rounded-full border">
            3
          </div>
          <p>
            Congrats! 🎉 Passing this proposal will migrate your multisig by
            sending your treasury to the new v1 DAO.
          </p>
        </div>
      )}
      {spends.length > 0 && (
        <div className="flex flex-col gap-2 mt-6">
          {spends.map(({ to, amount, denom }) => {
            if (denom === NATIVE_DENOM || denom.startsWith('ibc/')) {
              const label = convertDenomToHumanReadableDenom(
                nativeTokenLabel(denom)
              )

              const decimals = nativeTokenDecimals(denom) ?? NATIVE_DECIMALS
              const logo = nativeTokenLogoURI(denom)
              return (
                <SpendLine
                  amount={amount}
                  decimals={decimals}
                  label={label}
                  logo={logo}
                  to={to}
                />
              )
            } else {
              // Dealing with a cw20.
              const index = tokenList.indexOf(denom)
              const info = cw20Info[index]
              return (
                <SpendLine
                  amount={amount}
                  decimals={info.decimals}
                  label={info.symbol}
                  to={to}
                />
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

export const transformCosmosToMigrateDao = () => null

export const transformMigrateDaoToCosmos = (
  self: MigrateData,
  props: ToCosmosMsgProps
): CosmosMsgFor_Empty[] => {
  const messages: CosmosMsgFor_Empty[] = []

  // Send the DAO treasury to the new DAO.
  if (self.spends.length !== 0) {
    const to = self.spends[0].to

    let natives: { amount: string; denom: string }[] = []
    let cw20s: { address: string; amount: string }[] = []

    for (let { amount, denom } of self.spends) {
      if (denom === NATIVE_DENOM || denom.startsWith('ibc/')) {
        natives.push({
          amount: amount.toString(),
          denom,
        })
      } else {
        cw20s.push({
          address: denom,
          amount: amount.toString(),
        })
      }
    }

    messages.push(
      ...[
        ...(natives.length
          ? [
              {
                bank: {
                  send: {
                    amount: [...natives],
                    to_address: to,
                  },
                },
              },
            ]
          : []),
        ...cw20s.map(({ address, amount }) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: address,
                funds: [],
                msg: {
                  transfer: {
                    recipient: to,
                    amount,
                  },
                },
              },
            },
          })
        ),
      ]
    )
  }

  // Upgrade the staking contract.
  messages.push(
    makeWasmMessage({
      wasm: {
        migrate: {
          contract_addr: self.stakingAddress,
          new_code_id: V1_CW20_STAKE_ID,
          msg: {
            from_beta: {},
          },
        },
      },
    })
  )

  // Upgrade the token contract.
  messages.push(
    makeWasmMessage({
      wasm: {
        migrate: {
          contract_addr: self.govToken,
          new_code_id: V1_CW20_ID,
          msg: {},
        },
      },
    })
  )

  // Update the minter of the cw20 contract.
  messages.push(
    makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: self.govToken,
          funds: [],
          msg: {
            update_minter: {
              new_minter: self.newDao,
            },
          },
        },
      },
    })
  )

  self.oldConfig.description += `\nThis DAO has migrated to DAO DAO v1. The new DAO can be found [here](https://v1.daodao.zone/dao/${self.newDao})`

  // Update the config to link to the new DAO in the description.
  messages.push(
    makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: props.sigAddress,
          funds: [],
          msg: {
            update_config: self.oldConfig,
          },
        },
      },
    })
  )

  // Update the staking contract's config.
  messages.push(
    makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: self.stakingAddress,
          funds: [],
          msg: {
            update_config: {
              owner: props.sigAddress,
              duration: self.unstakingDuration,
            },
          },
        },
      },
    })
  )

  // Pause the DAO for the rest of time.
  messages.push(
    makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: props.sigAddress,
          funds: [],
          msg: {
            pause_d_a_o: {
              expiration: {
                never: {},
              },
            },
          },
        },
      },
    })
  )

  return messages
}
