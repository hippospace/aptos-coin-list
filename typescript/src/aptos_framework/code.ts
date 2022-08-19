import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Std from "../std";
import * as System_addresses from "./system_addresses";
import * as Util from "./util";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "code";

export const EMODULE_MISSING : U64 = u64("4");
export const EMODULE_NAME_CLASH : U64 = u64("1");
export const EUPGRADE_IMMUTABLE : U64 = u64("2");
export const EUPGRADE_WEAKER_POLICY : U64 = u64("3");


export class ModuleMetadata 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "ModuleMetadata";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "source", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "source_map", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) }];

  name: Std.String.String;
  source: Std.String.String;
  source_map: Std.String.String;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as Std.String.String;
    this.source = proto['source'] as Std.String.String;
    this.source_map = proto['source_map'] as Std.String.String;
  }

  static ModuleMetadataParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ModuleMetadata {
    const proto = $.parseStructProto(data, typeTag, repo, ModuleMetadata);
    return new ModuleMetadata(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "ModuleMetadata", []);
  }
  async loadFullState(app: $.AppType) {
    await this.name.loadFullState(app);
    await this.source.loadFullState(app);
    await this.source_map.loadFullState(app);
    this.__app = app;
  }

}

export class PackageMetadata 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "PackageMetadata";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "upgrade_policy", typeTag: new StructTag(new HexString("0x1"), "code", "UpgradePolicy", []) },
  { name: "upgrade_number", typeTag: AtomicTypeTag.U64 },
  { name: "build_info", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "manifest", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "modules", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "code", "ModuleMetadata", [])) },
  { name: "error_map", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "abis", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "string", "String", [])) }];

  name: Std.String.String;
  upgrade_policy: UpgradePolicy;
  upgrade_number: U64;
  build_info: Std.String.String;
  manifest: Std.String.String;
  modules: ModuleMetadata[];
  error_map: Std.String.String;
  abis: Std.String.String[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as Std.String.String;
    this.upgrade_policy = proto['upgrade_policy'] as UpgradePolicy;
    this.upgrade_number = proto['upgrade_number'] as U64;
    this.build_info = proto['build_info'] as Std.String.String;
    this.manifest = proto['manifest'] as Std.String.String;
    this.modules = proto['modules'] as ModuleMetadata[];
    this.error_map = proto['error_map'] as Std.String.String;
    this.abis = proto['abis'] as Std.String.String[];
  }

  static PackageMetadataParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PackageMetadata {
    const proto = $.parseStructProto(data, typeTag, repo, PackageMetadata);
    return new PackageMetadata(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "PackageMetadata", []);
  }
  async loadFullState(app: $.AppType) {
    await this.name.loadFullState(app);
    await this.upgrade_policy.loadFullState(app);
    await this.build_info.loadFullState(app);
    await this.manifest.loadFullState(app);
    await this.error_map.loadFullState(app);
    this.__app = app;
  }

}

