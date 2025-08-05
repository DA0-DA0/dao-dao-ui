import { beforeEach, describe, expect, it } from 'vitest'

import { DependencyTrackedQueryClient } from './DependencyTrackedQueryClient'

const key = (key: string) => [key]

describe('DependencyTrackedQueryClient', () => {
  let client: DependencyTrackedQueryClient
  beforeEach(() => {
    client = new DependencyTrackedQueryClient()

    // A -> B -> C
    //      \--> D -> E
    //           \--> F
    client.trackDependency(key('A'), key('B'))
    client.trackDependency(key('B'), key('C'))
    client.trackDependency(key('B'), key('D'))
    client.trackDependency(key('D'), key('E'))
    client.trackDependency(key('D'), key('F'))

    // G -> B
    client.trackDependency(key('G'), key('B'))
  })

  it('returns the correct dependency levels', () => {
    expect(client.getDependencyLevels(key('A'))).toEqual([
      // Level 0 (no dependencies)
      [key('C'), key('E'), key('F')],
      // Level 1 (all dependencies are in level 0)
      [key('D')],
      // Level 2
      [key('B')],
      // Level 3 (self)
      [key('A')],
    ])

    expect(client.getDependencyLevels(key('G'))).toEqual([
      // Level 0 (no dependencies)
      [key('C'), key('E'), key('F')],
      // Level 1 (all dependencies are in level 0)
      [key('D')],
      // Level 2
      [key('B')],
      // Level 3 (self)
      [key('G')],
    ])

    expect(client.getDependencyLevels(key('B'))).toEqual([
      // Level 0 (no dependencies)
      [key('C'), key('E'), key('F')],
      // Level 1 (all dependencies are in level 0)
      [key('D')],
      // Level 2 (self)
      [key('B')],
    ])

    expect(client.getDependencyLevels(key('C'))).toEqual([
      // No dependencies
      // Level 0 (self)
      [key('C')],
    ])

    expect(client.getDependencyLevels(key('D'))).toEqual([
      // Level 0 (no dependencies)
      [key('E'), key('F')],
      // Level 1 (self)
      [key('D')],
    ])

    expect(client.getDependencyLevels(key('E'))).toEqual([
      // No dependencies
      // Level 0 (self)
      [key('E')],
    ])

    expect(client.getDependencyLevels(key('F'))).toEqual([
      // No dependencies
      // Level 0 (self)
      [key('F')],
    ])
  })

  it('returns the correct consumer distances', () => {
    expect(client.getConsumerDistances(key('A'))).toEqual([
      // Distance 0 (self)
      [key('A')],
      // No consumers
    ])

    expect(client.getConsumerDistances(key('B'))).toEqual([
      // Distance 0 (self)
      [key('B')],
      // Distance 1 (direct consumers)
      [key('A'), key('G')],
    ])

    expect(client.getConsumerDistances(key('C'))).toEqual([
      // Distance 0 (self)
      [key('C')],
      // Distance 1 (direct consumers)
      [key('B')],
      // Distance 2
      [key('A'), key('G')],
    ])

    expect(client.getConsumerDistances(key('D'))).toEqual([
      // Distance 0 (self)
      [key('D')],
      // Distance 1 (direct consumers)
      [key('B')],
      // Distance 2
      [key('A'), key('G')],
    ])

    expect(client.getConsumerDistances(key('E'))).toEqual([
      // Distance 0 (self)
      [key('E')],
      // Distance 1 (direct consumers)
      [key('D')],
      // Distance 2
      [key('B')],
      // Distance 3
      [key('A'), key('G')],
    ])

    expect(client.getConsumerDistances(key('F'))).toEqual([
      // Distance 0 (self)
      [key('F')],
      // Distance 1 (direct consumers)
      [key('D')],
      // Distance 2
      [key('B')],
      // Distance 3
      [key('A'), key('G')],
    ])
  })
})
