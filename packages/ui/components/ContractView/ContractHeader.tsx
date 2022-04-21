import { FC } from 'react'

import { EstablishedDate } from './EstablishedDate'
import { Logo } from '../Logo'

import { HEADER_IMAGES_ENABLED } from '@dao-dao/utils'

export interface ContractHeaderProps {
  name: string
  description: string
  established: Date
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
      <EstablishedDate date={established} />
    </div>
    <div className="mt-2 mb-4">
      <p className="whitespace-pre-wrap body-text">{description}</p>
    </div>
  </div>
)
