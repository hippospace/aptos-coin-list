import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Error from "./error";
import * as System_addresses from "./system_addresses";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "state_storage";

export const EEPOCH_ZERO : U64 = u64("2");
export const EGAS_PARAMETER : U64 = u64("1");
export const ESTATE_STORAGE_USAGE : U64 = u64("0");


export class GasParameter 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "GasParameter";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "usage", typeTag: new StructTag(new HexString("0x1"), "state_storage", "Usage", []) }];

  usage: Usage;

  constructor(proto: any, public typeTag: TypeTag) {
    this.usage = proto['usage'] as Usage;
  }

  static GasParameterParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GasParameter {
    const proto = $.parseStructProto(data, typeTag, repo, GasParameter);
    return new GasParameter(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, GasParameter, typeParams);
    return result as unknown as GasParameter;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, GasParameter, typeParams);
    await result.loadFullState(app)
    return result as unknown as GasParameter;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "GasParameter", []);
  }
  async loadFullState(app: $.AppType) {
    await this.usage.loadFullState(app);
    this.__app = app;
  }

}

export class StateStorageUsage 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "StateStorageUsage";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "epoch", typeTag: AtomicTypeTag.U64 },
  { name: "usage", typeTag: new StructTag(new HexString("0x1"), "state_storage", "Usage", []) }];

  epoch: U64;
  usage: Usage;

  constructor(proto: any, public typeTag: TypeTag) {
    this.epoch = proto['epoch'] as U64;
    this.usage = proto['usage'] as Usage;
  }

  static StateStorageUsageParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : StateStorageUsage {
    const proto = $.parseStructProto(data, typeTag, repo, StateStorageUsage);
    return new StateStorageUsage(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, StateStorageUsage, typeParams);
    return result as unknown as StateStorageUsage;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, StateStorageUsage, typeParams);
    await result.loadFullState(app)
    return result as unknown as StateStorageUsage;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "StateStorageUsage", []);
  }
  async loadFullState(app: $.AppType) {
    await this.usage.loadFullState(app);
    this.__app = app;
  }

}

export class Usage 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "Usage";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "items", typeTag: AtomicTypeTag.U64 },
  { name: "bytes", typeTag: AtomicTypeTag.U64 }];

  items: U64;
  bytes: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.items = proto['items'] as U64;
    this.bytes = proto['bytes'] as U64;
  }

  static UsageParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Usage {
    const proto = $.parseStructProto(data, typeTag, repo, Usage);
    return new Usage(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "Usage", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function get_state_storage_usage_only_at_epoch_beginning_ (
  $c: AptosDataCache,
): Usage {
  return $.aptos_framework_state_storage_get_state_storage_usage_only_at_epoch_beginning($c);

}
export function initialize_ (
  aptos_framework: HexString,
  $c: AptosDataCache,
): void {
  System_addresses.assert_aptos_framework_(aptos_framework, $c);
  if (!!$c.exists(new SimpleStructTag(StateStorageUsage), new HexString("0x1"))) {
    throw $.abortCode(Error.already_exists_($.copy(ESTATE_STORAGE_USAGE), $c));
  }
  if (!!$c.exists(new SimpleStructTag(GasParameter), new HexString("0x1"))) {
    throw $.abortCode(Error.already_exists_($.copy(EGAS_PARAMETER), $c));
  }
  $c.move_to(new SimpleStructTag(StateStorageUsage), aptos_framework, new StateStorageUsage({ epoch: u64("0"), usage: new Usage({ items: u64("0"), bytes: u64("0") }, new SimpleStructTag(Usage)) }, new SimpleStructTag(StateStorageUsage)));
  $c.move_to(new SimpleStructTag(GasParameter), aptos_framework, new GasParameter({ usage: new Usage({ items: u64("0"), bytes: u64("0") }, new SimpleStructTag(Usage)) }, new SimpleStructTag(GasParameter)));
  return;
}

export function on_new_block_ (
  epoch: U64,
  $c: AptosDataCache,
): void {
  let usage;
  usage = $c.borrow_global_mut<StateStorageUsage>(new SimpleStructTag(StateStorageUsage), new HexString("0x1"));
  if (($.copy(epoch)).neq($.copy(usage.epoch))) {
    usage.epoch = $.copy(epoch);
    usage.usage = get_state_storage_usage_only_at_epoch_beginning_($c);
  }
  else{
  }
  return;
}

export function on_reconfig_ (
  $c: AptosDataCache,
): void {
  let gas_parameter, usage;
  gas_parameter = $c.borrow_global_mut<GasParameter>(new SimpleStructTag(GasParameter), new HexString("0x1"));
  usage = $c.borrow_global<StateStorageUsage>(new SimpleStructTag(StateStorageUsage), new HexString("0x1"));
  gas_parameter.usage = $.copy(usage.usage);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::state_storage::GasParameter", GasParameter.GasParameterParser);
  repo.addParser("0x1::state_storage::StateStorageUsage", StateStorageUsage.StateStorageUsageParser);
  repo.addParser("0x1::state_storage::Usage", Usage.UsageParser);
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
  get GasParameter() { return GasParameter; }
  async loadGasParameter(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await GasParameter.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get StateStorageUsage() { return StateStorageUsage; }
  async loadStateStorageUsage(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await StateStorageUsage.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get Usage() { return Usage; }
}

