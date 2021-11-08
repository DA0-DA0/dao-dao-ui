import isEqual from 'lodash.isequal'
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
  line?: number
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
  const [lastInputJson, setLastInputJson] = useState<any>(undefined)

  function updateCustom(message: { custom: any }) {
    try {
      const id = customMsg?.id ?? ''
      const messageType = customMsg?.messageType ?? ProposalMessageType.Custom
      let action: ProposalAction

      if (id) {
        action = {
          type: 'updateMessage',
          id,
          message,
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
    if (!msg.error) {
      setLastInputJson(msg.jsObject)
      setError(undefined)
    } else {
      setError(msg.error)
    }
  }

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    updateCustom(lastInputJson)
  }

  let errorMessage = ''
  let saveDisabled = false
  if (error) {
    saveDisabled = true
    errorMessage = `${error.reason} at line ${error.line}`
  }
  if (!lastInputJson || isEqual(lastInputJson, customMsg.message)) {
    saveDisabled = true
  }
  let saveButton = (
    <button
      className={error ? 'btn btn-disabled' : 'btn'}
      disabled={saveDisabled}
      onClick={error ? () => {} : handleSave}
    >
      Save
    </button>
  )
  // Hide the default JSON editor warning UI
  const style = {
    warningBox: {
      display: 'none',
    },
  }
  let status = (
    <div className="flex content-center p-2">
      <div>
        {saveButton}
      </div>
      <div className={error ? 'flex-1 text-red-500 p-2' : 'flex-1'}>{errorMessage}</div>
    </div>
  )  
  return (
    <div className="mt-4 border box-border rounded focus:input-primary">
      {status}
      <JSONInput
        id="json_editor"
        locale={locale}
        height="100%"
        width="100%"
        waitAfterKeyPress={2000}
        onChange={handleMessage}
        onBlur={handleMessage}
        reset={false}
        confirmGood={false}
        style={style}
        placeholder={lastInputJson ? undefined : customMsg.message}
        theme="light_mitsuketa_tribute"
      />
    </div>
  )
}
