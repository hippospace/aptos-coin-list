import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {OptionTransaction} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Bcs from "./bcs";
export const packageName = "AptosStdlib";
export const moduleAddress = new HexString("0x1");
export const moduleName = "aptos_hash";


export function keccak256_ (
  bytes: U8[],
  $c: AptosDataCache,
): U8[] {
  return $.aptos_std_aptos_hash_keccak256(bytes, $c);

}
export function sip_hash_ (
  bytes: U8[],
  $c: AptosDataCache,
): U64 {
  return $.aptos_std_aptos_hash_sip_hash(bytes, $c);

}
export function sip_hash_from_value_ (
  v: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <MoveValue>*/
): U64 {
  let bytes;
  bytes = Bcs.to_bytes_(v, $c, [$p[0]]);
  return sip_hash_($.copy(bytes), $c);
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
}

