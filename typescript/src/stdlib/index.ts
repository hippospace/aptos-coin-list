
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache } from "@manahippo/move-to-ts";
import * as Account from './account';
import * as Acl from './acl';
import * as Aggregator from './aggregator';
import * as Aggregator_factory from './aggregator_factory';
import * as Any from './any';
import * as Aptos_account from './aptos_account';
import * as Aptos_coin from './aptos_coin';
import * as Aptos_governance from './aptos_governance';
import * as Aptos_hash from './aptos_hash';
import * as Bcs from './bcs';
import * as Big_vector from './big_vector';
import * as Bit_vector from './bit_vector';
import * as Block from './block';
import * as Bls12381 from './bls12381';
import * as Bucket_table from './bucket_table';
import * as Byte_conversions from './byte_conversions';
import * as Capability from './capability';
import * as Chain_id from './chain_id';
import * as Code from './code';
import * as Coin from './coin';
import * as Comparator from './comparator';
import * as Consensus_config from './consensus_config';
import * as Debug from './debug';
import * as Ed25519 from './ed25519';
import * as Error from './error';
import * as Event from './event';
import * as Fixed_point32 from './fixed_point32';
import * as Gas_schedule from './gas_schedule';
import * as Genesis from './genesis';
import * as Governance_proposal from './governance_proposal';
import * as Guid from './guid';
import * as Hash from './hash';
import * as Iterable_table from './iterable_table';
import * as Managed_coin from './managed_coin';
import * as Option from './option';
import * as Optional_aggregator from './optional_aggregator';
import * as Reconfiguration from './reconfiguration';
import * as Resource_account from './resource_account';
import * as Ristretto255 from './ristretto255';
import * as Signer from './signer';
import * as Simple_map from './simple_map';
import * as Stake from './stake';
import * as Staking_config from './staking_config';
import * as State_storage from './state_storage';
import * as String from './string';
import * as System_addresses from './system_addresses';
import * as Table from './table';
import * as Table_with_length from './table_with_length';
import * as Timestamp from './timestamp';
import * as Transaction_context from './transaction_context';
import * as Transaction_fee from './transaction_fee';
import * as Transaction_validation from './transaction_validation';
import * as Type_info from './type_info';
import * as Util from './util';
import * as Vector from './vector';
import * as Version from './version';
import * as Voting from './voting';

export * as Account from './account';
export * as Acl from './acl';
export * as Aggregator from './aggregator';
export * as Aggregator_factory from './aggregator_factory';
export * as Any from './any';
export * as Aptos_account from './aptos_account';
export * as Aptos_coin from './aptos_coin';
export * as Aptos_governance from './aptos_governance';
export * as Aptos_hash from './aptos_hash';
export * as Bcs from './bcs';
export * as Big_vector from './big_vector';
export * as Bit_vector from './bit_vector';
export * as Block from './block';
export * as Bls12381 from './bls12381';
export * as Bucket_table from './bucket_table';
export * as Byte_conversions from './byte_conversions';
export * as Capability from './capability';
export * as Chain_id from './chain_id';
export * as Code from './code';
export * as Coin from './coin';
export * as Comparator from './comparator';
export * as Consensus_config from './consensus_config';
export * as Debug from './debug';
export * as Ed25519 from './ed25519';
export * as Error from './error';
export * as Event from './event';
export * as Fixed_point32 from './fixed_point32';
export * as Gas_schedule from './gas_schedule';
export * as Genesis from './genesis';
export * as Governance_proposal from './governance_proposal';
export * as Guid from './guid';
export * as Hash from './hash';
export * as Iterable_table from './iterable_table';
export * as Managed_coin from './managed_coin';
export * as Option from './option';
export * as Optional_aggregator from './optional_aggregator';
export * as Reconfiguration from './reconfiguration';
export * as Resource_account from './resource_account';
export * as Ristretto255 from './ristretto255';
export * as Signer from './signer';
export * as Simple_map from './simple_map';
export * as Stake from './stake';
export * as Staking_config from './staking_config';
export * as State_storage from './state_storage';
export * as String from './string';
export * as System_addresses from './system_addresses';
export * as Table from './table';
export * as Table_with_length from './table_with_length';
export * as Timestamp from './timestamp';
export * as Transaction_context from './transaction_context';
export * as Transaction_fee from './transaction_fee';
export * as Transaction_validation from './transaction_validation';
export * as Type_info from './type_info';
export * as Util from './util';
export * as Vector from './vector';
export * as Version from './version';
export * as Voting from './voting';


