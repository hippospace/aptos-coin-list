import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Std from "../std";
import * as System_addresses from "./system_addresses";
import * as Timestamp from "./timestamp";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "chain_id";

export const ECHAIN_ID : U64 = u64("0");


export class ChainId 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "ChainId";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "id", typeTag: AtomicTypeTag.U8 }];

  id: U8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.id = proto['id'] as U8;
  }

  static ChainIdParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ChainId {
    const proto = $.parseStructProto(data, typeTag, repo, ChainId);
    return new ChainId(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ChainId, typeParams);
    return result as unknown as ChainId;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, ChainId, typeParams);
    await result.loadFullState(app)
    return result as unknown as ChainId;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "ChainId", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function get_ (
  $c: AptosDataCache,
): U8 {
  Timestamp.assert_operating_($c);
  return $.copy($c.borrow_global<ChainId>(new SimpleStructTag(ChainId), new HexString("0x1")).id);
}

export function initialize_ (
  account: HexString,
  id: U8,
  $c: AptosDataCache,
): void {
  Timestamp.assert_genesis_($c);
  System_addresses.assert_aptos_framework_(account, $c);
  if (!!$c.exists(new SimpleStructTag(ChainId), Std.Signer.address_of_(account, $c))) {
    throw $.abortCode(Std.Error.already_exists_($.copy(ECHAIN_ID), $c));
  }
  return $c.move_to(new SimpleStructTag(ChainId), account, new ChainId({ id: $.copy(id) }, new SimpleStructTag(ChainId)));
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::chain_id::ChainId", ChainId.ChainIdParser);
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
  get ChainId() { return ChainId; }
  async loadChainId(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await ChainId.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
}

