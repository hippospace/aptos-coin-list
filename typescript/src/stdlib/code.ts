import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Error from "./error";
import * as Option from "./option";
import * as Signer from "./signer";
import * as String from "./string";
import * as System_addresses from "./system_addresses";
import * as Util from "./util";
import * as Vector from "./vector";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "code";

export const EDEP_ARBITRARY_NOT_SAME_ADDRESS : U64 = u64("7");
export const EDEP_WEAKER_POLICY : U64 = u64("6");
export const EMODULE_MISSING : U64 = u64("4");
export const EMODULE_NAME_CLASH : U64 = u64("1");
export const EPACKAGE_DEP_MISSING : U64 = u64("5");
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
  { name: "source", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "source_map", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "extension", typeTag: new StructTag(new HexString("0x1"), "option", "Option", [new StructTag(new HexString("0x1"), "copyable_any", "Any", [])]) }];

  name: String.String;
  source: U8[];
  source_map: U8[];
  extension: Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as String.String;
    this.source = proto['source'] as U8[];
    this.source_map = proto['source_map'] as U8[];
    this.extension = proto['extension'] as Option.Option;
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
    await this.extension.loadFullState(app);
    this.__app = app;
  }

}

export class PackageDep 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "PackageDep";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "account", typeTag: AtomicTypeTag.Address },
  { name: "package_name", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) }];

  account: HexString;
  package_name: String.String;

  constructor(proto: any, public typeTag: TypeTag) {
    this.account = proto['account'] as HexString;
    this.package_name = proto['package_name'] as String.String;
  }

  static PackageDepParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PackageDep {
    const proto = $.parseStructProto(data, typeTag, repo, PackageDep);
    return new PackageDep(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "PackageDep", []);
  }
  async loadFullState(app: $.AppType) {
    await this.package_name.loadFullState(app);
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
  { name: "source_digest", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "manifest", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "modules", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "code", "ModuleMetadata", [])) },
  { name: "deps", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "code", "PackageDep", [])) },
  { name: "extension", typeTag: new StructTag(new HexString("0x1"), "option", "Option", [new StructTag(new HexString("0x1"), "copyable_any", "Any", [])]) }];

  name: String.String;
  upgrade_policy: UpgradePolicy;
  upgrade_number: U64;
  source_digest: String.String;
  manifest: U8[];
  modules: ModuleMetadata[];
  deps: PackageDep[];
  extension: Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as String.String;
    this.upgrade_policy = proto['upgrade_policy'] as UpgradePolicy;
    this.upgrade_number = proto['upgrade_number'] as U64;
    this.source_digest = proto['source_digest'] as String.String;
    this.manifest = proto['manifest'] as U8[];
    this.modules = proto['modules'] as ModuleMetadata[];
    this.deps = proto['deps'] as PackageDep[];
    this.extension = proto['extension'] as Option.Option;
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
    await this.source_digest.loadFullState(app);
    await this.extension.loadFullState(app);
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
  new_modules: String.String[],
  $c: AptosDataCache,
): void {
  let i, j, name, old_mod;
  i = u64("0");
  while (($.copy(i)).lt(Vector.length_(old_pack.modules, $c, [new SimpleStructTag(ModuleMetadata)]))) {
    {
      old_mod = Vector.borrow_(old_pack.modules, $.copy(i), $c, [new SimpleStructTag(ModuleMetadata)]);
      j = u64("0");
      while (($.copy(j)).lt(Vector.length_(new_modules, $c, [new StructTag(new HexString("0x1"), "string", "String", [])]))) {
        {
          name = Vector.borrow_(new_modules, $.copy(j), $c, [new StructTag(new HexString("0x1"), "string", "String", [])]);
          if (!!$.deep_eq(old_mod.name, name)) {
            throw $.abortCode(Error.already_exists_($.copy(EMODULE_NAME_CLASH), $c));
          }
          j = ($.copy(j)).add(u64("1"));
        }

      }i = ($.copy(i)).add(u64("1"));
    }

  }return;
}

