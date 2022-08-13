import Link from 'next/link'
import { ComponentType } from 'react'

import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
  useProposalModuleAdapterOptions,
} from '@dao-dao/proposal-module-adapter'
import { ProposalModule } from '@dao-dao/utils'

import { Loader as DefaultLoader, LoaderProps } from '../Loader'
import { Logo as DefaultLogo, LogoProps } from '../Logo'
import { SuspenseLoader } from '../SuspenseLoader'

export interface ProposalLineProps {
  coreAddress: string
  proposalModules: ProposalModule[]
  proposalId: string
  proposalViewUrl: string
  Logo?: ComponentType<LogoProps>
  Loader?: ComponentType<LoaderProps>
}

export const ProposalLine = ({
  coreAddress,
  proposalModules,
  proposalId,
  Logo = DefaultLogo,
  Loader = DefaultLoader,
  ...props
}: ProposalLineProps) => (
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
    <InnerProposalLine {...props} />
  </ProposalModuleAdapterProvider>
)

type InnerProposalLineProps = Pick<ProposalLineProps, 'proposalViewUrl'>

const InnerProposalLine = ({ proposalViewUrl }: InnerProposalLineProps) => {
  const {
    components: { ProposalLine },
  } = useProposalModuleAdapter()
  const { Logo } = useProposalModuleAdapterOptions()

  return (
    <SuspenseLoader fallback={<ProposalLineLoader Logo={Logo} />}>
      <Link href={proposalViewUrl}>
        <a>
          <ProposalLine.Desktop className="hidden md:grid" />
          <ProposalLine.Mobile className="block md:hidden" />
        </a>
      </Link>
    </SuspenseLoader>
  )
}

export interface ProposalLineLoaderProps {
  Logo: ComponentType<LogoProps>
}

export const ProposalLineLoader = (props: ProposalLineLoaderProps) => (
  <>
    <ProposalLineLoaderDesktop {...props} />
    <ProposalLineLoaderMobile {...props} />
  </>
)

const ProposalLineLoaderDesktop = ({ Logo }: ProposalLineLoaderProps) => (
  <div className="hidden justify-center items-center h-[3.25rem] bg-primary rounded-lg md:flex">
    <Logo className="animate-spin-medium" />
  </div>
)

const ProposalLineLoaderMobile = ({ Logo }: ProposalLineLoaderProps) => (
  <div className="flex justify-center items-center h-[9.5rem] bg-primary rounded-lg md:hidden">
    <Logo className="animate-spin-medium" />
  </div>
)
