import permissionedList from "./permissioned.json";
import permissionlessList from "./permissionless.json";
import testnetList from "./defaultList.testnet.json";
export type TokenType = {
  type: string,
  account_address: string,
  module_name: string,
  struct_name: string,
}

export type ExtensionType = {
  data: [string, string][],
}

export type RawCoinInfo = {
  name: string,
  symbol: string,
  official_symbol: string,
  coingecko_id: string,
  decimals: number,
  logo_url: string,
  project_url: string,
  token_type: TokenType,
  extensions: ExtensionType,
  unique_index?: number,
  source?: string,
  hippo_symbol?: string,
  pancake_symbol?: string,
  permissioned_listing?: boolean,
};

type RawJsonCoinInfo = {
  name: string,
  symbol: string,
  official_symbol: string,
  coingecko_id: string,
  decimals: number,
  logo_url: string,
  project_url: string,
  token_type: TokenType,
  extensions: {
    data: string[][]
  },
  source?: string,
  unique_index?: number,
  hippo_symbol?: string,
  pancake_symbol?: string,
  permissioned_listing?: boolean,
};

// v1 legacy list names
export const DEFAULT_JSON_MAINNET_LIST: RawJsonCoinInfo[] = permissionedList;
export const DEFAULT_MAINNET_LIST: RawCoinInfo[] = permissionedList as unknown as RawCoinInfo[];
export const DEFAULT_TESTNET_LIST: RawCoinInfo[] = testnetList;


// v2 list names
export const PERMISSIONED_LIST: RawCoinInfo[] = permissionedList as unknown as RawCoinInfo[];
export const PERMISSIONLESS_LIST: RawCoinInfo[] = permissionlessList as unknown as RawCoinInfo[];