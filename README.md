
# How to add to this coin list

1. fork repo
2. add `TOKEN_ICON.svg` (no larger than 100x100) to `icons` folder
3. add `RawCoinInfo` to [requestList.ts](https://github.com/hippospace/aptos-coin-list/blob/main/typescript/src/requestList.ts)
4. PR
5. Shout in [TG](https://t.me/+LBfzjYgGlVdjN2Y1)

Once PR is accepted, any [authorized maintainer](https://github.com/hippospace/aptos-coin-list/blob/main/sources/coin_list.move#L37)
will be able to add the RawCoinInfo to our on-chain list by running `yarn admin-cli -c config.yaml approve-symbol SYMBOL`.

# Fetching list
You can use the [client](https://github.com/hippospace/aptos-coin-list/blob/2663369014b2035654bf4778e3794ecbf0b0fc06/typescript/src/client.ts#L51) 
provided in the included typescript sdk to fetch an updated list from the chain, or you could fetch the json file 
from github which is frequently updated:
- [testnet list](https://github.com/hippospace/aptos-coin-list/blob/main/typescript/src/defaultList.testnet.json)
- [mainnet list](https://github.com/hippospace/aptos-coin-list/blob/main/typescript/src/defaultList.mainnet.json)

# Displaying RawCoinInfo
We recommend frontends display the following information for each coin:
- `name`: full coin name, usually includes project name
- `symbol` or `official_symbol`: short 3-6 letter representation
- `logo_url`: coin logo

The reason we have both `symbol` field and `official_symbol` is that the `symbol` field is required to be unique within
this registry, whereas for `official_symbol` there is no such requirement. For example, different bridge protocols may
have their own bridged versions of `USDC`. They are allowed to use `USDC` as the `official_symbol`, but are required to
use distinct `symbol`s (e.g. `xUSDC`, `yUSDC`).

In a complete `RawCoinInfo`, we have these fields:
- `name`: coin name, preferrably include project name
- `symbol`: globally unique symbol within this coin registry
- `official_symbol`: same as `aptos_framework::coin::CoinInfo.symbol`, duplicates allowed
- `coingecko_id`: coingecko id. May be used by various clients to look up coin price
- `logo_url`: URL to token logo, preferrably a githubusercontent url
- `project_url`: URL to project
- `token_type`: token address info
- `extensions`: other informal info that you want to add, in the form of a list of string-string key-value pairs

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
    "data": []
  }
},
```