export class PackageRegistry 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "PackageRegistry";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "packages", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "code", "PackageMetadata", [])) }];

  packages: PackageMetadata[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.packages = proto['packages'] as PackageMetadata[];
  }

  static PackageRegistryParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PackageRegistry {
    const proto = $.parseStructProto(data, typeTag, repo, PackageRegistry);
    return new PackageRegistry(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PackageRegistry, typeParams);
    return result as unknown as PackageRegistry;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, PackageRegistry, typeParams);
    await result.loadFullState(app)
    return result as unknown as PackageRegistry;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "PackageRegistry", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class UpgradePolicy 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "UpgradePolicy";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "policy", typeTag: AtomicTypeTag.U8 }];

  policy: U8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.policy = proto['policy'] as U8;
  }

  static UpgradePolicyParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : UpgradePolicy {
    const proto = $.parseStructProto(data, typeTag, repo, UpgradePolicy);
    return new UpgradePolicy(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "UpgradePolicy", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function can_change_upgrade_policy_to_ (
  from: UpgradePolicy,
  to: UpgradePolicy,
  $c: AptosDataCache,
): boolean {
  return ($.copy(from.policy)).le($.copy(to.policy));
}

export function check_coexistence_ (
  old_pack: PackageMetadata,
  new_modules: Std.String.String[],
  $c: AptosDataCache,
): void {
  let i, j, name, old_mod;
  i = u64("0");
  while (($.copy(i)).lt(Std.Vector.length_(old_pack.modules, $c, [new SimpleStructTag(ModuleMetadata)]))) {
    {
      old_mod = Std.Vector.borrow_(old_pack.modules, $.copy(i), $c, [new SimpleStructTag(ModuleMetadata)]);
      j = u64("0");
      while (($.copy(j)).lt(Std.Vector.length_(new_modules, $c, [new StructTag(new HexString("0x1"), "string", "String", [])]))) {
        {
          name = Std.Vector.borrow_(new_modules, $.copy(j), $c, [new StructTag(new HexString("0x1"), "string", "String", [])]);
          if (!!$.deep_eq(old_mod.name, name)) {
            throw $.abortCode(Std.Error.already_exists_($.copy(EMODULE_NAME_CLASH), $c));
          }
          j = ($.copy(j)).add(u64("1"));
        }

      }i = ($.copy(i)).add(u64("1"));
    }

  }return;
}

export function check_upgradability_ (
  old_pack: PackageMetadata,
  new_pack: PackageMetadata,
  new_modules: Std.String.String[],
  $c: AptosDataCache,
): void {
  let temp$1, i, old_modules;
  temp$1 = upgrade_policy_immutable_($c);
  if (!($.copy(old_pack.upgrade_policy.policy)).lt($.copy(temp$1.policy))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EUPGRADE_IMMUTABLE), $c));
  }
  if (!can_change_upgrade_policy_to_($.copy(old_pack.upgrade_policy), $.copy(new_pack.upgrade_policy), $c)) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EUPGRADE_WEAKER_POLICY), $c));
  }
  old_modules = get_module_names_(old_pack, $c);
  i = u64("0");
  while (($.copy(i)).lt(Std.Vector.length_(old_modules, $c, [new StructTag(new HexString("0x1"), "string", "String", [])]))) {
    {
      if (!Std.Vector.contains_(new_modules, Std.Vector.borrow_(old_modules, $.copy(i), $c, [new StructTag(new HexString("0x1"), "string", "String", [])]), $c, [new StructTag(new HexString("0x1"), "string", "String", [])])) {
        throw $.abortCode($.copy(EMODULE_MISSING));
      }
      i = ($.copy(i)).add(u64("1"));
    }

  }return;
}

export function get_module_names_ (
  pack: PackageMetadata,
  $c: AptosDataCache,
): Std.String.String[] {
  let i, module_names;
  module_names = Std.Vector.empty_($c, [new StructTag(new HexString("0x1"), "string", "String", [])]);
  i = u64("0");
  while (($.copy(i)).lt(Std.Vector.length_(pack.modules, $c, [new SimpleStructTag(ModuleMetadata)]))) {
    {
      Std.Vector.push_back_(module_names, $.copy(Std.Vector.borrow_(pack.modules, $.copy(i), $c, [new SimpleStructTag(ModuleMetadata)]).name), $c, [new StructTag(new HexString("0x1"), "string", "String", [])]);
      i = ($.copy(i)).add(u64("1"));
    }

  }return $.copy(module_names);
}

export function initialize_ (
  aptos_framework: HexString,
  package_owner: HexString,
  metadata: PackageMetadata,
  $c: AptosDataCache,
): void {
  let addr;
  System_addresses.assert_aptos_framework_(aptos_framework, $c);
  addr = Std.Signer.address_of_(package_owner, $c);
  if (!$c.exists(new SimpleStructTag(PackageRegistry), $.copy(addr))) {
    $c.move_to(new SimpleStructTag(PackageRegistry), package_owner, new PackageRegistry({ packages: $.copy(metadata) }, new SimpleStructTag(PackageRegistry)));
  }
  else{
    Std.Vector.push_back_($c.borrow_global_mut<PackageRegistry>(new SimpleStructTag(PackageRegistry), $.copy(addr)).packages, $.copy(metadata), $c, [new SimpleStructTag(PackageMetadata)]);
  }
  return;
}

