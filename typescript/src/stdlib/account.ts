import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Bcs from "./bcs";
import * as Byte_conversions from "./byte_conversions";
import * as Debug from "./debug";
import * as Ed25519 from "./ed25519";
import * as Error from "./error";
import * as Event from "./event";
import * as Guid from "./guid";
import * as Hash from "./hash";
import * as Option from "./option";
import * as Signer from "./signer";
import * as System_addresses from "./system_addresses";
import * as Table from "./table";
import * as Type_info from "./type_info";
import * as Vector from "./vector";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "account";

export const EACCOUNT_ALREADY_EXISTS : U64 = u64("1");
export const EACCOUNT_DOES_NOT_EXIST : U64 = u64("2");
export const ECANNOT_RESERVED_ADDRESS : U64 = u64("5");
export const EINVALID_ACCEPT_ROTATION_CAPABILITY : U64 = u64("10");
export const EINVALID_PROOF_OF_KNOWLEDGE : U64 = u64("8");
export const EMALFORMED_AUTHENTICATION_KEY : U64 = u64("4");
export const ENO_CAPABILITY : U64 = u64("9");
export const ENO_VALID_FRAMEWORK_RESERVED_ADDRESS : U64 = u64("11");
export const EOUT_OF_GAS : U64 = u64("6");
export const ESEQUENCE_NUMBER_TOO_BIG : U64 = u64("3");
export const EWRONG_CURRENT_PUBLIC_KEY : U64 = u64("7");
export const MAX_U64 : U128 = u128("18446744073709551615");


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
  { name: "guid_creation_num", typeTag: AtomicTypeTag.U64 },
  { name: "coin_register_events", typeTag: new StructTag(new HexString("0x1"), "event", "EventHandle", [new StructTag(new HexString("0x1"), "account", "CoinRegisterEvent", [])]) },
  { name: "key_rotation_events", typeTag: new StructTag(new HexString("0x1"), "event", "EventHandle", [new StructTag(new HexString("0x1"), "account", "KeyRotationEvent", [])]) },
  { name: "rotation_capability_offer", typeTag: new StructTag(new HexString("0x1"), "account", "CapabilityOffer", [new StructTag(new HexString("0x1"), "account", "RotationCapability", [])]) },
  { name: "signer_capability_offer", typeTag: new StructTag(new HexString("0x1"), "account", "CapabilityOffer", [new StructTag(new HexString("0x1"), "account", "SignerCapability", [])]) }];

  authentication_key: U8[];
  sequence_number: U64;
  guid_creation_num: U64;
  coin_register_events: Event.EventHandle;
  key_rotation_events: Event.EventHandle;
  rotation_capability_offer: CapabilityOffer;
  signer_capability_offer: CapabilityOffer;

  constructor(proto: any, public typeTag: TypeTag) {
    this.authentication_key = proto['authentication_key'] as U8[];
    this.sequence_number = proto['sequence_number'] as U64;
    this.guid_creation_num = proto['guid_creation_num'] as U64;
    this.coin_register_events = proto['coin_register_events'] as Event.EventHandle;
    this.key_rotation_events = proto['key_rotation_events'] as Event.EventHandle;
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
    await this.key_rotation_events.loadFullState(app);
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

  for__: Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.for__ = proto['for__'] as Option.Option;
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

  type_info: Type_info.TypeInfo;

  constructor(proto: any, public typeTag: TypeTag) {
    this.type_info = proto['type_info'] as Type_info.TypeInfo;
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

export class KeyRotationEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "KeyRotationEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "old_authentication_key", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "new_authentication_key", typeTag: new VectorTag(AtomicTypeTag.U8) }];

  old_authentication_key: U8[];
  new_authentication_key: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.old_authentication_key = proto['old_authentication_key'] as U8[];
    this.new_authentication_key = proto['new_authentication_key'] as U8[];
  }

  static KeyRotationEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : KeyRotationEvent {
    const proto = $.parseStructProto(data, typeTag, repo, KeyRotationEvent);
    return new KeyRotationEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "KeyRotationEvent", []);
  }
  async loadFullState(app: $.AppType) {
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

  address_map: Table.Table;

  constructor(proto: any, public typeTag: TypeTag) {
    this.address_map = proto['address_map'] as Table.Table;
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

export class RotationCapabilityOfferProofChallenge 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "RotationCapabilityOfferProofChallenge";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "sequence_number", typeTag: AtomicTypeTag.U64 },
  { name: "recipient_address", typeTag: AtomicTypeTag.Address }];

  sequence_number: U64;
  recipient_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.sequence_number = proto['sequence_number'] as U64;
    this.recipient_address = proto['recipient_address'] as HexString;
  }

  static RotationCapabilityOfferProofChallengeParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RotationCapabilityOfferProofChallenge {
    const proto = $.parseStructProto(data, typeTag, repo, RotationCapabilityOfferProofChallenge);
    return new RotationCapabilityOfferProofChallenge(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "RotationCapabilityOfferProofChallenge", []);
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
export function accept_rotation_capability_ed25519_ (
  account: HexString,
  offerer_address: HexString,
  $c: AptosDataCache,
): RotationCapability {
  let account_resource, addr, rotation_capability;
  if (!exists_at_($.copy(offerer_address), $c)) {
    throw $.abortCode(Error.not_found_($.copy(EACCOUNT_DOES_NOT_EXIST), $c));
  }
  account_resource = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(offerer_address));
  addr = Signer.address_of_(account, $c);
  if (!Option.contains_(account_resource.rotation_capability_offer.for__, addr, $c, [AtomicTypeTag.Address])) {
    throw $.abortCode($.copy(EINVALID_ACCEPT_ROTATION_CAPABILITY));
  }
  rotation_capability = new RotationCapability({ account: $.copy(offerer_address) }, new SimpleStructTag(RotationCapability));
  Option.extract_(account_resource.rotation_capability_offer.for__, $c, [AtomicTypeTag.Address]);
  return rotation_capability;
}

