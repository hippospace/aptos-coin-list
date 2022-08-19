import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
import * as Chain_id from "./chain_id";
import * as Coin from "./coin";
import * as System_addresses from "./system_addresses";
import * as Timestamp from "./timestamp";
import * as Transaction_fee from "./transaction_fee";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "account";

export const EACCOUNT_ALREADY_EXISTS : U64 = u64("1");
export const EACCOUNT_DOES_NOT_EXIST : U64 = u64("2");
export const ECANNOT_RESERVED_ADDRESS : U64 = u64("5");
export const EINVALID_PROOF_OF_KNOWLEDGE : U64 = u64("9");
export const EMALFORMED_AUTHENTICATION_KEY : U64 = u64("4");
export const ENO_CAPABILITY : U64 = u64("10");
export const EOUT_OF_GAS : U64 = u64("6");
export const ESEQUENCE_NUMBER_TOO_BIG : U64 = u64("3");
export const EWRITESET_NOT_ALLOWED : U64 = u64("7");
export const EWRONG_CURRENT_PUBLIC_KEY : U64 = u64("8");
export const MAX_U64 : U128 = u128("18446744073709551615");
export const PROLOGUE_EACCOUNT_DOES_NOT_EXIST : U64 = u64("1004");
export const PROLOGUE_EBAD_CHAIN_ID : U64 = u64("1007");
export const PROLOGUE_ECANT_PAY_GAS_DEPOSIT : U64 = u64("1005");
export const PROLOGUE_EINVALID_ACCOUNT_AUTH_KEY : U64 = u64("1001");
export const PROLOGUE_EINVALID_WRITESET_SENDER : U64 = u64("1008");
export const PROLOGUE_ESECONDARY_KEYS_ADDRESSES_COUNT_MISMATCH : U64 = u64("1010");
export const PROLOGUE_ESEQUENCE_NUMBER_TOO_BIG : U64 = u64("1009");
export const PROLOGUE_ESEQUENCE_NUMBER_TOO_NEW : U64 = u64("1003");
export const PROLOGUE_ESEQUENCE_NUMBER_TOO_OLD : U64 = u64("1002");
export const PROLOGUE_ETRANSACTION_EXPIRED : U64 = u64("1006");


export class Account 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "Account";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "authentication_key", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "sequence_number", typeTag: AtomicTypeTag.U64 },
  { name: "coin_register_events", typeTag: new StructTag(new HexString("0x1"), "event", "EventHandle", [new StructTag(new HexString("0x1"), "account", "CoinRegisterEvent", [])]) },
  { name: "rotation_capability_offer", typeTag: new StructTag(new HexString("0x1"), "account", "CapabilityOffer", [new StructTag(new HexString("0x1"), "account", "RotationCapability", [])]) },
  { name: "signer_capability_offer", typeTag: new StructTag(new HexString("0x1"), "account", "CapabilityOffer", [new StructTag(new HexString("0x1"), "account", "SignerCapability", [])]) }];

  authentication_key: U8[];
  sequence_number: U64;
  coin_register_events: Aptos_std.Event.EventHandle;
  rotation_capability_offer: CapabilityOffer;
  signer_capability_offer: CapabilityOffer;

  constructor(proto: any, public typeTag: TypeTag) {
    this.authentication_key = proto['authentication_key'] as U8[];
    this.sequence_number = proto['sequence_number'] as U64;
    this.coin_register_events = proto['coin_register_events'] as Aptos_std.Event.EventHandle;
    this.rotation_capability_offer = proto['rotation_capability_offer'] as CapabilityOffer;
    this.signer_capability_offer = proto['signer_capability_offer'] as CapabilityOffer;
  }

  static AccountParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Account {
    const proto = $.parseStructProto(data, typeTag, repo, Account);
    return new Account(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Account, typeParams);
    return result as unknown as Account;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Account, typeParams);
    await result.loadFullState(app)
    return result as unknown as Account;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "Account", []);
  }
  async loadFullState(app: $.AppType) {
    await this.coin_register_events.loadFullState(app);
    await this.rotation_capability_offer.loadFullState(app);
    await this.signer_capability_offer.loadFullState(app);
    this.__app = app;
  }

}

