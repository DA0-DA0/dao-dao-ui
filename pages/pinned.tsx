import { StarIcon } from '@heroicons/react/outline'
import { pinnedDaosAtom, pinnedMultisigsAtom } from 'atoms/pinned'
import { ContractCard } from 'components/ContractCard'
import { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { daoSelector, isMemberSelector } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'
import { convertMicroDenomToDenom } from 'util/conversion'
import { MysteryDaoCard } from './dao/list'
import { MysteryMultisigCard } from './multisig/list'

function PinnedDaoCard({ address }: { address: string }) {
  const config = useRecoilValue(daoSelector(address)).config
  const weight = useRecoilValue(isMemberSelector(address)).weight

  return (
    <ContractCard
      name={config.name}
      description={config.description}
      href={`/dao/${address}`}
      weight={convertMicroDenomToDenom(weight)}
    />
  )
}

function PinnedMultisigCard({ address }: { address: string }) {
  const config = useRecoilValue(sigSelector(address)).config
  const weight = useRecoilValue(isMemberSelector(address)).weight

  return (
    <ContractCard
      name={config.name}
      description={config.description}
      href={`/dao/${address}`}
      weight={weight}
    />
  )
}

const Pinned: NextPage = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const pinnedMultisigs = useRecoilValue(pinnedMultisigsAtom)

  return (
    <div className="grid grid-cols-6">
      <div className="p-6 w-full col-span-4">
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <StarIcon className="inline w-5 h-5 mr-2 mb-1" />
            Favorite DAOs
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
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <StarIcon className="inline w-5 h-5 mr-2 mb-1" />
            Favorite Multisigs
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
    </div>
  )
}

export default Pinned
