import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Std from "../std";
import * as Account from "./account";
import * as Aptos_coin from "./aptos_coin";
import * as Aptos_governance from "./aptos_governance";
import * as Block from "./block";
import * as Chain_id from "./chain_id";
import * as Coin from "./coin";
import * as Coins from "./coins";
import * as Consensus_config from "./consensus_config";
import * as Gas_schedule from "./gas_schedule";
import * as Reconfiguration from "./reconfiguration";
import * as Stake from "./stake";
import * as Staking_config from "./staking_config";
import * as Timestamp from "./timestamp";
import * as Transaction_fee from "./transaction_fee";
import * as Version from "./version";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "genesis";



export class ValidatorConfiguration 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "ValidatorConfiguration";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "owner_address", typeTag: AtomicTypeTag.Address },
  { name: "operator_address", typeTag: AtomicTypeTag.Address },
  { name: "voter_address", typeTag: AtomicTypeTag.Address },
  { name: "stake_amount", typeTag: AtomicTypeTag.U64 },
  { name: "consensus_pubkey", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "proof_of_possession", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "network_addresses", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "full_node_network_addresses", typeTag: new VectorTag(AtomicTypeTag.U8) }];

  owner_address: HexString;
  operator_address: HexString;
  voter_address: HexString;
  stake_amount: U64;
  consensus_pubkey: U8[];
  proof_of_possession: U8[];
  network_addresses: U8[];
  full_node_network_addresses: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.owner_address = proto['owner_address'] as HexString;
    this.operator_address = proto['operator_address'] as HexString;
    this.voter_address = proto['voter_address'] as HexString;
    this.stake_amount = proto['stake_amount'] as U64;
    this.consensus_pubkey = proto['consensus_pubkey'] as U8[];
    this.proof_of_possession = proto['proof_of_possession'] as U8[];
    this.network_addresses = proto['network_addresses'] as U8[];
    this.full_node_network_addresses = proto['full_node_network_addresses'] as U8[];
  }

  static ValidatorConfigurationParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorConfiguration {
    const proto = $.parseStructProto(data, typeTag, repo, ValidatorConfiguration);
    return new ValidatorConfiguration(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "ValidatorConfiguration", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function create_initialize_validators_ (
  aptos_framework: HexString,
  validators: ValidatorConfiguration[],
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, i, num_validators, operator, owner, validator;
  i = u64("0");
  num_validators = Std.Vector.length_(validators, $c, [new SimpleStructTag(ValidatorConfiguration)]);
  while (($.copy(i)).lt($.copy(num_validators))) {
    {
      validator = Std.Vector.borrow_(validators, $.copy(i), $c, [new SimpleStructTag(ValidatorConfiguration)]);
      temp$1 = Account.create_account_internal_($.copy(validator.owner_address), $c);
      owner = temp$1;
      operator = owner;
      if ((($.copy(validator.operator_address)).hex() !== ($.copy(validator.owner_address)).hex())) {
        temp$2 = Account.create_account_internal_($.copy(validator.operator_address), $c);
        operator = temp$2;
      }
      else{
      }
      if ((($.copy(validator.voter_address)).hex() !== ($.copy(validator.owner_address)).hex())) {
        temp$3 = (($.copy(validator.voter_address)).hex() !== ($.copy(validator.operator_address)).hex());
      }
      else{
        temp$3 = false;
      }
      if (temp$3) {
        Account.create_account_internal_($.copy(validator.voter_address), $c);
      }
      else{
      }
      Coins.register_(owner, $c, [new StructTag(new HexString("0x1"), "aptos_coin", "AptosCoin", [])]);
      Aptos_coin.mint_(aptos_framework, $.copy(validator.owner_address), $.copy(validator.stake_amount), $c);
      Stake.initialize_stake_owner_(owner, $.copy(validator.stake_amount), $.copy(validator.operator_address), $.copy(validator.voter_address), $c);
      Stake.rotate_consensus_key_(operator, $.copy(validator.owner_address), $.copy(validator.consensus_pubkey), $.copy(validator.proof_of_possession), $c);
      Stake.update_network_and_fullnode_addresses_(operator, $.copy(validator.owner_address), $.copy(validator.network_addresses), $.copy(validator.full_node_network_addresses), $c);
      Stake.join_validator_set_internal_(operator, $.copy(validator.owner_address), $c);
      i = ($.copy(i)).add(u64("1"));
    }

  }Aptos_coin.destroy_mint_cap_(aptos_framework, $c);
  Stake.on_new_epoch_($c);
  return;
}

export function initialize_ (
  gas_schedule: U8[],
  chain_id: U8,
  initial_version: U64,
  consensus_config: U8[],
  epoch_interval_microsecs: U64,
  minimum_stake: U64,
  maximum_stake: U64,
  recurring_lockup_duration_secs: U64,
  allow_validator_set_change: boolean,
  rewards_rate: U64,
  rewards_rate_denominator: U64,
  voting_power_increase_limit: U64,
  $c: AptosDataCache,
): void {
  let aptos_framework_account, framework_signer_cap;
  [aptos_framework_account, framework_signer_cap] = Account.create_aptos_framework_account_($c);
  Account.initialize_(aptos_framework_account, new HexString("0x1"), [u8("97"), u8("99"), u8("99"), u8("111"), u8("117"), u8("110"), u8("116")], [u8("115"), u8("99"), u8("114"), u8("105"), u8("112"), u8("116"), u8("95"), u8("112"), u8("114"), u8("111"), u8("108"), u8("111"), u8("103"), u8("117"), u8("101")], [u8("109"), u8("111"), u8("100"), u8("117"), u8("108"), u8("101"), u8("95"), u8("112"), u8("114"), u8("111"), u8("108"), u8("111"), u8("103"), u8("117"), u8("101")], [u8("119"), u8("114"), u8("105"), u8("116"), u8("101"), u8("115"), u8("101"), u8("116"), u8("95"), u8("112"), u8("114"), u8("111"), u8("108"), u8("111"), u8("103"), u8("117"), u8("101")], [u8("109"), u8("117"), u8("108"), u8("116"), u8("105"), u8("95"), u8("97"), u8("103"), u8("101"), u8("110"), u8("116"), u8("95"), u8("115"), u8("99"), u8("114"), u8("105"), u8("112"), u8("116"), u8("95"), u8("112"), u8("114"), u8("111"), u8("108"), u8("111"), u8("103"), u8("117"), u8("101")], [u8("101"), u8("112"), u8("105"), u8("108"), u8("111"), u8("103"), u8("117"), u8("101")], [u8("119"), u8("114"), u8("105"), u8("116"), u8("101"), u8("115"), u8("101"), u8("116"), u8("95"), u8("101"), u8("112"), u8("105"), u8("108"), u8("111"), u8("103"), u8("117"), u8("101")], $c);
  Account.create_address_map_(aptos_framework_account, $c);
  Aptos_governance.store_signer_cap_(aptos_framework_account, new HexString("0x1"), framework_signer_cap, $c);
  Consensus_config.initialize_(aptos_framework_account, $.copy(consensus_config), $c);
  Version.initialize_(aptos_framework_account, $.copy(initial_version), $c);
  Stake.initialize_(aptos_framework_account, $c);
  Staking_config.initialize_(aptos_framework_account, $.copy(minimum_stake), $.copy(maximum_stake), $.copy(recurring_lockup_duration_secs), allow_validator_set_change, $.copy(rewards_rate), $.copy(rewards_rate_denominator), $.copy(voting_power_increase_limit), $c);
  Gas_schedule.initialize_(aptos_framework_account, $.copy(gas_schedule), $c);
  Chain_id.initialize_(aptos_framework_account, $.copy(chain_id), $c);
  Reconfiguration.initialize_(aptos_framework_account, $c);
  Block.initialize_(aptos_framework_account, $.copy(epoch_interval_microsecs), $c);
  Timestamp.set_time_has_started_(aptos_framework_account, $c);
  return;
}

export function initialize_aptos_coin_ (
  aptos_framework: HexString,
  $c: AptosDataCache,
): Coin.MintCapability {
  let burn_cap, mint_cap;
  [burn_cap, mint_cap] = Aptos_coin.initialize_(aptos_framework, $c);
  Stake.store_aptos_coin_mint_cap_(aptos_framework, $.copy(mint_cap), $c);
  Transaction_fee.store_aptos_coin_burn_cap_(aptos_framework, $.copy(burn_cap), $c);
  return $.copy(mint_cap);
}

export function initialize_core_resources_and_aptos_coin_ (
  aptos_framework: HexString,
  core_resources_auth_key: U8[],
  $c: AptosDataCache,
): void {
  let core_resources, mint_cap;
  core_resources = Account.create_account_internal_(new HexString("0xa550c18"), $c);
  Account.rotate_authentication_key_internal_(core_resources, $.copy(core_resources_auth_key), $c);
  mint_cap = initialize_aptos_coin_(aptos_framework, $c);
  Aptos_coin.configure_accounts_for_test_(aptos_framework, core_resources, $.copy(mint_cap), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::genesis::ValidatorConfiguration", ValidatorConfiguration.ValidatorConfigurationParser);
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
  get ValidatorConfiguration() { return ValidatorConfiguration; }
}

