//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgIssue, MsgMint, MsgBurn, MsgDisableMint, MsgSetMinter, MsgSetAuthority, MsgSetUri } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/bitsong.fantoken.MsgIssue", MsgIssue], ["/bitsong.fantoken.MsgMint", MsgMint], ["/bitsong.fantoken.MsgBurn", MsgBurn], ["/bitsong.fantoken.MsgDisableMint", MsgDisableMint], ["/bitsong.fantoken.MsgSetMinter", MsgSetMinter], ["/bitsong.fantoken.MsgSetAuthority", MsgSetAuthority], ["/bitsong.fantoken.MsgSetUri", MsgSetUri]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    issue(value: MsgIssue) {
      return {
        typeUrl: "/bitsong.fantoken.MsgIssue",
        value: MsgIssue.encode(value).finish()
      };
    },
    mint(value: MsgMint) {
      return {
        typeUrl: "/bitsong.fantoken.MsgMint",
        value: MsgMint.encode(value).finish()
      };
    },
    burn(value: MsgBurn) {
      return {
        typeUrl: "/bitsong.fantoken.MsgBurn",
        value: MsgBurn.encode(value).finish()
      };
    },
    disableMint(value: MsgDisableMint) {
      return {
        typeUrl: "/bitsong.fantoken.MsgDisableMint",
        value: MsgDisableMint.encode(value).finish()
      };
    },
    setMinter(value: MsgSetMinter) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetMinter",
        value: MsgSetMinter.encode(value).finish()
      };
    },
    setAuthority(value: MsgSetAuthority) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetAuthority",
        value: MsgSetAuthority.encode(value).finish()
      };
    },
    setUri(value: MsgSetUri) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetUri",
        value: MsgSetUri.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    issue(value: MsgIssue) {
      return {
        typeUrl: "/bitsong.fantoken.MsgIssue",
        value
      };
    },
    mint(value: MsgMint) {
      return {
        typeUrl: "/bitsong.fantoken.MsgMint",
        value
      };
    },
    burn(value: MsgBurn) {
      return {
        typeUrl: "/bitsong.fantoken.MsgBurn",
        value
      };
    },
    disableMint(value: MsgDisableMint) {
      return {
        typeUrl: "/bitsong.fantoken.MsgDisableMint",
        value
      };
    },
    setMinter(value: MsgSetMinter) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetMinter",
        value
      };
    },
    setAuthority(value: MsgSetAuthority) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetAuthority",
        value
      };
    },
    setUri(value: MsgSetUri) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetUri",
        value
      };
    }
  },
  fromPartial: {
    issue(value: MsgIssue) {
      return {
        typeUrl: "/bitsong.fantoken.MsgIssue",
        value: MsgIssue.fromPartial(value)
      };
    },
    mint(value: MsgMint) {
      return {
        typeUrl: "/bitsong.fantoken.MsgMint",
        value: MsgMint.fromPartial(value)
      };
    },
    burn(value: MsgBurn) {
      return {
        typeUrl: "/bitsong.fantoken.MsgBurn",
        value: MsgBurn.fromPartial(value)
      };
    },
    disableMint(value: MsgDisableMint) {
      return {
        typeUrl: "/bitsong.fantoken.MsgDisableMint",
        value: MsgDisableMint.fromPartial(value)
      };
    },
    setMinter(value: MsgSetMinter) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetMinter",
        value: MsgSetMinter.fromPartial(value)
      };
    },
    setAuthority(value: MsgSetAuthority) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetAuthority",
        value: MsgSetAuthority.fromPartial(value)
      };
    },
    setUri(value: MsgSetUri) {
      return {
        typeUrl: "/bitsong.fantoken.MsgSetUri",
        value: MsgSetUri.fromPartial(value)
      };
    }
  }
};