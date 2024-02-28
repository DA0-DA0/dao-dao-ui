import { MsgAcceptOwner, MsgAddRemoteTokenMessenger, MsgDepositForBurn, MsgDepositForBurnWithCaller, MsgDisableAttester, MsgEnableAttester, MsgLinkTokenPair, MsgPauseBurningAndMinting, MsgPauseSendingAndReceivingMessages, MsgReceiveMessage, MsgRemoveRemoteTokenMessenger, MsgReplaceDepositForBurn, MsgReplaceMessage, MsgSendMessage, MsgSendMessageWithCaller, MsgUnlinkTokenPair, MsgUnpauseBurningAndMinting, MsgUnpauseSendingAndReceivingMessages, MsgUpdateOwner, MsgUpdateAttesterManager, MsgUpdateTokenController, MsgUpdatePauser, MsgUpdateMaxMessageBodySize, MsgSetMaxBurnAmountPerMessage, MsgUpdateSignatureThreshold } from "./tx";
export const AminoConverter = {
  "/circle.cctp.v1.MsgAcceptOwner": {
    aminoType: "/circle.cctp.v1.MsgAcceptOwner",
    toAmino: MsgAcceptOwner.toAmino,
    fromAmino: MsgAcceptOwner.fromAmino
  },
  "/circle.cctp.v1.MsgAddRemoteTokenMessenger": {
    aminoType: "/circle.cctp.v1.MsgAddRemoteTokenMessenger",
    toAmino: MsgAddRemoteTokenMessenger.toAmino,
    fromAmino: MsgAddRemoteTokenMessenger.fromAmino
  },
  "/circle.cctp.v1.MsgDepositForBurn": {
    aminoType: "/circle.cctp.v1.MsgDepositForBurn",
    toAmino: MsgDepositForBurn.toAmino,
    fromAmino: MsgDepositForBurn.fromAmino
  },
  "/circle.cctp.v1.MsgDepositForBurnWithCaller": {
    aminoType: "/circle.cctp.v1.MsgDepositForBurnWithCaller",
    toAmino: MsgDepositForBurnWithCaller.toAmino,
    fromAmino: MsgDepositForBurnWithCaller.fromAmino
  },
  "/circle.cctp.v1.MsgDisableAttester": {
    aminoType: "/circle.cctp.v1.MsgDisableAttester",
    toAmino: MsgDisableAttester.toAmino,
    fromAmino: MsgDisableAttester.fromAmino
  },
  "/circle.cctp.v1.MsgEnableAttester": {
    aminoType: "/circle.cctp.v1.MsgEnableAttester",
    toAmino: MsgEnableAttester.toAmino,
    fromAmino: MsgEnableAttester.fromAmino
  },
  "/circle.cctp.v1.MsgLinkTokenPair": {
    aminoType: "/circle.cctp.v1.MsgLinkTokenPair",
    toAmino: MsgLinkTokenPair.toAmino,
    fromAmino: MsgLinkTokenPair.fromAmino
  },
  "/circle.cctp.v1.MsgPauseBurningAndMinting": {
    aminoType: "/circle.cctp.v1.MsgPauseBurningAndMinting",
    toAmino: MsgPauseBurningAndMinting.toAmino,
    fromAmino: MsgPauseBurningAndMinting.fromAmino
  },
  "/circle.cctp.v1.MsgPauseSendingAndReceivingMessages": {
    aminoType: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessages",
    toAmino: MsgPauseSendingAndReceivingMessages.toAmino,
    fromAmino: MsgPauseSendingAndReceivingMessages.fromAmino
  },
  "/circle.cctp.v1.MsgReceiveMessage": {
    aminoType: "/circle.cctp.v1.MsgReceiveMessage",
    toAmino: MsgReceiveMessage.toAmino,
    fromAmino: MsgReceiveMessage.fromAmino
  },
  "/circle.cctp.v1.MsgRemoveRemoteTokenMessenger": {
    aminoType: "/circle.cctp.v1.MsgRemoveRemoteTokenMessenger",
    toAmino: MsgRemoveRemoteTokenMessenger.toAmino,
    fromAmino: MsgRemoveRemoteTokenMessenger.fromAmino
  },
  "/circle.cctp.v1.MsgReplaceDepositForBurn": {
    aminoType: "/circle.cctp.v1.MsgReplaceDepositForBurn",
    toAmino: MsgReplaceDepositForBurn.toAmino,
    fromAmino: MsgReplaceDepositForBurn.fromAmino
  },
  "/circle.cctp.v1.MsgReplaceMessage": {
    aminoType: "/circle.cctp.v1.MsgReplaceMessage",
    toAmino: MsgReplaceMessage.toAmino,
    fromAmino: MsgReplaceMessage.fromAmino
  },
  "/circle.cctp.v1.MsgSendMessage": {
    aminoType: "/circle.cctp.v1.MsgSendMessage",
    toAmino: MsgSendMessage.toAmino,
    fromAmino: MsgSendMessage.fromAmino
  },
  "/circle.cctp.v1.MsgSendMessageWithCaller": {
    aminoType: "/circle.cctp.v1.MsgSendMessageWithCaller",
    toAmino: MsgSendMessageWithCaller.toAmino,
    fromAmino: MsgSendMessageWithCaller.fromAmino
  },
  "/circle.cctp.v1.MsgUnlinkTokenPair": {
    aminoType: "/circle.cctp.v1.MsgUnlinkTokenPair",
    toAmino: MsgUnlinkTokenPair.toAmino,
    fromAmino: MsgUnlinkTokenPair.fromAmino
  },
  "/circle.cctp.v1.MsgUnpauseBurningAndMinting": {
    aminoType: "/circle.cctp.v1.MsgUnpauseBurningAndMinting",
    toAmino: MsgUnpauseBurningAndMinting.toAmino,
    fromAmino: MsgUnpauseBurningAndMinting.fromAmino
  },
  "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessages": {
    aminoType: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessages",
    toAmino: MsgUnpauseSendingAndReceivingMessages.toAmino,
    fromAmino: MsgUnpauseSendingAndReceivingMessages.fromAmino
  },
  "/circle.cctp.v1.MsgUpdateOwner": {
    aminoType: "/circle.cctp.v1.MsgUpdateOwner",
    toAmino: MsgUpdateOwner.toAmino,
    fromAmino: MsgUpdateOwner.fromAmino
  },
  "/circle.cctp.v1.MsgUpdateAttesterManager": {
    aminoType: "/circle.cctp.v1.MsgUpdateAttesterManager",
    toAmino: MsgUpdateAttesterManager.toAmino,
    fromAmino: MsgUpdateAttesterManager.fromAmino
  },
  "/circle.cctp.v1.MsgUpdateTokenController": {
    aminoType: "/circle.cctp.v1.MsgUpdateTokenController",
    toAmino: MsgUpdateTokenController.toAmino,
    fromAmino: MsgUpdateTokenController.fromAmino
  },
  "/circle.cctp.v1.MsgUpdatePauser": {
    aminoType: "/circle.cctp.v1.MsgUpdatePauser",
    toAmino: MsgUpdatePauser.toAmino,
    fromAmino: MsgUpdatePauser.fromAmino
  },
  "/circle.cctp.v1.MsgUpdateMaxMessageBodySize": {
    aminoType: "/circle.cctp.v1.MsgUpdateMaxMessageBodySize",
    toAmino: MsgUpdateMaxMessageBodySize.toAmino,
    fromAmino: MsgUpdateMaxMessageBodySize.fromAmino
  },
  "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessage": {
    aminoType: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessage",
    toAmino: MsgSetMaxBurnAmountPerMessage.toAmino,
    fromAmino: MsgSetMaxBurnAmountPerMessage.fromAmino
  },
  "/circle.cctp.v1.MsgUpdateSignatureThreshold": {
    aminoType: "/circle.cctp.v1.MsgUpdateSignatureThreshold",
    toAmino: MsgUpdateSignatureThreshold.toAmino,
    fromAmino: MsgUpdateSignatureThreshold.fromAmino
  }
};