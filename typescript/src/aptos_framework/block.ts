import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
import * as Reconfiguration from "./reconfiguration";
import * as Stake from "./stake";
import * as System_addresses from "./system_addresses";
import * as Timestamp from "./timestamp";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "block";

export const EBLOCK_METADATA : U64 = u64("0");
export const EVM_OR_VALIDATOR : U64 = u64("1");


export class BlockResource 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "BlockResource";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "height", typeTag: AtomicTypeTag.U64 },
  { name: "epoch_interval", typeTag: AtomicTypeTag.U64 },
  { name: "new_block_events", typeTag: new StructTag(new HexString("0x1"), "event", "EventHandle", [new StructTag(new HexString("0x1"), "block", "NewBlockEvent", [])]) }];

  height: U64;
  epoch_interval: U64;
  new_block_events: Aptos_std.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.height = proto['height'] as U64;
    this.epoch_interval = proto['epoch_interval'] as U64;
    this.new_block_events = proto['new_block_events'] as Aptos_std.Event.EventHandle;
  }

  static BlockResourceParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BlockResource {
    const proto = $.parseStructProto(data, typeTag, repo, BlockResource);
    return new BlockResource(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, BlockResource, typeParams);
    return result as unknown as BlockResource;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, BlockResource, typeParams);
    await result.loadFullState(app)
    return result as unknown as BlockResource;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "BlockResource", []);
  }
  async loadFullState(app: $.AppType) {
    await this.new_block_events.loadFullState(app);
    this.__app = app;
  }

}

export class NewBlockEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "NewBlockEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "epoch", typeTag: AtomicTypeTag.U64 },
  { name: "round", typeTag: AtomicTypeTag.U64 },
  { name: "height", typeTag: AtomicTypeTag.U64 },
  { name: "previous_block_votes", typeTag: new VectorTag(AtomicTypeTag.Bool) },
  { name: "proposer", typeTag: AtomicTypeTag.Address },
  { name: "failed_proposer_indices", typeTag: new VectorTag(AtomicTypeTag.U64) },
  { name: "time_microseconds", typeTag: AtomicTypeTag.U64 }];

  epoch: U64;
  round: U64;
  height: U64;
  previous_block_votes: boolean[];
  proposer: HexString;
  failed_proposer_indices: U64[];
  time_microseconds: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.epoch = proto['epoch'] as U64;
    this.round = proto['round'] as U64;
    this.height = proto['height'] as U64;
    this.previous_block_votes = proto['previous_block_votes'] as boolean[];
    this.proposer = proto['proposer'] as HexString;
    this.failed_proposer_indices = proto['failed_proposer_indices'] as U64[];
    this.time_microseconds = proto['time_microseconds'] as U64;
  }

  static NewBlockEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : NewBlockEvent {
    const proto = $.parseStructProto(data, typeTag, repo, NewBlockEvent);
    return new NewBlockEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "NewBlockEvent", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function block_prologue_ (
  vm: HexString,
  epoch: U64,
  round: U64,
  proposer: HexString,
  proposer_index_optional: U64[],
  failed_proposer_indices: U64[],
  previous_block_votes: boolean[],
  timestamp: U64,
  $c: AptosDataCache,
): void {
  let temp$1, block_metadata_ref, new_block_event;
  Timestamp.assert_operating_($c);
  System_addresses.assert_vm_(vm, $c);
  if ((($.copy(proposer)).hex() === (new HexString("0x0")).hex())) {
    temp$1 = true;
  }
  else{
    temp$1 = Stake.is_current_epoch_validator_($.copy(proposer), $c);
  }
  if (!temp$1) {
    throw $.abortCode(Std.Error.permission_denied_($.copy(EVM_OR_VALIDATOR), $c));
  }
  block_metadata_ref = $c.borrow_global_mut<BlockResource>(new SimpleStructTag(BlockResource), new HexString("0x1"));
  block_metadata_ref.height = Aptos_std.Event.counter_(block_metadata_ref.new_block_events, $c, [new SimpleStructTag(NewBlockEvent)]);
  new_block_event = new NewBlockEvent({ epoch: $.copy(epoch), round: $.copy(round), height: $.copy(block_metadata_ref.height), previous_block_votes: $.copy(previous_block_votes), proposer: $.copy(proposer), failed_proposer_indices: $.copy(failed_proposer_indices), time_microseconds: $.copy(timestamp) }, new SimpleStructTag(NewBlockEvent));
  emit_new_block_event_(vm, block_metadata_ref.new_block_events, new_block_event, $c);
  Stake.update_performance_statistics_($.copy(proposer_index_optional), $.copy(failed_proposer_indices), $c);
  if ((($.copy(timestamp)).sub(Reconfiguration.last_reconfiguration_time_($c))).gt($.copy(block_metadata_ref.epoch_interval))) {
    Reconfiguration.reconfigure_($c);
  }
  else{
  }
  return;
}

export function emit_genesis_block_event_ (
  vm: HexString,
  $c: AptosDataCache,
): void {
  let block_metadata_ref;
  block_metadata_ref = $c.borrow_global_mut<BlockResource>(new SimpleStructTag(BlockResource), new HexString("0x1"));
  emit_new_block_event_(vm, block_metadata_ref.new_block_events, new NewBlockEvent({ epoch: u64("0"), round: u64("0"), height: u64("0"), previous_block_votes: Std.Vector.empty_($c, [AtomicTypeTag.Bool]), proposer: new HexString("0x0"), failed_proposer_indices: Std.Vector.empty_($c, [AtomicTypeTag.U64]), time_microseconds: u64("0") }, new SimpleStructTag(NewBlockEvent)), $c);
  return;
}

export function emit_new_block_event_ (
  vm: HexString,
  event_handle: Aptos_std.Event.EventHandle,
  new_block_event: NewBlockEvent,
  $c: AptosDataCache,
): void {
  Timestamp.update_global_time_(vm, $.copy(new_block_event.proposer), $.copy(new_block_event.time_microseconds), $c);
  if (!(Aptos_std.Event.counter_(event_handle, $c, [new SimpleStructTag(NewBlockEvent)])).eq(($.copy(new_block_event.height)))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EBLOCK_METADATA), $c));
  }
  Aptos_std.Event.emit_event_(event_handle, new_block_event, $c, [new SimpleStructTag(NewBlockEvent)]);
  return;
}

