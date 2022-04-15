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

import { Button } from '@dao-dao/ui'
import {
  LEGACY_MULTISIG_CODE_ID,
  MULTISIG_CODE_ID,
  NATIVE_DENOM,
} from '@dao-dao/utils'
import {
  LibraryIcon,
  PlusIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/outline'

import { EmptyMultisigCard } from '@components/EmptyMultisigCard'
import { pinnedMultisigsAtom } from 'atoms/pinned'
import CodeIdSelect from 'components/CodeIdSelect'
import { ContractCard, LoadingContractCard } from 'components/ContractCard'
import Paginator from 'components/Paginator'
import { pagedContractsByCodeId } from 'selectors/contracts'
import { proposalCount } from 'selectors/daos'
import { MultisigListType, sigMemberSelector } from 'selectors/multisigs'
import { nativeBalance } from 'selectors/treasury'

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
      balance={chainNativeBalance}
      description={multisig.description}
      href={`/multisig/${address}`}
      imgUrl={multisig.imgUrl}
      name={multisig.name}
      onPin={() => {
        if (pinned) {
          setPinnedSigs((p) => p.filter((a) => a !== address))
        } else {
          setPinnedSigs((p) => p.concat([address]))
        }
      }}
      pinned={pinned}
      proposals={proposals}
      weight={multisig.weight}
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
                  key={idx}
                  address={multisig.address}
                  multisig={multisig}
                />
              )
          )
        ) : (
          <EmptyMultisigCard />
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
    <div className="grid grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="header-text">Multisigs</h1>
          <Link href="/multisig/create" passHref>
            <Button size="sm">
              Create a Multisig <PlusIcon className="inline w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          <h2 className="flex gap-1 items-center mb-2 primary-text">
            <UserIcon className="inline w-4" />
            Your pinned multisigs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableCards loadable={pinnedSigs} />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="flex gap-1 items-center mb-2 primary-text">
              <SparklesIcon className="inline w-4" />
              Community multisigs
            </h2>
            {!!LEGACY_MULTISIG_CODE_ID && (
              <CodeIdSelect
                currentVersion={version}
                onSelect={(v) => setMultisigVersion(v)}
                versions={MULTISIG_VERSIONS}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableCards loadable={sigs} />
          </div>
          <div className="flex justify-center mt-4">
            <Paginator count={total} limit={limit} page={page} />
          </div>
        </div>
      </div>
      <div className="col-span-2 col-start-5 p-6 min-h-screen">
        <h2 className="font-medium title-text">Overview</h2>
        <div className="mt-6">
          <ul className="ml-2 leading-relaxed list-none">
            <li className="flex gap-2 items-center body-text">
              <LibraryIcon className="inline w-4" />
              {total} active multisig
              {total > 1 && 's'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MultisigList
