import { NextPage } from 'next'
import Link from 'next/link'

import { useRecoilState, useRecoilValue } from 'recoil'

import { MapIcon, PlusIcon, StarIcon } from '@heroicons/react/outline'

import { pinnedDaosAtom, pinnedMultisigsAtom } from 'atoms/pinned'
import {
  MysteryDaoCard,
  MysteryMultisigCard,
  ContractCard,
} from 'components/ContractCard'
import {
  isMemberSelector,
  memberDaoSelector,
  proposalCount,
} from 'selectors/daos'
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
      name={listInfo.dao.name}
      description={listInfo.dao.description}
      href={`/dao/${address}`}
      weight={convertMicroDenomToDenomWithDecimals(
        listInfo.weight,
        tokenInfo.decimals
      )}
      balance={listInfo.balance}
      proposals={listInfo.proposals}
      pinned={pinned}
      onPin={() => {
        if (pinned) {
          setPinnedDaos((p) => p.filter((a) => a !== address))
        } else {
          setPinnedDaos((p) => p.concat([address]))
          addToken(listInfo.gov_token)
        }
      }}
      imgUrl={listInfo.dao.image_url}
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
      name={config.name}
      description={config.description}
      href={`/multisig/${address}`}
      weight={weight}
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
      imgUrl={config.image_url}
    />
  )
}

const Starred: NextPage = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const pinnedMultisigs = useRecoilValue(pinnedMultisigsAtom)

  return (
    <div className="grid grid-cols-6">
      <div className="p-6 w-full col-span-4">
        <h1 className="header-text">Starred</h1>
        <h2 className="primary-text mb-2 mt-6 flex items-center gap-1">
          <StarIcon className="inline w-4 " />
          DAOs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {pinnedDaos.length ? (
            pinnedDaos.map((address) => (
              <PinnedDaoCard address={address} key={address} />
            ))
          ) : (
            <MysteryDaoCard />
          )}
        </div>
        <div className="mt-6">
          <h2 className="primary-text mb-2 mt-6 flex items-center gap-1">
            <StarIcon className="inline w-4 " />
            Multisigs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {pinnedMultisigs.length ? (
              pinnedMultisigs.map((address) => (
                <PinnedMultisigCard address={address} key={address} />
              ))
            ) : (
              <MysteryMultisigCard />
            )}
          </div>
        </div>
      </div>
      <div className="col-start-5 col-span-2 p-6 min-h-screen">
        <h2 className="body-text text-[16px] font-semibold mb-6">Actions</h2>
        <ul className="link-text list-none ml-2 mt-1">
          <li className="mt-1">
            <Link href="/dao/create">
              <a>
                <PlusIcon className="inline w-5 h-5 mr-2 mb-1" />
                Create a DAO
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/multisig/create">
              <a>
                <PlusIcon className="inline w-5 h-5 mr-2 mb-1" />
                Create a multisig
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/dao/list">
              <a>
                <MapIcon className="inline w-5 h-5 mr-2 mb-1" />
                Explore all DAOs
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/multisig/list">
              <a>
                <MapIcon className="inline w-5 h-5 mr-2 mb-1" />
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
