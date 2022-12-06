import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {OptionTransaction} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Stdlib from "../stdlib";
export const packageName = "CoinList";
export const moduleAddress = new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68");
export const moduleName = "devnet_coins";



export class CoinCaps 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "CoinCaps";
  static typeParameters: TypeParamDeclType[] = [
    { name: "T", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "mint", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new $.TypeParamIdx(0)]) },
  { name: "freeze", typeTag: new StructTag(new HexString("0x1"), "coin", "FreezeCapability", [new $.TypeParamIdx(0)]) },
  { name: "burn", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new $.TypeParamIdx(0)]) }];

  mint: Stdlib.Coin.MintCapability;
  freeze: Stdlib.Coin.FreezeCapability;
  burn: Stdlib.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint = proto['mint'] as Stdlib.Coin.MintCapability;
    this.freeze = proto['freeze'] as Stdlib.Coin.FreezeCapability;
    this.burn = proto['burn'] as Stdlib.Coin.BurnCapability;
  }

  static CoinCapsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinCaps {
    const proto = $.parseStructProto(data, typeTag, repo, CoinCaps);
    return new CoinCaps(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinCaps, typeParams);
    return result as unknown as CoinCaps;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, CoinCaps, typeParams);
    await result.loadFullState(app)
    return result as unknown as CoinCaps;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "CoinCaps", $p);
  }
  async loadFullState(app: $.AppType) {
    await this.mint.loadFullState(app);
    await this.freeze.loadFullState(app);
    await this.burn.loadFullState(app);
    this.__app = app;
  }

}

