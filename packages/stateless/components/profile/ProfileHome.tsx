import { FollowingDaos, FollowingDaosProps } from '../dao/FollowingDaos'
import { Feed, FeedProps } from '../Feed'

export type ProfileHomeProps = {
  followingDaosProps: FollowingDaosProps
  feedProps: FeedProps
}

export const ProfileHome = ({
  followingDaosProps,
  feedProps,
}: ProfileHomeProps) => (
  <>
    <div className="mb-8 w-full">
      <Feed {...feedProps} />
    </div>

    <FollowingDaos {...followingDaosProps} />
  </>
)
