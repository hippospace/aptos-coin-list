import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
export const packageName = "CoinList";
export const moduleAddress = new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68");
export const moduleName = "coin_list";

export const E_COIN_NOT_IN_REGISTRY : U64 = u64("3");
export const E_COIN_OWNER_ONLY : U64 = u64("1");
export const E_CONTRACT_OWNER_ONLY : U64 = u64("0");
export const E_LIST_DOES_NOT_EXIST : U64 = u64("4");
export const E_TYPE_ALREADY_EXISTS : U64 = u64("2");


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
  { name: "coingecko_id", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "decimals", typeTag: AtomicTypeTag.U64 },
  { name: "logo_url", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "project_url", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "token_type", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) },
  { name: "extensions", typeTag: new StructTag(new HexString("0x1"), "simple_map", "SimpleMap", [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x1"), "string", "String", [])]) }];

  name: Std.String.String;
  symbol: Std.String.String;
  coingecko_id: Std.String.String;
  decimals: U64;
  logo_url: Std.String.String;
  project_url: Std.String.String;
  token_type: Aptos_std.Type_info.TypeInfo;
  extensions: Aptos_std.Simple_map.SimpleMap;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as Std.String.String;
    this.symbol = proto['symbol'] as Std.String.String;
    this.coingecko_id = proto['coingecko_id'] as Std.String.String;
    this.decimals = proto['decimals'] as U64;
    this.logo_url = proto['logo_url'] as Std.String.String;
    this.project_url = proto['project_url'] as Std.String.String;
    this.token_type = proto['token_type'] as Aptos_std.Type_info.TypeInfo;
    this.extensions = proto['extensions'] as Aptos_std.Simple_map.SimpleMap;
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
  { name: "coin_types", typeTag: new StructTag(new HexString("0x1"), "iterable_table", "IterableTable", [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "coin_list", "Nothing", [])]) }];

  coin_types: Aptos_std.Iterable_table.IterableTable;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin_types = proto['coin_types'] as Aptos_std.Iterable_table.IterableTable;
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
  { name: "type_to_coin_info", typeTag: new StructTag(new HexString("0x1"), "iterable_table", "IterableTable", [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "coin_list", "CoinInfo", [])]) }];

  type_to_coin_info: Aptos_std.Iterable_table.IterableTable;

  constructor(proto: any, public typeTag: TypeTag) {
    this.type_to_coin_info = proto['type_to_coin_info'] as Aptos_std.Iterable_table.IterableTable;
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
export function add_extension_ (
  coin_owner: HexString,
  key: Std.String.String,
  value: Std.String.String,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_info, registry, type_info;
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  type_info = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  if (!((Std.Signer.address_of_(coin_owner, $c)).hex() === (Aptos_std.Type_info.account_address_(type_info, $c)).hex())) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  coin_info = Aptos_std.Iterable_table.borrow_mut_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  Aptos_std.Simple_map.add_(coin_info.extensions, $.copy(key), $.copy(value), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x1"), "string", "String", [])]);
  return;
}


export function buildPayload_add_extension (
  key: Std.String.String,
  value: Std.String.String,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::add_extension",
    typeParamStrings,
    [
      $.payloadArg(key),
      $.payloadArg(value),
    ]
  );

}

export function add_to_list_ (
  list_owner: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_type, list, owner_addr;
  if (!is_coin_registered_($c, [$p[0]])) {
    throw $.abortCode($.copy(E_COIN_NOT_IN_REGISTRY));
  }
  owner_addr = Std.Signer.address_of_(list_owner, $c);
  if (!$c.exists(new SimpleStructTag(CoinList), $.copy(owner_addr))) {
    create_list_(list_owner, $c);
  }
  else{
  }
  list = $c.borrow_global_mut<CoinList>(new SimpleStructTag(CoinList), $.copy(owner_addr));
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  Aptos_std.Iterable_table.add_(list.coin_types, $.copy(coin_type), new Nothing({  }, new SimpleStructTag(Nothing)), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
  return;
}


export function buildPayload_add_to_list (
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::add_to_list",
    typeParamStrings,
    []
  );

}

export function add_to_registry_ (
  name: Std.String.String,
  symbol: Std.String.String,
  coingecko_id: Std.String.String,
  logo_url: Std.String.String,
  project_url: Std.String.String,
  is_update: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_info, registry, type_info;
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  type_info = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  coin_info = new CoinInfo({ name: $.copy(name), symbol: $.copy(symbol), coingecko_id: $.copy(coingecko_id), decimals: Aptos_framework.Coin.decimals_($c, [$p[0]]), logo_url: $.copy(logo_url), project_url: $.copy(project_url), token_type: $.copy(type_info), extensions: Aptos_std.Simple_map.create_($c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x1"), "string", "String", [])]) }, new SimpleStructTag(CoinInfo));
  if (!is_update) {
    if (!!Aptos_std.Iterable_table.contains_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)])) {
      throw $.abortCode($.copy(E_TYPE_ALREADY_EXISTS));
    }
  }
  else{
    Aptos_std.Iterable_table.remove_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  }
  Aptos_std.Iterable_table.add_(registry.type_to_coin_info, $.copy(type_info), $.copy(coin_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  return;
}

export function add_to_registry_by_proof_ (
  _ownership_proof: any,
  name: Std.String.String,
  symbol: Std.String.String,
  coingecko_id: Std.String.String,
  logo_url: Std.String.String,
  project_url: Std.String.String,
  is_update: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType, OwnershipProof>*/
): void {
  let coin_type, ownership_address, ownership_name, ownership_type, type_address;
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  ownership_type = Aptos_std.Type_info.type_of_($c, [$p[1]]);
  type_address = Aptos_std.Type_info.account_address_(coin_type, $c);
  ownership_address = Aptos_std.Type_info.account_address_(ownership_type, $c);
  ownership_name = Aptos_std.Type_info.module_name_(ownership_type, $c);
  if (!$.veq($.copy(ownership_name), [u8("79"), u8("119"), u8("110"), u8("101"), u8("114"), u8("115"), u8("104"), u8("105"), u8("112"), u8("80"), u8("114"), u8("111"), u8("111"), u8("102")])) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  if (!(($.copy(type_address)).hex() === ($.copy(ownership_address)).hex())) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  add_to_registry_($.copy(name), $.copy(symbol), $.copy(coingecko_id), $.copy(logo_url), $.copy(project_url), is_update, $c, [$p[0]]);
  return;
}

export function add_to_registry_by_signer_ (
  coin_owner: HexString,
  name: Std.String.String,
  symbol: Std.String.String,
  coingecko_id: Std.String.String,
  logo_url: Std.String.String,
  project_url: Std.String.String,
  is_update: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let type_info;
  type_info = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  if (!((Std.Signer.address_of_(coin_owner, $c)).hex() === (Aptos_std.Type_info.account_address_(type_info, $c)).hex())) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  add_to_registry_($.copy(name), $.copy(symbol), $.copy(coingecko_id), $.copy(logo_url), $.copy(project_url), is_update, $c, [$p[0]]);
  return;
}


export function buildPayload_add_to_registry_by_signer (
  name: Std.String.String,
  symbol: Std.String.String,
  coingecko_id: Std.String.String,
  logo_url: Std.String.String,
  project_url: Std.String.String,
  is_update: boolean,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::add_to_registry_by_signer",
    typeParamStrings,
    [
      $.payloadArg(name),
      $.payloadArg(symbol),
      $.payloadArg(coingecko_id),
      $.payloadArg(logo_url),
      $.payloadArg(project_url),
      $.payloadArg(is_update),
    ]
  );

}

export function create_list_ (
  list_owner: HexString,
  $c: AptosDataCache,
): void {
  return $c.move_to(new SimpleStructTag(CoinList), list_owner, new CoinList({ coin_types: Aptos_std.Iterable_table.new___($c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]) }, new SimpleStructTag(CoinList)));
}


export function buildPayload_create_list (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::create_list",
    typeParamStrings,
    []
  );

}

