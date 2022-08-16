
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache } from "@manahippo/move-to-ts";
import * as aptos_framework from './aptos_framework';
import * as aptos_std from './aptos_std';
import * as coin_list from './coin_list';
import * as std from './std';

export * as aptos_framework from './aptos_framework';
export * as aptos_std from './aptos_std';
export * as coin_list from './coin_list';
export * as std from './std';


export function getProjectRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  aptos_framework.loadParsers(repo);
  aptos_std.loadParsers(repo);
  coin_list.loadParsers(repo);
  std.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export class App {
  parserRepo: AptosParserRepo;
  cache: AptosLocalCache;
  aptos_framework : aptos_framework.App
  aptos_std : aptos_std.App
  coin_list : coin_list.App
  std : std.App
  constructor(
    public client: AptosClient,
  ) {
    this.parserRepo = getProjectRepo();
    this.cache = new AptosLocalCache();
    this.aptos_framework = new aptos_framework.App(client, this.parserRepo, this.cache);
    this.aptos_std = new aptos_std.App(client, this.parserRepo, this.cache);
    this.coin_list = new coin_list.App(client, this.parserRepo, this.cache);
    this.std = new std.App(client, this.parserRepo, this.cache);
  }
}
