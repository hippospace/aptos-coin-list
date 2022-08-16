import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
import * as Account from "./account";
import * as Coin from "./coin";
import * as Governance_proposal from "./governance_proposal";
import * as Reconfiguration from "./reconfiguration";
import * as Stake from "./stake";
import * as System_addresses from "./system_addresses";
import * as Timestamp from "./timestamp";
import * as Voting from "./voting";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "aptos_governance";

export const EALREADY_VOTED : U64 = u64("4");
export const EINSUFFICIENT_PROPOSER_STAKE : U64 = u64("1");
export const EINSUFFICIENT_STAKE_LOCKUP : U64 = u64("3");
export const ENOT_DELEGATED_VOTER : U64 = u64("2");
export const ENO_VOTING_POWER : U64 = u64("5");


export class CreateProposalEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "CreateProposalEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "proposer", typeTag: AtomicTypeTag.Address },
  { name: "stake_pool", typeTag: AtomicTypeTag.Address },
  { name: "proposal_id", typeTag: AtomicTypeTag.U64 },
  { name: "execution_hash", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "metadata_location", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "metadata_hash", typeTag: new VectorTag(AtomicTypeTag.U8) }];

  proposer: HexString;
  stake_pool: HexString;
  proposal_id: U64;
  execution_hash: U8[];
  metadata_location: U8[];
  metadata_hash: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.proposer = proto['proposer'] as HexString;
    this.stake_pool = proto['stake_pool'] as HexString;
    this.proposal_id = proto['proposal_id'] as U64;
    this.execution_hash = proto['execution_hash'] as U8[];
    this.metadata_location = proto['metadata_location'] as U8[];
    this.metadata_hash = proto['metadata_hash'] as U8[];
  }

  static CreateProposalEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CreateProposalEvent {
    const proto = $.parseStructProto(data, typeTag, repo, CreateProposalEvent);
    return new CreateProposalEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "CreateProposalEvent", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class GovernanceConfig 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "GovernanceConfig";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "min_voting_threshold", typeTag: AtomicTypeTag.U128 },
  { name: "required_proposer_stake", typeTag: AtomicTypeTag.U64 },
  { name: "voting_duration_secs", typeTag: AtomicTypeTag.U64 }];

  min_voting_threshold: U128;
  required_proposer_stake: U64;
  voting_duration_secs: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.min_voting_threshold = proto['min_voting_threshold'] as U128;
    this.required_proposer_stake = proto['required_proposer_stake'] as U64;
    this.voting_duration_secs = proto['voting_duration_secs'] as U64;
  }

  static GovernanceConfigParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GovernanceConfig {
    const proto = $.parseStructProto(data, typeTag, repo, GovernanceConfig);
    return new GovernanceConfig(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, GovernanceConfig, typeParams);
    return result as unknown as GovernanceConfig;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, GovernanceConfig, typeParams);
    await result.loadFullState(app)
    return result as unknown as GovernanceConfig;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "GovernanceConfig", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class GovernanceEvents 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "GovernanceEvents";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "create_proposal_events", typeTag: new StructTag(new HexString("0x1"), "event", "EventHandle", [new StructTag(new HexString("0x1"), "aptos_governance", "CreateProposalEvent", [])]) },
  { name: "update_config_events", typeTag: new StructTag(new HexString("0x1"), "event", "EventHandle", [new StructTag(new HexString("0x1"), "aptos_governance", "UpdateConfigEvent", [])]) },
  { name: "vote_events", typeTag: new StructTag(new HexString("0x1"), "event", "EventHandle", [new StructTag(new HexString("0x1"), "aptos_governance", "VoteEvent", [])]) }];

  create_proposal_events: Aptos_std.Event.EventHandle;
  update_config_events: Aptos_std.Event.EventHandle;
  vote_events: Aptos_std.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.create_proposal_events = proto['create_proposal_events'] as Aptos_std.Event.EventHandle;
    this.update_config_events = proto['update_config_events'] as Aptos_std.Event.EventHandle;
    this.vote_events = proto['vote_events'] as Aptos_std.Event.EventHandle;
  }

  static GovernanceEventsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GovernanceEvents {
    const proto = $.parseStructProto(data, typeTag, repo, GovernanceEvents);
    return new GovernanceEvents(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, GovernanceEvents, typeParams);
    return result as unknown as GovernanceEvents;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, GovernanceEvents, typeParams);
    await result.loadFullState(app)
    return result as unknown as GovernanceEvents;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "GovernanceEvents", []);
  }
  async loadFullState(app: $.AppType) {
    await this.create_proposal_events.loadFullState(app);
    await this.update_config_events.loadFullState(app);
    await this.vote_events.loadFullState(app);
    this.__app = app;
  }

}