export class CapabilityOffer 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "CapabilityOffer";
  static typeParameters: TypeParamDeclType[] = [
    { name: "T", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "for__", typeTag: new StructTag(new HexString("0x1"), "option", "Option", [AtomicTypeTag.Address]) }];

  for__: Std.Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.for__ = proto['for__'] as Std.Option.Option;
  }

  static CapabilityOfferParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CapabilityOffer {
    const proto = $.parseStructProto(data, typeTag, repo, CapabilityOffer);
    return new CapabilityOffer(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "CapabilityOffer", $p);
  }
  async loadFullState(app: $.AppType) {
    await this.for__.loadFullState(app);
    this.__app = app;
  }

}

export class ChainSpecificAccountInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "ChainSpecificAccountInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "module_addr", typeTag: AtomicTypeTag.Address },
  { name: "module_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "script_prologue_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "module_prologue_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "writeset_prologue_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "multi_agent_prologue_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "user_epilogue_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "writeset_epilogue_name", typeTag: new VectorTag(AtomicTypeTag.U8) }];

  module_addr: HexString;
  module_name: U8[];
  script_prologue_name: U8[];
  module_prologue_name: U8[];
  writeset_prologue_name: U8[];
  multi_agent_prologue_name: U8[];
  user_epilogue_name: U8[];
  writeset_epilogue_name: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.module_addr = proto['module_addr'] as HexString;
    this.module_name = proto['module_name'] as U8[];
    this.script_prologue_name = proto['script_prologue_name'] as U8[];
    this.module_prologue_name = proto['module_prologue_name'] as U8[];
    this.writeset_prologue_name = proto['writeset_prologue_name'] as U8[];
    this.multi_agent_prologue_name = proto['multi_agent_prologue_name'] as U8[];
    this.user_epilogue_name = proto['user_epilogue_name'] as U8[];
    this.writeset_epilogue_name = proto['writeset_epilogue_name'] as U8[];
  }

  static ChainSpecificAccountInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ChainSpecificAccountInfo {
    const proto = $.parseStructProto(data, typeTag, repo, ChainSpecificAccountInfo);
    return new ChainSpecificAccountInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ChainSpecificAccountInfo, typeParams);
    return result as unknown as ChainSpecificAccountInfo;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, ChainSpecificAccountInfo, typeParams);
    await result.loadFullState(app)
    return result as unknown as ChainSpecificAccountInfo;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "ChainSpecificAccountInfo", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class CoinRegisterEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "CoinRegisterEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "type_info", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) }];

  type_info: Aptos_std.Type_info.TypeInfo;

  constructor(proto: any, public typeTag: TypeTag) {
    this.type_info = proto['type_info'] as Aptos_std.Type_info.TypeInfo;
  }

  static CoinRegisterEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinRegisterEvent {
    const proto = $.parseStructProto(data, typeTag, repo, CoinRegisterEvent);
    return new CoinRegisterEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "CoinRegisterEvent", []);
  }
  async loadFullState(app: $.AppType) {
    await this.type_info.loadFullState(app);
    this.__app = app;
  }

}

export class OriginatingAddress 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "OriginatingAddress";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "address_map", typeTag: new StructTag(new HexString("0x1"), "table", "Table", [AtomicTypeTag.Address, AtomicTypeTag.Address]) }];

  address_map: Aptos_std.Table.Table;

  constructor(proto: any, public typeTag: TypeTag) {
    this.address_map = proto['address_map'] as Aptos_std.Table.Table;
  }

  static OriginatingAddressParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OriginatingAddress {
    const proto = $.parseStructProto(data, typeTag, repo, OriginatingAddress);
    return new OriginatingAddress(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, OriginatingAddress, typeParams);
    return result as unknown as OriginatingAddress;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, OriginatingAddress, typeParams);
    await result.loadFullState(app)
    return result as unknown as OriginatingAddress;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "OriginatingAddress", []);
  }
  async loadFullState(app: $.AppType) {
    await this.address_map.loadFullState(app);
    this.__app = app;
  }

}

