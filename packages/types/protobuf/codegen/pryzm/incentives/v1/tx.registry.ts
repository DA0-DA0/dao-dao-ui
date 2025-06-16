//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgCreatePool, MsgUpdateRewardTokenWeight, MsgAddRewardTokenToPool, MsgBond, MsgUnbond, MsgClaimReward, MsgClaimUnbonding, MsgCancelUnbonding, MsgIncentivizePool } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.incentives.v1.MsgUpdateParams", MsgUpdateParams], ["/pryzm.incentives.v1.MsgCreatePool", MsgCreatePool], ["/pryzm.incentives.v1.MsgUpdateRewardTokenWeight", MsgUpdateRewardTokenWeight], ["/pryzm.incentives.v1.MsgAddRewardTokenToPool", MsgAddRewardTokenToPool], ["/pryzm.incentives.v1.MsgBond", MsgBond], ["/pryzm.incentives.v1.MsgUnbond", MsgUnbond], ["/pryzm.incentives.v1.MsgClaimReward", MsgClaimReward], ["/pryzm.incentives.v1.MsgClaimUnbonding", MsgClaimUnbonding], ["/pryzm.incentives.v1.MsgCancelUnbonding", MsgCancelUnbonding], ["/pryzm.incentives.v1.MsgIncentivizePool", MsgIncentivizePool]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgCreatePool",
        value: MsgCreatePool.encode(value).finish()
      };
    },
    updateRewardTokenWeight(value: MsgUpdateRewardTokenWeight) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUpdateRewardTokenWeight",
        value: MsgUpdateRewardTokenWeight.encode(value).finish()
      };
    },
    addRewardTokenToPool(value: MsgAddRewardTokenToPool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgAddRewardTokenToPool",
        value: MsgAddRewardTokenToPool.encode(value).finish()
      };
    },
    bond(value: MsgBond) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgBond",
        value: MsgBond.encode(value).finish()
      };
    },
    unbond(value: MsgUnbond) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUnbond",
        value: MsgUnbond.encode(value).finish()
      };
    },
    claimReward(value: MsgClaimReward) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgClaimReward",
        value: MsgClaimReward.encode(value).finish()
      };
    },
    claimUnbonding(value: MsgClaimUnbonding) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgClaimUnbonding",
        value: MsgClaimUnbonding.encode(value).finish()
      };
    },
    cancelUnbonding(value: MsgCancelUnbonding) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgCancelUnbonding",
        value: MsgCancelUnbonding.encode(value).finish()
      };
    },
    incentivizePool(value: MsgIncentivizePool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgIncentivizePool",
        value: MsgIncentivizePool.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUpdateParams",
        value
      };
    },
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgCreatePool",
        value
      };
    },
    updateRewardTokenWeight(value: MsgUpdateRewardTokenWeight) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUpdateRewardTokenWeight",
        value
      };
    },
    addRewardTokenToPool(value: MsgAddRewardTokenToPool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgAddRewardTokenToPool",
        value
      };
    },
    bond(value: MsgBond) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgBond",
        value
      };
    },
    unbond(value: MsgUnbond) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUnbond",
        value
      };
    },
    claimReward(value: MsgClaimReward) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgClaimReward",
        value
      };
    },
    claimUnbonding(value: MsgClaimUnbonding) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgClaimUnbonding",
        value
      };
    },
    cancelUnbonding(value: MsgCancelUnbonding) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgCancelUnbonding",
        value
      };
    },
    incentivizePool(value: MsgIncentivizePool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgIncentivizePool",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgCreatePool",
        value: MsgCreatePool.fromPartial(value)
      };
    },
    updateRewardTokenWeight(value: MsgUpdateRewardTokenWeight) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUpdateRewardTokenWeight",
        value: MsgUpdateRewardTokenWeight.fromPartial(value)
      };
    },
    addRewardTokenToPool(value: MsgAddRewardTokenToPool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgAddRewardTokenToPool",
        value: MsgAddRewardTokenToPool.fromPartial(value)
      };
    },
    bond(value: MsgBond) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgBond",
        value: MsgBond.fromPartial(value)
      };
    },
    unbond(value: MsgUnbond) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgUnbond",
        value: MsgUnbond.fromPartial(value)
      };
    },
    claimReward(value: MsgClaimReward) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgClaimReward",
        value: MsgClaimReward.fromPartial(value)
      };
    },
    claimUnbonding(value: MsgClaimUnbonding) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgClaimUnbonding",
        value: MsgClaimUnbonding.fromPartial(value)
      };
    },
    cancelUnbonding(value: MsgCancelUnbonding) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgCancelUnbonding",
        value: MsgCancelUnbonding.fromPartial(value)
      };
    },
    incentivizePool(value: MsgIncentivizePool) {
      return {
        typeUrl: "/pryzm.incentives.v1.MsgIncentivizePool",
        value: MsgIncentivizePool.fromPartial(value)
      };
    }
  }
};