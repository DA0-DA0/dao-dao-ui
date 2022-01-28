import { MapIcon, PlusIcon, StarIcon } from '@heroicons/react/outline'
import { pinnedDaosAtom, pinnedMultisigsAtom } from 'atoms/pinned'
import { ContractCard } from 'components/ContractCard'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRecoilState, useRecoilValue } from 'recoil'
import { daoSelector, isMemberSelector } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'
import { cw20TokenInfo } from 'selectors/treasury'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'
import { MysteryDaoCard } from './dao/list'
import { MysteryMultisigCard } from './multisig/list'

function PinnedDaoCard({ address }: { address: string }) {
  const config = useRecoilValue(daoSelector(address))
  const daoConfig = config.config
  const weight = useRecoilValue(isMemberSelector(address)).weight
  const tokenInfo = useRecoilValue(cw20TokenInfo(config.gov_token))
  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(address)

  return (
    <ContractCard
      name={daoConfig.name}
      description={daoConfig.description}
      href={`/dao/${address}`}
      weight={convertMicroDenomToDenomWithDecimals(weight, tokenInfo.decimals)}
      pinned={pinned}
      onPin={() => {
        if (pinned) {
          setPinnedDaos((p) => p.filter((a) => a !== address))
        } else {
          setPinnedDaos((p) => p.concat([address]))
        }
      }}
    />
  )
}

function PinnedMultisigCard({ address }: { address: string }) {
  const config = useRecoilValue(sigSelector(address)).config
  const weight = useRecoilValue(isMemberSelector(address)).weight

  const [pinnedSigs, setPinnedSigs] = useRecoilState(pinnedMultisigsAtom)
  const pinned = pinnedSigs.includes(address)

  return (
    <ContractCard
      name={config.name}
      description={config.description}
      href={`/multisig/${address}`}
      weight={weight}
      pinned={pinned}
      onPin={() => {
        if (pinned) {
          setPinnedSigs((p) => p.filter((a) => a !== address))
        } else {
          setPinnedSigs((p) => p.concat([address]))
        }
      }}
    />
  )
}

const Starred: NextPage = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const pinnedMultisigs = useRecoilValue(pinnedMultisigsAtom)

  return (
    <div className="grid grid-cols-6">
      <div className="p-6 w-full col-span-4">
        <h1 className="text-2xl font-semibold">Starred</h1>
        <h2 className="text-lg mb-2 mt-6">
          <StarIcon className="inline w-5 h-5 mr-2 mb-1" />
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
          <h2 className="text-lg mb-2 mt-6">
            <StarIcon className="inline w-5 h-5 mr-2 mb-1" />
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
      <div className="col-span-2 p-6">
        <h2 className="font-medium text-lg">Actions</h2>
        <ul className="list-none ml-2 mt-1">
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