export function create_account_ (
  new_address: HexString,
  $c: AptosDataCache,
): HexString {
  let temp$1;
  if (!!$c.exists(new SimpleStructTag(Account), $.copy(new_address))) {
    throw $.abortCode(Error.already_exists_($.copy(EACCOUNT_ALREADY_EXISTS), $c));
  }
  if ((($.copy(new_address)).hex() !== (new HexString("0x0")).hex())) {
    temp$1 = (($.copy(new_address)).hex() !== (new HexString("0x1")).hex());
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(Error.invalid_argument_($.copy(ECANNOT_RESERVED_ADDRESS), $c));
  }
  return create_account_unchecked_($.copy(new_address), $c);
}

export function create_account_unchecked_ (
  new_address: HexString,
  $c: AptosDataCache,
): HexString {
  let authentication_key, coin_register_events, guid_creation_num, guid_for_coin, guid_for_rotation, key_rotation_events, new_account;
  new_account = create_signer_($.copy(new_address), $c);
  authentication_key = Byte_conversions.from_address_(new_address, $c);
  if (!(Vector.length_(authentication_key, $c, [AtomicTypeTag.U8])).eq((u64("32")))) {
    throw $.abortCode(Error.invalid_argument_($.copy(EMALFORMED_AUTHENTICATION_KEY), $c));
  }
  guid_creation_num = u64("0");
  guid_for_coin = Guid.create_($.copy(new_address), guid_creation_num, $c);
  coin_register_events = Event.new_event_handle_(guid_for_coin, $c, [new SimpleStructTag(CoinRegisterEvent)]);
  guid_for_rotation = Guid.create_($.copy(new_address), guid_creation_num, $c);
  key_rotation_events = Event.new_event_handle_(guid_for_rotation, $c, [new SimpleStructTag(KeyRotationEvent)]);
  $c.move_to(new SimpleStructTag(Account), new_account, new Account({ authentication_key: $.copy(authentication_key), sequence_number: u64("0"), guid_creation_num: $.copy(guid_creation_num), coin_register_events: coin_register_events, key_rotation_events: key_rotation_events, rotation_capability_offer: new CapabilityOffer({ for: Option.none_($c, [AtomicTypeTag.Address]) }, new SimpleStructTag(CapabilityOffer, [new SimpleStructTag(RotationCapability)])), signer_capability_offer: new CapabilityOffer({ for: Option.none_($c, [AtomicTypeTag.Address]) }, new SimpleStructTag(CapabilityOffer, [new SimpleStructTag(SignerCapability)])) }, new SimpleStructTag(Account)));
  return new_account;
}

