import {OptionTransaction, u8str} from "@manahippo/move-to-ts";
import { AptosClient, } from "aptos";
import { DEFAULT_MAINNET_LIST, DEFAULT_TESTNET_LIST, RawCoinInfo } from "./list";
import { App, stdlib, coin_list } from "./lib";
import { Simple_map } from "./lib/stdlib";
import { TypeInfo } from "./lib/stdlib/type_info";

export function coinInfoToRaw(coinInfo: coin_list.Coin_list.CoinInfo): RawCoinInfo {
  return {
    name: coinInfo.name.str(),
    symbol: coinInfo.symbol.str(),
    official_symbol: coinInfo.official_symbol.str(),
    coingecko_id: coinInfo.coingecko_id.str(),
    decimals: coinInfo.decimals.toJsNumber(),
    logo_url: coinInfo.logo_url.str(),
    project_url: coinInfo.project_url.str(),
    token_type: {
      type: coinInfo.token_type.typeFullname(),
      account_address: coinInfo.token_type.account_address.hex(),
      module_name: u8str(coinInfo.token_type.module_name),
      struct_name: u8str(coinInfo.token_type.struct_name),
    },
    extensions: {
      data: coinInfo.extensions.data.map(element => [
        ((element as Simple_map.Element).key as stdlib.String.String).str(),
        ((element as Simple_map.Element).value as stdlib.String.String).str(),
      ] as [string, string])
    },
  };
}

export async function fetchUpdatedList(client: AptosClient, owner=coin_list.Coin_list.moduleAddress, option?: OptionTransaction,): Promise<RawCoinInfo[]> {
  const app = new App(client);
  const list = await app.coin_list.coin_list.query_fetch_full_list(owner, [], option);

  return list.coin_info_list.map(coinInfoToRaw);
}

export async function fetchFullRegistry(client: AptosClient): Promise<RawCoinInfo[]> {
  const app = new App(client);
  const list = await app.coin_list.coin_list.query_fetch_all_registered_coin_info([]);

  return list.coin_info_list.map(coinInfoToRaw);
}

export type NetworkType = 'testnet' | 'mainnet';

export class CoinListClient {
  fullnameToCoinInfo: Record<string, RawCoinInfo>;
  indexToCoinInfo: Map<number, RawCoinInfo>;
  symbolToCoinInfo: Record<string, RawCoinInfo[]>;
  coinList: RawCoinInfo[];
  network: NetworkType;
  isUpdated:boolean

  constructor(network: NetworkType = 'mainnet', list: RawCoinInfo[] | undefined = undefined) {
    this.fullnameToCoinInfo = {};
    this.indexToCoinInfo = new Map();
    this.symbolToCoinInfo = {};
    this.isUpdated = false;
    if (list){
      this.coinList = list
    } else {
      this.coinList = network === 'mainnet' ? DEFAULT_MAINNET_LIST : DEFAULT_TESTNET_LIST;
    }
    this.network = network;
    this.buildCache();
  }

  hasTokenType(tokenType: TypeInfo) {
    return tokenType.typeFullname() in this.fullnameToCoinInfo;
  }

  getCoinInfoList() {
    return this.coinList;
  }

  getCoinInfoBySymbol(symbol: string): RawCoinInfo[] {
    return this.symbolToCoinInfo[symbol] || [];
  }

  getCoinInfoByType(tokenType: TypeInfo): RawCoinInfo | undefined {
    return this.fullnameToCoinInfo[tokenType.typeFullname()];
  }

  getCoinInfoByFullName(fullname: string): RawCoinInfo | undefined {
    return this.fullnameToCoinInfo[fullname];
  }

  static async load(client: AptosClient, network: NetworkType, owner=coin_list.Coin_list.moduleAddress, option?: OptionTransaction) {
    const list = await fetchUpdatedList(client, owner, option);
    const coinListClient = new CoinListClient(network, list);
    coinListClient.isUpdated = true
    return coinListClient
  }

  async update(client: AptosClient, owner=coin_list.Coin_list.moduleAddress, option?: OptionTransaction ) {
    if (this.isUpdated){
      return this.coinList;
    }
    return await this.updateDirect(client,owner,option)
  }

  async updateDirect(client: AptosClient, owner=coin_list.Coin_list.moduleAddress, option?: OptionTransaction) {
    this.coinList = await fetchUpdatedList(client, owner, option);
    this.buildCache();
    this.isUpdated = true
    return this.coinList;
  }

  private buildCache() {
    for (const coinInfo of this.coinList) {
      this.fullnameToCoinInfo[coinInfo.token_type.type] = coinInfo;
      const index = coinInfo.unique_index;
      if (index) {
        if (this.indexToCoinInfo.has(index)) {
          throw new Error(`${index} is used by multiple coins`);
        }
        this.indexToCoinInfo.set(index, coinInfo);
      }
      const symbol = coinInfo.symbol;
      if (!this.symbolToCoinInfo[symbol]) {
        this.symbolToCoinInfo[symbol] = [];
      }
      this.symbolToCoinInfo[coinInfo.symbol].push(coinInfo);
    }
  }
}
