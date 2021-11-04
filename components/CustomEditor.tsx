import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import React, { useState } from 'react'
import JSONInput from 'react-json-editor-ajrm'
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/en'

export default function CustomEditor({
  dispatch,
  customMsg,
}: {
  dispatch: (action: ProposalAction) => void
  customMsg: MessageMapEntry
}) {
  const [message, setMessage] = useState(JSON.stringify(customMsg.message))
  const [error, setError] = useState(undefined)

  function updateCustom() {
    try {
      const id = customMsg?.id ?? ''
      const messageType = customMsg?.messageType ?? ProposalMessageType.Custom
      let action: ProposalAction

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

  // Handles values from react-json-editor-ajrm
  function handleMessage(msg: any) {
    if (!msg.error) {
      setMessage(msg.json)
      updateCustom()
      setError(undefined)
    } else {
      setError(msg.error)
    }
  }

  return (
    <div className="mt-4 border box-border rounded focus:input-primary">
      <JSONInput
        id={customMsg.id}
        locale={locale}
        height="100%"
        width="100%"
        onBlur={handleMessage}
        onKeyPressUpdate="false"
        placeholder={JSON.parse(message)}
        theme="light_mitsuketa_tribute"
        error={error}
      />
    </div>
  )
}
