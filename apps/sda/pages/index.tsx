import React from 'react'

import type { NextPage } from 'next'

import { DAO_ADDRESS } from '@/util/constants'

const Home: NextPage = () => {
  return (
    <div className="grid overflow-auto grid-cols-6 mb-3 min-h-screen">
      <div className="col-span-4 min-h-screen">
        {DAO_ADDRESS}
        {/* <GradientHero>
          <div className="flex justify-between">
            <Breadcrumbs
              crumbs={[
                ['/starred', 'Home'],
                [router.asPath, daoInfo.config.name],
              ]}
            />
            <div className="flex flex-row gap-4 items-center">
              {member && (
                <div className="flex flex-row gap-2 items-center">
                  <SvgMemberCheck fill="currentColor" width="16px" />
                  <p className="text-sm text-primary">You{"'"}re a member</p>
                </div>
              )}
              <StarButton
                onPin={() => {
                  if (pinned) {
                    setPinnedDaos((p) => p.filter((a) => a !== contractAddress))
                  } else {
                    setPinnedDaos((p) => p.concat([contractAddress]))
                    addToken(daoInfo.gov_token)
                  }
                }}
                pinned={pinned}
              />
            </div>
          </div>

          <HeroContractHeader
            address={contractAddress}
            description={daoInfo.config.description}
            imgUrl={daoInfo.config.image_url}
            name={daoInfo.config.name}
          />

          <div className="mt-2">
            <HeroContractHorizontalInfo>
              <HeroContractHorizontalInfoSection>
                <UsersIcon className="inline w-4" />
                {convertMicroDenomToDenomWithDecimals(
                  tokenInfo.total_supply,
                  tokenInfo.decimals
                ).toLocaleString()}{' '}
                ${tokenInfo?.symbol} total supply
              </HeroContractHorizontalInfoSection>
              <HeroContractHorizontalInfoSection>
                <LibraryIcon className="inline w-4" />
                {stakedPercent}% ${tokenInfo?.symbol} staked
              </HeroContractHorizontalInfoSection>
              <HeroContractHorizontalInfoSection>
                <SvgPencil className="inline" fill="currentColor" />
                {proposalsTotal} proposals created
              </HeroContractHorizontalInfoSection>
            </HeroContractHorizontalInfo>
          </div>

          <DaoContractInfo address={contractAddress} />
        </GradientHero> */}
        <div className="px-6">
          {/* <ContractProposalsDispaly
            contractAddress={contractAddress}
            proposalCreateLink={`/dao/${contractAddress}/proposals/create`}
          /> */}
        </div>
      </div>
      <div className="col-span-2 col-start-5 p-6 h-full min-h-screen">
        <h2 className="mt-1 mb-[23px] title-text">Your shares</h2>
        <ul className="mt-3 list-none">
          <li>
            {/* <BalanceCard
              amount={convertMicroDenomToDenomWithDecimals(
                govTokenBalance?.amount,
                tokenInfo.decimals
              ).toLocaleString(undefined, { maximumFractionDigits: 20 })}
              denom={tokenInfo?.symbol}
              loading={tokenBalanceLoading}
              onManage={() => {
                setShowStaking(true)
              }}
              title="Balance"
            /> */}
          </li>
          <li>
            {/* <BalanceCard
              amount={convertMicroDenomToDenomWithDecimals(
                stakedGovTokenBalance.amount,
                tokenInfo.decimals
              ).toLocaleString(undefined, { maximumFractionDigits: 20 })}
              denom={tokenInfo?.symbol}
              loading={tokenBalanceLoading}
              onManage={() => {
                setShowStaking(true)
              }}
              title={`Voting power (staked ${tokenInfo?.symbol})`}
            /> */}
          </li>
          {/* {claimsAvaliable ? (
            <li>
              <BalanceCard
                amount={convertMicroDenomToDenomWithDecimals(
                  claimsAvaliable,
                  tokenInfo.decimals
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 20,
                })}
                denom={tokenInfo?.symbol}
                loading={tokenBalanceLoading}
                onManage={() => {
                  setShowStaking(true)
                }}
                title={`Pending (unclaimed ${tokenInfo?.symbol})`}
              />
            </li>
          ) : null} */}
        </ul>
        {/* {govTokenBalance?.amount ? (
          <div className="p-6 mt-2 w-full bg-primary rounded-lg">
            <h3 className="mb-4 link-text">
              You have{' '}
              {convertMicroDenomToDenomWithDecimals(
                govTokenBalance?.amount,
                tokenInfo.decimals
              ).toLocaleString(undefined, { maximumFractionDigits: 20 })}{' '}
              unstaked {tokenInfo.symbol}
            </h3>
            <p className="secondary-text">
              Staking them would bring you{' '}
              {stakedGovTokenBalance &&
                `${(
                  (govTokenBalance.amount / stakedGovTokenBalance.amount) *
                  100
                ).toLocaleString(undefined, {
                  maximumSignificantDigits: 3,
                })}%`}{' '}
              more voting power and help you defend your positions for{' '}
              {daoInfo.config.name}
              {"'"}s direction.
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="flex gap-2 items-center rounded link-text"
                onClick={() => {
                  setShowStaking(true)
                }}
              >
                Stake tokens
                <PlusSmIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null} */}
        {/* <ClaimsPendingList
          incrementClaimsAvaliable={(n) => setClaimsAvaliable((a) => a + n)}
          stakingAddress={daoInfo.staking_contract}
          tokenInfo={tokenInfo}
        /> */}
        {/* {showStaking && (
          <StakingModal
            afterExecute={() => setTokenBalancesLoading(false)}
            beforeExecute={() => setTokenBalancesLoading(true)}
            claimAmount={claimsAvaliable}
            contractAddress={contractAddress}
            defaultMode={StakingMode.Stake}
            onClose={() => setShowStaking(false)}
          />
        )} */}
      </div>
    </div>
  )
}

export default Home