export class RotationCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "RotationCapability";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "account", typeTag: AtomicTypeTag.Address }];

  account: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.account = proto['account'] as HexString;
  }

  static RotationCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RotationCapability {
    const proto = $.parseStructProto(data, typeTag, repo, RotationCapability);
    return new RotationCapability(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "RotationCapability", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class RotationProofChallenge 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "RotationProofChallenge";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "sequence_number", typeTag: AtomicTypeTag.U64 },
  { name: "originator", typeTag: AtomicTypeTag.Address },
  { name: "current_auth_key", typeTag: AtomicTypeTag.Address },
  { name: "new_public_key", typeTag: new VectorTag(AtomicTypeTag.U8) }];

  sequence_number: U64;
  originator: HexString;
  current_auth_key: HexString;
  new_public_key: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.sequence_number = proto['sequence_number'] as U64;
    this.originator = proto['originator'] as HexString;
    this.current_auth_key = proto['current_auth_key'] as HexString;
    this.new_public_key = proto['new_public_key'] as U8[];
  }

  static RotationProofChallengeParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RotationProofChallenge {
    const proto = $.parseStructProto(data, typeTag, repo, RotationProofChallenge);
    return new RotationProofChallenge(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "RotationProofChallenge", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class SignerCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "SignerCapability";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "account", typeTag: AtomicTypeTag.Address }];

  account: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.account = proto['account'] as HexString;
  }

  static SignerCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SignerCapability {
    const proto = $.parseStructProto(data, typeTag, repo, SignerCapability);
    return new SignerCapability(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "SignerCapability", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function create_account_ (
  auth_key: HexString,
  $c: AptosDataCache,
): void {
  let signer;
  signer = create_account_internal_($.copy(auth_key), $c);
  Coin.register_(signer, $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])]);
  register_coin_($.copy(auth_key), $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])]);
  return;
}


export function buildPayload_create_account (
  auth_key: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "account",
    "create_account",
    typeParamStrings,
    [
      auth_key,
    ]
  );

}
export function create_account_internal_ (
  new_address: HexString,
  $c: AptosDataCache,
): HexString {
  let temp$1;
  if (!!$c.exists(new SimpleStructTag(Account), $.copy(new_address))) {
    throw $.abortCode(Std.Error.already_exists_($.copy(EACCOUNT_ALREADY_EXISTS), $c));
  }
  if ((($.copy(new_address)).hex() !== (new HexString("0x0")).hex())) {
    temp$1 = (($.copy(new_address)).hex() !== (new HexString("0x1")).hex());
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(ECANNOT_RESERVED_ADDRESS), $c));
  }
  return create_account_unchecked_($.copy(new_address), $c);
}

export function create_account_unchecked_ (
  new_address: HexString,
  $c: AptosDataCache,
): HexString {
  let authentication_key, new_account;
  new_account = create_signer_($.copy(new_address), $c);
  authentication_key = Std.Bcs.to_bytes_(new_address, $c, [AtomicTypeTag.Address]);
  if (!(Std.Vector.length_(authentication_key, $c, [AtomicTypeTag.U8])).eq((u64("32")))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EMALFORMED_AUTHENTICATION_KEY), $c));
  }
  $c.move_to(new SimpleStructTag(Account), new_account, new Account({ authentication_key: $.copy(authentication_key), sequence_number: u64("0"), coin_register_events: Aptos_std.Event.new_event_handle_(new_account, $c, [new SimpleStructTag(CoinRegisterEvent)]), rotation_capability_offer: new CapabilityOffer({ for: Std.Option.none_($c, [AtomicTypeTag.Address]) }, new SimpleStructTag(CapabilityOffer, [new SimpleStructTag(RotationCapability)])), signer_capability_offer: new CapabilityOffer({ for: Std.Option.none_($c, [AtomicTypeTag.Address]) }, new SimpleStructTag(CapabilityOffer, [new SimpleStructTag(SignerCapability)])) }, new SimpleStructTag(Account)));
  return new_account;
}

export function create_address_ (
  bytes: U8[],
  $c: AptosDataCache,
): HexString {
  return $.aptos_framework_account_create_address(bytes, $c);

}
export function create_address_map_ (
  aptos_framework_account: HexString,
  $c: AptosDataCache,
): void {
  System_addresses.assert_aptos_framework_(aptos_framework_account, $c);
  $c.move_to(new SimpleStructTag(OriginatingAddress), aptos_framework_account, new OriginatingAddress({ address_map: Aptos_std.Table.new___($c, [AtomicTypeTag.Address, AtomicTypeTag.Address]) }, new SimpleStructTag(OriginatingAddress)));
  return;
}

