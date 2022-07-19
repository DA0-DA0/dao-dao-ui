import { EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import {
  Button,
  Loader,
  Logo,
  ProposalLineLoader,
  SuspenseLoader,
  Tooltip,
} from '@dao-dao/ui'
import { ProposalModule } from '@dao-dao/utils'

export interface PinnedProposalLineProps {
  proposalModules: ProposalModule[]
  proposalId: string
  proposalViewUrl: string
  markDone: () => void
  coreAddress: string
}

export const PinnedProposalLine = ({
  proposalModules,
  proposalId,
  coreAddress,
  ...props
}: PinnedProposalLineProps) => (
  <ProposalModuleAdapterProvider
    ProviderLoader={ProposalLineLoader}
    initialOptions={{
      coreAddress,
      Logo,
      Loader,
    }}
    proposalId={proposalId}
    proposalModules={proposalModules}
  >
    <SuspenseLoader fallback={<ProposalLineLoader />}>
      <InnerPinnedProposalLine {...props} />
    </SuspenseLoader>
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

  return (
    <div className="flex flex-row gap-1 items-cener">
      <Link href={proposalViewUrl}>
        <a className="grow">
          <PinnedProposalLine.Desktop className="hidden md:grid" />
          <PinnedProposalLine.Mobile className="block md:hidden" />
        </a>
      </Link>

      <Tooltip label={t('info.hideFromPageTooltip')}>
        <Button className="!px-2" onClick={markDone} variant="secondary">
          <EyeOffIcon className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  )
}
