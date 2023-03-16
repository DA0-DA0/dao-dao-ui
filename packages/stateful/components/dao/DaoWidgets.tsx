import { Loader } from '@dao-dao/stateless'

import { useWidgets } from '../../widgets'
import { SuspenseLoader } from '../SuspenseLoader'

export const DaoWidgets = () => {
  const loadingWidgets = useWidgets()

  return !loadingWidgets.loading && loadingWidgets.data.length > 0 ? (
    <div className="flex flex-col gap-2">
      {loadingWidgets.data.map((Widget, index) => (
        <div key={index}>
          <SuspenseLoader fallback={<Loader />}>
            <Widget />
          </SuspenseLoader>
        </div>
      ))}
    </div>
  ) : null
}
