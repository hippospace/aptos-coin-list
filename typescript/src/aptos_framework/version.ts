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
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "version";

export const EINVALID_MAJOR_VERSION_NUMBER : U64 = u64("1");
export const ENOT_AUTHORIZED : U64 = u64("2");


export class Version 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "Version";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "major", typeTag: AtomicTypeTag.U64 }];

  major: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.major = proto['major'] as U64;
  }

  static VersionParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Version {
    const proto = $.parseStructProto(data, typeTag, repo, Version);
    return new Version(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Version, typeParams);
    return result as unknown as Version;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Version, typeParams);
    await result.loadFullState(app)
    return result as unknown as Version;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "Version", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function initialize_ (
  account: HexString,
  initial_version: U64,
  $c: AptosDataCache,
): void {
  System_addresses.assert_aptos_framework_(account, $c);
  $c.move_to(new SimpleStructTag(Version), account, new Version({ major: $.copy(initial_version) }, new SimpleStructTag(Version)));
  return;
}

export function set_version_ (
  account: HexString,
  major: U64,
  $c: AptosDataCache,
): void {
  let temp$1, address, config, old_major;
  address = Std.Signer.address_of_(account, $c);
  if (System_addresses.is_aptos_framework_address_($.copy(address), $c)) {
    temp$1 = true;
  }
  else{
    temp$1 = System_addresses.is_core_resource_address_($.copy(address), $c);
  }
  if (!temp$1) {
    throw $.abortCode(Std.Error.permission_denied_($.copy(ENOT_AUTHORIZED), $c));
  }
  old_major = $.copy($c.borrow_global<Version>(new SimpleStructTag(Version), new HexString("0x1")).major);
  if (!($.copy(old_major)).lt($.copy(major))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EINVALID_MAJOR_VERSION_NUMBER), $c));
  }
  config = $c.borrow_global_mut<Version>(new SimpleStructTag(Version), new HexString("0x1"));
  config.major = $.copy(major);
  Reconfiguration.reconfigure_($c);
  return;
}


export function buildPayload_set_version (
  major: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "version",
    "set_version",
    typeParamStrings,
    [
      major,
    ]
  );

}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::version::Version", Version.VersionParser);
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
  get Version() { return Version; }
  async loadVersion(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await Version.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  payload_set_version(
    major: U64,
  ) {
    return buildPayload_set_version(major);
  }
  async set_version(
    _account: AptosAccount,
    major: U64,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_set_version(major);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

