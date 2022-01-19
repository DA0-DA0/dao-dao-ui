import isEqual from 'lodash.isequal'
import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import React, { useState, useEffect } from 'react'
import JSON5 from 'json5'
import { makeWasmMessage } from 'util/messagehelpers'

import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'

export default function CustomEditor({
  dispatch,
  customMsg,
}: {
  dispatch: (action: ProposalAction) => void
  customMsg: MessageMapEntry
}) {
  const [lastInputJson, setLastInputJson] = useState<any>(undefined)
  const [isValidJson, setIsValidJson] = useState<boolean>(true)

  const cmOptions = {
    mode: {
      name: 'javascript',
      json: true
    },
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    tabSize: 2,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
  }

  function updateCustom(message: any) {
    try {
      const id = customMsg?.id ?? ''
      const messageType = customMsg?.messageType ?? ProposalMessageType.Custom
      let action: ProposalAction
      // If it is a WasmMsg, make sure it's properly encoded
      if (message.wasm) message = makeWasmMessage(message)

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

  let status = (
    <div
      className={
        isValidJson ? 'flex h-10 text-green-500 p-2' : 'h-10 text-red-500 p-2'
      }
    >
      {isValidJson ? 'JSON is valid' : 'JSON is invalid'}
    </div>
  )

  function isJsonString(str: string) {
    try {
      JSON5.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  return (
    <div className="mt-4 border box-border rounded">
      {status}
      <CodeMirror
        value={
          lastInputJson ? lastInputJson : JSON5.stringify(customMsg.message)
        }
        options={cmOptions}
        onBeforeChange={(editor: any, data: any, value: any) => {
          if (isJsonString(value)) {
            setLastInputJson(value)
            setIsValidJson(true)
            updateCustom(JSON5.parse(value))
          } else {
            setLastInputJson(value)
            setIsValidJson(false)
          }
        }}
      />
    </div>
  )
}
