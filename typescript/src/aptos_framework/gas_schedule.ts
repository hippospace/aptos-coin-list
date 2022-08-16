import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Std from "../std";
import * as Reconfiguration from "./reconfiguration";
import * as System_addresses from "./system_addresses";
import * as Timestamp from "./timestamp";
import * as Util from "./util";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "gas_schedule";

export const ECONFIG : U64 = u64("1");
export const EGAS_CONSTANT_INCONSISTENCY : U64 = u64("2");


export class GasEntry 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "GasEntry";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "key", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "val", typeTag: AtomicTypeTag.U64 }];

  key: Std.String.String;
  val: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.key = proto['key'] as Std.String.String;
    this.val = proto['val'] as U64;
  }

  static GasEntryParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GasEntry {
    const proto = $.parseStructProto(data, typeTag, repo, GasEntry);
    return new GasEntry(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "GasEntry", []);
  }
  async loadFullState(app: $.AppType) {
    await this.key.loadFullState(app);
    this.__app = app;
  }

}

export class GasSchedule 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "GasSchedule";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "entries", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "gas_schedule", "GasEntry", [])) }];

  entries: GasEntry[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.entries = proto['entries'] as GasEntry[];
  }

  static GasScheduleParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GasSchedule {
    const proto = $.parseStructProto(data, typeTag, repo, GasSchedule);
    return new GasSchedule(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, GasSchedule, typeParams);
    return result as unknown as GasSchedule;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, GasSchedule, typeParams);
    await result.loadFullState(app)
    return result as unknown as GasSchedule;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "GasSchedule", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function initialize_ (
  account: HexString,
  gas_schedule_blob: U8[],
  $c: AptosDataCache,
): void {
  Timestamp.assert_genesis_($c);
  System_addresses.assert_aptos_framework_(account, $c);
  if (!!$c.exists(new SimpleStructTag(GasSchedule), new HexString("0x1"))) {
    throw $.abortCode(Std.Error.already_exists_($.copy(ECONFIG), $c));
  }
  $c.move_to(new SimpleStructTag(GasSchedule), account, Util.from_bytes_($.copy(gas_schedule_blob), $c, [new SimpleStructTag(GasSchedule)]));
  return;
}

export function set_gas_schedule_ (
  account: HexString,
  gas_schedule_blob: U8[],
  $c: AptosDataCache,
): void {
  let gas_schedule;
  Timestamp.assert_operating_($c);
  System_addresses.assert_core_resource_(account, $c);
  if (!$c.exists(new SimpleStructTag(GasSchedule), new HexString("0x1"))) {
    throw $.abortCode(Std.Error.not_found_($.copy(ECONFIG), $c));
  }
  gas_schedule = $c.borrow_global_mut<GasSchedule>(new SimpleStructTag(GasSchedule), new HexString("0x1"));
  $.set(gas_schedule, Util.from_bytes_($.copy(gas_schedule_blob), $c, [new SimpleStructTag(GasSchedule)]));
  Reconfiguration.reconfigure_($c);
  return;
}


export function buildPayload_set_gas_schedule (
  gas_schedule_blob: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::gas_schedule::set_gas_schedule",
    typeParamStrings,
    [
      $.u8ArrayArg(gas_schedule_blob),
    ]
  );

}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::gas_schedule::GasEntry", GasEntry.GasEntryParser);
  repo.addParser("0x1::gas_schedule::GasSchedule", GasSchedule.GasScheduleParser);
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
  get GasEntry() { return GasEntry; }
  get GasSchedule() { return GasSchedule; }
  async loadGasSchedule(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await GasSchedule.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  payload_set_gas_schedule(
    gas_schedule_blob: U8[],
  ) {
    return buildPayload_set_gas_schedule(gas_schedule_blob);
  }
  async set_gas_schedule(
    _account: AptosAccount,
    gas_schedule_blob: U8[],
    _maxGas = 1000,
  ) {
    const payload = buildPayload_set_gas_schedule(gas_schedule_blob);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

