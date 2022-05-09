import { SVGProps } from 'react'

import { Executed, Open, Passed, Rejected } from '@dao-dao/icons'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'

export const StatusIcons: Record<
  Status,
  ((props: SVGProps<SVGSVGElement>) => JSX.Element) | null
> = {
  [Status.Open]: Open,
  [Status.Executed]: Executed,
  [Status.Passed]: Passed,
  [Status.Rejected]: Rejected,
  [Status.Closed]: null,
}
