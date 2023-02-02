import Synaps from '@synaps-io/react-verify'
import { useTranslation } from 'react-i18next'

import { CheckmarkStatus, MeIdentityProps } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { Button, Loader } from '../components'
import { useNamedThemeColor } from '../theme'

export const MeIdentity = ({
  loadingStatus,
  beginVerification,
  onFinishVerification,
  verificationSessionId,
  deleteCheckmark,
  deletingCheckmark,
}: MeIdentityProps) => {
  const { t } = useTranslation()
  const brand = useNamedThemeColor('text-brand')

  if (loadingStatus.loading || loadingStatus.updating) {
    return <Loader />
  } else if (loadingStatus.errored) {
    return (
      <p className="text-text-interactive-error">
        {processError(loadingStatus.error, { forceCapture: false })}
      </p>
    )
  }

  const { status, sessionId, errors } = loadingStatus.data

  const pendingSessionId =
    status === CheckmarkStatus.None
      ? !verificationSessionId.loading
        ? verificationSessionId.data
        : undefined
      : status === CheckmarkStatus.Pending
      ? sessionId
      : undefined

  return (
    <div className="flex flex-col gap-8">
      {status === CheckmarkStatus.None || status === CheckmarkStatus.Pending ? (
        <div className="flex flex-col items-start gap-4">
          <p className="header-text">Verify</p>

          <p className="primary-text">It costs 1 $JUNO.</p>

          {pendingSessionId ? (
            <div className="gap-4 rounded-lg bg-background-primary p-6">
              <Synaps
                className="rounded-lg"
                color={{
                  primary: brand,
                  secondary: brand,
                }}
                lang="en"
                onFinish={() => onFinishVerification()}
                service="individual"
                sessionId={pendingSessionId}
              />
            </div>
          ) : (
            <Button
              loading={verificationSessionId.loading}
              onClick={beginVerification}
            >
              Begin Verification
            </Button>
          )}
        </div>
      ) : status === CheckmarkStatus.Checkmarked ? (
        <div className="flex flex-col items-start gap-4">
          <p className="header-text">Verified</p>

          <Button loading={deletingCheckmark} onClick={deleteCheckmark}>
            Delete Checkmark
          </Button>
        </div>
      ) : status === CheckmarkStatus.Processing ? (
        <p className="header-text">Processing</p>
      ) : status === CheckmarkStatus.Failed ? (
        <div className="flex flex-col gap-4">
          <p className="header-text">Verification Failed</p>

          {errors?.map((error, index) => (
            <p key={index} className="text-text-interactive-error">
              {error}
            </p>
          ))}
        </div>
      ) : (
        <div>
          <p className="header-text">Unexpected Status: {status}</p>
          <p className="primary-text">
            Please contact support if you see this message.
          </p>
        </div>
      )}
    </div>
  )
}
