import { ActionCardLoaderProps } from '@dao-dao/tstypes/ui/ActionCardLoader'

export const ActionCardLoader = ({ Loader }: ActionCardLoaderProps) => (
  <div className="my-2 rounded-lg bg-primary p-3">
    <Loader />
  </div>
)