export function check_dependencies_ (
  publish_address: HexString,
  pack: PackageMetadata,
  $c: AptosDataCache,
): void {
  let dep, dep_pack, deps, found, i, j, m, n, registry;
  deps = pack.deps;
  i = u64("0");
  n = Vector.length_(deps, $c, [new SimpleStructTag(PackageDep)]);
  while (($.copy(i)).lt($.copy(n))) {
    {
      dep = Vector.borrow_(deps, $.copy(i), $c, [new SimpleStructTag(PackageDep)]);
      if (!$c.exists(new SimpleStructTag(PackageRegistry), $.copy(dep.account))) {
        throw $.abortCode(Error.not_found_($.copy(EPACKAGE_DEP_MISSING), $c));
      }
      if (is_policy_exempted_address_($.copy(dep.account), $c)) {
        i = ($.copy(i)).add(u64("1"));
        continue;
      }
      else{
      }
      registry = $c.borrow_global<PackageRegistry>(new SimpleStructTag(PackageRegistry), $.copy(dep.account));
      j = u64("0");
      m = Vector.length_(registry.packages, $c, [new SimpleStructTag(PackageMetadata)]);
      found = false;
      while (($.copy(j)).lt($.copy(m))) {
        {
          dep_pack = Vector.borrow_(registry.packages, $.copy(j), $c, [new SimpleStructTag(PackageMetadata)]);
          if ($.deep_eq($.copy(dep_pack.name), $.copy(dep.package_name))) {
            if (!($.copy(dep_pack.upgrade_policy.policy)).ge($.copy(pack.upgrade_policy.policy))) {
              throw $.abortCode(Error.invalid_argument_($.copy(EDEP_WEAKER_POLICY), $c));
            }
            if ($.deep_eq($.copy(dep_pack.upgrade_policy), upgrade_policy_arbitrary_($c))) {
              if (!(($.copy(dep.account)).hex() === ($.copy(publish_address)).hex())) {
                throw $.abortCode(Error.invalid_argument_($.copy(EDEP_ARBITRARY_NOT_SAME_ADDRESS), $c));
              }
            }
            else{
            }
            found = true;
            break;
          }
          else{
          }
          j = ($.copy(j)).add(u64("1"));
        }

      }if (!found) {
        throw $.abortCode(Error.not_found_($.copy(EPACKAGE_DEP_MISSING), $c));
      }
      i = ($.copy(i)).add(u64("1"));
    }

  }return;
}

export function check_upgradability_ (
  old_pack: PackageMetadata,
  new_pack: PackageMetadata,
  new_modules: String.String[],
  $c: AptosDataCache,
): void {
  let temp$1, i, old_modules;
  temp$1 = upgrade_policy_immutable_($c);
  if (!($.copy(old_pack.upgrade_policy.policy)).lt($.copy(temp$1.policy))) {
    throw $.abortCode(Error.invalid_argument_($.copy(EUPGRADE_IMMUTABLE), $c));
  }
  if (!can_change_upgrade_policy_to_($.copy(old_pack.upgrade_policy), $.copy(new_pack.upgrade_policy), $c)) {
    throw $.abortCode(Error.invalid_argument_($.copy(EUPGRADE_WEAKER_POLICY), $c));
  }
  old_modules = get_module_names_(old_pack, $c);
  i = u64("0");
  while (($.copy(i)).lt(Vector.length_(old_modules, $c, [new StructTag(new HexString("0x1"), "string", "String", [])]))) {
    {
      if (!Vector.contains_(new_modules, Vector.borrow_(old_modules, $.copy(i), $c, [new StructTag(new HexString("0x1"), "string", "String", [])]), $c, [new StructTag(new HexString("0x1"), "string", "String", [])])) {
        throw $.abortCode($.copy(EMODULE_MISSING));
      }
      i = ($.copy(i)).add(u64("1"));
    }

  }return;
}