export function publish_package_ (
  owner: HexString,
  pack: PackageMetadata,
  code: U8[][],
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, addr, i, index, len, module_names, old, packages, upgrade_number;
  addr = Std.Signer.address_of_(owner, $c);
  if (!$c.exists(new SimpleStructTag(PackageRegistry), $.copy(addr))) {
    $c.move_to(new SimpleStructTag(PackageRegistry), owner, new PackageRegistry({ packages: Std.Vector.empty_($c, [new SimpleStructTag(PackageMetadata)]) }, new SimpleStructTag(PackageRegistry)));
  }
  else{
  }
  module_names = get_module_names_(pack, $c);
  packages = $c.borrow_global_mut<PackageRegistry>(new SimpleStructTag(PackageRegistry), $.copy(addr)).packages;
  len = Std.Vector.length_(packages, $c, [new SimpleStructTag(PackageMetadata)]);
  index = $.copy(len);
  i = u64("0");
  upgrade_number = u64("0");
  while (($.copy(i)).lt($.copy(len))) {
    {
      [temp$1, temp$2] = [packages, $.copy(i)];
      old = Std.Vector.borrow_(temp$1, temp$2, $c, [new SimpleStructTag(PackageMetadata)]);
      if ($.deep_eq($.copy(old.name), $.copy(pack.name))) {
        upgrade_number = ($.copy(old.upgrade_number)).add(u64("1"));
        check_upgradability_(old, pack, module_names, $c);
        index = $.copy(i);
      }
      else{
        check_coexistence_(old, module_names, $c);
      }
      i = ($.copy(i)).add(u64("1"));
    }

  }pack.upgrade_number = $.copy(upgrade_number);
  if (($.copy(index)).lt($.copy(len))) {
    $.set(Std.Vector.borrow_mut_(packages, $.copy(index), $c, [new SimpleStructTag(PackageMetadata)]), $.copy(pack));
  }
  else{
    Std.Vector.push_back_(packages, $.copy(pack), $c, [new SimpleStructTag(PackageMetadata)]);
  }
  return request_publish_($.copy(addr), $.copy(module_names), $.copy(code), $.copy(pack.upgrade_policy.policy), $c);
}

export function publish_package_txn_ (
  owner: HexString,
  pack_serialized: U8[],
  code: U8[][],
  $c: AptosDataCache,
): void {
  return publish_package_(owner, Util.from_bytes_($.copy(pack_serialized), $c, [new SimpleStructTag(PackageMetadata)]), $.copy(code), $c);
}


export function buildPayload_publish_package_txn (
  pack_serialized: U8[],
  code: U8[][],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "code",
    "publish_package_txn",
    typeParamStrings,
    [
      pack_serialized,
      code,
    ]
  );

}
export function request_publish_ (
  owner: HexString,
  expected_modules: Std.String.String[],
  bundle: U8[][],
  policy: U8,
  $c: AptosDataCache,
): void {
  return $.aptos_framework_code_request_publish(owner, expected_modules, bundle, policy, $c);

}
export function upgrade_policy_compat_ (
  $c: AptosDataCache,
): UpgradePolicy {
  return new UpgradePolicy({ policy: u8("1") }, new SimpleStructTag(UpgradePolicy));
}

export function upgrade_policy_immutable_ (
  $c: AptosDataCache,
): UpgradePolicy {
  return new UpgradePolicy({ policy: u8("2") }, new SimpleStructTag(UpgradePolicy));
}

export function upgrade_policy_no_compat_ (
  $c: AptosDataCache,
): UpgradePolicy {
  return new UpgradePolicy({ policy: u8("0") }, new SimpleStructTag(UpgradePolicy));
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::code::ModuleMetadata", ModuleMetadata.ModuleMetadataParser);
  repo.addParser("0x1::code::PackageMetadata", PackageMetadata.PackageMetadataParser);
  repo.addParser("0x1::code::PackageRegistry", PackageRegistry.PackageRegistryParser);
  repo.addParser("0x1::code::UpgradePolicy", UpgradePolicy.UpgradePolicyParser);
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
  get ModuleMetadata() { return ModuleMetadata; }
  get PackageMetadata() { return PackageMetadata; }
  get PackageRegistry() { return PackageRegistry; }
  async loadPackageRegistry(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await PackageRegistry.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get UpgradePolicy() { return UpgradePolicy; }
  payload_publish_package_txn(
    pack_serialized: U8[],
    code: U8[][],
  ) {
    return buildPayload_publish_package_txn(pack_serialized, code);
  }
  async publish_package_txn(
    _account: AptosAccount,
    pack_serialized: U8[],
    code: U8[][],
    _maxGas = 1000,
  ) {
    const payload = buildPayload_publish_package_txn(pack_serialized, code);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

