import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgSupply, MsgSupplyResponse, MsgWithdraw, MsgWithdrawResponse, MsgMaxWithdraw, MsgMaxWithdrawResponse, MsgCollateralize, MsgCollateralizeResponse, MsgDecollateralize, MsgDecollateralizeResponse, MsgBorrow, MsgBorrowResponse, MsgMaxBorrow, MsgMaxBorrowResponse, MsgRepay, MsgRepayResponse, MsgLiquidate, MsgLiquidateResponse, MsgLeveragedLiquidate, MsgLeveragedLiquidateResponse, MsgSupplyCollateral, MsgSupplyCollateralResponse, MsgGovUpdateRegistry, MsgGovUpdateRegistryResponse, MsgGovUpdateSpecialAssets, MsgGovUpdateSpecialAssetsResponse, MsgGovSetParams, MsgGovSetParamsResponse } from "./tx";
/** Msg defines the x/leverage module's Msg service. */
export interface Msg {
  /**
   * Supply moves tokens from user balance to the module for lending or collateral.
   * The user receives uTokens in return.
   */
  supply(request: MsgSupply): Promise<MsgSupplyResponse>;
  /**
   * Withdraw moves previously supplied tokens from the module back to the user balance in
   * exchange for burning uTokens.
   */
  withdraw(request: MsgWithdraw): Promise<MsgWithdrawResponse>;
  /**
   * MaxWithdraw moves previously supplied tokens from the module back to the user balance in
   * exchange for burning uTokens. It automatically calculates the maximum valid amount to withdraw.
   * Zero is returned if no more tokens can be withdrawn.
   */
  maxWithdraw(request: MsgMaxWithdraw): Promise<MsgMaxWithdrawResponse>;
  /** Collateralize enables selected uTokens as collateral, which moves them to the module. */
  collateralize(request: MsgCollateralize): Promise<MsgCollateralizeResponse>;
  /**
   * Decollateralize disables selected uTokens as collateral. They are returned to the user's
   * balance from the module.
   */
  decollateralize(request: MsgDecollateralize): Promise<MsgDecollateralizeResponse>;
  /** Borrow allows a user to borrow tokens from the module if they have sufficient collateral. */
  borrow(request: MsgBorrow): Promise<MsgBorrowResponse>;
  /**
   * MaxBorrow allows a user to borrow the maximum amount of tokens their collateral will allow.
   * Zero is returned if no more can be borrowed.
   */
  maxBorrow(request: MsgMaxBorrow): Promise<MsgMaxBorrowResponse>;
  /** Repay allows a user to repay previously borrowed tokens and interest. */
  repay(request: MsgRepay): Promise<MsgRepayResponse>;
  /**
   * Liquidate allows a user to repay a different user's borrowed coins in exchange for some
   * of the target's collateral.
   */
  liquidate(request: MsgLiquidate): Promise<MsgLiquidateResponse>;
  /**
   * LeveragedLiquidate allows a user to repay a different user's borrowed coins in exchange for some
   * of the target's collateral. For leveraged liquidations, the tokens to repay are borrowed instead of
   * being taken from the liquidator's wallet, and the reward is immediately collateralized. Borrow
   * limit checks for the liquidator are deferred until after the reward is collateralized, allowing
   * this initial borrow to exceed the liquidator's borrow limit as long as it is healthy by the end
   * of the transaction. Repay amount is calculated automatically, so the liquidator only specifies
   * repay and reward token denoms. For safety, the liquidator cannot exceed 80% of their borrow limit when
   * executing this transaction, instead of the regular 100%. Also allows repayment and reward denoms to
   * be left blank - if not specified, the module will automatically select the first (alphabetically by denom)
   * borrow and/or collateral on the target account and the proceed normally.
   * After v6.0, includes a MaxRepay field which limits repay value in USD. To prevent dust exploits, this
   * value cannot be below $1.00
   */
  leveragedLiquidate(request: MsgLeveragedLiquidate): Promise<MsgLeveragedLiquidateResponse>;
  /** SupplyCollateral combines the Supply and Collateralize actions. */
  supplyCollateral(request: MsgSupplyCollateral): Promise<MsgSupplyCollateralResponse>;
  /**
   * GovUpdateRegistry adds new tokens to the token registry or
   * updates existing tokens with new settings.
   */
  govUpdateRegistry(request: MsgGovUpdateRegistry): Promise<MsgGovUpdateRegistryResponse>;
  /**
   * GovUpdateSpecialAssets adds, updates, or removes special asset pairs. Note that a special asset
   * pair can be removed by setting its special collateral weight to negative one. Also allows for the creation
   * of sets of assets, where each asset in the set forms a special asset pair with all of the others.
   */
  govUpdateSpecialAssets(request: MsgGovUpdateSpecialAssets): Promise<MsgGovUpdateSpecialAssetsResponse>;
  /** GovSetParams is used by governance proposals to update parameters. */
  govSetParams(request: MsgGovSetParams): Promise<MsgGovSetParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.supply = this.supply.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.maxWithdraw = this.maxWithdraw.bind(this);
    this.collateralize = this.collateralize.bind(this);
    this.decollateralize = this.decollateralize.bind(this);
    this.borrow = this.borrow.bind(this);
    this.maxBorrow = this.maxBorrow.bind(this);
    this.repay = this.repay.bind(this);
    this.liquidate = this.liquidate.bind(this);
    this.leveragedLiquidate = this.leveragedLiquidate.bind(this);
    this.supplyCollateral = this.supplyCollateral.bind(this);
    this.govUpdateRegistry = this.govUpdateRegistry.bind(this);
    this.govUpdateSpecialAssets = this.govUpdateSpecialAssets.bind(this);
    this.govSetParams = this.govSetParams.bind(this);
  }
  supply(request: MsgSupply, useInterfaces: boolean = true): Promise<MsgSupplyResponse> {
    const data = MsgSupply.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "Supply", data);
    return promise.then(data => MsgSupplyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  withdraw(request: MsgWithdraw, useInterfaces: boolean = true): Promise<MsgWithdrawResponse> {
    const data = MsgWithdraw.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "Withdraw", data);
    return promise.then(data => MsgWithdrawResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  maxWithdraw(request: MsgMaxWithdraw, useInterfaces: boolean = true): Promise<MsgMaxWithdrawResponse> {
    const data = MsgMaxWithdraw.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "MaxWithdraw", data);
    return promise.then(data => MsgMaxWithdrawResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  collateralize(request: MsgCollateralize, useInterfaces: boolean = true): Promise<MsgCollateralizeResponse> {
    const data = MsgCollateralize.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "Collateralize", data);
    return promise.then(data => MsgCollateralizeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  decollateralize(request: MsgDecollateralize, useInterfaces: boolean = true): Promise<MsgDecollateralizeResponse> {
    const data = MsgDecollateralize.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "Decollateralize", data);
    return promise.then(data => MsgDecollateralizeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  borrow(request: MsgBorrow, useInterfaces: boolean = true): Promise<MsgBorrowResponse> {
    const data = MsgBorrow.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "Borrow", data);
    return promise.then(data => MsgBorrowResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  maxBorrow(request: MsgMaxBorrow, useInterfaces: boolean = true): Promise<MsgMaxBorrowResponse> {
    const data = MsgMaxBorrow.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "MaxBorrow", data);
    return promise.then(data => MsgMaxBorrowResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  repay(request: MsgRepay, useInterfaces: boolean = true): Promise<MsgRepayResponse> {
    const data = MsgRepay.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "Repay", data);
    return promise.then(data => MsgRepayResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidate(request: MsgLiquidate, useInterfaces: boolean = true): Promise<MsgLiquidateResponse> {
    const data = MsgLiquidate.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "Liquidate", data);
    return promise.then(data => MsgLiquidateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  leveragedLiquidate(request: MsgLeveragedLiquidate, useInterfaces: boolean = true): Promise<MsgLeveragedLiquidateResponse> {
    const data = MsgLeveragedLiquidate.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "LeveragedLiquidate", data);
    return promise.then(data => MsgLeveragedLiquidateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  supplyCollateral(request: MsgSupplyCollateral, useInterfaces: boolean = true): Promise<MsgSupplyCollateralResponse> {
    const data = MsgSupplyCollateral.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "SupplyCollateral", data);
    return promise.then(data => MsgSupplyCollateralResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  govUpdateRegistry(request: MsgGovUpdateRegistry, useInterfaces: boolean = true): Promise<MsgGovUpdateRegistryResponse> {
    const data = MsgGovUpdateRegistry.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "GovUpdateRegistry", data);
    return promise.then(data => MsgGovUpdateRegistryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  govUpdateSpecialAssets(request: MsgGovUpdateSpecialAssets, useInterfaces: boolean = true): Promise<MsgGovUpdateSpecialAssetsResponse> {
    const data = MsgGovUpdateSpecialAssets.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "GovUpdateSpecialAssets", data);
    return promise.then(data => MsgGovUpdateSpecialAssetsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  govSetParams(request: MsgGovSetParams, useInterfaces: boolean = true): Promise<MsgGovSetParamsResponse> {
    const data = MsgGovSetParams.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Msg", "GovSetParams", data);
    return promise.then(data => MsgGovSetParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}