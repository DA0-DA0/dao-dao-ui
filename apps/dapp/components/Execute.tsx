import { useState } from 'react'
import { FC } from 'react'

import { Button } from '@dao-dao/ui'

import SvgAirplane from './icons/Airplane'

export interface ExecuteProps {
  onExecute: () => void
  messages: number
  loading: boolean
}

export const Execute: FC<ExecuteProps> = ({ onExecute, messages, loading }) => {
  const [partyMode, setPartMode] = useState(false)
  const [partyPhase, setPartyPhase] = useState(1)

  return (
    <>
      {!partyMode && (
        <div className="flex justify-between items-center p-4 max-w-3xl rounded-lg border bg-primary border-default">
          <div className="flex gap-2 items-center">
            <button className="mr-1 text-2xl" onClick={() => setPartMode(true)}>
              🎉
            </button>
            <p className="primary-text">Passed</p>
            <p className="secondary-text">
              {messages} message{messages !== 1 && 's'}
            </p>
          </div>
          <Button loading={loading} onClick={() => onExecute()}>
            Execute <SvgAirplane stroke="currentColor" />
          </Button>
        </div>
      )}
      {partyMode && (
        <div className="flex justify-between items-center p-4 max-w-3xl rounded-lg border bg-primary border-default">
          <div className="flex gap-2 items-center">
            <button
              className={`text-2xl mr-1 ${
                [
                  '',
                  'rumble',
                  'rumble-fast',
                  'rumble-faster',
                  'rumble-fastest',
                ][partyPhase]
              }`}
              onClick={() => {
                setPartMode(false)
                setPartyPhase(1)
              }}
              type="button"
            >
              🚀
            </button>
            <p className="primary-text">Executing</p>
            <p className="secondary-text">
              {messages} message{messages !== 1 && 's'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              className={`bg-error hover:bg-error hover:ring text-white ${
                partyPhase !== 1 ? 'invisible' : ''
              }`}
              onClick={() => setPartyPhase(2)}
              variant="secondary"
            >
              3
            </Button>
            <Button
              className={`bg-error hover:bg-error hover:ring text-white ${
                partyPhase !== 2 ? 'invisible' : ''
              }`}
              onClick={() => setPartyPhase(3)}
              variant="secondary"
            >
              2
            </Button>
            <Button
              className={`bg-error hover:bg-error hover:ring text-white ${
                partyPhase !== 3 ? 'invisible' : ''
              }`}
              onClick={() => setPartyPhase(4)}
              variant="secondary"
            >
              1
            </Button>

            <Button
              className={`${partyPhase !== 4 ? 'invisible' : ''}`}
              loading={loading}
              onClick={() => onExecute()}
            >
              Execute <SvgAirplane stroke="currentColor" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