export class GovernanceResponsbility 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "GovernanceResponsbility";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "signer_caps", typeTag: new StructTag(new HexString("0x1"), "simple_map", "SimpleMap", [AtomicTypeTag.Address, new StructTag(new HexString("0x1"), "account", "SignerCapability", [])]) }];

  signer_caps: Aptos_std.Simple_map.SimpleMap;

  constructor(proto: any, public typeTag: TypeTag) {
    this.signer_caps = proto['signer_caps'] as Aptos_std.Simple_map.SimpleMap;
  }

  static GovernanceResponsbilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GovernanceResponsbility {
    const proto = $.parseStructProto(data, typeTag, repo, GovernanceResponsbility);
    return new GovernanceResponsbility(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, GovernanceResponsbility, typeParams);
    return result as unknown as GovernanceResponsbility;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, GovernanceResponsbility, typeParams);
    await result.loadFullState(app)
    return result as unknown as GovernanceResponsbility;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "GovernanceResponsbility", []);
  }
  async loadFullState(app: $.AppType) {
    await this.signer_caps.loadFullState(app);
    this.__app = app;
  }

}

export class RecordKey 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "RecordKey";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "stake_pool", typeTag: AtomicTypeTag.Address },
  { name: "proposal_id", typeTag: AtomicTypeTag.U64 }];

  stake_pool: HexString;
  proposal_id: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.stake_pool = proto['stake_pool'] as HexString;
    this.proposal_id = proto['proposal_id'] as U64;
  }

  static RecordKeyParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RecordKey {
    const proto = $.parseStructProto(data, typeTag, repo, RecordKey);
    return new RecordKey(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "RecordKey", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class UpdateConfigEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "UpdateConfigEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "min_voting_threshold", typeTag: AtomicTypeTag.U128 },
  { name: "required_proposer_stake", typeTag: AtomicTypeTag.U64 },
  { name: "voting_duration_secs", typeTag: AtomicTypeTag.U64 }];

  min_voting_threshold: U128;
  required_proposer_stake: U64;
  voting_duration_secs: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.min_voting_threshold = proto['min_voting_threshold'] as U128;
    this.required_proposer_stake = proto['required_proposer_stake'] as U64;
    this.voting_duration_secs = proto['voting_duration_secs'] as U64;
  }

  static UpdateConfigEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : UpdateConfigEvent {
    const proto = $.parseStructProto(data, typeTag, repo, UpdateConfigEvent);
    return new UpdateConfigEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "UpdateConfigEvent", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class VoteEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "VoteEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "proposal_id", typeTag: AtomicTypeTag.U64 },
  { name: "voter", typeTag: AtomicTypeTag.Address },
  { name: "stake_pool", typeTag: AtomicTypeTag.Address },
  { name: "num_votes", typeTag: AtomicTypeTag.U64 },
  { name: "should_pass", typeTag: AtomicTypeTag.Bool }];

  proposal_id: U64;
  voter: HexString;
  stake_pool: HexString;
  num_votes: U64;
  should_pass: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.proposal_id = proto['proposal_id'] as U64;
    this.voter = proto['voter'] as HexString;
    this.stake_pool = proto['stake_pool'] as HexString;
    this.num_votes = proto['num_votes'] as U64;
    this.should_pass = proto['should_pass'] as boolean;
  }

  static VoteEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : VoteEvent {
    const proto = $.parseStructProto(data, typeTag, repo, VoteEvent);
    return new VoteEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "VoteEvent", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class VotingRecords 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "VotingRecords";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "votes", typeTag: new StructTag(new HexString("0x1"), "table", "Table", [new StructTag(new HexString("0x1"), "aptos_governance", "RecordKey", []), AtomicTypeTag.Bool]) }];

  votes: Aptos_std.Table.Table;

  constructor(proto: any, public typeTag: TypeTag) {
    this.votes = proto['votes'] as Aptos_std.Table.Table;
  }

  static VotingRecordsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : VotingRecords {
    const proto = $.parseStructProto(data, typeTag, repo, VotingRecords);
    return new VotingRecords(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, VotingRecords, typeParams);
    return result as unknown as VotingRecords;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, VotingRecords, typeParams);
    await result.loadFullState(app)
    return result as unknown as VotingRecords;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "VotingRecords", []);
  }
  async loadFullState(app: $.AppType) {
    await this.votes.loadFullState(app);
    this.__app = app;
  }

}
export function create_proposal_ (
  proposer: HexString,
  stake_pool: HexString,
  execution_hash: U8[],
  metadata_location: U8[],
  metadata_hash: U8[],
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, current_time, early_resolution_vote_threshold, events, governance_config, proposal_expiration, proposal_id, proposer_address, stake_balance, total_supply, total_voting_token_supply;
  proposer_address = Std.Signer.address_of_(proposer, $c);
  if (!((Stake.get_delegated_voter_($.copy(stake_pool), $c)).hex() === ($.copy(proposer_address)).hex())) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(ENOT_DELEGATED_VOTER), $c));
  }
  governance_config = $c.borrow_global<GovernanceConfig>(new SimpleStructTag(GovernanceConfig), new HexString("0x1"));
  stake_balance = Stake.get_current_epoch_voting_power_($.copy(stake_pool), $c);
  if (!($.copy(stake_balance)).ge($.copy(governance_config.required_proposer_stake))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EINSUFFICIENT_PROPOSER_STAKE), $c));
  }
  current_time = Timestamp.now_seconds_($c);
  proposal_expiration = ($.copy(current_time)).add($.copy(governance_config.voting_duration_secs));
  if (!(Stake.get_lockup_secs_($.copy(stake_pool), $c)).ge($.copy(proposal_expiration))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EINSUFFICIENT_STAKE_LOCKUP), $c));
  }
  total_voting_token_supply = Coin.supply_($c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])]);
  early_resolution_vote_threshold = Std.Option.none_($c, [AtomicTypeTag.U128]);
  if (Std.Option.is_some_(total_voting_token_supply, $c, [AtomicTypeTag.U128])) {
    total_supply = $.copy(Std.Option.borrow_(total_voting_token_supply, $c, [AtomicTypeTag.U128]));
    early_resolution_vote_threshold = Std.Option.some_((($.copy(total_supply)).div(u128("2"))).add(u128("1")), $c, [AtomicTypeTag.U128]);
  }
  else{
  }
  proposal_id = Voting.create_proposal_($.copy(proposer_address), new HexString("0x1"), Governance_proposal.create_proposal_(Std.String.utf8_($.copy(metadata_location), $c), Std.String.utf8_($.copy(metadata_hash), $c), $c), $.copy(execution_hash), $.copy(governance_config.min_voting_threshold), $.copy(proposal_expiration), $.copy(early_resolution_vote_threshold), $c, [new StructTag(new HexString("0x1"), "governance_proposal", "GovernanceProposal", [])]);
  events = $c.borrow_global_mut<GovernanceEvents>(new SimpleStructTag(GovernanceEvents), new HexString("0x1"));
  temp$7 = events.create_proposal_events;
  temp$1 = $.copy(proposal_id);
  temp$2 = $.copy(proposer_address);
  temp$3 = $.copy(stake_pool);
  temp$4 = $.copy(execution_hash);
  temp$5 = $.copy(metadata_location);
  temp$6 = $.copy(metadata_hash);
  Aptos_std.Event.emit_event_(temp$7, new CreateProposalEvent({ proposer: temp$2, stake_pool: temp$3, proposal_id: temp$1, execution_hash: temp$4, metadata_location: temp$5, metadata_hash: temp$6 }, new SimpleStructTag(CreateProposalEvent)), $c, [new SimpleStructTag(CreateProposalEvent)]);
  return;
}


