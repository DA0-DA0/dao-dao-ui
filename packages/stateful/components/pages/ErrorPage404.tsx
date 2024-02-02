import {
  ErrorPage404Props,
  ErrorPage404 as StatelessErrorPage404,
} from '@dao-dao/stateless'

import { PageHeaderContent } from '../PageHeaderContent'

export const ErrorPage404 = (props: ErrorPage404Props) => {
  return (
    <>
      <PageHeaderContent />

      <StatelessErrorPage404 {...props} />
    </>
  )
}
