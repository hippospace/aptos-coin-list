
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache } from "@manahippo/move-to-ts";
import * as Coin_list from './coin_list';
import * as Devnet_coins from './devnet_coins';

export * as Coin_list from './coin_list';
export * as Devnet_coins from './devnet_coins';


export function loadParsers(repo: AptosParserRepo) {
  Coin_list.loadParsers(repo);
  Devnet_coins.loadParsers(repo);
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
  coin_list : Coin_list.App
  devnet_coins : Devnet_coins.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
    this.coin_list = new Coin_list.App(client, repo, cache);
    this.devnet_coins = new Devnet_coins.App(client, repo, cache);
  }
}
