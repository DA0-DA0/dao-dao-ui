//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAggregateExchangeRatePrevote, MsgAggregateExchangeRateVote, MsgDelegateFeedConsent } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/kujira.oracle.MsgAggregateExchangeRatePrevote", MsgAggregateExchangeRatePrevote], ["/kujira.oracle.MsgAggregateExchangeRateVote", MsgAggregateExchangeRateVote], ["/kujira.oracle.MsgDelegateFeedConsent", MsgDelegateFeedConsent]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    aggregateExchangeRatePrevote(value: MsgAggregateExchangeRatePrevote) {
      return {
        typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevote",
        value: MsgAggregateExchangeRatePrevote.encode(value).finish()
      };
    },
    aggregateExchangeRateVote(value: MsgAggregateExchangeRateVote) {
      return {
        typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVote",
        value: MsgAggregateExchangeRateVote.encode(value).finish()
      };
    },
    delegateFeedConsent(value: MsgDelegateFeedConsent) {
      return {
        typeUrl: "/kujira.oracle.MsgDelegateFeedConsent",
        value: MsgDelegateFeedConsent.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    aggregateExchangeRatePrevote(value: MsgAggregateExchangeRatePrevote) {
      return {
        typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevote",
        value
      };
    },
    aggregateExchangeRateVote(value: MsgAggregateExchangeRateVote) {
      return {
        typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVote",
        value
      };
    },
    delegateFeedConsent(value: MsgDelegateFeedConsent) {
      return {
        typeUrl: "/kujira.oracle.MsgDelegateFeedConsent",
        value
      };
    }
  },
  fromPartial: {
    aggregateExchangeRatePrevote(value: MsgAggregateExchangeRatePrevote) {
      return {
        typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevote",
        value: MsgAggregateExchangeRatePrevote.fromPartial(value)
      };
    },
    aggregateExchangeRateVote(value: MsgAggregateExchangeRateVote) {
      return {
        typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVote",
        value: MsgAggregateExchangeRateVote.fromPartial(value)
      };
    },
    delegateFeedConsent(value: MsgDelegateFeedConsent) {
      return {
        typeUrl: "/kujira.oracle.MsgDelegateFeedConsent",
        value: MsgDelegateFeedConsent.fromPartial(value)
      };
    }
  }
};