export function drop_extension_ (
  coin_owner: HexString,
  key: Std.String.String,
  value: Std.String.String,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_info, registry, type_info;
  registry = $c.borrow_global_mut<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  type_info = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  if (!((Std.Signer.address_of_(coin_owner, $c)).hex() === (Aptos_std.Type_info.account_address_(type_info, $c)).hex())) {
    throw $.abortCode($.copy(E_COIN_OWNER_ONLY));
  }
  coin_info = Aptos_std.Iterable_table.borrow_mut_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  Aptos_std.Simple_map.add_(coin_info.extensions, $.copy(key), $.copy(value), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0x1"), "string", "String", [])]);
  return;
}


export function buildPayload_drop_extension (
  key: Std.String.String,
  value: Std.String.String,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::drop_extension",
    typeParamStrings,
    [
      $.payloadArg(key),
      $.payloadArg(value),
    ]
  );

}

export function fetch_all_registered_coin_info_ (
  fetcher: HexString,
  $c: AptosDataCache,
): void {
  return $c.move_to(new SimpleStructTag(FullList), fetcher, get_all_registered_coin_info_($c));
}


export function buildPayload_fetch_all_registered_coin_info (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::fetch_all_registered_coin_info",
    typeParamStrings,
    []
  );

}

export async function query_fetch_all_registered_coin_info(
  client: AptosClient,
  account: AptosAccount,
  repo: AptosParserRepo,
  $p: TypeTag[],
) {
  const payload = buildPayload_fetch_all_registered_coin_info();
  const outputTypeTag = new SimpleStructTag(FullList);
  const output = await $.simulatePayloadTx(client, account, payload);
  return $.takeSimulationValue<FullList>(output, outputTypeTag, repo)
}
function make_query_fetch_all_registered_coin_info(app: App) {
  function maker(
    account: AptosAccount,
    $p: TypeTag[],
  ) {
    return query_fetch_all_registered_coin_info(app.client, account, app.repo, $p)
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
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::fetch_full_list",
    typeParamStrings,
    [
      $.payloadArg(list_owner_addr),
    ]
  );

}