export function create_aptos_framework_account_ (
  $c: AptosDataCache,
): [HexString, SignerCapability] {
  let signer, signer_cap;
  signer = create_account_unchecked_(new HexString("0x1"), $c);
  signer_cap = new SignerCapability({ account: new HexString("0x1") }, new SimpleStructTag(SignerCapability));
  return [signer, signer_cap];
}

export function create_resource_account_ (
  source: HexString,
  seed: U8[],
  $c: AptosDataCache,
): [HexString, SignerCapability] {
  let temp$1, addr, bytes, signer, signer_cap;
  temp$1 = Std.Signer.address_of_(source, $c);
  bytes = Std.Bcs.to_bytes_(temp$1, $c, [AtomicTypeTag.Address]);
  Std.Vector.append_(bytes, $.copy(seed), $c, [AtomicTypeTag.U8]);
  addr = create_address_(Std.Hash.sha3_256_($.copy(bytes), $c), $c);
  signer = create_account_internal_($.copy(addr), $c);
  signer_cap = new SignerCapability({ account: $.copy(addr) }, new SimpleStructTag(SignerCapability));
  return [signer, signer_cap];
}

export function create_signer_ (
  addr: HexString,
  $c: AptosDataCache,
): HexString {
  return $.aptos_framework_account_create_signer(addr, $c);

}
export function create_signer_with_capability_ (
  capability: SignerCapability,
  $c: AptosDataCache,
): HexString {
  let addr;
  addr = capability.account;
  return create_signer_($.copy(addr), $c);
}

export function epilogue_ (
  account: HexString,
  _txn_sequence_number: U64,
  txn_gas_price: U64,
  txn_max_gas_units: U64,
  gas_units_remaining: U64,
  $c: AptosDataCache,
): void {
  let account_resource, addr, gas_used, old_sequence_number, transaction_fee_amount;
  if (!($.copy(txn_max_gas_units)).ge($.copy(gas_units_remaining))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EOUT_OF_GAS), $c));
  }
  gas_used = ($.copy(txn_max_gas_units)).sub($.copy(gas_units_remaining));
  if (!((u128($.copy(txn_gas_price))).mul(u128($.copy(gas_used)))).le($.copy(MAX_U64))) {
    throw $.abortCode(Std.Error.out_of_range_($.copy(EOUT_OF_GAS), $c));
  }
  transaction_fee_amount = ($.copy(txn_gas_price)).mul($.copy(gas_used));
  addr = Std.Signer.address_of_(account, $c);
  if (!(Coin.balance_($.copy(addr), $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])])).ge($.copy(transaction_fee_amount))) {
    throw $.abortCode(Std.Error.out_of_range_($.copy(PROLOGUE_ECANT_PAY_GAS_DEPOSIT), $c));
  }
  Transaction_fee.burn_fee_($.copy(addr), $.copy(transaction_fee_amount), $c);
  old_sequence_number = get_sequence_number_($.copy(addr), $c);
  if (!(u128($.copy(old_sequence_number))).lt($.copy(MAX_U64))) {
    throw $.abortCode(Std.Error.out_of_range_($.copy(ESEQUENCE_NUMBER_TOO_BIG), $c));
  }
  account_resource = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(addr));
  account_resource.sequence_number = ($.copy(old_sequence_number)).add(u64("1"));
  return;
}

export function exists_at_ (
  addr: HexString,
  $c: AptosDataCache,
): boolean {
  return $c.exists(new SimpleStructTag(Account), $.copy(addr));
}

export function get_authentication_key_ (
  addr: HexString,
  $c: AptosDataCache,
): U8[] {
  return $.copy($c.borrow_global<Account>(new SimpleStructTag(Account), $.copy(addr)).authentication_key);
}

export function get_sequence_number_ (
  addr: HexString,
  $c: AptosDataCache,
): U64 {
  return $.copy($c.borrow_global<Account>(new SimpleStructTag(Account), $.copy(addr)).sequence_number);
}

