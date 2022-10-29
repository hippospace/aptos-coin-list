import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {OptionTransaction} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "util";


export function address_from_bytes_ (
  bytes: U8[],
  $c: AptosDataCache,
): HexString {
  return from_bytes_($.copy(bytes), $c, [AtomicTypeTag.Address]);
}

export function from_bytes_ (
  bytes: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): any {
  return $.aptos_framework_util_from_bytes(bytes, $c, [$p[0]]);

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

