import { EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/common'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
  useProposalModuleAdapterOptions,
} from '@dao-dao/proposal-module-adapter'
import { ProposalModule } from '@dao-dao/utils'

import { Button } from '../Button'
import { Loader as DefaultLoader, LoaderProps } from '../Loader'
import { Logo as DefaultLogo, LogoProps } from '../Logo'
import { Tooltip } from '../Tooltip'
import { ProposalLineLoader } from './ProposalLine'

export interface PinnedProposalLineProps {
  coreAddress: string
  proposalModules: ProposalModule[]
  proposalId: string
  proposalViewUrl: string
  markDone: () => void
  Logo?: ComponentType<LogoProps>
  Loader?: ComponentType<LoaderProps>
}

export const PinnedProposalLine = ({
  coreAddress,
  proposalModules,
  proposalId,
  Logo = DefaultLogo,
  Loader = DefaultLoader,
  ...props
}: PinnedProposalLineProps) => (
  <ProposalModuleAdapterProvider
    ProviderLoader={() => <ProposalLineLoader Logo={Logo} />}
    initialOptions={{
      coreAddress,
      Logo,
      Loader,
    }}
    proposalId={proposalId}
    proposalModules={proposalModules}
  >
    <InnerPinnedProposalLine {...props} />
  </ProposalModuleAdapterProvider>
)

type InnerPinnedProposalLineProps = Pick<
  PinnedProposalLineProps,
  'proposalViewUrl' | 'markDone'
>

const InnerPinnedProposalLine = ({
  proposalViewUrl,
  markDone,
}: InnerPinnedProposalLineProps) => {
  const { t } = useTranslation()
  const {
    components: { PinnedProposalLine },
  } = useProposalModuleAdapter()
  const { Logo } = useProposalModuleAdapterOptions()

  return (
    <SuspenseLoader fallback={<ProposalLineLoader Logo={Logo} />}>
      <div className="flex flex-row gap-1 items-cener">
        <Link href={proposalViewUrl}>
          <a className="grow">
            <PinnedProposalLine.Desktop className="hidden md:grid" />
            <PinnedProposalLine.Mobile className="block md:hidden" />
          </a>
        </Link>

        <Tooltip title={t('info.hideFromPageTooltip')}>
          <Button className="!px-2" onClick={markDone} variant="secondary">
            <EyeOffIcon className="w-4 h-4" />
          </Button>
        </Tooltip>
      </div>
    </SuspenseLoader>
  )
}