export function buildPayload_create_proposal (
  stake_pool: HexString,
  execution_hash: U8[],
  metadata_location: U8[],
  metadata_hash: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::aptos_governance::create_proposal",
    typeParamStrings,
    [
      $.payloadArg(stake_pool),
      $.u8ArrayArg(execution_hash),
      $.u8ArrayArg(metadata_location),
      $.u8ArrayArg(metadata_hash),
    ]
  );

}
export function get_signer_ (
  _proposal: Governance_proposal.GovernanceProposal,
  signer_address: HexString,
  $c: AptosDataCache,
): HexString {
  let governance_responsibility, signer_cap;
  governance_responsibility = $c.borrow_global<GovernanceResponsbility>(new SimpleStructTag(GovernanceResponsbility), new HexString("0x1"));
  signer_cap = Aptos_std.Simple_map.borrow_(governance_responsibility.signer_caps, signer_address, $c, [AtomicTypeTag.Address, new StructTag(new HexString("0x1"), "account", "SignerCapability", [])]);
  return Account.create_signer_with_capability_(signer_cap, $c);
}

export function initialize_ (
  aptos_framework: HexString,
  min_voting_threshold: U128,
  required_proposer_stake: U64,
  voting_duration_secs: U64,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4;
  System_addresses.assert_aptos_framework_(aptos_framework, $c);
  Voting.register_(aptos_framework, $c, [new StructTag(new HexString("0x1"), "governance_proposal", "GovernanceProposal", [])]);
  temp$4 = aptos_framework;
  temp$1 = $.copy(voting_duration_secs);
  temp$2 = $.copy(min_voting_threshold);
  temp$3 = $.copy(required_proposer_stake);
  $c.move_to(new SimpleStructTag(GovernanceConfig), temp$4, new GovernanceConfig({ min_voting_threshold: temp$2, required_proposer_stake: temp$3, voting_duration_secs: temp$1 }, new SimpleStructTag(GovernanceConfig)));
  $c.move_to(new SimpleStructTag(GovernanceEvents), aptos_framework, new GovernanceEvents({ create_proposal_events: Aptos_std.Event.new_event_handle_(aptos_framework, $c, [new SimpleStructTag(CreateProposalEvent)]), update_config_events: Aptos_std.Event.new_event_handle_(aptos_framework, $c, [new SimpleStructTag(UpdateConfigEvent)]), vote_events: Aptos_std.Event.new_event_handle_(aptos_framework, $c, [new SimpleStructTag(VoteEvent)]) }, new SimpleStructTag(GovernanceEvents)));
  $c.move_to(new SimpleStructTag(VotingRecords), aptos_framework, new VotingRecords({ votes: Aptos_std.Table.new___($c, [new SimpleStructTag(RecordKey), AtomicTypeTag.Bool]) }, new SimpleStructTag(VotingRecords)));
  return;
}