export function create_framework_reserved_account_ (
  addr: HexString,
  $c: AptosDataCache,
): [HexString, SignerCapability] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, signer, signer_cap;
  if ((($.copy(addr)).hex() === (new HexString("0x1")).hex())) {
    temp$1 = true;
  }
  else{
    temp$1 = (($.copy(addr)).hex() === (new HexString("0x2")).hex());
  }
  if (temp$1) {
    temp$2 = true;
  }
  else{
    temp$2 = (($.copy(addr)).hex() === (new HexString("0x3")).hex());
  }
  if (temp$2) {
    temp$3 = true;
  }
  else{
    temp$3 = (($.copy(addr)).hex() === (new HexString("0x4")).hex());
  }
  if (temp$3) {
    temp$4 = true;
  }
  else{
    temp$4 = (($.copy(addr)).hex() === (new HexString("0x5")).hex());
  }
  if (temp$4) {
    temp$5 = true;
  }
  else{
    temp$5 = (($.copy(addr)).hex() === (new HexString("0x6")).hex());
  }
  if (temp$5) {
    temp$6 = true;
  }
  else{
    temp$6 = (($.copy(addr)).hex() === (new HexString("0x7")).hex());
  }
  if (temp$6) {
    temp$7 = true;
  }
  else{
    temp$7 = (($.copy(addr)).hex() === (new HexString("0x8")).hex());
  }
  if (temp$7) {
    temp$8 = true;
  }
  else{
    temp$8 = (($.copy(addr)).hex() === (new HexString("0x9")).hex());
  }
  if (temp$8) {
    temp$9 = true;
  }
  else{
    temp$9 = (($.copy(addr)).hex() === (new HexString("0x10")).hex());
  }
  if (!temp$9) {
    throw $.abortCode(Error.permission_denied_($.copy(ENO_VALID_FRAMEWORK_RESERVED_ADDRESS), $c));
  }
  signer = create_account_unchecked_($.copy(addr), $c);
  signer_cap = new SignerCapability({ account: $.copy(addr) }, new SimpleStructTag(SignerCapability));
  return [signer, signer_cap];
}

export function create_guid_ (
  account_signer: HexString,
  $c: AptosDataCache,
): Guid.GUID {
  let account, addr;
  addr = Signer.address_of_(account_signer, $c);
  account = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(addr));
  return Guid.create_($.copy(addr), account.guid_creation_num, $c);
}

export function create_resource_account_ (
  source: HexString,
  seed: U8[],
  $c: AptosDataCache,
): [HexString, SignerCapability] {
  let temp$1, addr, bytes, signer, signer_cap;
  temp$1 = Signer.address_of_(source, $c);
  bytes = Bcs.to_bytes_(temp$1, $c, [AtomicTypeTag.Address]);
  Vector.append_(bytes, $.copy(seed), $c, [AtomicTypeTag.U8]);
  addr = Byte_conversions.to_address_(Hash.sha3_256_($.copy(bytes), $c), $c);
  signer = create_account_unchecked_($.copy(addr), $c);
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

export function get_guid_next_creation_num_ (
  addr: HexString,
  $c: AptosDataCache,
): U64 {
  return $.copy($c.borrow_global<Account>(new SimpleStructTag(Account), $.copy(addr)).guid_creation_num);
}

export function get_sequence_number_ (
  addr: HexString,
  $c: AptosDataCache,
): U64 {
  return $.copy($c.borrow_global<Account>(new SimpleStructTag(Account), $.copy(addr)).sequence_number);
}

export function increment_sequence_number_ (
  addr: HexString,
  $c: AptosDataCache,
): void {
  let account_resource, old_sequence_number;
  account_resource = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(addr));
  old_sequence_number = $.copy(account_resource.sequence_number);
  if (!(u128($.copy(old_sequence_number))).lt($.copy(MAX_U64))) {
    throw $.abortCode(Error.out_of_range_($.copy(ESEQUENCE_NUMBER_TOO_BIG), $c));
  }
  account_resource.sequence_number = ($.copy(old_sequence_number)).add(u64("1"));
  return;
}

