
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache } from "@manahippo/move-to-ts";
import * as Acl from './acl';
import * as Bcs from './bcs';
import * as Bit_vector from './bit_vector';
import * as Capability from './capability';
import * as Debug from './debug';
import * as Error from './error';
import * as Fixed_point32 from './fixed_point32';
import * as Guid from './guid';
import * as Hash from './hash';
import * as Option from './option';
import * as Signer from './signer';
import * as String from './string';
import * as Vector from './vector';

export * as Acl from './acl';
export * as Bcs from './bcs';
export * as Bit_vector from './bit_vector';
export * as Capability from './capability';
export * as Debug from './debug';
export * as Error from './error';
export * as Fixed_point32 from './fixed_point32';
export * as Guid from './guid';
export * as Hash from './hash';
export * as Option from './option';
export * as Signer from './signer';
export * as String from './string';
export * as Vector from './vector';


export function loadParsers(repo: AptosParserRepo) {
  Acl.loadParsers(repo);
  Bcs.loadParsers(repo);
  Bit_vector.loadParsers(repo);
  Capability.loadParsers(repo);
  Debug.loadParsers(repo);
  Error.loadParsers(repo);
  Fixed_point32.loadParsers(repo);
  Guid.loadParsers(repo);
  Hash.loadParsers(repo);
  Option.loadParsers(repo);
  Signer.loadParsers(repo);
  String.loadParsers(repo);
  Vector.loadParsers(repo);
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
  acl : Acl.App
  bcs : Bcs.App
  bit_vector : Bit_vector.App
  capability : Capability.App
  debug : Debug.App
  error : Error.App
  fixed_point32 : Fixed_point32.App
  guid : Guid.App
  hash : Hash.App
  option : Option.App
  signer : Signer.App
  string : String.App
  vector : Vector.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
    this.acl = new Acl.App(client, repo, cache);
    this.bcs = new Bcs.App(client, repo, cache);
    this.bit_vector = new Bit_vector.App(client, repo, cache);
    this.capability = new Capability.App(client, repo, cache);
    this.debug = new Debug.App(client, repo, cache);
    this.error = new Error.App(client, repo, cache);
    this.fixed_point32 = new Fixed_point32.App(client, repo, cache);
    this.guid = new Guid.App(client, repo, cache);
    this.hash = new Hash.App(client, repo, cache);
    this.option = new Option.App(client, repo, cache);
    this.signer = new Signer.App(client, repo, cache);
    this.string = new String.App(client, repo, cache);
    this.vector = new Vector.App(client, repo, cache);
  }
}
