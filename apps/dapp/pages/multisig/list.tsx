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
import { Button } from 'ui'

import { pinnedMultisigsAtom } from 'atoms/pinned'
import CodeIdSelect from 'components/CodeIdSelect'
import {
  ContractCard,
  LoadingContractCard,
} from 'components/ContractCard'
import Paginator from 'components/Paginator'
import { pagedContractsByCodeId } from 'selectors/contracts'
import { proposalCount } from 'selectors/daos'
import { MultisigListType, sigMemberSelector } from 'selectors/multisigs'
import { nativeBalance } from 'selectors/treasury'
import {
  LEGACY_MULTISIG_CODE_ID,
  MULTISIG_CODE_ID,
  NATIVE_DENOM,
} from 'util/constants'
import { MysteryMultisigCard } from 'pages/dao/list'

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
      <div className="p-6 w-full col-span-4">
        <div className="flex justify-between items-center">
          <h1 className="header-text">Multisigs</h1>
          <Link href="/multisig/create" passHref>
            <Button size="sm">
              Create a Multisig <PlusIcon className="inline h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          <h2 className="primary-text mb-2 flex items-center gap-1">
            <UserIcon className="inline w-4" />
            Your pinned multisigs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableCards loadable={pinnedSigs} />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="primary-text mb-2 flex items-center gap-1">
              <SparklesIcon className="inline w-4" />
              Community multisigs
            </h2>
            {!!LEGACY_MULTISIG_CODE_ID && (
              <CodeIdSelect
                versions={MULTISIG_VERSIONS}
                currentVersion={version}
                onSelect={(v) => setMultisigVersion(v)}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableCards loadable={sigs} />
          </div>
          <div className="flex justify-center mt-4">
            <Paginator count={total} page={page} limit={limit} />
          </div>
        </div>
      </div>
      <div className="col-start-5 col-span-2 p-6 min-h-screen">
        <h2 className="font-medium title-text">Overview</h2>
        <div className="mt-6">
          <ul className="list-none ml-2 leading-relaxed">
            <li className="body-text flex items-center gap-2">
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
