import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { MsgSell, MsgSellResponse, MsgUpdateSellOrders, MsgUpdateSellOrdersResponse, MsgCancelSellOrder, MsgCancelSellOrderResponse, MsgBuyDirect, MsgBuyDirectResponse, MsgAddAllowedDenom, MsgAddAllowedDenomResponse, MsgRemoveAllowedDenom, MsgRemoveAllowedDenomResponse } from "./tx";
/** Msg is the regen.ecocredit.marketplace.v1 Msg service. */
export interface Msg {
  /** Sell creates new sell orders. */
  sell(request: MsgSell): Promise<MsgSellResponse>;
  /** UpdateSellOrders updates existing sell orders. */
  updateSellOrders(request: MsgUpdateSellOrders): Promise<MsgUpdateSellOrdersResponse>;
  /** CancelSellOrder cancels a sell order and returns the credits from escrow. */
  cancelSellOrder(request: MsgCancelSellOrder): Promise<MsgCancelSellOrderResponse>;
  /** BuyDirect purchases credits directly from the specified sell order. */
  buyDirect(request: MsgBuyDirect): Promise<MsgBuyDirectResponse>;
  /**
   * AddAllowedDenom is a governance method that allows the addition of
   * new allowed denom.
   * 
   * Since Revision 1
   */
  addAllowedDenom(request: MsgAddAllowedDenom): Promise<MsgAddAllowedDenomResponse>;
  /**
   * RemoveAllowedDenom is a governance method that removes allowed denom.
   * 
   * Since Revision 1
   */
  removeAllowedDenom(request: MsgRemoveAllowedDenom): Promise<MsgRemoveAllowedDenomResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.sell = this.sell.bind(this);
    this.updateSellOrders = this.updateSellOrders.bind(this);
    this.cancelSellOrder = this.cancelSellOrder.bind(this);
    this.buyDirect = this.buyDirect.bind(this);
    this.addAllowedDenom = this.addAllowedDenom.bind(this);
    this.removeAllowedDenom = this.removeAllowedDenom.bind(this);
  }
  sell(request: MsgSell, useInterfaces: boolean = true): Promise<MsgSellResponse> {
    const data = MsgSell.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Msg", "Sell", data);
    return promise.then(data => MsgSellResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateSellOrders(request: MsgUpdateSellOrders, useInterfaces: boolean = true): Promise<MsgUpdateSellOrdersResponse> {
    const data = MsgUpdateSellOrders.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Msg", "UpdateSellOrders", data);
    return promise.then(data => MsgUpdateSellOrdersResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cancelSellOrder(request: MsgCancelSellOrder, useInterfaces: boolean = true): Promise<MsgCancelSellOrderResponse> {
    const data = MsgCancelSellOrder.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Msg", "CancelSellOrder", data);
    return promise.then(data => MsgCancelSellOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  buyDirect(request: MsgBuyDirect, useInterfaces: boolean = true): Promise<MsgBuyDirectResponse> {
    const data = MsgBuyDirect.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Msg", "BuyDirect", data);
    return promise.then(data => MsgBuyDirectResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addAllowedDenom(request: MsgAddAllowedDenom, useInterfaces: boolean = true): Promise<MsgAddAllowedDenomResponse> {
    const data = MsgAddAllowedDenom.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Msg", "AddAllowedDenom", data);
    return promise.then(data => MsgAddAllowedDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeAllowedDenom(request: MsgRemoveAllowedDenom, useInterfaces: boolean = true): Promise<MsgRemoveAllowedDenomResponse> {
    const data = MsgRemoveAllowedDenom.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Msg", "RemoveAllowedDenom", data);
    return promise.then(data => MsgRemoveAllowedDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}