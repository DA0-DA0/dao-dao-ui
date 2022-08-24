export interface ProfileImageProps {
  imgUrl: string
}

export const ProfileImage = ({ imgUrl }: ProfileImageProps) => {
  return (
    <div
      className="w-16 h-16 bg-center bg-cover rounded-2xl"
      style={{ backgroundImage: `url(${imgUrl})` }}
    ></div>
  )
}