export function initialize_ (
  account: HexString,
  module_addr: HexString,
  module_name: U8[],
  script_prologue_name: U8[],
  module_prologue_name: U8[],
  writeset_prologue_name: U8[],
  multi_agent_prologue_name: U8[],
  user_epilogue_name: U8[],
  writeset_epilogue_name: U8[],
  $c: AptosDataCache,
): void {
  System_addresses.assert_aptos_framework_(account, $c);
  $c.move_to(new SimpleStructTag(ChainSpecificAccountInfo), account, new ChainSpecificAccountInfo({ module_addr: $.copy(module_addr), module_name: $.copy(module_name), script_prologue_name: $.copy(script_prologue_name), module_prologue_name: $.copy(module_prologue_name), writeset_prologue_name: $.copy(writeset_prologue_name), multi_agent_prologue_name: $.copy(multi_agent_prologue_name), user_epilogue_name: $.copy(user_epilogue_name), writeset_epilogue_name: $.copy(writeset_epilogue_name) }, new SimpleStructTag(ChainSpecificAccountInfo)));
  return;
}

export function module_prologue_ (
  sender: HexString,
  txn_sequence_number: U64,
  txn_public_key: U8[],
  txn_gas_price: U64,
  txn_max_gas_units: U64,
  txn_expiration_time: U64,
  chain_id: U8,
  $c: AptosDataCache,
): void {
  return prologue_common_(sender, $.copy(txn_sequence_number), $.copy(txn_public_key), $.copy(txn_gas_price), $.copy(txn_max_gas_units), $.copy(txn_expiration_time), $.copy(chain_id), $c);
}

export function multi_agent_script_prologue_ (
  sender: HexString,
  txn_sequence_number: U64,
  txn_sender_public_key: U8[],
  secondary_signer_addresses: HexString[],
  secondary_signer_public_key_hashes: U8[][],
  txn_gas_price: U64,
  txn_max_gas_units: U64,
  txn_expiration_time: U64,
  chain_id: U8,
  $c: AptosDataCache,
): void {
  let i, num_secondary_signers, secondary_address, signer_account, signer_public_key_hash;
  prologue_common_(sender, $.copy(txn_sequence_number), $.copy(txn_sender_public_key), $.copy(txn_gas_price), $.copy(txn_max_gas_units), $.copy(txn_expiration_time), $.copy(chain_id), $c);
  num_secondary_signers = Std.Vector.length_(secondary_signer_addresses, $c, [AtomicTypeTag.Address]);
  if (!(Std.Vector.length_(secondary_signer_public_key_hashes, $c, [new VectorTag(AtomicTypeTag.U8)])).eq(($.copy(num_secondary_signers)))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_ESECONDARY_KEYS_ADDRESSES_COUNT_MISMATCH), $c));
  }
  i = u64("0");
  while (($.copy(i)).lt($.copy(num_secondary_signers))) {
    {
      secondary_address = $.copy(Std.Vector.borrow_(secondary_signer_addresses, $.copy(i), $c, [AtomicTypeTag.Address]));
      if (!exists_at_($.copy(secondary_address), $c)) {
        throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_EACCOUNT_DOES_NOT_EXIST), $c));
      }
      signer_account = $c.borrow_global<Account>(new SimpleStructTag(Account), $.copy(secondary_address));
      signer_public_key_hash = $.copy(Std.Vector.borrow_(secondary_signer_public_key_hashes, $.copy(i), $c, [new VectorTag(AtomicTypeTag.U8)]));
      if (!$.veq($.copy(signer_public_key_hash), $.copy(signer_account.authentication_key))) {
        throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_EINVALID_ACCOUNT_AUTH_KEY), $c));
      }
      i = ($.copy(i)).add(u64("1"));
    }

  }return;
}

