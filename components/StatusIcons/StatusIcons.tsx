import { STATUS_COLORS } from 'util/constants'
import SvgPassed from '../icons/Passed'
import SvgExecuted from '../icons/Executed'
import SvgOpen from '../icons/Open'
import SvgRejected from '../icons/Rejected'
import SvgDraft from '../icons/Draft'

export const StatusIcons: { [key: string]: JSX.Element } = {
  draft: (
    <SvgDraft color={STATUS_COLORS.draft} style={{ display: 'inline' }} />
  ),
  open: <SvgOpen color={STATUS_COLORS.open} style={{ display: 'inline' }} />,
  executed: (
    <SvgExecuted color={STATUS_COLORS.executed} style={{ display: 'inline' }} />
  ),
  passed: (
    <SvgPassed color={STATUS_COLORS.passed} style={{ display: 'inline' }} />
  ),
  rejected: (
    <SvgRejected color={STATUS_COLORS.rejected} style={{ display: 'inline' }} />
  ),
}
