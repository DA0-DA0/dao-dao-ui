import { MsgAggregateExchangeRatePrevote, MsgAggregateExchangeRateVote, MsgDelegateFeedConsent } from "./tx";
export const AminoConverter = {
  "/kujira.oracle.MsgAggregateExchangeRatePrevote": {
    aminoType: "/kujira.oracle.MsgAggregateExchangeRatePrevote",
    toAmino: MsgAggregateExchangeRatePrevote.toAmino,
    fromAmino: MsgAggregateExchangeRatePrevote.fromAmino
  },
  "/kujira.oracle.MsgAggregateExchangeRateVote": {
    aminoType: "/kujira.oracle.MsgAggregateExchangeRateVote",
    toAmino: MsgAggregateExchangeRateVote.toAmino,
    fromAmino: MsgAggregateExchangeRateVote.fromAmino
  },
  "/kujira.oracle.MsgDelegateFeedConsent": {
    aminoType: "/kujira.oracle.MsgDelegateFeedConsent",
    toAmino: MsgDelegateFeedConsent.toAmino,
    fromAmino: MsgDelegateFeedConsent.fromAmino
  }
};