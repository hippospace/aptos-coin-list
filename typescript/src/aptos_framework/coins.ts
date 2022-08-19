import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Std from "../std";
import * as Account from "./account";
import * as Coin from "./coin";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "coins";


export function register_ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  register_internal_(account, $c, [$p[0]]);
  return;
}


export function buildPayload_register (
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x1"),
    "coins",
    "register",
    typeParamStrings,
    []
  );

}
export function register_internal_ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  Coin.register_(account, $c, [$p[0]]);
  Account.register_coin_(Std.Signer.address_of_(account, $c), $c, [$p[0]]);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
  }
  get moduleAddress() {{ return moduleAddress; }}
  get moduleName() {{ return moduleName; }}
  payload_register(
    $p: TypeTag[], /* <CoinType>*/
  ) {
    return buildPayload_register($p);
  }
  async register(
    _account: AptosAccount,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_register($p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

