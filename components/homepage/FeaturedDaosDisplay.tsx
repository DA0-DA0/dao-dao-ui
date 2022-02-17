import { useRecoilValue, waitForAll } from 'recoil'

import { ContractCard, LoadingContractCard } from '@components/ContractCard'
import { featuredDaosSelector } from 'selectors/contracts'
import { memberDaoSelector } from 'selectors/daos'
import { cw20TokenInfo } from 'selectors/treasury'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'

export function FeaturedDaosLoadingPlaceholder() {
  return (
    <>
      <h2 className="font-medum text-2xl mb-8 text-center whitespace-normal mx-3">
        Expore featured DAOs on the platform
      </h2>
      <div className="flex flex-row justify-center">
        <div className="w-64">
          <LoadingContractCard />
          <div className="pointer-events-none mask-image">
            <LoadingContractCard />
          </div>
        </div>
      </div>
    </>
  )
}

export function FeaturedDaosDisplay() {
  const daoAddresses = useRecoilValue(featuredDaosSelector)
  const daos = useRecoilValue(
    waitForAll(daoAddresses.map((address) => memberDaoSelector(address)))
  )
  const tokenInfos = useRecoilValue(
    waitForAll(daos.map((dao) => cw20TokenInfo(dao.gov_token)))
  )

  return (
    (daoAddresses.length > 0 || null) && (
      <>
        <h2 className="font-medum text-2xl mb-8 text-center whitespace-normal mx-3">
          Expore featured DAOs on the platform
        </h2>
        <ul className="list-none flex md:flex-row flex-col gap-2 overflow-auto items-center">
          {daos.map((dao, idx) => {
            const tokenInfo = tokenInfos[idx]
            return (
              <div className="w-64" key={dao.address}>
                <ContractCard
                  name={dao.dao.name}
                  description={dao.dao.description}
                  href={`/dao/${daoAddresses[idx]}`}
                  weight={convertMicroDenomToDenomWithDecimals(
                    dao.weight,
                    tokenInfo.decimals
                  )}
                  balance={dao.balance}
                  proposals={dao.proposals}
                  pinned={true}
                  onPin={() => 0}
                  imgUrl={dao.dao.image_url}
                />
                <div className="pointer-events-none mask-image hidden md:block">
                  <ContractCard
                    name={dao.dao.name}
                    description={dao.dao.description}
                    href={`/dao/${daoAddresses[idx]}`}
                    weight={convertMicroDenomToDenomWithDecimals(
                      dao.weight,
                      tokenInfo.decimals
                    )}
                    balance={dao.balance}
                    proposals={dao.proposals}
                    pinned={true}
                    onPin={() => 0}
                    imgUrl={dao.dao.image_url}
                  />
                </div>
              </div>
            )
          })}
        </ul>
      </>
    )
  )
}