export async function query_fetch_full_list(
  client: AptosClient,
  account: AptosAccount,
  repo: AptosParserRepo,
    list_owner_addr: HexString,
  $p: TypeTag[],
) {
  const payload = buildPayload_fetch_full_list(list_owner_addr);
  const outputTypeTag = new SimpleStructTag(FullList);
  const output = await $.simulatePayloadTx(client, account, payload);
  return $.takeSimulationValue<FullList>(output, outputTypeTag, repo)
}
function make_query_fetch_full_list(app: App) {
  function maker(
    account: AptosAccount,
      list_owner_addr: HexString,
    $p: TypeTag[],
  ) {
    return query_fetch_full_list(app.client, account, app.repo, list_owner_addr, $p)
  }
  return maker;
}
export function get_all_registered_coin_info_ (
  $c: AptosDataCache,
): FullList {
  let coin_info, fulllist, prev, registry, tail, tail_key;
  registry = $c.borrow_global<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  tail = Aptos_std.Iterable_table.tail_key_(registry.type_to_coin_info, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
  fulllist = new FullList({ coin_info_list: Std.Vector.empty_($c, [new SimpleStructTag(CoinInfo)]) }, new SimpleStructTag(FullList));
  while (Std.Option.is_some_(tail, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", [])])) {
    {
      tail_key = $.copy(Std.Option.borrow_(tail, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", [])]));
      coin_info = Aptos_std.Iterable_table.borrow_(registry.type_to_coin_info, $.copy(tail_key), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
      Std.Vector.push_back_(fulllist.coin_info_list, $.copy(coin_info), $c, [new SimpleStructTag(CoinInfo)]);
      [, prev, ] = Aptos_std.Iterable_table.borrow_iter_(registry.type_to_coin_info, $.copy(tail_key), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
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
  type_info = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  return $.copy(Aptos_std.Iterable_table.borrow_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]));
}

export function get_full_list_ (
  list_owner_addr: HexString,
  $c: AptosDataCache,
): FullList {
  let coin_info, fulllist, list, prev, registry, tail, tail_key;
  list = $c.borrow_global<CoinList>(new SimpleStructTag(CoinList), $.copy(list_owner_addr));
  registry = $c.borrow_global<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  tail = Aptos_std.Iterable_table.tail_key_(list.coin_types, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
  fulllist = new FullList({ coin_info_list: Std.Vector.empty_($c, [new SimpleStructTag(CoinInfo)]) }, new SimpleStructTag(FullList));
  while (Std.Option.is_some_(tail, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", [])])) {
    {
      tail_key = $.copy(Std.Option.borrow_(tail, $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", [])]));
      coin_info = Aptos_std.Iterable_table.borrow_(registry.type_to_coin_info, $.copy(tail_key), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
      Std.Vector.push_back_(fulllist.coin_info_list, $.copy(coin_info), $c, [new SimpleStructTag(CoinInfo)]);
      [, prev, ] = Aptos_std.Iterable_table.borrow_iter_(list.coin_types, $.copy(tail_key), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
      tail = $.copy(prev);
    }

  }return $.copy(fulllist);
}

export function initialize_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  if (!((Std.Signer.address_of_(admin, $c)).hex() === (new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68")).hex())) {
    throw $.abortCode($.copy(E_CONTRACT_OWNER_ONLY));
  }
  return $c.move_to(new SimpleStructTag(CoinRegistry), admin, new CoinRegistry({ type_to_coin_info: Aptos_std.Iterable_table.new___($c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]) }, new SimpleStructTag(CoinRegistry)));
}


export function buildPayload_initialize (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::initialize",
    typeParamStrings,
    []
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
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  return Aptos_std.Iterable_table.contains_(list.coin_types, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
}

export function is_coin_registered_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): boolean {
  let registry, type_info;
  registry = $c.borrow_global<CoinRegistry>(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  type_info = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  return Aptos_std.Iterable_table.contains_(registry.type_to_coin_info, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(CoinInfo)]);
}

export function is_registry_initialized_ (
  $c: AptosDataCache,
): boolean {
  return $c.exists(new SimpleStructTag(CoinRegistry), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
}

export function remove_from_list_ (
  list_owner: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_type, list;
  list = $c.borrow_global_mut<CoinList>(new SimpleStructTag(CoinList), Std.Signer.address_of_(list_owner, $c));
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  Aptos_std.Iterable_table.remove_(list.coin_types, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new SimpleStructTag(Nothing)]);
  return;
}


export function buildPayload_remove_from_list (
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::coin_list::remove_from_list",
    typeParamStrings,
    []
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
  ) {
    const val = await CoinList.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get CoinRegistry() { return CoinRegistry; }
  async loadCoinRegistry(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await CoinRegistry.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get FullList() { return FullList; }
  async loadFullList(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await FullList.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get Nothing() { return Nothing; }
  payload_add_extension(
    key: Std.String.String,
    value: Std.String.String,
    $p: TypeTag[], /* <CoinType>*/
  ) {
    return buildPayload_add_extension(key, value, $p);
  }
  async add_extension(
    _account: AptosAccount,
    key: Std.String.String,
    value: Std.String.String,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_add_extension(key, value, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_add_to_list(
    $p: TypeTag[], /* <CoinType>*/
  ) {
    return buildPayload_add_to_list($p);
  }
  async add_to_list(
    _account: AptosAccount,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_add_to_list($p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_add_to_registry_by_signer(
    name: Std.String.String,
    symbol: Std.String.String,
    coingecko_id: Std.String.String,
    logo_url: Std.String.String,
    project_url: Std.String.String,
    is_update: boolean,
    $p: TypeTag[], /* <CoinType>*/
  ) {
    return buildPayload_add_to_registry_by_signer(name, symbol, coingecko_id, logo_url, project_url, is_update, $p);
  }
  async add_to_registry_by_signer(
    _account: AptosAccount,
    name: Std.String.String,
    symbol: Std.String.String,
    coingecko_id: Std.String.String,
    logo_url: Std.String.String,
    project_url: Std.String.String,
    is_update: boolean,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_add_to_registry_by_signer(name, symbol, coingecko_id, logo_url, project_url, is_update, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_create_list(
  ) {
    return buildPayload_create_list();
  }
  async create_list(
    _account: AptosAccount,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_create_list();
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_drop_extension(
    key: Std.String.String,
    value: Std.String.String,
    $p: TypeTag[], /* <CoinType>*/
  ) {
    return buildPayload_drop_extension(key, value, $p);
  }
  async drop_extension(
    _account: AptosAccount,
    key: Std.String.String,
    value: Std.String.String,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_drop_extension(key, value, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_fetch_all_registered_coin_info(
  ) {
    return buildPayload_fetch_all_registered_coin_info();
  }
  async fetch_all_registered_coin_info(
    _account: AptosAccount,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_fetch_all_registered_coin_info();
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  get query_fetch_all_registered_coin_info() { return make_query_fetch_all_registered_coin_info(this); }
  payload_fetch_full_list(
    list_owner_addr: HexString,
  ) {
    return buildPayload_fetch_full_list(list_owner_addr);
  }
  async fetch_full_list(
    _account: AptosAccount,
    list_owner_addr: HexString,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_fetch_full_list(list_owner_addr);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  get query_fetch_full_list() { return make_query_fetch_full_list(this); }
  payload_initialize(
  ) {
    return buildPayload_initialize();
  }
  async initialize(
    _account: AptosAccount,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_initialize();
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_remove_from_list(
    $p: TypeTag[], /* <CoinType>*/
  ) {
    return buildPayload_remove_from_list($p);
  }
  async remove_from_list(
    _account: AptosAccount,
    $p: TypeTag[], /* <CoinType>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_remove_from_list($p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