export function prologue_common_ (
  sender: HexString,
  txn_sequence_number: U64,
  txn_authentication_key: U8[],
  txn_gas_price: U64,
  txn_max_gas_units: U64,
  txn_expiration_time: U64,
  chain_id: U8,
  $c: AptosDataCache,
): void {
  let balance, max_transaction_fee, sender_account, transaction_sender;
  if (!(Timestamp.now_seconds_($c)).lt($.copy(txn_expiration_time))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_ETRANSACTION_EXPIRED), $c));
  }
  transaction_sender = Std.Signer.address_of_(sender, $c);
  if (!(Chain_id.get_($c)).eq(($.copy(chain_id)))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_EBAD_CHAIN_ID), $c));
  }
  if (!$c.exists(new SimpleStructTag(Account), $.copy(transaction_sender))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_EACCOUNT_DOES_NOT_EXIST), $c));
  }
  sender_account = $c.borrow_global<Account>(new SimpleStructTag(Account), $.copy(transaction_sender));
  if (!$.veq($.copy(txn_authentication_key), $.copy(sender_account.authentication_key))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_EINVALID_ACCOUNT_AUTH_KEY), $c));
  }
  if (!(u128($.copy(txn_sequence_number))).lt($.copy(MAX_U64))) {
    throw $.abortCode(Std.Error.out_of_range_($.copy(PROLOGUE_ESEQUENCE_NUMBER_TOO_BIG), $c));
  }
  if (!($.copy(txn_sequence_number)).ge($.copy(sender_account.sequence_number))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_ESEQUENCE_NUMBER_TOO_OLD), $c));
  }
  if (!($.copy(txn_sequence_number)).eq(($.copy(sender_account.sequence_number)))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_ESEQUENCE_NUMBER_TOO_NEW), $c));
  }
  max_transaction_fee = ($.copy(txn_gas_price)).mul($.copy(txn_max_gas_units));
  if (!Coin.is_account_registered_($.copy(transaction_sender), $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])])) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_ECANT_PAY_GAS_DEPOSIT), $c));
  }
  balance = Coin.balance_($.copy(transaction_sender), $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])]);
  if (!($.copy(balance)).ge($.copy(max_transaction_fee))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_ECANT_PAY_GAS_DEPOSIT), $c));
  }
  return;
}

export function register_coin_ (
  account_addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let account;
  account = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(account_addr));
  Aptos_std.Event.emit_event_(account.coin_register_events, new CoinRegisterEvent({ type_info: Aptos_std.Type_info.type_of_($c, [$p[0]]) }, new SimpleStructTag(CoinRegisterEvent)), $c, [new SimpleStructTag(CoinRegisterEvent)]);
  return;
}

export function rotate_authentication_key_ (
  account: HexString,
  new_auth_key: U8[],
  $c: AptosDataCache,
): void {
  rotate_authentication_key_internal_(account, $.copy(new_auth_key), $c);
  return;
}


