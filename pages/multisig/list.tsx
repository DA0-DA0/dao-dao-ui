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
import {
  ContractCard,
  MysteryContractCard,
  LoadingContractCard,
} from 'components/ContractCard'
import Paginator from 'components/Paginator'
import { pagedContractsByCodeId } from 'selectors/contracts'
import { MultisigListType, sigMemberSelector } from 'selectors/multisigs'
import { MULTISIG_CODE_ID } from 'util/constants'
import { sidebarExpandedAtom } from 'atoms/sidebar'
import { Sidebar } from 'components/Sidebar'

export function MultisigCard({
  multisig,
  address,
}: {
  multisig: MultisigListType
  address: string
}) {
  const [pinnedSigs, setPinnedSigs] = useRecoilState(pinnedMultisigsAtom)
  const pinned = pinnedSigs.includes(address)

  return (
    <ContractCard
      name={multisig.name}
      description={multisig.description}
      href={`/multisig/${address}`}
      weight={multisig.weight}
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

const MultisigList: NextPage = () => {
  const router = useRouter()
  const page = parseInt((router.query.page as string) || '1')
  const limit = parseInt((router.query.limit as string) || '100')

  const pinnedSigAddresses = useRecoilValue(pinnedMultisigsAtom)
  const pinnedSigs = useRecoilValueLoadable(
    waitForAll(pinnedSigAddresses.map((a) => sigMemberSelector(a)))
  )

  const expanded = useRecoilValue(sidebarExpandedAtom)

  const { contracts, total } = useRecoilValue(
    pagedContractsByCodeId({ codeId: MULTISIG_CODE_ID, page, limit })
  )
  const sigs = useRecoilValueLoadable(
    waitForAll(contracts.map((addr) => sigMemberSelector(addr)))
  )

  const gridClassName = `grid grid-cols-${expanded ? 6 : 1}`
  const buttonClassName = expanded ? '' : 'mr-10'

  return (
    <div className={gridClassName}>
      <div className="p-6 w-full col-span-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Multisigs</h1>
          <div className={buttonClassName}>
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
          <h2 className="text-lg mb-2">
            <SparklesIcon className="inline w-5 h-5 mr-2 mb-1" />
            Community multisigs
          </h2>
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
