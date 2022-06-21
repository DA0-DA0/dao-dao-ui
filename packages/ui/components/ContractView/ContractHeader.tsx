import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
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
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center mt-2">
      {imgUrl && HEADER_IMAGES_ENABLED ? (
        <div
          aria-label={t('daosLogo')}
          className="w-[95px] h-[95px] bg-center bg-cover rounded-full"
          role="img"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        ></div>
      ) : (
        <Logo alt={t('daodaoLogo')} height={85} width={85} />
      )}
      <div className="flex flex-col items-center">
        <h1 className="inline mt-5 header-text">{name}</h1>
        {established && <EstablishedDate date={established} />}
      </div>
      <div className="mt-2 mb-4">
        <p className="whitespace-pre-wrap body-text">{description}</p>
      </div>
    </div>
  )
}

export const ContractHeaderLoader: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="animate-spin-medium">
        <Logo alt={t('daodaoLogo')} height={85} width={85} />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="inline invisible mt-5 header-text">{t('Name')}</h1>
        <EstablishedDateLoader />
      </div>
      <div className="mt-2 mb-4">
        <p className="invisible">{t('Description')}</p>
      </div>
    </div>
  )
}
