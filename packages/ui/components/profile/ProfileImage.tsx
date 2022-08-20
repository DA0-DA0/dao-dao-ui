export interface ProfileImageProps {
  imgUrl: string
}

export const ProfileImage = ({ imgUrl }: ProfileImageProps) => {
  return (
    <div
      className="w-[64px] h-[64px] bg-center bg-cover rounded-2xl"
      style={{ backgroundImage: `url(${imgUrl})` }}
    ></div>
  )
}