export function initialize_ (
  aptos_framework: HexString,
  $c: AptosDataCache,
): void {
  System_addresses.assert_aptos_framework_(aptos_framework, $c);
  $c.move_to(new SimpleStructTag(OriginatingAddress), aptos_framework, new OriginatingAddress({ address_map: Table.new___($c, [AtomicTypeTag.Address, AtomicTypeTag.Address]) }, new SimpleStructTag(OriginatingAddress)));
  return;
}

export function new_event_handle_ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): Event.EventHandle {
  return Event.new_event_handle_(create_guid_(account, $c), $c, [$p[0]]);
}

export function offer_rotation_capability_ed25519_ (
  account: HexString,
  rotation_capability_sig_bytes: U8[],
  account_public_key_bytes: U8[],
  recipient_address: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, account_resource, addr, pubkey, rotation_capability_offer_proof_challenge, rotation_capability_sig;
  addr = Signer.address_of_(account, $c);
  if (exists_at_($.copy(addr), $c)) {
    temp$1 = exists_at_($.copy(recipient_address), $c);
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(Error.not_found_($.copy(EACCOUNT_DOES_NOT_EXIST), $c));
  }
  pubkey = Ed25519.new_unvalidated_public_key_from_bytes_($.copy(account_public_key_bytes), $c);
  rotation_capability_sig = Ed25519.new_signature_from_bytes_($.copy(rotation_capability_sig_bytes), $c);
  account_resource = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(addr));
  if (!verify_authentication_key_matches_ed25519_public_key_($.copy(account_resource.authentication_key), $.copy(account_public_key_bytes), $c)) {
    throw $.abortCode($.copy(EWRONG_CURRENT_PUBLIC_KEY));
  }
  Debug.print_(account_resource, $c, [new SimpleStructTag(Account)]);
  rotation_capability_offer_proof_challenge = new RotationCapabilityOfferProofChallenge({ sequence_number: $.copy(account_resource.sequence_number), recipient_address: $.copy(recipient_address) }, new SimpleStructTag(RotationCapabilityOfferProofChallenge));
  Debug.print_(account_resource.sequence_number, $c, [AtomicTypeTag.U64]);
  if (!Ed25519.signature_verify_strict_t_(rotation_capability_sig, pubkey, rotation_capability_offer_proof_challenge, $c, [new SimpleStructTag(RotationCapabilityOfferProofChallenge)])) {
    throw $.abortCode($.copy(EINVALID_PROOF_OF_KNOWLEDGE));
  }
  Option.fill_(account_resource.rotation_capability_offer.for__, $.copy(recipient_address), $c, [AtomicTypeTag.Address]);
  return;
}


export function buildPayload_offer_rotation_capability_ed25519 (
  rotation_capability_sig_bytes: U8[],
  account_public_key_bytes: U8[],
  recipient_address: HexString,
  isJSON = false,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "account",
    "offer_rotation_capability_ed25519",
    typeParamStrings,
    [
      rotation_capability_sig_bytes,
      account_public_key_bytes,
      recipient_address,
    ],
    isJSON,
  );

}
export function register_coin_ (
  account_addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let account;
  account = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(account_addr));
  Event.emit_event_(account.coin_register_events, new CoinRegisterEvent({ type_info: Type_info.type_of_($c, [$p[0]]) }, new SimpleStructTag(CoinRegisterEvent)), $c, [new SimpleStructTag(CoinRegisterEvent)]);
  return;
}

