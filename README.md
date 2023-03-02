
# How to add to this coin list

1. fork repo
2. add `TOKEN_ICON.svg` (no larger than 100x100) to `icons` folder
3. add `RawCoinInfo` to [requestList.ts](https://github.com/hippospace/aptos-coin-list/blob/main/src/requestList.ts)
4. PR
5. Shout in [TG](https://t.me/+LBfzjYgGlVdjN2Y1)


# Fetching list
You can use the [client](https://github.com/hippospace/aptos-coin-list/blob/main/src/client.ts) 
provided in the included typescript sdk to fetch an updated list from the chain, or you could fetch the json file 
from github which is frequently updated:
- [permissioned list](https://github.com/hippospace/aptos-coin-list/blob/main/src/permissioned.json)
- [permissionless list](https://github.com/hippospace/aptos-coin-list/blob/main/src/permissionless.json)


# Displaying RawCoinInfo
We recommend frontends display the following information for each coin:
- `name`: full coin name, usually includes project name
- `official_symbol` or `symbol` or `hippo_symbol` or `pancake_symbol`
- `logo_url`: coin logo


# `official_symbol` or `symbol` or `hippo_symbol` or `pancake_symbol`

Aptos started out in a state where different protocols used different symbols for the same bridged token. This set of
four symbols tries to capture all that variety in how coin symbols are displayed across the aptos ecosystem.
- `official_symbol`: this is the symbol registered by the token minter onchain
- `symbol`: similar to `official_symbol`, except if the coin is bridged from wormhole or layerzero. Layerzero
  coins are prefixed with `z` and many wormhole symbols are unprefixed
- `hippo_symbol`: similar to `official_symbol`, except: layerzero symbols use `z` prefix and wormhole symbols use `w` prefix
- `pancake_symbol`: similar to `official_symbol`, except: layerzero symbols use `lz` prefix and wormhole symbols use `wh` prefix


# RawCoininfo

In a complete `RawCoinInfo`, we have these fields:
- `name`: coin name, preferrably include project name
- `symbol`: globally unique symbol within this coin registry
- `official_symbol`: same as `aptos_framework::coin::CoinInfo.symbol`, duplicates allowed
- `coingecko_id`: coingecko id. May be used by various clients to look up coin price
- `logo_url`: URL to token logo, preferrably a githubusercontent url
- `project_url`: URL to project
- `token_type`: token address info
- `extensions`: other informal info that you want to add, in the form of a list of string-string key-value pairs
- `unique_index`: a unique numeric index within this list
- `source`: indicates if the token is from a bridge or native
- `hippo_symbol`: hippo-style prefixed symbols (wormhole uses "w" prefix, layerzero uses "z" prefix)
- `pancake_symbol`: pancake-style prefixed symbols (wormhole uses "wh" prefix, layerzero uses "lz" prefix)

Example:

```typescript
{
  "name": "Aptos Coin",
  "symbol": "APT",
  "official_symbol": "APT",
  "coingecko_id": "aptos",
  "decimals": 8,
  "logo_url": "https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/APT.webp",
  "project_url": "https://aptoslabs.com/",
  "token_type": {
    "type": "0x1::aptos_coin::AptosCoin",
    "account_address": "0x1",
    "module_name": "aptos_coin",
    "struct_name": "AptosCoin"
  },
  "extensions": {
    "data": [
      [
        "bridge",
        "native"
      ]
    ]
  },
  "unique_index": 1,
  "source": "native",
  "permissioned_listing": true
},
```