export function get_module_names_ (
  pack: PackageMetadata,
  $c: AptosDataCache,
): String.String[] {
  let i, module_names;
  module_names = Vector.empty_($c, [new StructTag(new HexString("0x1"), "string", "String", [])]);
  i = u64("0");
  while (($.copy(i)).lt(Vector.length_(pack.modules, $c, [new SimpleStructTag(ModuleMetadata)]))) {
    {
      Vector.push_back_(module_names, $.copy(Vector.borrow_(pack.modules, $.copy(i), $c, [new SimpleStructTag(ModuleMetadata)]).name), $c, [new StructTag(new HexString("0x1"), "string", "String", [])]);
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
  addr = Signer.address_of_(package_owner, $c);
  if (!$c.exists(new SimpleStructTag(PackageRegistry), $.copy(addr))) {
    $c.move_to(new SimpleStructTag(PackageRegistry), package_owner, new PackageRegistry({ packages: [metadata] }, new SimpleStructTag(PackageRegistry)));
  }
  else{
    Vector.push_back_($c.borrow_global_mut<PackageRegistry>(new SimpleStructTag(PackageRegistry), $.copy(addr)).packages, metadata, $c, [new SimpleStructTag(PackageMetadata)]);
  }
  return;
}

export function is_policy_exempted_address_ (
  addr: HexString,
  $c: AptosDataCache,
): boolean {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9;
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
    temp$9 = (($.copy(addr)).hex() === (new HexString("0xa")).hex());
  }
  return temp$9;
}

export function publish_package_ (
  owner: HexString,
  pack: PackageMetadata,
  code: U8[][],
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, addr, i, index, len, module_names, old, packages, policy, upgrade_number;
  addr = Signer.address_of_(owner, $c);
  if (!$c.exists(new SimpleStructTag(PackageRegistry), $.copy(addr))) {
    $c.move_to(new SimpleStructTag(PackageRegistry), owner, new PackageRegistry({ packages: Vector.empty_($c, [new SimpleStructTag(PackageMetadata)]) }, new SimpleStructTag(PackageRegistry)));
  }
  else{
  }
  check_dependencies_($.copy(addr), pack, $c);
  module_names = get_module_names_(pack, $c);
  packages = $c.borrow_global_mut<PackageRegistry>(new SimpleStructTag(PackageRegistry), $.copy(addr)).packages;
  len = Vector.length_(packages, $c, [new SimpleStructTag(PackageMetadata)]);
  index = $.copy(len);
  i = u64("0");
  upgrade_number = u64("0");
  while (($.copy(i)).lt($.copy(len))) {
    {
      [temp$1, temp$2] = [packages, $.copy(i)];
      old = Vector.borrow_(temp$1, temp$2, $c, [new SimpleStructTag(PackageMetadata)]);
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
  policy = $.copy(pack.upgrade_policy);
  if (($.copy(index)).lt($.copy(len))) {
    $.set(Vector.borrow_mut_(packages, $.copy(index), $c, [new SimpleStructTag(PackageMetadata)]), pack);
  }
  else{
    Vector.push_back_(packages, pack, $c, [new SimpleStructTag(PackageMetadata)]);
  }
  return request_publish_($.copy(addr), $.copy(module_names), $.copy(code), $.copy(policy.policy), $c);
}

export function publish_package_txn_ (
  owner: HexString,
  metadata_serialized: U8[],
  code: U8[][],
  $c: AptosDataCache,
): void {
  return publish_package_(owner, Util.from_bytes_($.copy(metadata_serialized), $c, [new SimpleStructTag(PackageMetadata)]), $.copy(code), $c);
}


export function buildPayload_publish_package_txn (
  metadata_serialized: U8[],
  code: U8[][],
  isJSON = false,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x1"),
    "code",
    "publish_package_txn",
    typeParamStrings,
    [
      metadata_serialized,
      code,
    ],
    isJSON,
  );

}
export function request_publish_ (
  owner: HexString,
  expected_modules: String.String[],
  bundle: U8[][],
  policy: U8,
  $c: AptosDataCache,
): void {
  return $.aptos_framework_code_request_publish(owner, expected_modules, bundle, policy, $c);

}
export function upgrade_policy_arbitrary_ (
  $c: AptosDataCache,
): UpgradePolicy {
  return new UpgradePolicy({ policy: u8("0") }, new SimpleStructTag(UpgradePolicy));
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

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::code::ModuleMetadata", ModuleMetadata.ModuleMetadataParser);
  repo.addParser("0x1::code::PackageDep", PackageDep.PackageDepParser);
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
  get PackageDep() { return PackageDep; }
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
    metadata_serialized: U8[],
    code: U8[][],
    isJSON = false,
  ) {
    return buildPayload_publish_package_txn(metadata_serialized, code, isJSON);
  }
  async publish_package_txn(
    _account: AptosAccount,
    metadata_serialized: U8[],
    code: U8[][],
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_publish_package_txn(metadata_serialized, code, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

