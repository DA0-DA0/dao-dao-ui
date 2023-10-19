import { AxelarQueryAPI, ChainInfo } from "@axelar-network/axelarjs-sdk";

import { ENVIRONMENT } from "../constants";

import { AssetConfigExtended } from "../types";
import { convertDenomToMicroDenomWithDecimals } from "@dao-dao/utils";

export async function getGasFee(
  srcChain: ChainInfo,
  destChain: ChainInfo,
  asset: AssetConfigExtended | null
) {
  const axelarQueryApi = new AxelarQueryAPI({ environment: ENVIRONMENT });
  const id = asset?.wrapped_erc20 || asset?.id;

  const feeQuery = await axelarQueryApi
    .getTransferFee(srcChain?.id, destChain?.id, id as string, 0)
    .then((res) =>
    convertDenomToMicroDenomWithDecimals(Number(res.fee?.amount ?? 0), asset?.decimals ?? 0)
    )
    .catch(() => "0");

  if (feeQuery) {
    return Number(feeQuery);
  }

  if (!(srcChain && destChain)) {
    return 0;
  }

  const sourceChainName = srcChain.chainName?.toLowerCase();
  const destChainName = destChain.chainName?.toLowerCase();

  const [sourceFee, destFee] = [sourceChainName, destChainName].map(
    (chainName) => asset?.chain_aliases[chainName]?.minDepositAmt ?? 0
  );

  if (!(sourceFee && destFee)) {
    return 0;
  }

  return sourceFee + destFee;
}