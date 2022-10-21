import { ActionCardLoaderProps } from '@dao-dao/types/components/ActionCardLoader'

export const ActionCardLoader = ({ Loader }: ActionCardLoaderProps) => (
  <div className="my-2 rounded-lg bg-background-primary p-3">
    <Loader />
  </div>
)
