import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Stdlib from "../stdlib";
import * as Devnet_coins from "./devnet_coins";
import * as Iterable_table from "./iterable_table";
export const packageName = "CoinList";
export const moduleAddress = new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68");
export const moduleName = "coin_list";

export const E_APPROVER_ONLY : U64 = u64("5");
export const E_COIN_NOT_IN_REGISTRY : U64 = u64("3");
export const E_COIN_OWNER_ONLY : U64 = u64("1");
export const E_CONTRACT_OWNER_ONLY : U64 = u64("0");
export const E_LIST_DOES_NOT_EXIST : U64 = u64("4");
export const E_TYPE_ALREADY_EXISTS : U64 = u64("2");
export const E_UID_ALREADY_EXISTS : U64 = u64("6");


export class CoinInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "CoinInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "symbol", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "official_symbol", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "coingecko_id", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "decimals", typeTag: AtomicTypeTag.U8 },
  { name: "logo_url", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "project_url", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "token_type", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) },
  { name: "extensions", typeTag: new StructTag(new HexString("0x1"), "simple_map", "SimpleMap", [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x1"), "string", "String", [])]) }];

  name: Stdlib.String.String;
  symbol: Stdlib.String.String;
  official_symbol: Stdlib.String.String;
  coingecko_id: Stdlib.String.String;
  decimals: U8;
  logo_url: Stdlib.String.String;
  project_url: Stdlib.String.String;
  token_type: Stdlib.Type_info.TypeInfo;
  extensions: Stdlib.Simple_map.SimpleMap;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as Stdlib.String.String;
    this.symbol = proto['symbol'] as Stdlib.String.String;
    this.official_symbol = proto['official_symbol'] as Stdlib.String.String;
    this.coingecko_id = proto['coingecko_id'] as Stdlib.String.String;
    this.decimals = proto['decimals'] as U8;
    this.logo_url = proto['logo_url'] as Stdlib.String.String;
    this.project_url = proto['project_url'] as Stdlib.String.String;
    this.token_type = proto['token_type'] as Stdlib.Type_info.TypeInfo;
    this.extensions = proto['extensions'] as Stdlib.Simple_map.SimpleMap;
  }

  static CoinInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinInfo {
    const proto = $.parseStructProto(data, typeTag, repo, CoinInfo);
    return new CoinInfo(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "CoinInfo", []);
  }
  async loadFullState(app: $.AppType) {
    await this.name.loadFullState(app);
    await this.symbol.loadFullState(app);
    await this.official_symbol.loadFullState(app);
    await this.coingecko_id.loadFullState(app);
    await this.logo_url.loadFullState(app);
    await this.project_url.loadFullState(app);
    await this.token_type.loadFullState(app);
    await this.extensions.loadFullState(app);
    this.__app = app;
  }

}

export class CoinList 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "CoinList";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "coin_types", typeTag: new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "iterable_table", "IterableTable", [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "coin_list", "Nothing", [])]) },
  { name: "approvers", typeTag: new VectorTag(AtomicTypeTag.Address) }];

  coin_types: Iterable_table.IterableTable;
  approvers: HexString[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin_types = proto['coin_types'] as Iterable_table.IterableTable;
    this.approvers = proto['approvers'] as HexString[];
  }

  static CoinListParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinList {
    const proto = $.parseStructProto(data, typeTag, repo, CoinList);
    return new CoinList(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinList, typeParams);
    return result as unknown as CoinList;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, CoinList, typeParams);
    await result.loadFullState(app)
    return result as unknown as CoinList;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "CoinList", []);
  }
  async loadFullState(app: $.AppType) {
    await this.coin_types.loadFullState(app);
    this.__app = app;
  }

}