export class DevnetBNB 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "DevnetBNB";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static DevnetBNBParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DevnetBNB {
    const proto = $.parseStructProto(data, typeTag, repo, DevnetBNB);
    return new DevnetBNB(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "DevnetBNB", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class DevnetBTC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "DevnetBTC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static DevnetBTCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DevnetBTC {
    const proto = $.parseStructProto(data, typeTag, repo, DevnetBTC);
    return new DevnetBTC(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "DevnetBTC", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class DevnetDAI 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "DevnetDAI";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static DevnetDAIParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DevnetDAI {
    const proto = $.parseStructProto(data, typeTag, repo, DevnetDAI);
    return new DevnetDAI(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "DevnetDAI", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class DevnetETH 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "DevnetETH";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static DevnetETHParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DevnetETH {
    const proto = $.parseStructProto(data, typeTag, repo, DevnetETH);
    return new DevnetETH(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "DevnetETH", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class DevnetSOL 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "DevnetSOL";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static DevnetSOLParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DevnetSOL {
    const proto = $.parseStructProto(data, typeTag, repo, DevnetSOL);
    return new DevnetSOL(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "DevnetSOL", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class DevnetUSDC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "DevnetUSDC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static DevnetUSDCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DevnetUSDC {
    const proto = $.parseStructProto(data, typeTag, repo, DevnetUSDC);
    return new DevnetUSDC(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "DevnetUSDC", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class DevnetUSDT 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "DevnetUSDT";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static DevnetUSDTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DevnetUSDT {
    const proto = $.parseStructProto(data, typeTag, repo, DevnetUSDT);
    return new DevnetUSDT(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "DevnetUSDT", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function burn_ (
  tokens: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let temp$1, addr, amt, cap;
  temp$1 = Stdlib.Type_info.type_of_($c, [$p[0]]);
  addr = Stdlib.Type_info.account_address_(temp$1, $c);
  cap = $c.borrow_global<CoinCaps>(new SimpleStructTag(CoinCaps, [$p[0]]), $.copy(addr));
  amt = Stdlib.Coin.value_(tokens, $c, [$p[0]]);
  if (($.copy(amt)).eq((u64("0")))) {
    Stdlib.Coin.destroy_zero_(tokens, $c, [$p[0]]);
  }
  else{
    Stdlib.Coin.burn_(tokens, cap.burn, $c, [$p[0]]);
  }
  return;
}

export function deploy_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  init_coin_and_register_(admin, Stdlib.String.utf8_([u8("66"), u8("105"), u8("116"), u8("99"), u8("111"), u8("105"), u8("110")], $c), Stdlib.String.utf8_([u8("100"), u8("101"), u8("118"), u8("66"), u8("84"), u8("67")], $c), u8("8"), $c, [new SimpleStructTag(DevnetBTC)]);
  init_coin_and_register_(admin, Stdlib.String.utf8_([u8("66"), u8("78"), u8("66")], $c), Stdlib.String.utf8_([u8("100"), u8("101"), u8("118"), u8("66"), u8("78"), u8("66")], $c), u8("8"), $c, [new SimpleStructTag(DevnetBNB)]);
  init_coin_and_register_(admin, Stdlib.String.utf8_([u8("69"), u8("116"), u8("104"), u8("101"), u8("114"), u8("101"), u8("117"), u8("109")], $c), Stdlib.String.utf8_([u8("100"), u8("101"), u8("118"), u8("69"), u8("84"), u8("72")], $c), u8("8"), $c, [new SimpleStructTag(DevnetETH)]);
  init_coin_and_register_(admin, Stdlib.String.utf8_([u8("83"), u8("111"), u8("108"), u8("97"), u8("110"), u8("97")], $c), Stdlib.String.utf8_([u8("100"), u8("101"), u8("118"), u8("83"), u8("79"), u8("76")], $c), u8("8"), $c, [new SimpleStructTag(DevnetSOL)]);
  init_coin_and_register_(admin, Stdlib.String.utf8_([u8("85"), u8("83"), u8("68"), u8("32"), u8("67"), u8("111"), u8("105"), u8("110")], $c), Stdlib.String.utf8_([u8("100"), u8("101"), u8("118"), u8("85"), u8("83"), u8("68"), u8("67")], $c), u8("8"), $c, [new SimpleStructTag(DevnetUSDC)]);
  init_coin_and_register_(admin, Stdlib.String.utf8_([u8("84"), u8("101"), u8("116"), u8("104"), u8("101"), u8("114")], $c), Stdlib.String.utf8_([u8("100"), u8("101"), u8("118"), u8("85"), u8("83"), u8("68"), u8("84")], $c), u8("8"), $c, [new SimpleStructTag(DevnetUSDT)]);
  init_coin_and_register_(admin, Stdlib.String.utf8_([u8("68"), u8("65"), u8("73")], $c), Stdlib.String.utf8_([u8("100"), u8("101"), u8("118"), u8("68"), u8("65"), u8("73")], $c), u8("8"), $c, [new SimpleStructTag(DevnetDAI)]);
  return;
}


export function buildPayload_deploy (
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "devnet_coins",
    "deploy",
    typeParamStrings,
    [],
    isJSON,
  );

}
export function deposit_ (
  user: HexString,
  coin: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  if (!Stdlib.Coin.is_account_registered_(Stdlib.Signer.address_of_(user, $c), $c, [$p[0]])) {
    Stdlib.Coin.register_(user, $c, [$p[0]]);
  }
  else{
  }
  Stdlib.Coin.deposit_(Stdlib.Signer.address_of_(user, $c), coin, $c, [$p[0]]);
  return;
}

export function init_coin_ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let burn, freeze, mint;
  [burn, freeze, mint] = Stdlib.Coin.initialize_(admin, Stdlib.String.utf8_($.copy(name), $c), Stdlib.String.utf8_($.copy(symbol), $c), $.copy(decimals), false, $c, [$p[0]]);
  $c.move_to(new SimpleStructTag(CoinCaps, [$p[0]]), admin, new CoinCaps({ mint: $.copy(mint), freeze: $.copy(freeze), burn: $.copy(burn) }, new SimpleStructTag(CoinCaps, [$p[0]])));
  return;
}


export function buildPayload_init_coin (
  name: U8[],
  symbol: U8[],
  decimals: U8,
  $p: TypeTag[], /* <CoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "devnet_coins",
    "init_coin",
    typeParamStrings,
    [
      name,
      symbol,
      decimals,
    ],
    isJSON,
  );

}
export function init_coin_and_register_ (
  admin: HexString,
  name: Stdlib.String.String,
  symbol: Stdlib.String.String,
  decimals: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  init_coin_(admin, $.copy(Stdlib.String.bytes_(name, $c)), $.copy(Stdlib.String.bytes_(symbol, $c)), $.copy(decimals), $c, [$p[0]]);
  return;
}

export function initialize_ (
  admin: HexString,
  decimals: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let temp$1, name;
  temp$1 = Stdlib.Type_info.type_of_($c, [$p[0]]);
  name = Stdlib.Type_info.struct_name_(temp$1, $c);
  return init_coin_(admin, $.copy(name), $.copy(name), $.copy(decimals), $c, [$p[0]]);
}

export function mint_ (
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Stdlib.Coin.Coin {
  let caps;
  caps = $c.borrow_global<CoinCaps>(new SimpleStructTag(CoinCaps, [$p[0]]), new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"));
  return Stdlib.Coin.mint_($.copy(amount), caps.mint, $c, [$p[0]]);
}

export function mint_to_wallet_ (
  user: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin;
  coin = mint_($.copy(amount), $c, [$p[0]]);
  if (!Stdlib.Coin.is_account_registered_(Stdlib.Signer.address_of_(user, $c), $c, [$p[0]])) {
    Stdlib.Coin.register_(user, $c, [$p[0]]);
  }
  else{
  }
  Stdlib.Coin.deposit_(Stdlib.Signer.address_of_(user, $c), coin, $c, [$p[0]]);
  return;
}


export function buildPayload_mint_to_wallet (
  amount: U64,
  $p: TypeTag[], /* <CoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"),
    "devnet_coins",
    "mint_to_wallet",
    typeParamStrings,
    [
      amount,
    ],
    isJSON,
  );

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::CoinCaps", CoinCaps.CoinCapsParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetBNB", DevnetBNB.DevnetBNBParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetBTC", DevnetBTC.DevnetBTCParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetDAI", DevnetDAI.DevnetDAIParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetETH", DevnetETH.DevnetETHParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetSOL", DevnetSOL.DevnetSOLParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC", DevnetUSDC.DevnetUSDCParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDT", DevnetUSDT.DevnetUSDTParser);
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
  get CoinCaps() { return CoinCaps; }
  async loadCoinCaps(
    owner: HexString,
    $p: TypeTag[], /* <T> */
    loadFull=true,
    fillCache=true,
  ) {
    const val = await CoinCaps.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get DevnetBNB() { return DevnetBNB; }
  get DevnetBTC() { return DevnetBTC; }
  get DevnetDAI() { return DevnetDAI; }
  get DevnetETH() { return DevnetETH; }
  get DevnetSOL() { return DevnetSOL; }
  get DevnetUSDC() { return DevnetUSDC; }
  get DevnetUSDT() { return DevnetUSDT; }
  payload_deploy(
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_deploy(isJSON);
  }
  async deploy(
    _account: AptosAccount,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_deploy(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_init_coin(
    name: U8[],
    symbol: U8[],
    decimals: U8,
    $p: TypeTag[], /* <CoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_init_coin(name, symbol, decimals, $p, isJSON);
  }
  async init_coin(
    _account: AptosAccount,
    name: U8[],
    symbol: U8[],
    decimals: U8,
    $p: TypeTag[], /* <CoinType>*/
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_init_coin(name, symbol, decimals, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_mint_to_wallet(
    amount: U64,
    $p: TypeTag[], /* <CoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_mint_to_wallet(amount, $p, isJSON);
  }
  async mint_to_wallet(
    _account: AptosAccount,
    amount: U64,
    $p: TypeTag[], /* <CoinType>*/
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_mint_to_wallet(amount, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
}

