// If name is only a number, prefix with collection name.
export const getNftName = (collectionName: string, tokenName: string) =>
  /^[0-9]+$/.test(tokenName.trim())
    ? `${collectionName} ${tokenName.trim()}`
    : tokenName
