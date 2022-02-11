import { ChangeEvent } from 'react'

import { MessageAction } from '../util/messagehelpers'

export default function MessageSelector({
  actions,
}: {
  actions: MessageAction[]
}) {
  const items = actions.map((action, i: number) => {
    return (
      <option disabled={!action.isEnabled()} value={i} key={i}>
        {action.label}
      </option>
    )
  })

  const handleItemSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target) {
      return
    }
    const i = e.target.selectedIndex - 1
    const action = i >= 0 && actions?.length > i ? actions[i] : undefined
    if (action) {
      action.execute()
    }
  }

  return (
    <select
      className="select select-bordered w-full max-w-xs font-normal"
      onChange={handleItemSelected}
      value={-1}
    >
      <option disabled={false}>Add message</option>
      {items}
    </select>
  )
}
