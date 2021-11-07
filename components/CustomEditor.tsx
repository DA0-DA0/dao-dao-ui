import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import React, { useState } from 'react'
import JSONInput from 'react-json-editor-ajrm'
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/en'

type JSONError = {
  line?: number,
  reason?: string
}

export default function CustomEditor({
  dispatch,
  customMsg,
}: {
  dispatch: (action: ProposalAction) => void
  customMsg: MessageMapEntry
}) {
  const [error, setError] = useState<JSONError | undefined>(undefined)

  function updateCustom(message: any) {
    try {
      const id = customMsg?.id ?? ''
      const messageType = customMsg?.messageType ?? ProposalMessageType.Custom
      let action: ProposalAction

      if (id) {
        action = {
          type: 'updateMessage',
          id,
          message
        }
      } else {
        action = {
          type: 'addMessage',
          message,
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
    console.dir(msg);
    if (!msg.error) {
      updateCustom({custom: msg.jsObject})
      setError(undefined)
    } else {
      setError(msg.error)
    }
  }

  let status = <div>JSON Syntax is good!</div>
  if (error) {
    status = <div>{`${error.reason}`}</div>
  }
  const style = {
    warningBox: {
      display: 'none'
    }
  }
  return (
    <div className="mt-4 border box-border rounded focus:input-primary">
      {status}
      <JSONInput
        id={customMsg.id}
        locale={locale}
        height="100%"
        width="100%"
        onChange={handleMessage}
        onBlur={handleMessage}
        onKeyPressUpdate="false"
        confirmGood={false}
        placeholder={customMsg.message}
        theme="light_mitsuketa_tribute"
        style={style}
      />
    </div>
  )
}
