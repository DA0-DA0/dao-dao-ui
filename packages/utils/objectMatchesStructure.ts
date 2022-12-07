type Structure = {
  // Nest to match more keys or use an empty object ({}) to check existence.
  [key: string]: Structure | { [key: string | number | symbol]: never }
}

// Check if object contains the expected structure.
export const objectMatchesStructure = (
  object: any | undefined | null,
  structure: Structure,
  options: {
    // If true, will not verify that values are defined and non-null.
    ignoreNullUndefined?: boolean
  } = {
    ignoreNullUndefined: false,
  }
): boolean => {
  if (!object || typeof object !== 'object' || Array.isArray(object)) {
    return false
  }

  const objectKeys = new Set(Object.keys(object))
  const structureEntries = Object.entries(structure)

  // Ensure object contains all top-level keys of structure. If we proceed past
  // this block, all required keys exist and we should try to recurse on
  // available children.
  if (
    structureEntries.some(
      ([key]) =>
        // Fail if does not have key.
        !objectKeys.has(key) ||
        // Fail if undefined or null.
        (!options.ignoreNullUndefined &&
          (object[key] === undefined || object[key] === null))
    )
  ) {
    return false
  }

  return structureEntries.every(
    ([topLevelKey, structureOrEmptyObject]) =>
      // If schema is empty object ({}), nothing further to check. We already
      // verified it above.
      Object.keys(structureOrEmptyObject).length === 0 ||
      // Recurse, first verifying the value of the key in the object is an
      // object.
      (typeof object[topLevelKey] === 'object' &&
        !Array.isArray(object[topLevelKey]) &&
        // typeof null === 'object', so verify this is not null before checking
        // its internal keys.
        object[topLevelKey] !== null &&
        objectMatchesStructure(
          object[topLevelKey] as Record<string, unknown>,
          structureOrEmptyObject,
          options
        ))
  )
}
