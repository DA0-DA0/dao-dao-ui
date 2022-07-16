import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader as DefaultLoader, LoaderProps } from '../Loader'
import { Logo as DefaultLogo, LogoProps } from '../Logo'
import { MarkdownPreview } from '../MarkdownPreview'
import { EstablishedDate, EstablishedDateLoader } from './EstablishedDate'

export interface ContractHeaderProps {
  name: string
  description: string
  established: Date | undefined
  imgUrl?: string
  Logo?: ComponentType<LogoProps>
}

export const ContractHeader = ({
  name,
  description,
  established,
  imgUrl,
  Logo = DefaultLogo,
}: ContractHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center mt-2">
      {imgUrl ? (
        <div
          aria-label={t('info.daosLogo')}
          className="w-[95px] h-[95px] bg-center bg-cover rounded-full"
          role="img"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        ></div>
      ) : (
        <Logo size={85} />
      )}
      <div className="flex flex-col items-center">
        <h1 className="inline mt-5 header-text">{name}</h1>
        {established && <EstablishedDate date={established} />}
      </div>
      <div className="mt-2 mb-4">
        <MarkdownPreview
          className="whitespace-pre-wrap body-text"
          markdown={description}
        />
      </div>
    </div>
  )
}

export interface ContractHeaderLoaderProps {
  Loader?: ComponentType<LoaderProps>
}

export const ContractHeaderLoader = ({
  Loader = DefaultLoader,
}: ContractHeaderLoaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center mt-2">
      <Loader fill={false} size={85} />

      <div className="flex flex-col items-center">
        <h1 className="inline invisible mt-5 header-text">{t('info.name')}</h1>
        <EstablishedDateLoader />
      </div>
      <div className="mt-2 mb-4">
        <p className="invisible">{t('info.description')}</p>
      </div>
    </div>
  )
}
