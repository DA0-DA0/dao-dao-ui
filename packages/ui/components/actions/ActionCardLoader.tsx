import { ActionCardLoaderProps } from '@dao-dao/tstypes/ui/ActionCardLoader'

export const ActionCardLoader = ({ Loader }: ActionCardLoaderProps) => (
  <div className="p-3 my-2 bg-primary rounded-lg">
    <Loader />
  </div>
)
