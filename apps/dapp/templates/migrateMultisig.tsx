import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { ArrowRightIcon, CheckIcon, XIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  nativeBalancesSelector,
  signingCosmWasmClientSelector,
  walletAddressSelector,
} from '@dao-dao/state'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { Config, ConfigResponse } from '@dao-dao/types/contracts/cw3-multisig'
import { BalanceIcon, Button, CopyToClipboard } from '@dao-dao/ui'
import {
  V1_CORE_ID,
  V1_CW4_VOTING_ID,
  V1_PROPOSAL_SINGLE_ID,
  C4_GROUP_CODE_ID,
  V1_URL,
  NATIVE_DENOM,
  nativeTokenLabel,
  nativeTokenDecimals,
  nativeTokenLogoURI,
  convertMicroDenomToDenomWithDecimals,
  NATIVE_DECIMALS,
  convertDenomToHumanReadableDenom,
  makeWasmMessage,
  V1_FACTORY_CONTRACT_ADDRESS,
} from '@dao-dao/utils'

import {
  cw20TokensList,
  cw20TokenInfo,
  cw20Balances as cw20BalancesSelector,
} from 'selectors/treasury'

import { TemplateComponent } from './templateList'
import { DEFAULT_MAX_VOTING_PERIOD_SECONDS } from '@/pages/dao/create'
import { listMembers } from '@/selectors/multisigs'

export interface MigrateData {
  name: string
  description: string
  imageUrl: string

  maxVotingPeriod: number
  passingThreshold: number
  groupAddress: string

  spends: { to: string; amount: number; denom: string }[]
}

export const multisigMigrateDefaults = (
  _walletAddress: string,
  configResponse: ConfigResponse
): MigrateData => {
  const config: Config = configResponse.config
  const maxVotingPeriod =
    'time' in config.max_voting_period
      ? config.max_voting_period.time
      : Number(DEFAULT_MAX_VOTING_PERIOD_SECONDS)

  // We only allow creation of absolute_count style multisigs in the
  // UI. Custom instantiated multisigs (I do not think there are any)
  // get this value. If you're high skill enough to make your own,
  // probably best to migrate your own.
  const passingThreshold =
    'absolute_count' in config.threshold
      ? config.threshold.absolute_count.weight
      : 1

  return {
    name: config.name,
    description: config.description,
    imageUrl: config.image_url || '',
    maxVotingPeriod,
    passingThreshold,
    groupAddress: configResponse.group_address,
    spends: [],
  }
}

const SpendLine = ({
  label,
  logo,
  amount,
  decimals,
  to,
}: {
  label: string
  logo?: string
  amount: string
  decimals: number
  to: string
}) => (
  <div className="flex flex-row gap-3 justify-center items-center p-4 bg-card rounded">
    <div className="flex gap-1 items-center font-mono">
      {convertMicroDenomToDenomWithDecimals(amount, decimals)}
      <BalanceIcon iconURI={logo} />
      {label}
    </div>
    <ArrowRightIcon className="w-4 h-4" />
    <CopyToClipboard value={to} />
  </div>
)

export const MigrateMultisigComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  contractAddress,
}) => {
  const [loading, setLoading] = useState(false)
  const [newAddress, setNewAddress] = useState('')
  const [looksGood, setLooksGood] = useState(false)

  const { watch, setValue } = useFormContext()

  const proposalDescription = watch('description')
  const formData = watch(getLabel('')) as MigrateData
  const spends = watch(getLabel('spends'))

  const members = useRecoilValue(listMembers(contractAddress))

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

  const signingClient = useRecoilValue(signingCosmWasmClientSelector)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const instantiateV1Multisig = () => {
    if (!(signingClient && walletAddress)) {
      toast.error('Please connect your wallet.')
    }

    setLoading(true)

    const core_msg = {
      name: formData.name,
      description: formData.description,
      ...(formData.imageUrl !== '' && { image_url: formData.imageUrl }),
      automatically_add_cw20s: false,
      automatically_add_cw721s: false,

      voting_module_instantiate_info: {
        code_id: V1_CW4_VOTING_ID,
        admin: { core_contract: {} },
        label: `${formData.name} voting module`,
        msg: btoa(
          JSON.stringify({
            cw4_group_code_id: C4_GROUP_CODE_ID,
            initial_members: members,
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
              threshold: {
                absolute_count: {
                  threshold: formData.passingThreshold.toString(),
                },
              },
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
            `\n\nThe new V1 DAO has been instantiated and can be viewed [here](https://${V1_URL}/dao/${contractAddress}). This proposal will transfer the multisig's treasury to the new v1 DAO. Before voting yes:\n\n1. Confirm that the new v1 DAO's member list is correct.\n2. Confirm that the new v1 DAO's voting configuration is accurate. Remember to check the passing threshold and proposal duration.\n3. Confirm that the address receiving the multisig's treasury is the v1 DAO that you validated.`
        )
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
          <h2 className="text-3xl">🦢</h2>
          <h2>Upgrade to v1 multisig.</h2>
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
          onClick={instantiateV1Multisig}
          type="button"
        >
          {newAddress ? (
            <>
              <CheckIcon className="w-4 h-4" /> Done!
            </>
          ) : (
            'Create v1 Multisig'
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
              Visit your v1 Multisig
            </a>{' '}
            and check the box if the member list looks good.
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

// We can't tell the difference between a migrate multisig message
// and a sequence of spend actions.
export const transformCosmosToMigrateMultisig = (): MigrateData | null => null

export const transformMigrateMultisigToCosmos = (
  self: MigrateData
): CosmosMsgFor_Empty[] | undefined => {
  // Nothing to do.
  if (self.spends.length == 0) {
    return undefined
  }
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

  return [
    {
      bank: {
        send: {
          amount: [...natives],
          to_address: to,
        },
      },
    },
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
}
