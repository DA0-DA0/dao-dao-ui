/* eslint-disable @next/next/no-img-element */

import { NextPage } from 'next'

import { Dollar, Staked, Submitted, Apr, Open } from '@dao-dao/icons'
import {
  ChevronDownIcon,
  PlusIcon,
  CheckIcon,
  XIcon,
} from '@heroicons/react/solid'

export interface GovernancePageProps {
  //
}

const GovernancePage: NextPage<GovernancePageProps> = () => {
  return (
    <section className="p-8 mx-auto space-y-16 max-w-screen-xl">
      <div className="overflow-hidden relative bg-gray-500/10 rounded-lg border border-gray-500/20">
        <div className="flex absolute inset-0 z-[-1] flex-col justify-center items-center">
          <img
            alt="blur"
            className="w-full opacity-20 blur-2xl"
            src="/daotoken.jpg"
          />
        </div>
        <div className="flex flex-col justify-center items-center py-16 px-4 border-b border-gray-500/20">
          <img
            alt="avatar"
            className="mb-8 w-24 h-24 bg-black rounded-full shadow-sm"
            src="/daotoken.jpg"
          />
          <h1 className="mb-1 text-3xl font-bold">Raw DAO</h1>
          <p className="text-lg">Token governance for JunoSwap</p>
        </div>
        <div className="flex flex-wrap justify-center items-center p-6 space-x-16 text-secondary">
          <div className="flex items-center space-x-2">
            <Dollar className="w-4 h-4 fill-current" />
            <span>Total supply of 10,000,000 RAW</span>
          </div>
          <div className="flex items-center space-x-2">
            <Staked className="w-4 h-4 fill-current" />
            <span>94% of $RAW staked</span>
          </div>
          <div className="flex items-center space-x-2">
            <Submitted className="w-4 h-4 fill-current" />
            <span>9 Proposals submitted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Apr className="w-3 h-3 fill-current" />
            <span>103% APR</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-16">
        <article className="col-span-3 max-w-none prose prose-invert prose-sm">
          <h1>Raw DAO’s mission statement</h1>
          <h2>A Vision of Coordination</h2>
          <p>
            The Coordination Game is a game-theory optimised Keeper protocol
            that provides a solution to the MEV incentive structure problem on
            Ethereum. By aligning Keeper&apos;s incentives with those of the
            other network participants, it gives them a new game to play, in
            which they can fully fulfill their potential as beneficial actors
            inside the Ethereum ecosystem.
          </p>
          <p>
            And for them to fulfill their roles more effectively - without the
            aforementioned negative externalities - there needs to be a
            transparent, efficient and decentralised market for their services.
            That doesn&apos;t exist right now. It&apos;s not clear how many
            Keepers there are, how much liquidity they command, how protocols
            should optimally price risk, or how users and protocols should bid
            for Keeper attention when they require services.
          </p>
        </article>
        <div>
          <h3 className="mb-4 text-lg font-medium">Governance details</h3>
          <dl>
            <dt className="font-mono text-gray-500">Unstaking period</dt>
            <dd>1 week</dd>
            <br />
            <dt className="font-mono text-gray-500">Passing threshold</dt>
            <dd>51% of yes</dd>
            <br />
            <dt className="font-mono text-gray-500">Proposal deposit</dt>
            <dd>50 $RAW</dd>
            <br />
            <dt className="font-mono text-gray-500">Deposit refund</dt>
            <dd>True</dd>
          </dl>
        </div>
      </div>

      <hr className="border-gray-500/20" />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Raw DAO’s Proposals</h3>
        <div className="flex justify-between items-center">
          <button
            className="flex items-center py-2 px-4 space-x-2 text-secondary hover:bg-gray-50/5 rounded border border-btn-secondary"
            type="button"
          >
            <ChevronDownIcon className="w-4 h-4" />
            <span>Open - 9 items</span>
          </button>
          <button
            className="flex items-center py-2 px-4 space-x-2 text-secondary hover:bg-gray-50/5 rounded border border-btn-secondary"
            type="button"
          >
            <PlusIcon className="w-4 h-4" />
            <span>New Proposal</span>
          </button>
        </div>
        <ul className="space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <li
              key={i}
              className="grid grid-cols-10 items-center p-4 bg-gray-500/5 hover:bg-gray-500/20 rounded"
            >
              <div className="font-mono text-secondary"># 000000</div>
              <div className="flex items-center space-x-2">
                <Open className="w-4 h-4 fill-current" /> <span>Open</span>
              </div>
              <div>Raw DAO</div>
              <div className="col-span-3">Proposal testing</div>
              <div>Not voted</div>
              <div className="flex items-center space-x-2 text-green-500">
                <span>42%</span> <CheckIcon className="w-4 h-4 fill-current" />
              </div>
              <div className="flex items-center space-x-2 text-red-500">
                <span>50%</span> <XIcon className="w-4 h-4 fill-current" />
              </div>
              <div className="font-mono">3 days left</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default GovernancePage