export function reconfigure_ (
  _proposal: Governance_proposal.GovernanceProposal,
  $c: AptosDataCache,
): void {
  Reconfiguration.reconfigure_($c);
  return;
}

export function store_signer_cap_ (
  aptos_framework: HexString,
  signer_address: HexString,
  signer_cap: Account.SignerCapability,
  $c: AptosDataCache,
): void {
  let signer_caps;
  System_addresses.assert_aptos_framework_(aptos_framework, $c);
  if (!$c.exists(new SimpleStructTag(GovernanceResponsbility), new HexString("0x1"))) {
    $c.move_to(new SimpleStructTag(GovernanceResponsbility), aptos_framework, new GovernanceResponsbility({ signer_caps: Aptos_std.Simple_map.create_($c, [AtomicTypeTag.Address, new StructTag(new HexString("0x1"), "account", "SignerCapability", [])]) }, new SimpleStructTag(GovernanceResponsbility)));
  }
  else{
  }
  signer_caps = $c.borrow_global_mut<GovernanceResponsbility>(new SimpleStructTag(GovernanceResponsbility), new HexString("0x1")).signer_caps;
  Aptos_std.Simple_map.add_(signer_caps, $.copy(signer_address), signer_cap, $c, [AtomicTypeTag.Address, new StructTag(new HexString("0x1"), "account", "SignerCapability", [])]);
  return;
}