export function buildPayload_rotate_authentication_key (
  new_auth_key: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "account",
    "rotate_authentication_key",
    typeParamStrings,
    [
      new_auth_key,
    ]
  );

}
export function rotate_authentication_key_ed25519_ (
  account: HexString,
  curr_sig_bytes: U8[],
  new_sig_bytes: U8[],
  curr_pk_bytes: U8[],
  new_pk_bytes: U8[],
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, account_resource, addr, address_map, challenge, curr_auth_key, curr_pubkey, curr_sig, expected_current_auth_key, new_address, new_auth_key, new_pubkey, new_sig;
  addr = Std.Signer.address_of_(account, $c);
  if (!exists_at_($.copy(addr), $c)) {
    throw $.abortCode(Std.Error.not_found_($.copy(EACCOUNT_DOES_NOT_EXIST), $c));
  }
  curr_pubkey = Aptos_std.Ed25519.new_unvalidated_public_key_from_bytes_($.copy(curr_pk_bytes), $c);
  new_pubkey = Aptos_std.Ed25519.new_unvalidated_public_key_from_bytes_($.copy(new_pk_bytes), $c);
  new_sig = Aptos_std.Ed25519.new_signature_from_bytes_($.copy(new_sig_bytes), $c);
  curr_sig = Aptos_std.Ed25519.new_signature_from_bytes_($.copy(curr_sig_bytes), $c);
  account_resource = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(addr));
  curr_auth_key = create_address_($.copy(account_resource.authentication_key), $c);
  Std.Vector.push_back_(curr_pk_bytes, u8("0"), $c, [AtomicTypeTag.U8]);
  expected_current_auth_key = Std.Hash.sha3_256_($.copy(curr_pk_bytes), $c);
  if (!((create_address_($.copy(expected_current_auth_key), $c)).hex() === ($.copy(curr_auth_key)).hex())) {
    throw $.abortCode(Std.Error.unauthenticated_($.copy(EWRONG_CURRENT_PUBLIC_KEY), $c));
  }
  challenge = new RotationProofChallenge({ sequence_number: $.copy(account_resource.sequence_number), originator: $.copy(addr), current_auth_key: $.copy(curr_auth_key), new_public_key: $.copy(new_pk_bytes) }, new SimpleStructTag(RotationProofChallenge));
  if (!Aptos_std.Ed25519.signature_verify_strict_t_(curr_sig, curr_pubkey, $.copy(challenge), $c, [new SimpleStructTag(RotationProofChallenge)])) {
    throw $.abortCode(Std.Error.permission_denied_($.copy(ENO_CAPABILITY), $c));
  }
  if (!Aptos_std.Ed25519.signature_verify_strict_t_(new_sig, new_pubkey, $.copy(challenge), $c, [new SimpleStructTag(RotationProofChallenge)])) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EINVALID_PROOF_OF_KNOWLEDGE), $c));
  }
  address_map = $c.borrow_global_mut<OriginatingAddress>(new SimpleStructTag(OriginatingAddress), new HexString("0x1")).address_map;
  [temp$1, temp$2] = [address_map, $.copy(curr_auth_key)];
  if (Aptos_std.Table.contains_(temp$1, temp$2, $c, [AtomicTypeTag.Address, AtomicTypeTag.Address])) {
    Aptos_std.Table.remove_(address_map, $.copy(curr_auth_key), $c, [AtomicTypeTag.Address, AtomicTypeTag.Address]);
  }
  else{
  }
  Std.Vector.push_back_(new_pk_bytes, u8("0"), $c, [AtomicTypeTag.U8]);
  new_auth_key = Std.Hash.sha3_256_($.copy(new_pk_bytes), $c);
  new_address = create_address_($.copy(new_auth_key), $c);
  Aptos_std.Table.add_(address_map, $.copy(new_address), $.copy(addr), $c, [AtomicTypeTag.Address, AtomicTypeTag.Address]);
  account_resource.authentication_key = $.copy(new_auth_key);
  return;
}


export function buildPayload_rotate_authentication_key_ed25519 (
  curr_sig_bytes: U8[],
  new_sig_bytes: U8[],
  curr_pk_bytes: U8[],
  new_pk_bytes: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "account",
    "rotate_authentication_key_ed25519",
    typeParamStrings,
    [
      curr_sig_bytes,
      new_sig_bytes,
      curr_pk_bytes,
      new_pk_bytes,
    ]
  );

}
export function rotate_authentication_key_internal_ (
  account: HexString,
  new_auth_key: U8[],
  $c: AptosDataCache,
): void {
  let account_resource, addr;
  addr = Std.Signer.address_of_(account, $c);
  if (!exists_at_($.copy(addr), $c)) {
    throw $.abortCode(Std.Error.not_found_($.copy(EACCOUNT_ALREADY_EXISTS), $c));
  }
  if (!(Std.Vector.length_(new_auth_key, $c, [AtomicTypeTag.U8])).eq((u64("32")))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EMALFORMED_AUTHENTICATION_KEY), $c));
  }
  account_resource = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(addr));
  account_resource.authentication_key = $.copy(new_auth_key);
  return;
}

export function script_prologue_ (
  sender: HexString,
  txn_sequence_number: U64,
  txn_public_key: U8[],
  txn_gas_price: U64,
  txn_max_gas_units: U64,
  txn_expiration_time: U64,
  chain_id: U8,
  _script_hash: U8[],
  $c: AptosDataCache,
): void {
  return prologue_common_(sender, $.copy(txn_sequence_number), $.copy(txn_public_key), $.copy(txn_gas_price), $.copy(txn_max_gas_units), $.copy(txn_expiration_time), $.copy(chain_id), $c);
}

