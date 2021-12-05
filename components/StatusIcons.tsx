import SvgPassed from './icons/Passed'
import SvgExecuted from './icons/Executed'
import SvgOpen from './icons/Open'
import SvgRejected from './icons/Rejected'

const StatusIcons = {
  passed: (
    <SvgPassed color="#6A78FF" style={{ display: 'inline' }} />
  ),
  executed: (
    <SvgExecuted color="#53D0C9" style={{ display: 'inline' }} />
  ),
  open: (
    <SvgOpen color="#00BAFF" style={{ display: 'inline' }} />
  ),
  rejected: (
    <SvgRejected color="#ED5276" style={{ display: 'inline' }} />
  ),
}

export default StatusIcons