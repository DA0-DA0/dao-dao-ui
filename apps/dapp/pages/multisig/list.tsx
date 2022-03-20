import { useState } from 'react'

import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
  Loadable,
} from 'recoil'

import {
  LibraryIcon,
  PlusIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/outline'

import { pinnedMultisigsAtom } from 'atoms/pinned'
import { sidebarExpandedAtom } from 'atoms/sidebar'
import {
  ContractCard,
  MysteryContractCard,
  LoadingContractCard,
} from 'components/ContractCard'
import Paginator from 'components/Paginator'
import Sidebar from 'components/Sidebar'
import { pagedContractsByCodeId } from 'selectors/contracts'
import { proposalCount } from 'selectors/daos'
import { MultisigListType, sigMemberSelector } from 'selectors/multisigs'
import { nativeBalance } from 'selectors/treasury'
import {
  LEGACY_MULTISIG_CODE_ID,
  MULTISIG_CODE_ID,
  NATIVE_DENOM,
} from 'util/constants'

export function MultisigCard({
  multisig,
  address,
}: {
  multisig: MultisigListType
  address: string
}) {
  const [pinnedSigs, setPinnedSigs] = useRecoilState(pinnedMultisigsAtom)
  const pinned = pinnedSigs.includes(address)

  const proposals = useRecoilValue(proposalCount(address))
  const balance = useRecoilValue(nativeBalance(address))
  const chainBalance = balance.find((coin) => coin.denom == NATIVE_DENOM)
  const chainNativeBalance = chainBalance?.amount || '0'

  return (
    <ContractCard
      name={multisig.name}
      description={multisig.description}
      href={`/multisig/${address}`}
      weight={multisig.weight}
      proposals={proposals}
      balance={chainNativeBalance}
      pinned={pinned}
      onPin={() => {
        if (pinned) {
          setPinnedSigs((p) => p.filter((a) => a !== address))
        } else {
          setPinnedSigs((p) => p.concat([address]))
        }
      }}
      imgUrl={multisig.imgUrl}
    />
  )
}

export function MysteryMultisigCard() {
  return (
    <MysteryContractCard
      title="Create a multisig"
      body="You are not a member of any multisigs. Why not create one?"
      href="/multisig/create"
    />
  )
}

function LoadableCards({
  loadable,
}: {
  loadable: Loadable<MultisigListType[]>
}) {
  return (
    <>
      {loadable.state == 'hasValue' ? (
        loadable.contents.length > 0 ? (
          loadable.contents.map(
            (multisig, idx) =>
              multisig && (
                <MultisigCard
                  multisig={multisig}
                  address={multisig.address}
                  key={idx}
                />
              )
          )
        ) : (
          <MysteryMultisigCard />
        )
      ) : (
        <LoadingContractCard />
      )}
    </>
  )
}

type MultisigVersion = {
  name: string
  codeId: number
}

const MULTISIG_VERSIONS = [
  { name: 'Latest', codeId: MULTISIG_CODE_ID },
  { name: 'Legacy', codeId: LEGACY_MULTISIG_CODE_ID },
]

const MultisigList: NextPage = () => {
  const router = useRouter()
  const page = parseInt((router.query.page as string) || '1')
  const limit = parseInt((router.query.limit as string) || '100')

  const pinnedSigAddresses = useRecoilValue(pinnedMultisigsAtom)
  const pinnedSigs = useRecoilValueLoadable(
    waitForAll(pinnedSigAddresses.map((a) => sigMemberSelector(a)))
  )

  const expanded = useRecoilValue(sidebarExpandedAtom)

  const [version, setMultisigVersion] = useState<MultisigVersion>(
    MULTISIG_VERSIONS[0]
  )
  const { contracts, total } = useRecoilValue(
    pagedContractsByCodeId({ codeId: MULTISIG_CODE_ID, page, limit })
  )
  const sigs = useRecoilValueLoadable(
    waitForAll(contracts.map((addr) => sigMemberSelector(addr)))
  )

  return (
    <div className={`grid ${expanded ? 'grid-cols-6' : 'grid-cols-1'}`}>
      <div className="p-6 w-full col-span-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Multisigs</h1>
          <div className={expanded ? '' : 'mr-10'}>
            <Link href="/multisig/create" passHref>
              <button className="btn btn-sm bg-primary text-primary-content normal-case text-left">
                Create a multisig <PlusIcon className="inline w-5 h-5 ml-1" />
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <UserIcon className="inline w-5 h-5 mr-2 mb-1" />
            Your pinned multisigs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableCards loadable={pinnedSigs} />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-lg mb-2">
              <SparklesIcon className="inline w-5 h-5 mr-2 mb-1" />
              Community multisigs
            </h2>
            {LEGACY_MULTISIG_CODE_ID ? (
              <div>
                <span className="font-medium px-2">Contract Version</span>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-sm">
                    {version.name}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52"
                  >
                    {MULTISIG_VERSIONS.map((v) => (
                      <li
                        key={v.name}
                        className="hover:bg-purple-500 p-2 rounded-md cursor-pointer"
                        onClick={() => setMultisigVersion(v)}
                      >
                        {v.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : undefined}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableCards loadable={sigs} />
          </div>
          <div className="flex justify-center mt-4">
            <Paginator count={total} page={page} limit={limit} />
          </div>
        </div>
      </div>
      <Sidebar>
        <div className="col-start-5 col-span-2 border-l border-base-300 p-6 min-h-screen">
          <h2 className="font-medium">Overview</h2>
          <div className="mt-6">
            <ul className="list-none ml-2 leading-relaxed">
              <li>
                <LibraryIcon className="inline w-5 h-5 mr-2 mb-1" />
                {total} active multisig
                {total > 1 && 's'}
              </li>
            </ul>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}

export default MultisigList