export function update_governance_config_ (
  _proposal: Governance_proposal.GovernanceProposal,
  min_voting_threshold: U128,
  required_proposer_stake: U64,
  voting_duration_secs: U64,
  $c: AptosDataCache,
): void {
  let events, governance_config;
  governance_config = $c.borrow_global_mut<GovernanceConfig>(new SimpleStructTag(GovernanceConfig), new HexString("0x1"));
  governance_config.voting_duration_secs = $.copy(voting_duration_secs);
  governance_config.min_voting_threshold = $.copy(min_voting_threshold);
  governance_config.required_proposer_stake = $.copy(required_proposer_stake);
  events = $c.borrow_global_mut<GovernanceEvents>(new SimpleStructTag(GovernanceEvents), new HexString("0x1"));
  Aptos_std.Event.emit_event_(events.update_config_events, new UpdateConfigEvent({ min_voting_threshold: $.copy(min_voting_threshold), required_proposer_stake: $.copy(required_proposer_stake), voting_duration_secs: $.copy(voting_duration_secs) }, new SimpleStructTag(UpdateConfigEvent)), $c, [new SimpleStructTag(UpdateConfigEvent)]);
  return;
}

export function vote_ (
  voter: HexString,
  stake_pool: HexString,
  proposal_id: U64,
  should_pass: boolean,
  $c: AptosDataCache,
): void {
  let temp$1, events, proposal_expiration, record_key, voter_address, voting_power, voting_records;
  voter_address = Std.Signer.address_of_(voter, $c);
  if (!((Stake.get_delegated_voter_($.copy(stake_pool), $c)).hex() === ($.copy(voter_address)).hex())) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(ENOT_DELEGATED_VOTER), $c));
  }
  voting_records = $c.borrow_global_mut<VotingRecords>(new SimpleStructTag(VotingRecords), new HexString("0x1"));
  record_key = new RecordKey({ stake_pool: $.copy(stake_pool), proposal_id: $.copy(proposal_id) }, new SimpleStructTag(RecordKey));
  if (!!Aptos_std.Table.contains_(voting_records.votes, $.copy(record_key), $c, [new SimpleStructTag(RecordKey), AtomicTypeTag.Bool])) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EALREADY_VOTED), $c));
  }
  Aptos_std.Table.add_(voting_records.votes, $.copy(record_key), true, $c, [new SimpleStructTag(RecordKey), AtomicTypeTag.Bool]);
  voting_power = Stake.get_current_epoch_voting_power_($.copy(stake_pool), $c);
  if (!($.copy(voting_power)).gt(u64("0"))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(ENO_VOTING_POWER), $c));
  }
  proposal_expiration = Voting.get_proposal_expiration_secs_(new HexString("0x1"), $.copy(proposal_id), $c, [new StructTag(new HexString("0x1"), "governance_proposal", "GovernanceProposal", [])]);
  if (!(Stake.get_lockup_secs_($.copy(stake_pool), $c)).ge($.copy(proposal_expiration))) {
    throw $.abortCode(Std.Error.invalid_argument_($.copy(EINSUFFICIENT_STAKE_LOCKUP), $c));
  }
  temp$1 = Governance_proposal.create_empty_proposal_($c);
  Voting.vote_(temp$1, new HexString("0x1"), $.copy(proposal_id), $.copy(voting_power), should_pass, $c, [new StructTag(new HexString("0x1"), "governance_proposal", "GovernanceProposal", [])]);
  events = $c.borrow_global_mut<GovernanceEvents>(new SimpleStructTag(GovernanceEvents), new HexString("0x1"));
  Aptos_std.Event.emit_event_(events.vote_events, new VoteEvent({ proposal_id: $.copy(proposal_id), voter: $.copy(voter_address), stake_pool: $.copy(stake_pool), num_votes: $.copy(voting_power), should_pass: should_pass }, new SimpleStructTag(VoteEvent)), $c, [new SimpleStructTag(VoteEvent)]);
  return;
}


