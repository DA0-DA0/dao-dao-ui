import IconText from './IconText'
import StatusIcons from './StatusIcons'

function Status({ status }) {
  return (
    <>
      {status === 'passed' && (
        <IconText className="text-base" color="#6A78FF" icon={StatusIcons?.passed} text={status} />
      )}
      {status === 'rejected' && (
        <IconText className="text-base" color="#ED5276" icon={StatusIcons?.rejected} text={status} />
      )}
      {status === 'executed' && (
        <IconText className="text-base" color="#53D0C9" icon={StatusIcons?.executed} text={status} />
      )}
      {status === 'open' && (
        <IconText className="text-base" color="#00BAFF" icon={StatusIcons?.open} text={status} />
      )}
    </>
  )
}

export default Status