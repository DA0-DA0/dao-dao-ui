import React, { FunctionComponent, useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import Link from 'next/link'
import { DAO_CODE_ID } from 'util/constants'

interface DaoListType {
  address: string
  name: string
  description: string
}

const DaoListComponent: FunctionComponent<DaoListType> = ({
  address,
  name,
  description,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
      <Link href={`/dao/${address}`} passHref>
        <a className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
          <h3 className="text-2xl font-bold">
            {name}{' '}
            <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
          </h3>
          <p className="mt-4 text-xl">{description}</p>
        </a>
      </Link>
    </div>
  )
}

const DaoList: NextPage = () => {
  const [daos, setDaos] = useState<Array<DaoListType>>([])
  const [loading, setLoading] = useState(false)
  const { signingClient } = useSigningClient()

  // Get list of DAO info
  useEffect(() => {
    if (!signingClient) {
      return
    }
    const getDaos = async () => {
      setLoading(true)
      let contracts = await signingClient?.getContracts(DAO_CODE_ID)

      const daoList = []
      if (contracts) {
        for (let address of contracts) {
          const daoInfo = await signingClient?.queryContractSmart(address, {
            get_config: {},
          })
          if (daoInfo?.config) {
            const config = {
              ...daoInfo.config,
              address,
            }
            daoList.push(config)
          }
        }

        setDaos(daoList)
        setLoading(false)
      }
    }
    getDaos()
  }, [signingClient])

  return (
    <WalletLoader loading={loading}>
      <h1 className="text-6xl font-bold">DAOs</h1>
      {daos.length > 0 ? (
        daos.map((dao, key) => (
          <DaoListComponent
            address={dao?.address}
            name={dao?.name}
            description={dao?.description}
            key={key}
          />
        ))
      ) : (
        <p>No DAOs : (</p>
      )}
    </WalletLoader>
  )
}

export default DaoList
