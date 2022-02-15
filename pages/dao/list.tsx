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
import { sidebarExpandedAtom } from 'atoms/sidebar'
import {
  ContractCard,
  MysteryContractCard,
  LoadingContractCard,
} from 'components/ContractCard'
import Paginator from 'components/Paginator'
import Sidebar from 'components/Sidebar'
import { pagedContractsByCodeId } from 'selectors/contracts'
import { DaoListType, memberDaoSelector } from 'selectors/daos'
// import { cw20TokenInfo } from 'selectors/treasury'
import { addToken } from 'util/addToken'
import { DAO_CODE_ID } from 'util/constants'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'

export function DaoCard({
  dao,
  address,
  weight,
}: {
  dao: any
  address: string
  weight: number
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
      name={config.name}
      description={config.description}
      href={`/dao/${address}`}
      weight={convertMicroDenomToDenomWithDecimals(weight, DECIMALS)}
      pinned={pinned}
      onPin={() => {
        if (pinned) {
          setPinnedDaos((p) => p.filter((a) => a !== address))
        } else {
          setPinnedDaos((p) => p.concat([address]))
          addToken(dao.gov_token)
        }
      }}
      imgUrl={config.image_url}
    />
  )
}

export function MysteryDaoCard() {
  return (
    <MysteryContractCard
      title="Create a DAO"
      body="You are not staking with any DAOs. Why not create one?"
      href="/dao/create"
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
                <DaoCard
                  dao={dao}
                  address={dao.address}
                  key={idx}
                  weight={dao.weight}
                />
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

const DaoList: NextPage = () => {
  const router = useRouter()
  const page = parseInt((router.query.page as string) || '1')
  const limit = parseInt((router.query.limit as string) || '100')

  const pinnedDaoAddresses = useRecoilValue(pinnedDaosAtom)
  const pinnedDaos = useRecoilValueLoadable(
    waitForAll(pinnedDaoAddresses.map((a) => memberDaoSelector(a)))
  )
  const expanded = useRecoilValue(sidebarExpandedAtom)

  const { contracts, total } = useRecoilValue(
    pagedContractsByCodeId({ codeId: DAO_CODE_ID, page, limit })
  )
  const daos = useRecoilValueLoadable(
    waitForAll(contracts.map((addr) => memberDaoSelector(addr)))
  )

  return (
    <div className={expanded ? 'grid grid-cols-6' : 'grid grid-cols-1'}>
      <div className="p-6 w-full col-span-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">DAOs</h1>
          <Link href="/dao/create" passHref>
            <div className={expanded ? '' : 'mr-10'}>
              <Button
                size="sm"
                iconAfter={<PlusIcon className="inline h-4 w-4" />}
              >
                Create a DAO
              </Button>
            </div>
          </Link>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <UserIcon className="inline w-5 h-5 mr-2 mb-1" />
            Your pinned DAOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableDaoCards daos={pinnedDaos} />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <SparklesIcon className="inline w-5 h-5 mr-2 mb-1" />
            Community DAOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <LoadableDaoCards daos={daos} />
          </div>
          <div className="flex justify-center mt-4">
            <Paginator count={total} page={page} limit={limit} />
          </div>
        </div>
      </div>
      <Sidebar>
        <div className="col-start-5 col-span-2 border-l border-base-300 p-6 min-h-screen">
          <h2 className="font-medium text-lg">Overview</h2>
          <div className="mt-6">
            <ul className="list-none ml-2 leading-relaxed">
              <li>
                <LibraryIcon className="inline w-5 h-5 mr-2 mb-1" />
                {total} active DAOs
              </li>
            </ul>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}

export default DaoList
