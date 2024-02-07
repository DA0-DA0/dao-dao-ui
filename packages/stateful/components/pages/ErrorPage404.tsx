import { ErrorPage404 as StatelessErrorPage404 } from '@dao-dao/stateless'

import { PageHeaderContent } from '../PageHeaderContent'

export const ErrorPage404 = () => (
  <>
    <PageHeaderContent />

    <StatelessErrorPage404 />
  </>
)
