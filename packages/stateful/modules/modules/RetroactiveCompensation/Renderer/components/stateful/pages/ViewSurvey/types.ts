import { ImmutableRef, LoadingDataWithError } from '@dao-dao/types'

import { SurveyWithMetadata } from '../../../../types'

export type ViewSurveyPageProps = {
  /**
   * The active survey being viewed.
   */
  status: SurveyWithMetadata
  /**
   * Refresh the active survey status.
   */
  refreshRef: ImmutableRef<() => Promise<void>>
  /**
   * Whether or not the current wallet was a member when the survey was created,
   * meaning they can participate in rating.
   */
  isMember: LoadingDataWithError<boolean>
  /**
   * Whether or not a wallet is connected.
   */
  connected: boolean
}
