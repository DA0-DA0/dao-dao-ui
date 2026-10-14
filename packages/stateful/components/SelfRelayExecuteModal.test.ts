import {
  parseAcksFromTxEvents,
  parsePacketsFromTendermintEvents,
} from '@confio/relayer/build/lib/utils'
import { fromHex, toHex, toUtf8 } from '@cosmjs/encoding'
import { describe, expect, it } from 'vitest'

import fixtures from './__fixtures__/ibcPacketEvents.json'

// SelfRelayExecuteModal rebuilds IBC packets and acks from tx events with
// @confio/relayer's parsers (patched in patches/@confio__relayer@0.12.0.patch).
// These fixtures are real tx events. ibc-go v10 chains (e.g. Juno) only emit
// `packet_data_hex`/`packet_ack_hex`, while ibc-go v8 chains (e.g. Osmosis)
// also emit the deprecated UTF-8 `packet_data`/`packet_ack` attributes.

const getAttribute = (
  events: { type: string; attributes: { key: string; value: string }[] }[],
  type: string,
  key: string
) =>
  events
    .find((event) => event.type === type)
    ?.attributes.find((attribute) => attribute.key === key)?.value

describe('self-relay IBC event parsing', () => {
  describe('ibc-go v10 (Juno) send_packet', () => {
    const { events } = fixtures.junoPolytoneSendPacket

    it('only contains packet_data_hex', () => {
      expect(getAttribute(events, 'send_packet', 'packet_data')).toBeUndefined()
      expect(
        getAttribute(events, 'send_packet', 'packet_data_hex')
      ).toBeTruthy()
    })

    it('parses packets with non-empty data', () => {
      const packets = parsePacketsFromTendermintEvents(events)
      expect(packets).toHaveLength(1)

      const [packet] = packets
      expect(packet.sequence).toBe(1236n)
      expect(packet.sourcePort).toBe(
        'wasm.juno1ads7gcpje0y5jxhtn3ntsqs8kg3ahch9u953jk6v0njq4l39m3us5sxw68'
      )
      expect(packet.sourceChannel).toBe('channel-288')
      expect(packet.destinationPort).toBe(
        'wasm.osmo1af93h8xcszszes2a0kjms5zpm5ns3fys4aez2f40fgz428hc8aws28klzs'
      )
      expect(packet.destinationChannel).toBe('channel-1664')
      expect(packet.timeoutTimestamp).toBe(1791201009418078436n)
      expect(packet.timeoutHeight).toEqual({
        revisionHeight: 0n,
        revisionNumber: 0n,
      })

      expect(packet.data.length).toBeGreaterThan(0)
      expect(toHex(packet.data)).toBe(
        getAttribute(events, 'send_packet', 'packet_data_hex')
      )
      expect(JSON.parse(new TextDecoder().decode(packet.data))).toMatchObject({
        sender:
          'juno1wgqy9pqcj558wy9xcrv52h3hwd0336q69r2p5x2awyrmztcsw4wsspu97h',
        msg: { execute: { msgs: [{ bank: { send: expect.anything() } }] } },
      })
    })
  })

  describe('ibc-go v10 (Juno) write_acknowledgement', () => {
    const { events } = fixtures.junoWriteAck

    it('only contains hex attributes', () => {
      expect(
        getAttribute(events, 'write_acknowledgement', 'packet_data')
      ).toBeUndefined()
      expect(
        getAttribute(events, 'write_acknowledgement', 'packet_ack')
      ).toBeUndefined()
    })

    it('parses acks with non-empty packet data and acknowledgement', () => {
      const acks = parseAcksFromTxEvents(events)
      expect(acks).toHaveLength(1)

      const [{ originalPacket, acknowledgement }] = acks
      expect(originalPacket.sequence).toBe(1527554n)
      expect(originalPacket.data).toEqual(
        fromHex(
          getAttribute(events, 'write_acknowledgement', 'packet_data_hex')!
        )
      )
      expect(originalPacket.data.length).toBeGreaterThan(0)
      expect(new TextDecoder().decode(acknowledgement)).toBe(
        '{"result":"AQ=="}'
      )
    })
  })

  describe('ibc-go v8 (Osmosis) write_acknowledgement', () => {
    const { events } = fixtures.osmosisWriteAck

    it('parses the ack for the Juno Polytone packet', () => {
      const acks = parseAcksFromTxEvents(events)
      expect(acks).toHaveLength(1)

      const [{ originalPacket, acknowledgement }] = acks
      // Same packet as the Juno send_packet fixture.
      const [sentPacket] = parsePacketsFromTendermintEvents(
        fixtures.junoPolytoneSendPacket.events
      )
      expect(originalPacket.sequence).toBe(sentPacket.sequence)
      expect(originalPacket.data).toEqual(sentPacket.data)

      // Hex and deprecated UTF-8 attributes decode to the same bytes.
      expect(acknowledgement).toEqual(
        toUtf8(getAttribute(events, 'write_acknowledgement', 'packet_ack')!)
      )
      expect(
        JSON.parse(new TextDecoder().decode(acknowledgement))
      ).toMatchObject({ execute: { Ok: expect.anything() } })
    })
  })

  describe('fallback to deprecated UTF-8 attributes', () => {
    const withoutHex = (
      events: { type: string; attributes: { key: string; value: string }[] }[]
    ) =>
      events.map(({ type, attributes }) => ({
        type,
        attributes: attributes.filter(({ key }) => !key.endsWith('_hex')),
      }))

    it('parses packets when only packet_data is present', () => {
      const { events } = fixtures.junoPolytoneSendPacket
      // Simulate an older chain that only emits the UTF-8 attribute.
      const legacyEvents = events.map(({ type, attributes }) => ({
        type,
        attributes: attributes.map(({ key, value }) =>
          key === 'packet_data_hex'
            ? {
                key: 'packet_data',
                value: new TextDecoder().decode(fromHex(value)),
              }
            : { key, value }
        ),
      }))

      const [hexPacket] = parsePacketsFromTendermintEvents(events)
      const [utf8Packet] = parsePacketsFromTendermintEvents(legacyEvents)
      expect(utf8Packet.data.length).toBeGreaterThan(0)
      expect(utf8Packet.data).toEqual(hexPacket.data)
    })

    it('parses acks when hex attributes are absent', () => {
      const { events } = fixtures.osmosisWriteAck
      const [hexAck] = parseAcksFromTxEvents(events)
      const [utf8Ack] = parseAcksFromTxEvents(withoutHex(events))

      expect(utf8Ack.originalPacket.data.length).toBeGreaterThan(0)
      expect(utf8Ack.originalPacket.data).toEqual(hexAck.originalPacket.data)
      expect(utf8Ack.acknowledgement).toEqual(hexAck.acknowledgement)
    })
  })
})
