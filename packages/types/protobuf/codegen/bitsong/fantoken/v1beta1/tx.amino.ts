import { MsgIssue, MsgMint, MsgBurn, MsgDisableMint, MsgSetMinter, MsgSetAuthority, MsgSetUri } from "./tx";
export const AminoConverter = {
  "/bitsong.fantoken.MsgIssue": {
    aminoType: "/bitsong.fantoken.MsgIssue",
    toAmino: MsgIssue.toAmino,
    fromAmino: MsgIssue.fromAmino
  },
  "/bitsong.fantoken.MsgMint": {
    aminoType: "/bitsong.fantoken.MsgMint",
    toAmino: MsgMint.toAmino,
    fromAmino: MsgMint.fromAmino
  },
  "/bitsong.fantoken.MsgBurn": {
    aminoType: "/bitsong.fantoken.MsgBurn",
    toAmino: MsgBurn.toAmino,
    fromAmino: MsgBurn.fromAmino
  },
  "/bitsong.fantoken.MsgDisableMint": {
    aminoType: "/bitsong.fantoken.MsgDisableMint",
    toAmino: MsgDisableMint.toAmino,
    fromAmino: MsgDisableMint.fromAmino
  },
  "/bitsong.fantoken.MsgSetMinter": {
    aminoType: "/bitsong.fantoken.MsgSetMinter",
    toAmino: MsgSetMinter.toAmino,
    fromAmino: MsgSetMinter.fromAmino
  },
  "/bitsong.fantoken.MsgSetAuthority": {
    aminoType: "/bitsong.fantoken.MsgSetAuthority",
    toAmino: MsgSetAuthority.toAmino,
    fromAmino: MsgSetAuthority.fromAmino
  },
  "/bitsong.fantoken.MsgSetUri": {
    aminoType: "/bitsong.fantoken.MsgSetUri",
    toAmino: MsgSetUri.toAmino,
    fromAmino: MsgSetUri.fromAmino
  }
};