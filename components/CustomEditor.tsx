import isEqual from 'lodash.isequal'
import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import React, { useState, useEffect } from 'react'
import { makeWasmMessage } from 'util/messagehelpers'

import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/xq-light.css';
import 'codemirror/lib/codemirror.css';

type JSONError = {
  line?: number
  reason?: string
}

function getEditorTheme(appTheme: string): string {
  return appTheme !== 'junoDark'
    ? 'dark_vscode_tribute'
    : 'light_mitsuketa_tribute'
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

  const cmOptions = {
    mode: 'application/json',
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

  let errorMessage = ''
  let saveDisabled = false
  if (error) {
    saveDisabled = true
    errorMessage = `${error.reason} at line ${error.line}`
  }
  if (!lastInputJson || isEqual(lastInputJson, customMsg.message)) {
    saveDisabled = true
  }
  // Hide the default JSON editor warning UI
  const style = {
    warningBox: {
      display: 'none',
    },
    body: {
      fontFamily: 'JetBrainsMono',
      fontSize: '14px',
    },
  }
  let status = (
    <div
      className={
        error ? 'h-10 text-red-500 p-2' : 'flex h-10 text-green-500 p-2'
      }
    >
      {errorMessage || 'JSON is valid'}
    </div>
  )

  return (
    <div className="mt-4 border box-border rounded">
      {status}
      <CodeMirror
        value={JSON.stringify(customMsg.message)}
        options={cmOptions}
        autoCursor={false}
        onBeforeChange={(editor: any, data: any, value: any) => {
          setLastInputJson({ value })
        }}
        onChange={(editor: any, data: any, value: any) =>
          setLastInputJson({ value })
        }
      />
    </div>
  )
}
