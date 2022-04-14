import SvgDraft from '../icons/Draft'
import SvgExecuted from '../icons/Executed'
import SvgOpen from '../icons/Open'
import SvgPassed from '../icons/Passed'
import SvgRejected from '../icons/Rejected'

export const StatusIcons: { [key: string]: JSX.Element } = {
  draft: <SvgDraft color="currentColor" style={{ display: 'inline' }} />,
  open: <SvgOpen color="currentColor" style={{ display: 'inline' }} />,
  executed: <SvgExecuted color="currentColor" style={{ display: 'inline' }} />,
  passed: <SvgPassed color="currentColor" style={{ display: 'inline' }} />,
  rejected: <SvgRejected color="currentColor" style={{ display: 'inline' }} />,
}
