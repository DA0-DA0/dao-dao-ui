// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

// Gets the fallback image for a DAO card (or honestly anything) given
// an identifier for that card. This assumes that there are five
// fallback images in the public/placeholders directory.
export const getCardFallbackImage = (identifier: string) => {
  const hashed = identifier.split('').reduce((p, n) => n.charCodeAt(0) + p, 0)
  const index = (hashed % 5) + 1
  return `/placeholders/${index}.svg`
}
