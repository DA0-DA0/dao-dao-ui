import React, { FunctionComponent, useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const DaoListComponent: FunctionComponent = ({
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
  let [daos, setDaos] = useState([])
  let { signingClient } = useSigningClient()

  // Get list of DAO info
  useEffect(() => {
    let getDaos = async () => {
      let daoList = []
      for (let address of process.env.NEXT_PUBLIC_DAO_LIST?.split(',')) {
        let daoInfo = await signingClient?.queryContractSmart(address, {
          get_config: {},
        })
        if (daoInfo?.config) {
          let config = {
            ...daoInfo.config,
            address,
          }
          daoList.push(config)
        }
      }

      console.log(daoList)
      setDaos(daoList)
    }
    getDaos()
  }, [])

  return (
    <WalletLoader>
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
