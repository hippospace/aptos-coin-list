
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache } from "@manahippo/move-to-ts";
import * as coin_list from './coin_list';
import * as stdlib from './stdlib';

export * as coin_list from './coin_list';
export * as stdlib from './stdlib';


export function getProjectRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  coin_list.loadParsers(repo);
  stdlib.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export class App {
  parserRepo: AptosParserRepo;
  cache: AptosLocalCache;
  coin_list : coin_list.App
  stdlib : stdlib.App
  constructor(
    public client: AptosClient,
  ) {
    this.parserRepo = getProjectRepo();
    this.cache = new AptosLocalCache();
    this.coin_list = new coin_list.App(client, this.parserRepo, this.cache);
    this.stdlib = new stdlib.App(client, this.parserRepo, this.cache);
  }
}