export function rotate_authentication_key_ed25519_ (
  account: HexString,
  curr_sig_bytes: U8[],
  new_sig_bytes: U8[],
  curr_pk_bytes: U8[],
  new_pk_bytes: U8[],
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, account_resource, addr, address_map, challenge, curr_auth_key, curr_pubkey, curr_sig, new_address, new_auth_key, new_pubkey, new_sig;
  addr = Signer.address_of_(account, $c);
  if (!exists_at_($.copy(addr), $c)) {
    throw $.abortCode(Error.not_found_($.copy(EACCOUNT_DOES_NOT_EXIST), $c));
  }
  curr_pubkey = Ed25519.new_unvalidated_public_key_from_bytes_($.copy(curr_pk_bytes), $c);
  new_pubkey = Ed25519.new_unvalidated_public_key_from_bytes_($.copy(new_pk_bytes), $c);
  new_sig = Ed25519.new_signature_from_bytes_($.copy(new_sig_bytes), $c);
  curr_sig = Ed25519.new_signature_from_bytes_($.copy(curr_sig_bytes), $c);
  account_resource = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(addr));
  if (!verify_authentication_key_matches_ed25519_public_key_($.copy(account_resource.authentication_key), $.copy(curr_pk_bytes), $c)) {
    throw $.abortCode(Error.unauthenticated_($.copy(EWRONG_CURRENT_PUBLIC_KEY), $c));
  }
  curr_auth_key = Byte_conversions.to_address_($.copy(account_resource.authentication_key), $c);
  challenge = new RotationProofChallenge({ sequence_number: $.copy(account_resource.sequence_number), originator: $.copy(addr), current_auth_key: $.copy(curr_auth_key), new_public_key: $.copy(new_pk_bytes) }, new SimpleStructTag(RotationProofChallenge));
  if (!Ed25519.signature_verify_strict_t_(curr_sig, curr_pubkey, $.copy(challenge), $c, [new SimpleStructTag(RotationProofChallenge)])) {
    throw $.abortCode(Error.permission_denied_($.copy(ENO_CAPABILITY), $c));
  }
  if (!Ed25519.signature_verify_strict_t_(new_sig, new_pubkey, $.copy(challenge), $c, [new SimpleStructTag(RotationProofChallenge)])) {
    throw $.abortCode(Error.invalid_argument_($.copy(EINVALID_PROOF_OF_KNOWLEDGE), $c));
  }
  address_map = $c.borrow_global_mut<OriginatingAddress>(new SimpleStructTag(OriginatingAddress), new HexString("0x1")).address_map;
  [temp$1, temp$2] = [address_map, $.copy(curr_auth_key)];
  if (Table.contains_(temp$1, temp$2, $c, [AtomicTypeTag.Address, AtomicTypeTag.Address])) {
    Table.remove_(address_map, $.copy(curr_auth_key), $c, [AtomicTypeTag.Address, AtomicTypeTag.Address]);
  }
  else{
  }
  Vector.push_back_(new_pk_bytes, u8("0"), $c, [AtomicTypeTag.U8]);
  new_auth_key = Hash.sha3_256_($.copy(new_pk_bytes), $c);
  new_address = Byte_conversions.to_address_($.copy(new_auth_key), $c);
  Table.add_(address_map, $.copy(new_address), $.copy(addr), $c, [AtomicTypeTag.Address, AtomicTypeTag.Address]);
  account_resource.authentication_key = $.copy(new_auth_key);
  return;
}


