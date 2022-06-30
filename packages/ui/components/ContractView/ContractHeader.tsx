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
    <div className="mt-2 flex flex-col items-center">
      {imgUrl && HEADER_IMAGES_ENABLED ? (
        <div
          aria-label={t('info.daosLogo')}
          className="h-[95px] w-[95px] rounded-full bg-cover bg-center"
          role="img"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        ></div>
      ) : (
        <Logo alt={t('info.daodaoLogo')} height={85} width={85} />
      )}
      <div className="flex flex-col items-center">
        <h1 className="header-text mt-5 inline">{name}</h1>
        {established && <EstablishedDate date={established} />}
      </div>
      <div className="mt-2 mb-4">
        <p className="body-text whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  )
}

export const ContractHeaderLoader: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="mt-2 flex flex-col items-center">
      <div className="animate-spin-medium">
        <Logo alt={t('info.daodaoLogo')} height={85} width={85} />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="header-text invisible mt-5 inline">{t('info.name')}</h1>
        <EstablishedDateLoader />
      </div>
      <div className="mt-2 mb-4">
        <p className="invisible">{t('info.description')}</p>
      </div>
    </div>
  )
}
