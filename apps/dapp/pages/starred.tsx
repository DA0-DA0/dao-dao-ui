import { NextPage } from 'next'
import Link from 'next/link'

import { useRecoilState, useRecoilValue } from 'recoil'

import { MapIcon, PlusIcon, StarIcon } from '@heroicons/react/outline'

import { EmptyDaoCard } from '@components/EmptyDaoCard'
import { EmptyMultisigCard } from '@components/EmptyMultisigCard'
import { pinnedDaosAtom, pinnedMultisigsAtom } from 'atoms/pinned'
import { ContractCard } from 'components/ContractCard'
import { isMemberSelector } from 'selectors/cosm'
import { memberDaoSelector, proposalCount } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'
import { cw20TokenInfo, nativeBalance } from 'selectors/treasury'
import { addToken } from 'util/addToken'
import { NATIVE_DENOM } from 'util/constants'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'

function PinnedDaoCard({ address }: { address: string }) {
  const listInfo = useRecoilValue(memberDaoSelector(address))
  const tokenInfo = useRecoilValue(cw20TokenInfo(listInfo.gov_token))

  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(address)

  return (
    <ContractCard
      balance={listInfo.balance}
      description={listInfo.dao.description}
      href={`/dao/${address}`}
      imgUrl={listInfo.dao.image_url}
      name={listInfo.dao.name}
      onPin={() => {
        if (pinned) {
          setPinnedDaos((p) => p.filter((a) => a !== address))
        } else {
          setPinnedDaos((p) => p.concat([address]))
          addToken(listInfo.gov_token)
        }
      }}
      pinned={pinned}
      proposals={listInfo.proposals}
      weight={convertMicroDenomToDenomWithDecimals(
        listInfo.weight,
        tokenInfo.decimals
      )}
    />
  )
}

function PinnedMultisigCard({ address }: { address: string }) {
  const config = useRecoilValue(sigSelector(address)).config
  const weight = useRecoilValue(isMemberSelector(address)).weight
  const proposals = useRecoilValue(proposalCount(address))
  const balance = useRecoilValue(nativeBalance(address))
  const chainBalance = balance.find((coin) => coin.denom == NATIVE_DENOM)
  const chainNativeBalance = chainBalance?.amount || '0'

  const [pinnedSigs, setPinnedSigs] = useRecoilState(pinnedMultisigsAtom)
  const pinned = pinnedSigs.includes(address)

  return (
    <ContractCard
      balance={chainNativeBalance}
      description={config.description}
      href={`/multisig/${address}`}
      imgUrl={config.image_url}
      name={config.name}
      onPin={() => {
        if (pinned) {
          setPinnedSigs((p) => p.filter((a) => a !== address))
        } else {
          setPinnedSigs((p) => p.concat([address]))
        }
      }}
      pinned={pinned}
      proposals={proposals}
      weight={weight}
    />
  )
}

const Starred: NextPage = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const pinnedMultisigs = useRecoilValue(pinnedMultisigsAtom)

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        <h1 className="header-text">Starred</h1>
        <h2 className="flex gap-1 items-center mt-6 mb-2 primary-text">
          <StarIcon className="inline w-4 " />
          DAOs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {pinnedDaos.length ? (
            pinnedDaos.map((address) => (
              <PinnedDaoCard key={address} address={address} />
            ))
          ) : (
            <EmptyDaoCard />
          )}
        </div>
        <div className="mt-6">
          <h2 className="flex gap-1 items-center mt-6 mb-2 primary-text">
            <StarIcon className="inline w-4 " />
            Multisigs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {pinnedMultisigs.length ? (
              pinnedMultisigs.map((address) => (
                <PinnedMultisigCard key={address} address={address} />
              ))
            ) : (
              <EmptyMultisigCard />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 col-start-5 p-6 min-h-screen">
        <h2 className="mb-6 text-[16px] font-semibold body-text">Actions</h2>
        <ul className="mt-1 ml-2 list-none link-text">
          <li className="mt-1">
            <Link href="/dao/create">
              <a>
                <PlusIcon className="inline mr-2 mb-1 w-5 h-5" />
                Create a DAO
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/multisig/create">
              <a>
                <PlusIcon className="inline mr-2 mb-1 w-5 h-5" />
                Create a multisig
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/dao/list">
              <a>
                <MapIcon className="inline mr-2 mb-1 w-5 h-5" />
                Explore all DAOs
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/multisig/list">
              <a>
                <MapIcon className="inline mr-2 mb-1 w-5 h-5" />
                Explore all multisigs
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Starred
