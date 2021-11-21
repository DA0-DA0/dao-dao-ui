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
import { useThemeContext } from '../contexts/theme'

type JSONError = {
  line?: number
  reason?: string
}

function getEditorTheme(appTheme: string): string {
  return appTheme === 'junoDark'
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
  const themeContext = useThemeContext()

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
      updateCustom(msg.jsObject)
    } else {
      setError(msg.error)
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
    <div className="mt-4 border box-border rounded focus:input-primary">
      {status}
      <JSONInput
        id="json_editor"
        locale={locale}
        height="100%"
        width="100%"
        waitAfterKeyPress={200}
        onChange={handleMessage}
        onBlur={handleMessage}
        reset={false}
        confirmGood={false}
        style={style}
        placeholder={lastInputJson ? undefined : customMsg.message}
        theme={getEditorTheme(themeContext.theme)}
      />
    </div>
  )
}
