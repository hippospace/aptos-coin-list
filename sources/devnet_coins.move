module coin_list::devnet_coins {
    use aptos_framework::coin;
    use aptos_framework::coins;
    use coin_list::coin_list;
    use std::string::utf8;
    use std::signer;

    struct DevnetBTC {}
    struct DevnetBNB {}
    struct DevnetETH {}
    struct DevnetSOL {}
    struct DevnetUSDC {}
    struct DevnetUSDT {}

    struct CoinCaps<phantom T> has key {
        mint: coin::MintCapability<T>,
        burn: coin::BurnCapability<T>,
    }

    public fun init_coin<CoinType>(admin: &signer, name: vector<u8>, symbol: vector<u8>) {
        let (mint, burn) = coin::initialize<CoinType>(admin, utf8(name), utf8(symbol), 8, false);
        move_to(admin, CoinCaps {
            mint,
            burn,
        });
    }

    public fun mint<CoinType>(amount: u64): coin::Coin<CoinType> acquires CoinCaps {
        let caps = borrow_global<CoinCaps<CoinType>>(@coin_list);
        coin::mint(amount, &caps.mint)
    }

    #[cmd]
    public entry fun mint_to_wallet<CoinType>(user: &signer, amount: u64) acquires CoinCaps {
        let coin = mint<CoinType>(amount);
        if (!coin::is_account_registered<CoinType>(signer::address_of(user))) {
            coins::register_internal<CoinType>(user);
        };
        coin::deposit(signer::address_of(user), coin);
    }

    #[cmd(desc=b"Register devnet coins")]
    public entry fun deploy(admin: &signer) {
        init_coin<DevnetBTC>(admin, b"Bitcoin", b"BTC");
        init_coin<DevnetBNB>(admin, b"BNB", b"BNB");
        init_coin<DevnetETH>(admin, b"Ethereum", b"ETH");
        init_coin<DevnetSOL>(admin, b"Solana", b"SOL");
        init_coin<DevnetUSDC>(admin,b"USD Coin", b"USDC");
        init_coin<DevnetUSDT>(admin, b"Tether", b"USDT");

        if (!coin_list::is_registry_initialized()) {
            coin_list::initialize(admin);
        };

        coin_list::add_to_registry_by_signer<DevnetBTC>(
            admin,
            utf8(b"Bitcoin"),
            utf8(b"BTC"),
            utf8(b"bitcoin"),
            utf8(b"https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"),
            utf8(b"project_url"),
            false
        );

        coin_list::add_to_registry_by_signer<DevnetBNB>(
            admin,
            utf8(b"BNB"),
            utf8(b"BNB"),
            utf8(b"binancecoin"),
            utf8(b"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850"),
            utf8(b"project_url"),
            false
        );

        coin_list::add_to_registry_by_signer<DevnetETH>(
            admin,
            utf8(b"Ethereum"),
            utf8(b"ETH"),
            utf8(b"ethereum"),
            utf8(b"https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"),
            utf8(b"project_url"),
            false
        );

        coin_list::add_to_registry_by_signer<DevnetSOL>(
            admin,
            utf8(b"Solana"),
            utf8(b"SOL"),
            utf8(b"solana"),
            utf8(b"https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422"),
            utf8(b"project_url"),
            false
        );

        coin_list::add_to_registry_by_signer<DevnetUSDC>(
            admin,
            utf8(b"USD Coin"),
            utf8(b"USDC"),
            utf8(b"usd-coin"),
            utf8(b"https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389"),
            utf8(b"project_url"),
            false
        );

        coin_list::add_to_registry_by_signer<DevnetUSDT>(
            admin,
            utf8(b"Tether"),
            utf8(b"USDT"),
            utf8(b"tether"),
            utf8(b"https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707"),
            utf8(b"project_url"),
            false
        );
    }


}