export function buildPayload_vote (
  stake_pool: HexString,
  proposal_id: U64,
  should_pass: boolean,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::aptos_governance::vote",
    typeParamStrings,
    [
      $.payloadArg(stake_pool),
      $.payloadArg(proposal_id),
      $.payloadArg(should_pass),
    ]
  );

}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::aptos_governance::CreateProposalEvent", CreateProposalEvent.CreateProposalEventParser);
  repo.addParser("0x1::aptos_governance::GovernanceConfig", GovernanceConfig.GovernanceConfigParser);
  repo.addParser("0x1::aptos_governance::GovernanceEvents", GovernanceEvents.GovernanceEventsParser);
  repo.addParser("0x1::aptos_governance::GovernanceResponsbility", GovernanceResponsbility.GovernanceResponsbilityParser);
  repo.addParser("0x1::aptos_governance::RecordKey", RecordKey.RecordKeyParser);
  repo.addParser("0x1::aptos_governance::UpdateConfigEvent", UpdateConfigEvent.UpdateConfigEventParser);
  repo.addParser("0x1::aptos_governance::VoteEvent", VoteEvent.VoteEventParser);
  repo.addParser("0x1::aptos_governance::VotingRecords", VotingRecords.VotingRecordsParser);
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
  get CreateProposalEvent() { return CreateProposalEvent; }
  get GovernanceConfig() { return GovernanceConfig; }
  async loadGovernanceConfig(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await GovernanceConfig.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get GovernanceEvents() { return GovernanceEvents; }
  async loadGovernanceEvents(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await GovernanceEvents.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get GovernanceResponsbility() { return GovernanceResponsbility; }
  async loadGovernanceResponsbility(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await GovernanceResponsbility.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get RecordKey() { return RecordKey; }
  get UpdateConfigEvent() { return UpdateConfigEvent; }
  get VoteEvent() { return VoteEvent; }
  get VotingRecords() { return VotingRecords; }
  async loadVotingRecords(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await VotingRecords.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  payload_create_proposal(
    stake_pool: HexString,
    execution_hash: U8[],
    metadata_location: U8[],
    metadata_hash: U8[],
  ) {
    return buildPayload_create_proposal(stake_pool, execution_hash, metadata_location, metadata_hash);
  }
  async create_proposal(
    _account: AptosAccount,
    stake_pool: HexString,
    execution_hash: U8[],
    metadata_location: U8[],
    metadata_hash: U8[],
    _maxGas = 1000,
  ) {
    const payload = buildPayload_create_proposal(stake_pool, execution_hash, metadata_location, metadata_hash);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_vote(
    stake_pool: HexString,
    proposal_id: U64,
    should_pass: boolean,
  ) {
    return buildPayload_vote(stake_pool, proposal_id, should_pass);
  }
  async vote(
    _account: AptosAccount,
    stake_pool: HexString,
    proposal_id: U64,
    should_pass: boolean,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_vote(stake_pool, proposal_id, should_pass);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

