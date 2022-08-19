
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache } from "@manahippo/move-to-ts";
import * as Aptos_hash from './aptos_hash';
import * as Big_vector from './big_vector';
import * as Bls12381 from './bls12381';
import * as Comparator from './comparator';
import * as Ed25519 from './ed25519';
import * as Event from './event';
import * as Iterable_table from './iterable_table';
import * as Simple_map from './simple_map';
import * as Table from './table';
import * as Table_with_length from './table_with_length';
import * as Type_info from './type_info';

export * as Aptos_hash from './aptos_hash';
export * as Big_vector from './big_vector';
export * as Bls12381 from './bls12381';
export * as Comparator from './comparator';
export * as Ed25519 from './ed25519';
export * as Event from './event';
export * as Iterable_table from './iterable_table';
export * as Simple_map from './simple_map';
export * as Table from './table';
export * as Table_with_length from './table_with_length';
export * as Type_info from './type_info';


export function loadParsers(repo: AptosParserRepo) {
  Aptos_hash.loadParsers(repo);
  Big_vector.loadParsers(repo);
  Bls12381.loadParsers(repo);
  Comparator.loadParsers(repo);
  Ed25519.loadParsers(repo);
  Event.loadParsers(repo);
  Iterable_table.loadParsers(repo);
  Simple_map.loadParsers(repo);
  Table.loadParsers(repo);
  Table_with_length.loadParsers(repo);
  Type_info.loadParsers(repo);
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
  aptos_hash : Aptos_hash.App
  big_vector : Big_vector.App
  bls12381 : Bls12381.App
  comparator : Comparator.App
  ed25519 : Ed25519.App
  event : Event.App
  iterable_table : Iterable_table.App
  simple_map : Simple_map.App
  table : Table.App
  table_with_length : Table_with_length.App
  type_info : Type_info.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
    this.aptos_hash = new Aptos_hash.App(client, repo, cache);
    this.big_vector = new Big_vector.App(client, repo, cache);
    this.bls12381 = new Bls12381.App(client, repo, cache);
    this.comparator = new Comparator.App(client, repo, cache);
    this.ed25519 = new Ed25519.App(client, repo, cache);
    this.event = new Event.App(client, repo, cache);
    this.iterable_table = new Iterable_table.App(client, repo, cache);
    this.simple_map = new Simple_map.App(client, repo, cache);
    this.table = new Table.App(client, repo, cache);
    this.table_with_length = new Table_with_length.App(client, repo, cache);
    this.type_info = new Type_info.App(client, repo, cache);
  }
}
