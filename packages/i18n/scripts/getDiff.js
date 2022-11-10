// `yarn get-diff a.json b.json` to view all differences between a.json and
// b.json.

// 4 arguments: [node getDiff.js a b]
if (process.argv.length !== 4) {
  console.log('Usage: yarn get-diff <localePathA> <localePathB>')
  process.exit(1)
}

const path = require('path')

const localePathA = path.resolve(process.argv[2])
const localePathB = path.resolve(process.argv[3])

const localeA = require(localePathA)
const localeB = require(localePathB)

const added = []
const removed = []
const modified = []

const findRemovedAndModified = (a, b, prefix) => {
  for (const key in a) {
    if (JSON.stringify(a[key]) === JSON.stringify(b[key])) {
      continue
    }

    // Modified
    if (key in b) {
      // If both are objects, recurse.
      if (typeof a[key] === 'object' && typeof b[key] === 'object') {
        findRemovedAndModified(a[key], b[key], prefix + key + '.')
      }
      // Add to modified.
      else {
        modified.push({
          key: prefix + key,
          old: a[key],
          new: b[key],
        })
      }
    }
    // Removed
    else {
      removed.push(prefix + key)
    }
  }
}

const findAdded = (a, b, prefix) => {
  for (const key in b) {
    // If both are objects, recurse.
    if (key in a && typeof a[key] === 'object' && typeof b[key] === 'object') {
      findAdded(a[key], b[key], prefix + key + '.')
    } else if (!(key in a)) {
      // Added
      added.push({
        key: prefix + key,
        value: b[key],
      })
    }
  }
}

findRemovedAndModified(localeA, localeB, '')
findAdded(localeA, localeB, '')

console.log(`// Added ${added.length}:`)
console.log(JSON.stringify(added, null, 2))
console.log()

console.log(`// Removed ${removed.length}:`)
console.log(JSON.stringify(removed, null, 2))
console.log()

console.log(`// Modified ${modified.length}:`)
console.log(JSON.stringify(modified, null, 2))
