import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Account from "./account";
import * as Coin from "./coin";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "aptos_account";


export function create_account_ (
  auth_key: HexString,
  $c: AptosDataCache,
): void {
  let signer;
  signer = Account.create_account_($.copy(auth_key), $c);
  Coin.register_(signer, $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])]);
  return;
}


export function buildPayload_create_account (
  auth_key: HexString,
  isJSON = false,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "aptos_account",
    "create_account",
    typeParamStrings,
    [
      auth_key,
    ],
    isJSON,
  );

}
export function transfer_ (
  source: HexString,
  to: HexString,
  amount: U64,
  $c: AptosDataCache,
): void {
  if (!Account.exists_at_($.copy(to), $c)) {
    create_account_($.copy(to), $c);
  }
  else{
  }
  return Coin.transfer_(source, $.copy(to), $.copy(amount), $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])]);
}


export function buildPayload_transfer (
  to: HexString,
  amount: U64,
  isJSON = false,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "aptos_account",
    "transfer",
    typeParamStrings,
    [
      to,
      amount,
    ],
    isJSON,
  );

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
  payload_create_account(
    auth_key: HexString,
    isJSON = false,
  ) {
    return buildPayload_create_account(auth_key, isJSON);
  }
  async create_account(
    _account: AptosAccount,
    auth_key: HexString,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_create_account(auth_key, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_transfer(
    to: HexString,
    amount: U64,
    isJSON = false,
  ) {
    return buildPayload_transfer(to, amount, isJSON);
  }
  async transfer(
    _account: AptosAccount,
    to: HexString,
    amount: U64,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_transfer(to, amount, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

