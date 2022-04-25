import { FunctionComponent } from 'react'

import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import {
  allAccountsSelector,
  balanceSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import { CopyToClipboard } from '@dao-dao/ui'
import { ArcElement, Chart as ChartJS } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import { Loader } from '.'
import { useGovernanceTokenInfo, useStakingInfo } from '@/hooks'
import { DAO_ADDRESS, LP_ADDRESS } from '@/util'

ChartJS.register(ArcElement)

interface TopAccount {
  address: string
  balance: number
  percent: number
}

const pieColors = ['#FC82A4', '#FD6386', '#DC30D3', '#954EE8']
const otherAddressKey = 'other'

// TODO: allAccountsSelector does not return accounts descending by balance
//       so we need to sort the accounts ourselves with an indexer before
//       using this pie chart.
export const TokenDistributionPie: FunctionComponent = () => {
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo()
  const { stakingContractAddress } = useStakingInfo()

  const topAccountAddresses = useRecoilValue(
    governanceTokenAddress
      ? allAccountsSelector({
          contractAddress: governanceTokenAddress,
          params: [{ limit: 10 }],
        })
      : constSelector(undefined)
  )?.accounts
  const topAccountBalances = useRecoilValue(
    governanceTokenAddress && topAccountAddresses
      ? waitForAll(
          topAccountAddresses.map((address) =>
            balanceSelector({
              contractAddress: governanceTokenAddress,
              params: [{ address }],
            })
          )
        )
      : constSelector(undefined)
  )?.map((response) => response && Number(response.balance))
  // Zip and filter out undefined balances.
  const topAccounts: TopAccount[] | undefined =
    topAccountAddresses && topAccountBalances && governanceTokenInfo
      ? (
          topAccountAddresses
            .map((address, idx) => ({
              address,
              balance: topAccountBalances[idx],
            }))
            // If undefined balance, ignore.
            .filter(({ balance }) => balance !== undefined) as {
            address: string
            balance: number
          }[]
        )
          .map(({ address, balance }) => ({
            address,
            balance,
            percent: (balance / Number(governanceTokenInfo.total_supply)) * 100,
          }))
          .sort(({ balance: a }, { balance: b }) => b - a)
      : undefined

  if (
    !governanceTokenInfo ||
    !stakingContractAddress ||
    topAccounts === undefined
  ) {
    return <TokenDistributionPieLoader />
  }

  // Add remainder if exist.
  const allOtherBalances =
    Number(governanceTokenInfo.total_supply) -
    topAccounts.reduce((acc, { balance }) => acc + balance, 0)
  if (allOtherBalances) {
    topAccounts.push({
      address: otherAddressKey,
      balance: allOtherBalances,
      percent:
        (allOtherBalances / Number(governanceTokenInfo.total_supply)) * 100,
    })
  }

  return (
    <div className="flex flex-row gap-8 items-center">
      <Pie
        className="self-center !w-48 !h-48"
        data={{
          datasets: [
            {
              data: topAccounts.map(({ balance }) => balance),
              backgroundColor: topAccounts.map(
                (_, idx) => pieColors[idx % pieColors.length]
              ),
              borderWidth: 0,
            },
          ],
        }}
        options={{
          // Disable all events (hover, tooltip, etc.)
          events: [],
          animation: false,
        }}
      />

      {/* Legend */}
      <div className="flex flex-col gap-3">
        {topAccounts.map((account, idx) => (
          <TopAccountDisplay
            key={account.address}
            account={account}
            index={idx}
            stakingContractAddress={stakingContractAddress}
          />
        ))}
      </div>
    </div>
  )
}

export const TokenDistributionPieLoader: FunctionComponent = () => <Loader />

interface TopAccountDisplayProps {
  account: TopAccount
  index: number
  stakingContractAddress: string
}

const TopAccountDisplay: FunctionComponent<TopAccountDisplayProps> = ({
  account: { address, percent },
  index,
  stakingContractAddress,
}) => {
  const nameMap = {
    [DAO_ADDRESS]: 'Treasury',
    [LP_ADDRESS]: 'Liqudity Pool',
    [stakingContractAddress]: 'Staked',
    [otherAddressKey]: 'Other',
  }

  // Set treasury color to gray.
  const backgroundColor =
    address === DAO_ADDRESS
      ? 'rgba(var(--dark), 0.08)'
      : pieColors[index % pieColors.length]

  return (
    <div key={address} className="flex flex-row gap-5 items-center">
      <div
        className="w-2 h-2 rounded-full shrink-02"
        style={{ backgroundColor }}
      ></div>

      <div className="flex flex-row gap-2 items-center">
        <p className="font-mono text-tertiary">
          {percent.toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
          %
        </p>
        <p className="text-base text-body">
          {address in nameMap ? (
            nameMap[address]
          ) : (
            <CopyToClipboard value={address} />
          )}
        </p>
      </div>
    </div>
  )
}
