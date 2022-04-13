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

import { Button } from '@components'

import { pinnedDaosAtom } from 'atoms/pinned'
import CodeIdSelect from 'components/CodeIdSelect'
import {
  ContractCard,
  MysteryContractCard,
  LoadingContractCard,
} from 'components/ContractCard'
import Paginator from 'components/Paginator'
import { pagedContractsByCodeId } from 'selectors/contracts'
import { DaoListType, memberDaoSelector } from 'selectors/daos'
import { addToken } from 'util/addToken'
import { DAO_CODE_ID, LEGACY_DAO_CODE_ID } from 'util/constants'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'

export function DaoCard({
  dao,
  address,
}: {
  dao: DaoListType
  address: string
}) {
  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(address)
  const config = dao.dao
  // const tokenInfo = useRecoilValue(cw20TokenInfo(dao.gov_token))
  // const weight = convertMicroDenomToDenomWithDecimals(weight, tokenInfo.decimals)
  // TODO @ebaker: review ways to query for tokenInfo.decimals, not performant in this card
  const DECIMALS = 6

  return (
    <ContractCard
      balance={dao.balance}
      description={config.description}
      href={`/dao/${address}`}
      imgUrl={config.image_url}
      name={config.name}
      onPin={() => {
        if (pinned) {
          setPinnedDaos((p) => p.filter((a) => a !== address))
        } else {
          setPinnedDaos((p) => p.concat([address]))
          addToken(dao.gov_token)
        }
      }}
      pinned={pinned}
      proposals={dao.proposals}
      weight={convertMicroDenomToDenomWithDecimals(dao.weight, DECIMALS)}
    />
  )
}

export function MysteryDaoCard() {
  return (
    <MysteryContractCard
      body="You are not staking with any DAOs. Why not create one?"
      href="/dao/create"
      title="Create a DAO"
    />
  )
}

function LoadableDaoCards({ daos }: { daos: Loadable<DaoListType[]> }) {
  return (
    <>
      {daos.state == 'hasValue' ? (
        daos.contents.length > 0 ? (
          daos.contents.map((dao, idx) => {
            return (
              dao?.dao &&
              dao?.address?.length > 0 && (
                <DaoCard key={idx} address={dao.address} dao={dao} />
              )
            )
          })
        ) : (
          <MysteryDaoCard />
        )
      ) : (
        <LoadingContractCard />
      )}
    </>
  )
}

type DaoVersion = {
  name: string
  codeId: number
}

// Change version Code ID to environment variables when shipping
const DAO_VERSIONS = [
  { name: 'Latest', codeId: DAO_CODE_ID },
  { name: 'Legacy', codeId: LEGACY_DAO_CODE_ID },
]

const DaoList: NextPage = () => {
  const router = useRouter()
  const page = parseInt((router.query.page as string) || '1')
  const limit = parseInt((router.query.limit as string) || '100')

  const pinnedDaoAddresses = useRecoilValue(pinnedDaosAtom)
  const pinnedDaos = useRecoilValueLoadable(
    waitForAll(pinnedDaoAddresses.map((a) => memberDaoSelector(a)))
  )
  const [version, setDaosVersion] = useState<DaoVersion>(DAO_VERSIONS[0])
  const { contracts, total } = useRecoilValue(
    pagedContractsByCodeId({ codeId: version.codeId, page, limit })
  )
  const daos = useRecoilValueLoadable(
    waitForAll(contracts.map((addr) => memberDaoSelector(addr)))
  )

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="header-text">DAOs</h1>
          <Link href="/dao/create" passHref>
            <Button size="sm">
              Create a DAO <PlusIcon className="inline w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          <h2 className="flex gap-1 items-center mb-2 primary-text">
            <UserIcon className="inline w-4" />
            Your pinned DAOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableDaoCards daos={pinnedDaos} />
          </div>
        </div>
        <div className="mt-6">
          {/* Community DAO header */}
          <div className="flex flex-row justify-between">
            <h2 className="flex gap-1 items-center mb-2 primary-text">
              <SparklesIcon className="inline w-4" />
              Community DAOs
            </h2>
            {!!LEGACY_DAO_CODE_ID && (
              <CodeIdSelect
                currentVersion={version}
                onSelect={(v) => setDaosVersion(v)}
                versions={DAO_VERSIONS}
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableDaoCards daos={daos} />
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
              {total} active DAOs
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DaoList
