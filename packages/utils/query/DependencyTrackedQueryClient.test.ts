import { beforeEach, describe, expect, it } from 'vitest'

import { DependencyTrackedQueryClient } from './DependencyTrackedQueryClient'

const hash = (key: string) => key

describe('DependencyTrackedQueryClient', () => {
  let client: DependencyTrackedQueryClient
  beforeEach(() => {
    client = new DependencyTrackedQueryClient()

    // A -> B -> C
    //      \--> D -> E
    //           \--> F
    client.trackDependency(hash('A'), hash('B'))
    client.trackDependency(hash('B'), hash('C'))
    client.trackDependency(hash('B'), hash('D'))
    client.trackDependency(hash('D'), hash('E'))
    client.trackDependency(hash('D'), hash('F'))

    // G -> B
    client.trackDependency(hash('G'), hash('B'))
  })

  it('returns the correct dependency levels', () => {
    expect(client.getDependencyLevels(hash('A'))).toEqual([
      // Level 0 (no dependencies)
      [hash('C'), hash('E'), hash('F')],
      // Level 1 (all dependencies are in level 0)
      [hash('D')],
      // Level 2
      [hash('B')],
      // Level 3 (self)
      [hash('A')],
    ])

    expect(client.getDependencyLevels(hash('G'))).toEqual([
      // Level 0 (no dependencies)
      [hash('C'), hash('E'), hash('F')],
      // Level 1 (all dependencies are in level 0)
      [hash('D')],
      // Level 2
      [hash('B')],
      // Level 3 (self)
      [hash('G')],
    ])

    expect(client.getDependencyLevels(hash('B'))).toEqual([
      // Level 0 (no dependencies)
      [hash('C'), hash('E'), hash('F')],
      // Level 1 (all dependencies are in level 0)
      [hash('D')],
      // Level 2 (self)
      [hash('B')],
    ])

    expect(client.getDependencyLevels(hash('C'))).toEqual([
      // No dependencies
      // Level 0 (self)
      [hash('C')],
    ])

    expect(client.getDependencyLevels(hash('D'))).toEqual([
      // Level 0 (no dependencies)
      [hash('E'), hash('F')],
      // Level 1 (self)
      [hash('D')],
    ])

    expect(client.getDependencyLevels(hash('E'))).toEqual([
      // No dependencies
      // Level 0 (self)
      [hash('E')],
    ])

    expect(client.getDependencyLevels(hash('F'))).toEqual([
      // No dependencies
      // Level 0 (self)
      [hash('F')],
    ])
  })

  it('returns the correct consumer distances', () => {
    expect(client.getConsumerDistances(hash('A'))).toEqual([
      // Distance 0 (self)
      [hash('A')],
      // No consumers
    ])

    expect(client.getConsumerDistances(hash('B'))).toEqual([
      // Distance 0 (self)
      [hash('B')],
      // Distance 1 (direct consumers)
      [hash('A'), hash('G')],
    ])

    expect(client.getConsumerDistances(hash('C'))).toEqual([
      // Distance 0 (self)
      [hash('C')],
      // Distance 1 (direct consumers)
      [hash('B')],
      // Distance 2
      [hash('A'), hash('G')],
    ])

    expect(client.getConsumerDistances(hash('D'))).toEqual([
      // Distance 0 (self)
      [hash('D')],
      // Distance 1 (direct consumers)
      [hash('B')],
      // Distance 2
      [hash('A'), hash('G')],
    ])

    expect(client.getConsumerDistances(hash('E'))).toEqual([
      // Distance 0 (self)
      [hash('E')],
      // Distance 1 (direct consumers)
      [hash('D')],
      // Distance 2
      [hash('B')],
      // Distance 3
      [hash('A'), hash('G')],
    ])

    expect(client.getConsumerDistances(hash('F'))).toEqual([
      // Distance 0 (self)
      [hash('F')],
      // Distance 1 (direct consumers)
      [hash('D')],
      // Distance 2
      [hash('B')],
      // Distance 3
      [hash('A'), hash('G')],
    ])
  })

  it('dehydrates and rehydrates the dependency graph', () => {
    const dehydrated = client.dehydrate()
    const rehydrated = new DependencyTrackedQueryClient(undefined, dehydrated)

    expect(rehydrated.getDependencyLevels(hash('A'))).toEqual(
      client.getDependencyLevels(hash('A'))
    )

    expect(rehydrated.getConsumerDistances(hash('A'))).toEqual(
      client.getConsumerDistances(hash('A'))
    )

    expect(rehydrated.getDependencyLevels(hash('G'))).toEqual(
      client.getDependencyLevels(hash('G'))
    )

    expect(rehydrated.getConsumerDistances(hash('G'))).toEqual(
      client.getConsumerDistances(hash('G'))
    )
  })

  it('seamlessly handles cycles', () => {
    const client = new DependencyTrackedQueryClient()

    // A -> B -> C -> A
    client.trackDependency(hash('A'), hash('B'))
    client.trackDependency(hash('B'), hash('C'))
    client.trackDependency(hash('C'), hash('A'))

    expect(client.getDependencyLevels(hash('A'))).toEqual([
      // Level 0 (no non-cyclical dependencies)
      [hash('C')],
      // Level 1
      [hash('B')],
      // Level 2 (self)
      [hash('A')],
    ])

    expect(client.getConsumerDistances(hash('A'))).toEqual([
      // Distance 0 (self)
      [hash('A')],
      // Distance 1 (direct consumers)
      [hash('C')],
      // Distance 2
      [hash('B')],
    ])

    expect(client.getDependencyLevels(hash('B'))).toEqual([
      // Level 0 (no non-cyclical dependencies)
      [hash('A')],
      // Level 2
      [hash('C')],
      // Level 3 (self)
      [hash('B')],
    ])

    expect(client.getConsumerDistances(hash('B'))).toEqual([
      // Distance 0 (self)
      [hash('B')],
      // Distance 1 (direct consumers)
      [hash('A')],
      // Distance 2
      [hash('C')],
    ])

    expect(client.getDependencyLevels(hash('C'))).toEqual([
      // Level 0 (no non-cyclical dependencies)
      [hash('B')],
      // Level 1
      [hash('A')],
      // Level 2 (self)
      [hash('C')],
    ])

    expect(client.getConsumerDistances(hash('C'))).toEqual([
      // Distance 0 (self)
      [hash('C')],
      // Distance 1 (direct consumers)
      [hash('B')],
      // Distance 2
      [hash('A')],
    ])
  })
})
