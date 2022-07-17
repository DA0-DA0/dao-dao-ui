import {
  HorizontalInfo,
  HorizontalInfoSection,
  SuspenseLoader,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

const FallbackDisplay = () => (
  <HorizontalInfo>
    <HorizontalInfoSection />
  </HorizontalInfo>
)

export const DaoHorizontalInfoDisplay = () => {
  const {
    components: { DaoHorizontalInfoDisplayInternal },
  } = useVotingModuleAdapter()

  return (
    <SuspenseLoader fallback={<FallbackDisplay />}>
      <DaoHorizontalInfoDisplayInternal />
    </SuspenseLoader>
  )
}
