import { ActionCardLoaderProps } from '@dao-dao/types/components/ActionCardLoader'

export const ActionCardLoader = ({ Loader }: ActionCardLoaderProps) => (
  <div className="bg-background-primary my-2 rounded-lg p-3">
    <Loader />
  </div>
)