export function loadParsers(repo: AptosParserRepo) {
  Account.loadParsers(repo);
  Acl.loadParsers(repo);
  Aggregator.loadParsers(repo);
  Aggregator_factory.loadParsers(repo);
  Any.loadParsers(repo);
  Aptos_account.loadParsers(repo);
  Aptos_coin.loadParsers(repo);
  Aptos_governance.loadParsers(repo);
  Aptos_hash.loadParsers(repo);
  Bcs.loadParsers(repo);
  Big_vector.loadParsers(repo);
  Bit_vector.loadParsers(repo);
  Block.loadParsers(repo);
  Bls12381.loadParsers(repo);
  Bucket_table.loadParsers(repo);
  Byte_conversions.loadParsers(repo);
  Capability.loadParsers(repo);
  Chain_id.loadParsers(repo);
  Code.loadParsers(repo);
  Coin.loadParsers(repo);
  Comparator.loadParsers(repo);
  Consensus_config.loadParsers(repo);
  Debug.loadParsers(repo);
  Ed25519.loadParsers(repo);
  Error.loadParsers(repo);
  Event.loadParsers(repo);
  Fixed_point32.loadParsers(repo);
  Gas_schedule.loadParsers(repo);
  Genesis.loadParsers(repo);
  Governance_proposal.loadParsers(repo);
  Guid.loadParsers(repo);
  Hash.loadParsers(repo);
  Iterable_table.loadParsers(repo);
  Managed_coin.loadParsers(repo);
  Option.loadParsers(repo);
  Optional_aggregator.loadParsers(repo);
  Reconfiguration.loadParsers(repo);
  Resource_account.loadParsers(repo);
  Ristretto255.loadParsers(repo);
  Signer.loadParsers(repo);
  Simple_map.loadParsers(repo);
  Stake.loadParsers(repo);
  Staking_config.loadParsers(repo);
  State_storage.loadParsers(repo);
  String.loadParsers(repo);
  System_addresses.loadParsers(repo);
  Table.loadParsers(repo);
  Table_with_length.loadParsers(repo);
  Timestamp.loadParsers(repo);
  Transaction_context.loadParsers(repo);
  Transaction_fee.loadParsers(repo);
  Transaction_validation.loadParsers(repo);
  Type_info.loadParsers(repo);
  Util.loadParsers(repo);
  Vector.loadParsers(repo);
  Version.loadParsers(repo);
  Voting.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export type AppType = {
  client: AptosClient,
  repo: AptosParserRepo,
  cache: AptosLocalCache,
};

export class App {
  account : Account.App
  acl : Acl.App
  aggregator : Aggregator.App
  aggregator_factory : Aggregator_factory.App
  any : Any.App
  aptos_account : Aptos_account.App
  aptos_coin : Aptos_coin.App
  aptos_governance : Aptos_governance.App
  aptos_hash : Aptos_hash.App
  bcs : Bcs.App
  big_vector : Big_vector.App
  bit_vector : Bit_vector.App
  block : Block.App
  bls12381 : Bls12381.App
  bucket_table : Bucket_table.App
  byte_conversions : Byte_conversions.App
  capability : Capability.App
  chain_id : Chain_id.App
  code : Code.App
  coin : Coin.App
  comparator : Comparator.App
  consensus_config : Consensus_config.App
  debug : Debug.App
  ed25519 : Ed25519.App
  error : Error.App
  event : Event.App
  fixed_point32 : Fixed_point32.App
  gas_schedule : Gas_schedule.App
  genesis : Genesis.App
  governance_proposal : Governance_proposal.App
  guid : Guid.App
  hash : Hash.App
  iterable_table : Iterable_table.App
  managed_coin : Managed_coin.App
  option : Option.App
  optional_aggregator : Optional_aggregator.App
  reconfiguration : Reconfiguration.App
  resource_account : Resource_account.App
  ristretto255 : Ristretto255.App
  signer : Signer.App
  simple_map : Simple_map.App
  stake : Stake.App
  staking_config : Staking_config.App
  state_storage : State_storage.App
  string : String.App
  system_addresses : System_addresses.App
  table : Table.App
  table_with_length : Table_with_length.App
  timestamp : Timestamp.App
  transaction_context : Transaction_context.App
  transaction_fee : Transaction_fee.App
  transaction_validation : Transaction_validation.App
  type_info : Type_info.App
  util : Util.App
  vector : Vector.App
  version : Version.App
  voting : Voting.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
    this.account = new Account.App(client, repo, cache);
    this.acl = new Acl.App(client, repo, cache);
    this.aggregator = new Aggregator.App(client, repo, cache);
    this.aggregator_factory = new Aggregator_factory.App(client, repo, cache);
    this.any = new Any.App(client, repo, cache);
    this.aptos_account = new Aptos_account.App(client, repo, cache);
    this.aptos_coin = new Aptos_coin.App(client, repo, cache);
    this.aptos_governance = new Aptos_governance.App(client, repo, cache);
    this.aptos_hash = new Aptos_hash.App(client, repo, cache);
    this.bcs = new Bcs.App(client, repo, cache);
    this.big_vector = new Big_vector.App(client, repo, cache);
    this.bit_vector = new Bit_vector.App(client, repo, cache);
    this.block = new Block.App(client, repo, cache);
    this.bls12381 = new Bls12381.App(client, repo, cache);
    this.bucket_table = new Bucket_table.App(client, repo, cache);
    this.byte_conversions = new Byte_conversions.App(client, repo, cache);
    this.capability = new Capability.App(client, repo, cache);
    this.chain_id = new Chain_id.App(client, repo, cache);
    this.code = new Code.App(client, repo, cache);
    this.coin = new Coin.App(client, repo, cache);
    this.comparator = new Comparator.App(client, repo, cache);
    this.consensus_config = new Consensus_config.App(client, repo, cache);
    this.debug = new Debug.App(client, repo, cache);
    this.ed25519 = new Ed25519.App(client, repo, cache);
    this.error = new Error.App(client, repo, cache);
    this.event = new Event.App(client, repo, cache);
    this.fixed_point32 = new Fixed_point32.App(client, repo, cache);
    this.gas_schedule = new Gas_schedule.App(client, repo, cache);
    this.genesis = new Genesis.App(client, repo, cache);
    this.governance_proposal = new Governance_proposal.App(client, repo, cache);
    this.guid = new Guid.App(client, repo, cache);
    this.hash = new Hash.App(client, repo, cache);
    this.iterable_table = new Iterable_table.App(client, repo, cache);
    this.managed_coin = new Managed_coin.App(client, repo, cache);
    this.option = new Option.App(client, repo, cache);
    this.optional_aggregator = new Optional_aggregator.App(client, repo, cache);
    this.reconfiguration = new Reconfiguration.App(client, repo, cache);
    this.resource_account = new Resource_account.App(client, repo, cache);
    this.ristretto255 = new Ristretto255.App(client, repo, cache);
    this.signer = new Signer.App(client, repo, cache);
    this.simple_map = new Simple_map.App(client, repo, cache);
    this.stake = new Stake.App(client, repo, cache);
    this.staking_config = new Staking_config.App(client, repo, cache);
    this.state_storage = new State_storage.App(client, repo, cache);
    this.string = new String.App(client, repo, cache);
    this.system_addresses = new System_addresses.App(client, repo, cache);
    this.table = new Table.App(client, repo, cache);
    this.table_with_length = new Table_with_length.App(client, repo, cache);
    this.timestamp = new Timestamp.App(client, repo, cache);
    this.transaction_context = new Transaction_context.App(client, repo, cache);
    this.transaction_fee = new Transaction_fee.App(client, repo, cache);
    this.transaction_validation = new Transaction_validation.App(client, repo, cache);
    this.type_info = new Type_info.App(client, repo, cache);
    this.util = new Util.App(client, repo, cache);
    this.vector = new Vector.App(client, repo, cache);
    this.version = new Version.App(client, repo, cache);
    this.voting = new Voting.App(client, repo, cache);
  }
}