export class CoinRegistry 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "CoinRegistry";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "type_to_coin_info", typeTag: new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "iterable_table", "IterableTable", [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "coin_list", "CoinInfo", [])]) },
  { name: "uids", typeTag: new StructTag(new HexString("0x1"), "table", "Table", [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "coin_list", "Nothing", [])]) },
  { name: "approvers", typeTag: new VectorTag(AtomicTypeTag.Address) }];

  type_to_coin_info: Iterable_table.IterableTable;
  uids: Stdlib.Table.Table;
  approvers: HexString[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.type_to_coin_info = proto['type_to_coin_info'] as Iterable_table.IterableTable;
    this.uids = proto['uids'] as Stdlib.Table.Table;
    this.approvers = proto['approvers'] as HexString[];
  }

  static CoinRegistryParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinRegistry {
    const proto = $.parseStructProto(data, typeTag, repo, CoinRegistry);
    return new CoinRegistry(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinRegistry, typeParams);
    return result as unknown as CoinRegistry;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, CoinRegistry, typeParams);
    await result.loadFullState(app)
    return result as unknown as CoinRegistry;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "CoinRegistry", []);
  }
  async loadFullState(app: $.AppType) {
    await this.type_to_coin_info.loadFullState(app);
    await this.uids.loadFullState(app);
    this.__app = app;
  }

}

