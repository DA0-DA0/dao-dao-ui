import Link from 'next/link'
import { ComponentType } from 'react'

import { SuspenseLoader } from '@dao-dao/common'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
  useProposalModuleAdapterOptions,
} from '@dao-dao/proposal-module-adapter'
import {
  Loader as DefaultLoader,
  Logo as DefaultLogo,
  LoaderProps,
  LogoProps,
  ProposalLineLoader,
} from '@dao-dao/ui'
import { ProposalModule } from '@dao-dao/utils'

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
        <ProposalLine />
      </Link>
    </SuspenseLoader>
  )
}
