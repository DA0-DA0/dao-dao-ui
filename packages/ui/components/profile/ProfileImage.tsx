import clsx from 'clsx'

export interface ProfileImageProps {
  imgUrl: string
  size: 'sm' | 'lg'
}

export const ProfileImage = ({ imgUrl, size }: ProfileImageProps) => (
  <div
    className={clsx('bg-center bg-cover', {
      'w-10 h-10 rounded-xl': size === 'sm',
      'w-16 h-16 rounded-2xl': size === 'lg',
    })}
    style={{ backgroundImage: `url(${imgUrl})` }}
  ></div>
)