export class FullList 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "FullList";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "coin_info_list", typeTag: new VectorTag(new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "coin_list", "CoinInfo", [])) }];

  coin_info_list: CoinInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin_info_list = proto['coin_info_list'] as CoinInfo[];
  }

  static FullListParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FullList {
    const proto = $.parseStructProto(data, typeTag, repo, FullList);
    return new FullList(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, FullList, typeParams);
    return result as unknown as FullList;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, FullList, typeParams);
    await result.loadFullState(app)
    return result as unknown as FullList;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "FullList", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class Nothing 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "Nothing";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static NothingParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Nothing {
    const proto = $.parseStructProto(data, typeTag, repo, Nothing);
    return new Nothing(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "Nothing", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function add_approver_to_list_ (
  list_owner: HexString,
  approver: HexString,
  $c: AptosDataCache,
): void {
  let list;
  list = $c.borrow_global_mut<CoinList>(new SimpleStructTag(CoinList), Stdlib.Signer.address_of_(list_owner, $c));
  if (!!Stdlib.Vector.contains_(list.approvers, approver, $c, [AtomicTypeTag.Address])) {
    throw $.abortCode(u64("0"));
  }
  Stdlib.Vector.push_back_(list.approvers, $.copy(approver), $c, [AtomicTypeTag.Address]);
  return;
}


export function buildPayload_add_approver_to_list (
  approver: HexString,
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "add_approver_to_list",
    typeParamStrings,
    [
      approver,
    ],
    isJSON,
  );

}

export function add_approver_to_registry_ (
  admin: HexString,
  approver: HexString,
  $c: AptosDataCache,
): void {
  let registry;
  if (!((Stdlib.Signer.address_of_(admin, $c)).hex() === (new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68")).hex())) {
    throw $.abortCode($.copy(E_CONTRACT_OWNER_ONLY));
  }
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  if (!!Stdlib.Vector.contains_(registry.approvers, approver, $c, [AtomicTypeTag.Address])) {
    throw $.abortCode(u64("0"));
  }
  Stdlib.Vector.push_back_(registry.approvers, $.copy(approver), $c, [AtomicTypeTag.Address]);
  return;
}


export function buildPayload_add_approver_to_registry (
  approver: HexString,
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "add_approver_to_registry",
    typeParamStrings,
    [
      approver,
    ],
    isJSON,
  );

}

export function add_extension_ (
  coin_owner: HexString,
  key: Stdlib.String.String,
  value: Stdlib.String.String,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_info, registry, type_info;
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  if (!((Stdlib.Signer.address_of_(coin_owner, $c)).hex() === (Stdlib.Type_info.account_address_(type_info, $c)).hex())) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  coin_info = Iterable_table.borrow_mut_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  Stdlib.Simple_map.add_(coin_info.extensions, $.copy(key), $.copy(value), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x1"), "string", "String", [])]);
  return;
}


export function buildPayload_add_extension (
  key: Stdlib.String.String,
  value: Stdlib.String.String,
  $p: TypeTag[], /* <CoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "add_extension",
    typeParamStrings,
    [
      key,
      value,
    ],
    isJSON,
  );

}

export function add_to_list_ (
  approver: HexString,
  list: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let temp$1, temp$3, temp$4, coin_type, list__2;
  if (!is_coin_registered_($c, [$p[0]])) {
    throw $.abortCode($.copy(E_COIN_NOT_IN_REGISTRY));
  }
  if (!$c.exists(new SimpleStructTag(CoinList), $.copy(list))) {
    temp$1 = (($.copy(list)).hex() === (Stdlib.Signer.address_of_(approver, $c)).hex());
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    create_list_(approver, $c);
  }
  else{
  }
  list__2 = $c.borrow_global_mut<CoinList>(new SimpleStructTag(CoinList), $.copy(list));
  temp$4 = list__2.approvers;
  temp$3 = Stdlib.Signer.address_of_(approver, $c);
  if (!Stdlib.Vector.contains_(temp$4, temp$3, $c, [AtomicTypeTag.Address])) {
    throw $.abortCode($.copy(E_APPROVER_ONLY));
  }
  coin_type = Stdlib.Type_info.type_of_($c, [$p[0]]);
  Iterable_table.add_(list__2.coin_types, $.copy(coin_type), new Nothing({  }, new SimpleStructTag(Nothing)), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
  return;
}


export function buildPayload_add_to_list (
  list: HexString,
  $p: TypeTag[], /* <CoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "add_to_list",
    typeParamStrings,
    [
      list,
    ],
    isJSON,
  );

}

export function add_to_registry_ (
  registry: CoinRegistry,
  name: Stdlib.String.String,
  symbol: Stdlib.String.String,
  coingecko_id: Stdlib.String.String,
  logo_url: Stdlib.String.String,
  project_url: Stdlib.String.String,
  is_update: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_info, type_info;
  type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  coin_info = new CoinInfo({ name: $.copy(name), symbol: $.copy(symbol), official_symbol: Stdlib.Coin.symbol_($c, [$p[0]]), coingecko_id: $.copy(coingecko_id), decimals: Stdlib.Coin.decimals_($c, [$p[0]]), logo_url: $.copy(logo_url), project_url: $.copy(project_url), token_type: $.copy(type_info), extensions: Stdlib.Simple_map.create_($c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x1"), "string", "String", [])]) }, new SimpleStructTag(CoinInfo));
  if (!is_update) {
    if (!!Iterable_table.contains_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)])) {
      throw $.abortCode($.copy(E_TYPE_ALREADY_EXISTS));
    }
    if (!!Stdlib.Table.contains_(registry.uids, $.copy(symbol), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new SimpleStructTag(Nothing)])) {
      throw $.abortCode($.copy(E_UID_ALREADY_EXISTS));
    }
  }
  else{
    Iterable_table.remove_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  }
  Iterable_table.add_(registry.type_to_coin_info, $.copy(type_info), $.copy(coin_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  return;
}

export function add_to_registry_by_approver_ (
  approver: HexString,
  name: Stdlib.String.String,
  symbol: Stdlib.String.String,
  coingecko_id: Stdlib.String.String,
  logo_url: Stdlib.String.String,
  project_url: Stdlib.String.String,
  is_update: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let temp$1, temp$2, registry;
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  temp$2 = registry.approvers;
  temp$1 = Stdlib.Signer.address_of_(approver, $c);
  if (!Stdlib.Vector.contains_(temp$2, temp$1, $c, [AtomicTypeTag.Address])) {
    throw $.abortCode($.copy(E_APPROVER_ONLY));
  }
  add_to_registry_(registry, $.copy(name), $.copy(symbol), $.copy(coingecko_id), $.copy(logo_url), $.copy(project_url), is_update, $c, [$p[0]]);
  return;
}


export function buildPayload_add_to_registry_by_approver (
  name: Stdlib.String.String,
  symbol: Stdlib.String.String,
  coingecko_id: Stdlib.String.String,
  logo_url: Stdlib.String.String,
  project_url: Stdlib.String.String,
  is_update: boolean,
  $p: TypeTag[], /* <CoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "add_to_registry_by_approver",
    typeParamStrings,
    [
      name,
      symbol,
      coingecko_id,
      logo_url,
      project_url,
      is_update,
    ],
    isJSON,
  );

}

export function add_to_registry_by_proof_ (
  _ownership_proof: any,
  name: Stdlib.String.String,
  symbol: Stdlib.String.String,
  coingecko_id: Stdlib.String.String,
  logo_url: Stdlib.String.String,
  project_url: Stdlib.String.String,
  is_update: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType, OwnershipProof>*/
): void {
  let coin_type, ownership_address, ownership_name, ownership_type, registry, type_address;
  coin_type = Stdlib.Type_info.type_of_($c, [$p[0]]);
  ownership_type = Stdlib.Type_info.type_of_($c, [$p[1]]);
  type_address = Stdlib.Type_info.account_address_(coin_type, $c);
  ownership_address = Stdlib.Type_info.account_address_(ownership_type, $c);
  ownership_name = Stdlib.Type_info.module_name_(ownership_type, $c);
  if (!$.veq($.copy(ownership_name), [u8("79"), u8("119"), u8("110"), u8("101"), u8("114"), u8("115"), u8("104"), u8("105"), u8("112"), u8("80"), u8("114"), u8("111"), u8("111"), u8("102")])) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  if (!(($.copy(type_address)).hex() === ($.copy(ownership_address)).hex())) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  add_to_registry_(registry, $.copy(name), $.copy(symbol), $.copy(coingecko_id), $.copy(logo_url), $.copy(project_url), is_update, $c, [$p[0]]);
  return;
}

export function add_to_registry_by_signer_ (
  coin_owner: HexString,
  name: Stdlib.String.String,
  symbol: Stdlib.String.String,
  coingecko_id: Stdlib.String.String,
  logo_url: Stdlib.String.String,
  project_url: Stdlib.String.String,
  is_update: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let registry, type_info;
  type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  if (!((Stdlib.Signer.address_of_(coin_owner, $c)).hex() === (Stdlib.Type_info.account_address_(type_info, $c)).hex())) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  add_to_registry_(registry, $.copy(name), $.copy(symbol), $.copy(coingecko_id), $.copy(logo_url), $.copy(project_url), is_update, $c, [$p[0]]);
  return;
}


export function buildPayload_add_to_registry_by_signer (
  name: Stdlib.String.String,
  symbol: Stdlib.String.String,
  coingecko_id: Stdlib.String.String,
  logo_url: Stdlib.String.String,
  project_url: Stdlib.String.String,
  is_update: boolean,
  $p: TypeTag[], /* <CoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "add_to_registry_by_signer",
    typeParamStrings,
    [
      name,
      symbol,
      coingecko_id,
      logo_url,
      project_url,
      is_update,
    ],
    isJSON,
  );

}

export function create_list_ (
  list_owner: HexString,
  $c: AptosDataCache,
): void {
  let approvers;
  approvers = Stdlib.Vector.empty_($c, [AtomicTypeTag.Address]);
  Stdlib.Vector.push_back_(approvers, Stdlib.Signer.address_of_(list_owner, $c), $c, [AtomicTypeTag.Address]);
  return $c.move_to(new SimpleStructTag(CoinList), list_owner, new CoinList({ coin_types: Iterable_table.new___($c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]), approvers: $.copy(approvers) }, new SimpleStructTag(CoinList)));
}


export function buildPayload_create_list (
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "create_list",
    typeParamStrings,
    [],
    isJSON,
  );

}

export function drop_extension_ (
  coin_owner: HexString,
  key: Stdlib.String.String,
  value: Stdlib.String.String,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_info, registry, type_info;
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  if (!((Stdlib.Signer.address_of_(coin_owner, $c)).hex() === (Stdlib.Type_info.account_address_(type_info, $c)).hex())) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  coin_info = Iterable_table.borrow_mut_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  Stdlib.Simple_map.add_(coin_info.extensions, $.copy(key), $.copy(value), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x1"), "string", "String", [])]);
  return;
}


export function buildPayload_drop_extension (
  key: Stdlib.String.String,
  value: Stdlib.String.String,
  $p: TypeTag[], /* <CoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "drop_extension",
    typeParamStrings,
    [
      key,
      value,
    ],
    isJSON,
  );

}

export function fetch_all_registered_coin_info_ (
  fetcher: HexString,
  $c: AptosDataCache,
): void {
  return $c.move_to(new SimpleStructTag(FullList), fetcher, get_all_registered_coin_info_($c));
}


export function buildPayload_fetch_all_registered_coin_info (
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "fetch_all_registered_coin_info",
    typeParamStrings,
    [],
    isJSON,
  );

}

export async function query_fetch_all_registered_coin_info(
  client: AptosClient,
  fetcher: $.SimulationKeys,
  repo: AptosParserRepo,
  $p: TypeTag[],
) {
  const payload = buildPayload_fetch_all_registered_coin_info();
  const outputTypeTag = new SimpleStructTag(FullList);
  const output = await $.simulatePayloadTx(client, fetcher, payload);
  return $.takeSimulationValue<FullList>(output, outputTypeTag, repo)
}
function make_query_fetch_all_registered_coin_info(app: App) {
  function maker(
    fetcher: $.SimulationKeys,
    $p: TypeTag[],
  ) {
    return query_fetch_all_registered_coin_info(app.client, fetcher, app.repo, $p)
  }
  return maker;
}
export function fetch_full_list_ (
  fetcher: HexString,
  list_owner_addr: HexString,
  $c: AptosDataCache,
): void {
  return $c.move_to(new SimpleStructTag(FullList), fetcher, get_full_list_($.copy(list_owner_addr), $c));
}


export function buildPayload_fetch_full_list (
  list_owner_addr: HexString,
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "fetch_full_list",
    typeParamStrings,
    [
      list_owner_addr,
    ],
    isJSON,
  );

}

export async function query_fetch_full_list(
  client: AptosClient,
  fetcher: $.SimulationKeys,
  repo: AptosParserRepo,
    list_owner_addr: HexString,
  $p: TypeTag[],
) {
  const payload = buildPayload_fetch_full_list(list_owner_addr);
  const outputTypeTag = new SimpleStructTag(FullList);
  const output = await $.simulatePayloadTx(client, fetcher, payload);
  return $.takeSimulationValue<FullList>(output, outputTypeTag, repo)
}
function make_query_fetch_full_list(app: App) {
  function maker(
    fetcher: $.SimulationKeys,
      list_owner_addr: HexString,
    $p: TypeTag[],
  ) {
    return query_fetch_full_list(app.client, fetcher, app.repo, list_owner_addr, $p)
  }
  return maker;
}
export function get_all_registered_coin_info_ (
  $c: AptosDataCache,
): FullList {
  let coin_info, fulllist, prev, registry, tail, tail_key;
  registry = $c.borrow_global<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  tail = Iterable_table.tail_key_(registry.type_to_coin_info, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  fulllist = new FullList({ coin_info_list: Stdlib.Vector.empty_($c, [new SimpleStructTag(CoinInfo)]) }, new SimpleStructTag(FullList));
  while (Stdlib.Option.is_some_(tail, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", [])])) {
    {
      tail_key = $.copy(Stdlib.Option.borrow_(tail, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", [])]));
      coin_info = Iterable_table.borrow_(registry.type_to_coin_info, $.copy(tail_key), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
      Stdlib.Vector.push_back_(fulllist.coin_info_list, $.copy(coin_info), $c, [new SimpleStructTag(CoinInfo)]);
      [, prev, ] = Iterable_table.borrow_iter_(registry.type_to_coin_info, $.copy(tail_key), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
      tail = $.copy(prev);
    }

  }return $.copy(fulllist);
}

export function get_coin_info_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): CoinInfo {
  let registry, type_info;
  registry = $c.borrow_global<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  return $.copy(Iterable_table.borrow_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]));
}

export function get_full_list_ (
  list_owner_addr: HexString,
  $c: AptosDataCache,
): FullList {
  let coin_info, fulllist, list, prev, registry, tail, tail_key;
  list = $c.borrow_global<CoinList>(new SimpleStructTag(CoinList), $.copy(list_owner_addr));
  registry = $c.borrow_global<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  tail = Iterable_table.tail_key_(list.coin_types, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
  fulllist = new FullList({ coin_info_list: Stdlib.Vector.empty_($c, [new SimpleStructTag(CoinInfo)]) }, new SimpleStructTag(FullList));
  while (Stdlib.Option.is_some_(tail, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", [])])) {
    {
      tail_key = $.copy(Stdlib.Option.borrow_(tail, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", [])]));
      coin_info = Iterable_table.borrow_(registry.type_to_coin_info, $.copy(tail_key), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
      Stdlib.Vector.push_back_(fulllist.coin_info_list, $.copy(coin_info), $c, [new SimpleStructTag(CoinInfo)]);
      [, prev, ] = Iterable_table.borrow_iter_(list.coin_types, $.copy(tail_key), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
      tail = $.copy(prev);
    }

  }return $.copy(fulllist);
}

export function init_module_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize_(admin, $c);
  return;
}


export function buildPayload_init_module (
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "init_module",
    typeParamStrings,
    [],
    isJSON,
  );

}
export function initialize_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let approvers;
  if (!((Stdlib.Signer.address_of_(admin, $c)).hex() === (new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68")).hex())) {
    throw $.abortCode($.copy(E_CONTRACT_OWNER_ONLY));
  }
  approvers = Stdlib.Vector.empty_($c, [AtomicTypeTag.Address]);
  Stdlib.Vector.push_back_(approvers, Stdlib.Signer.address_of_(admin, $c), $c, [AtomicTypeTag.Address]);
  $c.move_to(new SimpleStructTag(CoinRegistry), admin, new CoinRegistry({ type_to_coin_info: Iterable_table.new___($c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]), uids: Stdlib.Table.new___($c, [new StructTag(new HexString("0x1"), "string", "String", []), new SimpleStructTag(Nothing)]), approvers: $.copy(approvers) }, new SimpleStructTag(CoinRegistry)));
  create_list_(admin, $c);
  Devnet_coins.deploy_(admin, $c);
  return;
}


export function buildPayload_initialize (
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "initialize",
    typeParamStrings,
    [],
    isJSON,
  );

}

export function is_coin_in_list_ (
  list_owner_addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): boolean {
  let coin_type, list;
  if (!$c.exists(new SimpleStructTag(CoinList), $.copy(list_owner_addr))) {
    return false;
  }
  else{
  }
  list = $c.borrow_global<CoinList>(new SimpleStructTag(CoinList), $.copy(list_owner_addr));
  coin_type = Stdlib.Type_info.type_of_($c, [$p[0]]);
  return Iterable_table.contains_(list.coin_types, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
}

export function is_coin_registered_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): boolean {
  let registry, type_info;
  registry = $c.borrow_global<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  return Iterable_table.contains_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
}

export function is_registry_initialized_ (
  $c: AptosDataCache,
): boolean {
  return $c.exists(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
}

export function remove_approver_from_list_ (
  list_owner: HexString,
  approver: HexString,
  $c: AptosDataCache,
): void {
  let i, list;
  list = $c.borrow_global_mut<CoinList>(new SimpleStructTag(CoinList), Stdlib.Signer.address_of_(list_owner, $c));
  if (!Stdlib.Vector.contains_(list.approvers, approver, $c, [AtomicTypeTag.Address])) {
    throw $.abortCode(u64("0"));
  }
  [, i] = Stdlib.Vector.index_of_(list.approvers, approver, $c, [AtomicTypeTag.Address]);
  Stdlib.Vector.remove_(list.approvers, $.copy(i), $c, [AtomicTypeTag.Address]);
  return;
}


export function buildPayload_remove_approver_from_list (
  approver: HexString,
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "remove_approver_from_list",
    typeParamStrings,
    [
      approver,
    ],
    isJSON,
  );

}

export function remove_approver_from_registry_ (
  admin: HexString,
  approver: HexString,
  $c: AptosDataCache,
): void {
  let i, registry;
  if (!((Stdlib.Signer.address_of_(admin, $c)).hex() === (new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68")).hex())) {
    throw $.abortCode($.copy(E_CONTRACT_OWNER_ONLY));
  }
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  if (!Stdlib.Vector.contains_(registry.approvers, approver, $c, [AtomicTypeTag.Address])) {
    throw $.abortCode(u64("0"));
  }
  [, i] = Stdlib.Vector.index_of_(registry.approvers, approver, $c, [AtomicTypeTag.Address]);
  Stdlib.Vector.remove_(registry.approvers, $.copy(i), $c, [AtomicTypeTag.Address]);
  return;
}


export function buildPayload_remove_approver_from_registry (
  approver: HexString,
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "remove_approver_from_registry",
    typeParamStrings,
    [
      approver,
    ],
    isJSON,
  );

}

export function remove_from_list_ (
  list_owner: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_type, list;
  list = $c.borrow_global_mut<CoinList>(new SimpleStructTag(CoinList), Stdlib.Signer.address_of_(list_owner, $c));
  coin_type = Stdlib.Type_info.type_of_($c, [$p[0]]);
  Iterable_table.remove_(list.coin_types, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
  return;
}


export function buildPayload_remove_from_list (
  $p: TypeTag[], /* <CoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "coin_list",
    "remove_from_list",
    typeParamStrings,
    [],
    isJSON,
  );

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::CoinInfo", CoinInfo.CoinInfoParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::CoinList", CoinList.CoinListParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::CoinRegistry", CoinRegistry.CoinRegistryParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::FullList", FullList.FullListParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::Nothing", Nothing.NothingParser);
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
  get CoinInfo() { return CoinInfo; }
  get CoinList() { return CoinList; }
  async loadCoinList(
    owner: HexString,
    loadFull=true,
    fillCache=true,
  ) {
    const val = await CoinList.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.move_to(val.typeTag, owner, val);
    }
    return val;
  }
  get CoinRegistry() { return CoinRegistry; }
  async loadCoinRegistry(
    owner: HexString,
    loadFull=true,
    fillCache=true,
  ) {
    const val = await CoinRegistry.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.move_to(val.typeTag, owner, val);
    }
    return val;
  }
  get FullList() { return FullList; }
  async loadFullList(
    owner: HexString,
    loadFull=true,
    fillCache=true,
  ) {
    const val = await FullList.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.move_to(val.typeTag, owner, val);
    }
    return val;
  }
  get Nothing() { return Nothing; }
  payload_add_approver_to_list(
    approver: HexString,
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_approver_to_list(approver, isJSON);
  }
  async add_approver_to_list(
    _account: AptosAccount,
    approver: HexString,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_add_approver_to_list(approver, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_add_approver_to_registry(
    approver: HexString,
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_approver_to_registry(approver, isJSON);
  }
  async add_approver_to_registry(
    _account: AptosAccount,
    approver: HexString,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_add_approver_to_registry(approver, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_add_extension(
    key: Stdlib.String.String,
    value: Stdlib.String.String,
    $p: TypeTag[], /* <CoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_extension(key, value, $p, isJSON);
  }
  async add_extension(
    _account: AptosAccount,
    key: Stdlib.String.String,
    value: Stdlib.String.String,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_add_extension(key, value, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_add_to_list(
    list: HexString,
    $p: TypeTag[], /* <CoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_to_list(list, $p, isJSON);
  }
  async add_to_list(
    _account: AptosAccount,
    list: HexString,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_add_to_list(list, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_add_to_registry_by_approver(
    name: Stdlib.String.String,
    symbol: Stdlib.String.String,
    coingecko_id: Stdlib.String.String,
    logo_url: Stdlib.String.String,
    project_url: Stdlib.String.String,
    is_update: boolean,
    $p: TypeTag[], /* <CoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_to_registry_by_approver(name, symbol, coingecko_id, logo_url, project_url, is_update, $p, isJSON);
  }
  async add_to_registry_by_approver(
    _account: AptosAccount,
    name: Stdlib.String.String,
    symbol: Stdlib.String.String,
    coingecko_id: Stdlib.String.String,
    logo_url: Stdlib.String.String,
    project_url: Stdlib.String.String,
    is_update: boolean,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_add_to_registry_by_approver(name, symbol, coingecko_id, logo_url, project_url, is_update, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_add_to_registry_by_signer(
    name: Stdlib.String.String,
    symbol: Stdlib.String.String,
    coingecko_id: Stdlib.String.String,
    logo_url: Stdlib.String.String,
    project_url: Stdlib.String.String,
    is_update: boolean,
    $p: TypeTag[], /* <CoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_to_registry_by_signer(name, symbol, coingecko_id, logo_url, project_url, is_update, $p, isJSON);
  }
  async add_to_registry_by_signer(
    _account: AptosAccount,
    name: Stdlib.String.String,
    symbol: Stdlib.String.String,
    coingecko_id: Stdlib.String.String,
    logo_url: Stdlib.String.String,
    project_url: Stdlib.String.String,
    is_update: boolean,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_add_to_registry_by_signer(name, symbol, coingecko_id, logo_url, project_url, is_update, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_create_list(
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_create_list(isJSON);
  }
  async create_list(
    _account: AptosAccount,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_create_list(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_drop_extension(
    key: Stdlib.String.String,
    value: Stdlib.String.String,
    $p: TypeTag[], /* <CoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_drop_extension(key, value, $p, isJSON);
  }
  async drop_extension(
    _account: AptosAccount,
    key: Stdlib.String.String,
    value: Stdlib.String.String,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_drop_extension(key, value, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_fetch_all_registered_coin_info(
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_fetch_all_registered_coin_info(isJSON);
  }
  async fetch_all_registered_coin_info(
    _account: AptosAccount,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_fetch_all_registered_coin_info(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  get query_fetch_all_registered_coin_info() { return make_query_fetch_all_registered_coin_info(this); }
  payload_fetch_full_list(
    list_owner_addr: HexString,
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_fetch_full_list(list_owner_addr, isJSON);
  }
  async fetch_full_list(
    _account: AptosAccount,
    list_owner_addr: HexString,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_fetch_full_list(list_owner_addr, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  get query_fetch_full_list() { return make_query_fetch_full_list(this); }
  payload_init_module(
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_init_module(isJSON);
  }
  async init_module(
    _account: AptosAccount,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_init_module(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_initialize(
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_initialize(isJSON);
  }
  async initialize(
    _account: AptosAccount,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_initialize(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_remove_approver_from_list(
    approver: HexString,
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_remove_approver_from_list(approver, isJSON);
  }
  async remove_approver_from_list(
    _account: AptosAccount,
    approver: HexString,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_remove_approver_from_list(approver, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_remove_approver_from_registry(
    approver: HexString,
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_remove_approver_from_registry(approver, isJSON);
  }
  async remove_approver_from_registry(
    _account: AptosAccount,
    approver: HexString,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_remove_approver_from_registry(approver, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_remove_from_list(
    $p: TypeTag[], /* <CoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_remove_from_list($p, isJSON);
  }
  async remove_from_list(
    _account: AptosAccount,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_remove_from_list($p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