export function get_current_block_height_ (
  $c: AptosDataCache,
): U64 {
  if (!is_initialized_($c)) {
    throw $.abortCode(Std.Error.not_found_($.copy(EBLOCK_METADATA), $c));
  }
  return $.copy($c.borrow_global<BlockResource>(new SimpleStructTag(BlockResource), new HexString("0x1")).height);
}

export function initialize_block_metadata_ (
  account: HexString,
  epoch_interval: U64,
  $c: AptosDataCache,
): void {
  Timestamp.assert_genesis_($c);
  System_addresses.assert_aptos_framework_(account, $c);
  if (!!is_initialized_($c)) {
    throw $.abortCode(Std.Error.already_exists_($.copy(EBLOCK_METADATA), $c));
  }
  $c.move_to(new SimpleStructTag(BlockResource), account, new BlockResource({ height: u64("0"), epoch_interval: $.copy(epoch_interval), new_block_events: Aptos_std.Event.new_event_handle_(account, $c, [new SimpleStructTag(NewBlockEvent)]) }, new SimpleStructTag(BlockResource)));
  return;
}

export function is_initialized_ (
  $c: AptosDataCache,
): boolean {
  return $c.exists(new SimpleStructTag(BlockResource), new HexString("0x1"));
}

export function update_epoch_interval_ (
  aptos_framework: HexString,
  new_epoch_interval: U64,
  $c: AptosDataCache,
): void {
  let block_metadata;
  System_addresses.assert_aptos_framework_(aptos_framework, $c);
  block_metadata = $c.borrow_global_mut<BlockResource>(new SimpleStructTag(BlockResource), new HexString("0x1"));
  block_metadata.epoch_interval = $.copy(new_epoch_interval);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::block::BlockResource", BlockResource.BlockResourceParser);
  repo.addParser("0x1::block::NewBlockEvent", NewBlockEvent.NewBlockEventParser);
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
  get BlockResource() { return BlockResource; }
  async loadBlockResource(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await BlockResource.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get NewBlockEvent() { return NewBlockEvent; }
}

