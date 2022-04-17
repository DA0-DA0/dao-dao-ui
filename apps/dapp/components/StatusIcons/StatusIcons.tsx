import { Executed, Open, Passed, Rejected } from '@dao-dao/icons'

export const StatusIcons: { [key: string]: JSX.Element } = {
  open: <Open color="currentColor" style={{ display: 'inline' }} />,
  executed: <Executed color="currentColor" style={{ display: 'inline' }} />,
  passed: <Passed color="currentColor" style={{ display: 'inline' }} />,
  rejected: <Rejected color="currentColor" style={{ display: 'inline' }} />,
}
