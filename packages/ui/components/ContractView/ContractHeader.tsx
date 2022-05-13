import { FC } from 'react'

import { HEADER_IMAGES_ENABLED } from '@dao-dao/utils'

import { Logo } from '../Logo'
import { EstablishedDate, EstablishedDateLoader } from './EstablishedDate'

export interface ContractHeaderProps {
  name: string
  description: string
  established: Date | undefined
  imgUrl?: string
}

export const ContractHeader: FC<ContractHeaderProps> = ({
  name,
  description,
  established,
  imgUrl,
}) => (
  <div className="flex flex-col items-center mt-2">
    {imgUrl && HEADER_IMAGES_ENABLED ? (
      <div
        aria-label="DAO's Custom Logo"
        className="w-[95px] h-[95px] bg-center bg-cover rounded-full"
        role="img"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
    ) : (
      <Logo alt="DAO DAO logo" height={85} width={85} />
    )}
    <div className="flex flex-col items-center">
      <h1 className="inline mt-5 header-text">{name}</h1>
      {established ? (
        <EstablishedDate date={established} />
      ) : (
        <EstablishedDateLoader />
      )}
    </div>
    <div className="mt-2 mb-4">
      <p className="whitespace-pre-wrap body-text">{description}</p>
    </div>
  </div>
)

export const ContractHeaderLoader: FC<{}> = () => (
  <div className="flex flex-col items-center mt-2">
    <div className="animate-spin-medium">
      <Logo alt="DAO DAO logo" height={85} width={85} />
    </div>

    <div className="flex flex-col items-center">
      <h1 className="invisible inline mt-5 header-text">DAO name</h1>
      <EstablishedDateLoader />
    </div>
    <div className="mt-2 mb-4">
      <p className="invisible">descripton of the DAO</p>
    </div>
  </div>
)
