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
};

export const DEFAULT_COIN_LIST: RawCoinInfo[] = [
   {
      "name": "Bitcoin",
      "symbol": "devBTC",
      "official_symbol": "devBTC",
      "coingecko_id": "bitcoin",
      "decimals": 8,
      "logo_url": "https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/BTC.webp",
      "project_url": "project_url",
      "token_type": {
        "type": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetBTC",
        "account_address": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68",
        "module_name": "devnet_coins",
        "struct_name": "DevnetBTC"
      },
      "extensions": {
        "data": []
      }
    },
    {
      "name": "USD Coin",
      "symbol": "devUSDC",
      "official_symbol": "devUSDC",
      "coingecko_id": "usd-coin",
      "decimals": 8,
      "logo_url": "https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/USDC.webp",
      "project_url": "project_url",
      "token_type": {
        "type": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC",
        "account_address": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68",
        "module_name": "devnet_coins",
        "struct_name": "DevnetUSDC"
      },
      "extensions": {
        "data": []
      }
    },
    {
      "name": "Tether",
      "symbol": "devUSDT",
      "official_symbol": "devUSDT",
      "coingecko_id": "tether",
      "decimals": 8,
      "logo_url": "https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/USDT.webp",
      "project_url": "project_url",
      "token_type": {
        "type": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDT",
        "account_address": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68",
        "module_name": "devnet_coins",
        "struct_name": "DevnetUSDT"
      },
      "extensions": {
        "data": []
      }
    },
    {
      "name": "DAI",
      "symbol": "devDAI",
      "official_symbol": "devDAI",
      "coingecko_id": "dai",
      "decimals": 8,
      "logo_url": "https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/DAI.webp",
      "project_url": "project_url",
      "token_type": {
        "type": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetDAI",
        "account_address": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68",
        "module_name": "devnet_coins",
        "struct_name": "DevnetDAI"
      },
      "extensions": {
        "data": []
      }
    }
];

