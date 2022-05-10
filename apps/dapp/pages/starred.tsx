import { MapIcon, PlusIcon, StarIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { EmptyDaoCard } from '@components/EmptyDaoCard'
import { EmptyMultisigCard } from '@components/EmptyMultisigCard'
import { pinnedDaosAtom, pinnedMultisigsAtom } from 'atoms/pinned'
import { ContractCard } from 'components/ContractCard'
import { isMemberSelector } from 'selectors/cosm'
import { memberDaoSelector, proposalCount } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'
import { cw20TokenInfo, nativeBalance } from 'selectors/treasury'
import { addToken } from 'util/addToken'

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

const ActionItem = ({
  href,
  icon,
  text,
}: {
  href: string
  icon: ReactNode
  text: string
}) => (
  <li className="py-0.5 px-2 mt-0.5 hover:bg-secondary rounded-md">
    <Link href={href}>
      <a className="block">
        {icon}
        {text}
      </a>
    </Link>
  </li>
)

const ActionMenu = () => (
  <div className="p-6 bg-primary rounded-md hover:border hover:border-focus">
    <h2 className="mb-1 text-lg font-semibold">Actions</h2>
    <ul className="-mx-1 font-medium list-none text-md">
      <ActionItem
        href="/dao/create"
        icon={<PlusIcon className="inline mr-2 mb-1 w-5 h-5" />}
        text={'Create a DAO'}
      />
      <ActionItem
        href="/multisig/create"
        icon={<PlusIcon className="inline mr-2 mb-1 w-5 h-5" />}
        text={'Create a multisig'}
      />
      <ActionItem
        href="/dao/list"
        icon={<MapIcon className="inline mr-2 mb-1 w-5 h-5" />}
        text={'Explore all DAOs'}
      />
      <ActionItem
        href="/multisig/list"
        icon={<MapIcon className="inline mr-2 mb-1 w-5 h-5" />}
        text={'Explore all multisigs'}
      />
    </ul>
  </div>
)

const Starred: NextPage = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const pinnedMultisigs = useRecoilValue(pinnedMultisigsAtom)

  return (
    <div className="flex">
      <div className="p-6 w-full lg:basis-2/3">
        <div className="block mb-4 lg:hidden">
          <ActionMenu />
        </div>

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

      <div className="hidden basis-1/3 p-6 min-h-screen border-l border-inactive lg:block">
        <ActionMenu />
      </div>
    </div>
  )
}

export default Starred
