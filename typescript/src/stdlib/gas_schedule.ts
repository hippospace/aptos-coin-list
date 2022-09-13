import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Error from "./error";
import * as Reconfiguration from "./reconfiguration";
import * as String from "./string";
import * as System_addresses from "./system_addresses";
import * as Util from "./util";
import * as Vector from "./vector";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "gas_schedule";

export const EINVALID_GAS_SCHEDULE : U64 = u64("1");


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

  key: String.String;
  val: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.key = proto['key'] as String.String;
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
  aptos_framework: HexString,
  gas_schedule_blob: U8[],
  $c: AptosDataCache,
): void {
  System_addresses.assert_aptos_framework_(aptos_framework, $c);
  if (!(Vector.length_(gas_schedule_blob, $c, [AtomicTypeTag.U8])).gt(u64("0"))) {
    throw $.abortCode(Error.invalid_argument_($.copy(EINVALID_GAS_SCHEDULE), $c));
  }
  $c.move_to(new SimpleStructTag(GasSchedule), aptos_framework, Util.from_bytes_($.copy(gas_schedule_blob), $c, [new SimpleStructTag(GasSchedule)]));
  return;
}

export function set_gas_schedule_ (
  aptos_framework: HexString,
  gas_schedule_blob: U8[],
  $c: AptosDataCache,
): void {
  let gas_schedule;
  System_addresses.assert_aptos_framework_(aptos_framework, $c);
  if (!(Vector.length_(gas_schedule_blob, $c, [AtomicTypeTag.U8])).gt(u64("0"))) {
    throw $.abortCode(Error.invalid_argument_($.copy(EINVALID_GAS_SCHEDULE), $c));
  }
  gas_schedule = $c.borrow_global_mut<GasSchedule>(new SimpleStructTag(GasSchedule), new HexString("0x1"));
  $.set(gas_schedule, Util.from_bytes_($.copy(gas_schedule_blob), $c, [new SimpleStructTag(GasSchedule)]));
  Reconfiguration.reconfigure_($c);
  return;
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
}

