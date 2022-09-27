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
  coingecko_id: string,
  decimals: number,
  logo_url: string,
  project_url: string,
  token_type: TokenType,
  extensions: ExtensionType,
};

export const DEFAULT_COIN_LIST: RawCoinInfo[] = [
  {
    "name": "DAI-USDC PieceSwap LP Token",
    "symbol": "DAI-USDC",
    "coingecko_id": "",
    "decimals": 8,
    "logo_url": "",
    "project_url": "",
    "token_type": {
      "type": "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap::LPToken<0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetDAI, 0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC>",
      "account_address": "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a",
      "module_name": "piece_swap",
      "struct_name": "LPToken<0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetDAI, 0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC>"
    },
    "extensions": {
      "data": []
    }
  },
  {
    "name": "Dai",
    "symbol": "DAI",
    "coingecko_id": "dai",
    "decimals": 8,
    "logo_url": "https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734",
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
  },
  {
    "name": "USDT-USDC PieceSwap LP Token",
    "symbol": "USDT-USDC",
    "coingecko_id": "",
    "decimals": 8,
    "logo_url": "",
    "project_url": "",
    "token_type": {
      "type": "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap::LPToken<0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDT, 0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC>",
      "account_address": "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a",
      "module_name": "piece_swap",
      "struct_name": "LPToken<0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDT, 0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC>"
    },
    "extensions": {
      "data": []
    }
  },
  {
    "name": "BTC-USDT",
    "symbol": "BTC-USDT",
    "coingecko_id": "",
    "decimals": 8,
    "logo_url": "",
    "project_url": "",
    "token_type": {
      "type": "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_swap::LPToken<0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetBTC, 0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDT>",
      "account_address": "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a",
      "module_name": "cp_swap",
      "struct_name": "LPToken<0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetBTC, 0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDT>"
    },
    "extensions": {
      "data": []
    }
  },
  {
    "name": "Tether",
    "symbol": "USDT",
    "coingecko_id": "tether",
    "decimals": 8,
    "logo_url": "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
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
    "name": "BTC-USDC",
    "symbol": "BTC-USDC",
    "coingecko_id": "",
    "decimals": 8,
    "logo_url": "",
    "project_url": "",
    "token_type": {
      "type": "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_swap::LPToken<0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetBTC, 0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC>",
      "account_address": "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a",
      "module_name": "cp_swap",
      "struct_name": "LPToken<0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetBTC, 0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC>"
    },
    "extensions": {
      "data": []
    }
  },
  {
    "name": "USD Coin",
    "symbol": "USDC",
    "coingecko_id": "usd-coin",
    "decimals": 8,
    "logo_url": "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
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
    "name": "Bitcoin",
    "symbol": "BTC",
    "coingecko_id": "bitcoin",
    "decimals": 8,
    "logo_url": "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
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
  }
];

