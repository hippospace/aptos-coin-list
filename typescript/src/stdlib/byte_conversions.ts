import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Bcs from "./bcs";
import * as Util from "./util";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "byte_conversions";


export function from_address_ (
  addr: HexString,
  $c: AptosDataCache,
): U8[] {
  return Bcs.to_bytes_(addr, $c, [AtomicTypeTag.Address]);
}

export function to_address_ (
  bytes: U8[],
  $c: AptosDataCache,
): HexString {
  return Util.from_bytes_($.copy(bytes), $c, [AtomicTypeTag.Address]);
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

