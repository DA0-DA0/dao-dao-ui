import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import React, { useState } from 'react'

export default function CustomEditor({
  dispatch,
  customMsg,
}: {
  dispatch: (action: ProposalAction) => void
  customMsg: MessageMapEntry
}) {
  const [message, setMessage] = useState(JSON.stringify(customMsg.message))

  function updateCustom() {
    try {
      const id = customMsg?.id ?? ''
      const messageType = customMsg?.messageType ?? ProposalMessageType.Custom
      let action: ProposalAction

      /* const message = makeCustomMessage(message, recipient, contractAddress) */
      if (id) {
        action = {
          type: 'updateMessage',
          id,
          message: JSON.parse(message),
        }
      } else {
        action = {
          type: 'addMessage',
          message: JSON.parse(message),
          messageType,
        }
      }
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }

  function handleMessage(e) {
    e.preventDefault()
    e.stopPropagation()
    setMessage(e.target.value)
    updateCustom()
  }

  let inputBaseClass =
    'input input-bordered rounded box-border p-3 w-full text-xl'
  let inputErrorClass =
    'input input-bordered rounded box-border p-3 w-full text-xl bg-error'

  return (
    <div>
      <label htmlFor="custom-message-json" className="block mt-4">
        Custom JSON Message
      </label>
      <textarea
        id="custom-message-json"
        className="input input-bordered rounded box-border p-3 h-24 w-full focus:input-primary text-xl"
        name="custom-message-json"
        onChange={handleMessage}
        readOnly={false}
        value={message}
      />
    </div>
  )
}