export function buildPayload_rotate_authentication_key_ed25519 (
  curr_sig_bytes: U8[],
  new_sig_bytes: U8[],
  curr_pk_bytes: U8[],
  new_pk_bytes: U8[],
  isJSON = false,
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
    ],
    isJSON,
  );

}
export function rotate_authentication_key_internal_ (
  account: HexString,
  new_auth_key: U8[],
  $c: AptosDataCache,
): void {
  let account_resource, addr;
  addr = Signer.address_of_(account, $c);
  if (!exists_at_($.copy(addr), $c)) {
    throw $.abortCode(Error.not_found_($.copy(EACCOUNT_ALREADY_EXISTS), $c));
  }
  if (!(Vector.length_(new_auth_key, $c, [AtomicTypeTag.U8])).eq((u64("32")))) {
    throw $.abortCode(Error.invalid_argument_($.copy(EMALFORMED_AUTHENTICATION_KEY), $c));
  }
  account_resource = $c.borrow_global_mut<Account>(new SimpleStructTag(Account), $.copy(addr));
  account_resource.authentication_key = $.copy(new_auth_key);
  return;
}

export function verify_authentication_key_matches_ed25519_public_key_ (
  account_auth_key: U8[],
  account_public_key_bytes: U8[],
  $c: AptosDataCache,
): boolean {
  let expected_account_auth_key;
  Vector.push_back_(account_public_key_bytes, u8("0"), $c, [AtomicTypeTag.U8]);
  expected_account_auth_key = Hash.sha3_256_($.copy(account_public_key_bytes), $c);
  return $.veq($.copy(expected_account_auth_key), $.copy(account_auth_key));
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::account::Account", Account.AccountParser);
  repo.addParser("0x1::account::CapabilityOffer", CapabilityOffer.CapabilityOfferParser);
  repo.addParser("0x1::account::CoinRegisterEvent", CoinRegisterEvent.CoinRegisterEventParser);
  repo.addParser("0x1::account::KeyRotationEvent", KeyRotationEvent.KeyRotationEventParser);
  repo.addParser("0x1::account::OriginatingAddress", OriginatingAddress.OriginatingAddressParser);
  repo.addParser("0x1::account::RotationCapability", RotationCapability.RotationCapabilityParser);
  repo.addParser("0x1::account::RotationCapabilityOfferProofChallenge", RotationCapabilityOfferProofChallenge.RotationCapabilityOfferProofChallengeParser);
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
  get CoinRegisterEvent() { return CoinRegisterEvent; }
  get KeyRotationEvent() { return KeyRotationEvent; }
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
  get RotationCapabilityOfferProofChallenge() { return RotationCapabilityOfferProofChallenge; }
  get RotationProofChallenge() { return RotationProofChallenge; }
  get SignerCapability() { return SignerCapability; }
  payload_offer_rotation_capability_ed25519(
    rotation_capability_sig_bytes: U8[],
    account_public_key_bytes: U8[],
    recipient_address: HexString,
    isJSON = false,
  ) {
    return buildPayload_offer_rotation_capability_ed25519(rotation_capability_sig_bytes, account_public_key_bytes, recipient_address, isJSON);
  }
  async offer_rotation_capability_ed25519(
    _account: AptosAccount,
    rotation_capability_sig_bytes: U8[],
    account_public_key_bytes: U8[],
    recipient_address: HexString,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_offer_rotation_capability_ed25519(rotation_capability_sig_bytes, account_public_key_bytes, recipient_address, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_rotate_authentication_key_ed25519(
    curr_sig_bytes: U8[],
    new_sig_bytes: U8[],
    curr_pk_bytes: U8[],
    new_pk_bytes: U8[],
    isJSON = false,
  ) {
    return buildPayload_rotate_authentication_key_ed25519(curr_sig_bytes, new_sig_bytes, curr_pk_bytes, new_pk_bytes, isJSON);
  }
  async rotate_authentication_key_ed25519(
    _account: AptosAccount,
    curr_sig_bytes: U8[],
    new_sig_bytes: U8[],
    curr_pk_bytes: U8[],
    new_pk_bytes: U8[],
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_rotate_authentication_key_ed25519(curr_sig_bytes, new_sig_bytes, curr_pk_bytes, new_pk_bytes, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