export function transfer_ (
  source: HexString,
  to: HexString,
  amount: U64,
  $c: AptosDataCache,
): void {
  if (!$c.exists(new SimpleStructTag(Account), $.copy(to))) {
    create_account_($.copy(to), $c);
  }
  else{
  }
  return Coin.transfer_(source, $.copy(to), $.copy(amount), $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])]);
}


export function buildPayload_transfer (
  to: HexString,
  amount: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "account",
    "transfer",
    typeParamStrings,
    [
      to,
      amount,
    ]
  );

}
export function writeset_epilogue_ (
  _core_resource: HexString,
  _txn_sequence_number: U64,
  _should_trigger_reconfiguration: boolean,
  $c: AptosDataCache,
): void {
  if (!false) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EWRITESET_NOT_ALLOWED), $c));
  }
  return;
}

export function writeset_prologue_ (
  _sender: HexString,
  _txn_sequence_number: U64,
  _txn_public_key: U8[],
  _txn_expiration_time: U64,
  _chain_id: U8,
  $c: AptosDataCache,
): void {
  if (!false) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(PROLOGUE_EINVALID_WRITESET_SENDER), $c));
  }
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::account::Account", Account.AccountParser);
  repo.addParser("0x1::account::CapabilityOffer", CapabilityOffer.CapabilityOfferParser);
  repo.addParser("0x1::account::ChainSpecificAccountInfo", ChainSpecificAccountInfo.ChainSpecificAccountInfoParser);
  repo.addParser("0x1::account::CoinRegisterEvent", CoinRegisterEvent.CoinRegisterEventParser);
  repo.addParser("0x1::account::OriginatingAddress", OriginatingAddress.OriginatingAddressParser);
  repo.addParser("0x1::account::RotationCapability", RotationCapability.RotationCapabilityParser);
  repo.addParser("0x1::account::RotationProofChallenge", RotationProofChallenge.RotationProofChallengeParser);
  repo.addParser("0x1::account::SignerCapability", SignerCapability.SignerCapabilityParser);
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
  get Account() { return Account; }
  async loadAccount(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await Account.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get CapabilityOffer() { return CapabilityOffer; }
  get ChainSpecificAccountInfo() { return ChainSpecificAccountInfo; }
  async loadChainSpecificAccountInfo(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await ChainSpecificAccountInfo.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get CoinRegisterEvent() { return CoinRegisterEvent; }
  get OriginatingAddress() { return OriginatingAddress; }
  async loadOriginatingAddress(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await OriginatingAddress.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get RotationCapability() { return RotationCapability; }
  get RotationProofChallenge() { return RotationProofChallenge; }
  get SignerCapability() { return SignerCapability; }
  payload_create_account(
    auth_key: HexString,
  ) {
    return buildPayload_create_account(auth_key);
  }
  async create_account(
    _account: AptosAccount,
    auth_key: HexString,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_create_account(auth_key);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_rotate_authentication_key(
    new_auth_key: U8[],
  ) {
    return buildPayload_rotate_authentication_key(new_auth_key);
  }
  async rotate_authentication_key(
    _account: AptosAccount,
    new_auth_key: U8[],
    _maxGas = 1000,
  ) {
    const payload = buildPayload_rotate_authentication_key(new_auth_key);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_rotate_authentication_key_ed25519(
    curr_sig_bytes: U8[],
    new_sig_bytes: U8[],
    curr_pk_bytes: U8[],
    new_pk_bytes: U8[],
  ) {
    return buildPayload_rotate_authentication_key_ed25519(curr_sig_bytes, new_sig_bytes, curr_pk_bytes, new_pk_bytes);
  }
  async rotate_authentication_key_ed25519(
    _account: AptosAccount,
    curr_sig_bytes: U8[],
    new_sig_bytes: U8[],
    curr_pk_bytes: U8[],
    new_pk_bytes: U8[],
    _maxGas = 1000,
  ) {
    const payload = buildPayload_rotate_authentication_key_ed25519(curr_sig_bytes, new_sig_bytes, curr_pk_bytes, new_pk_bytes);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_transfer(
    to: HexString,
    amount: U64,
  ) {
    return buildPayload_transfer(to, amount);
  }
  async transfer(
    _account: AptosAccount,
    to: HexString,
    amount: U64,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_transfer(to, amount);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

