module coin_list::devnet_coins {
    use aptos_framework::coin;
    use std::string::{utf8, String};
    use std::signer;
    use std::string;
    use aptos_std::type_info;
    use aptos_framework::coin::CoinInfo;

    struct DevnetBTC {}
    struct DevnetBNB {}
    struct DevnetETH {}
    struct DevnetSOL {}
    struct DevnetUSDC {}
    struct DevnetUSDT {}
    struct DevnetDAI {}

    struct CoinCaps<phantom T> has key {
        mint: coin::MintCapability<T>,
        freeze: coin::FreezeCapability<T>,
        burn: coin::BurnCapability<T>,
    }

    public fun initialize<TokenType>(admin: &signer, decimals: u8){
        let name = type_info::struct_name(&type_info::type_of<TokenType>());
        init_coin<TokenType>(admin, name, name, decimals)
    }

    public entry fun init_coin<CoinType>(
        admin: &signer,
        name: vector<u8>,
        symbol: vector<u8>,
        decimals: u8,
    ) {
        if (!coin::is_coin_initialized<CoinType>()) {
            let (burn, freeze, mint) =
                coin::initialize<CoinType>(
                    admin,
                    utf8(name),
                    utf8(symbol),
                    decimals,
                    false
                );
            move_to(admin, CoinCaps{
                mint,
                freeze,
                burn,
            });
        }
    }

    public fun mint<CoinType>(amount: u64): coin::Coin<CoinType> acquires CoinCaps {
        let caps = borrow_global<CoinCaps<CoinType>>(@coin_list);
        coin::mint(amount, &caps.mint)
    }

    #[cmd]
    public entry fun mint_to_wallet<CoinType>(user: &signer, amount: u64) acquires CoinCaps {
        let coin = mint<CoinType>(amount);
        if (!coin::is_account_registered<CoinType>(signer::address_of(user))) {
            coin::register<CoinType>(user);
        };
        coin::deposit(signer::address_of(user), coin);
    }

    public fun burn<TokenType>(tokens: coin::Coin<TokenType>) acquires CoinCaps{
        //token holder address
        let addr = type_info::account_address(&type_info::type_of<TokenType>());
        let cap = borrow_global<CoinCaps<TokenType>>(addr);
        let amt = coin::value(&tokens);
        if (amt == 0) {
            coin::destroy_zero<TokenType>(tokens);
        } else {
            coin::burn<TokenType>(tokens, &cap.burn);
        }
    }

    public fun deposit<CoinType>(user: &signer,coin: coin::Coin<CoinType>) {
        if (!coin::is_account_registered<CoinType>(signer::address_of(user))) {
            coin::register<CoinType>(user);
        };
        coin::deposit(signer::address_of(user), coin);
    }

    public fun init_coin_and_register<CoinType>(
        admin: &signer,
        name: String,
        symbol: String,
        decimals: u8
    ){
        init_coin<CoinType>(admin, *string::bytes(&name), *string::bytes(&symbol), decimals);
    }

    public entry fun deploy(admin: &signer) {
        init_coin_and_register<DevnetBTC>(
            admin,
            utf8(b"Bitcoin"),
            utf8(b"devBTC"),
            8
        );

        init_coin_and_register<DevnetBNB>(
            admin,
            utf8(b"BNB"),
            utf8(b"devBNB"),
            8
        );

        init_coin_and_register<DevnetETH>(
            admin,
            utf8(b"Ethereum"),
            utf8(b"devETH"),
            8
        );

        init_coin_and_register<DevnetSOL>(
            admin,
            utf8(b"Solana"),
            utf8(b"devSOL"),
            8
        );

        init_coin_and_register<DevnetUSDC>(
            admin,
            utf8(b"USD Coin"),
            utf8(b"devUSDC"),
            8
        );

        init_coin_and_register<DevnetUSDT>(
            admin,
            utf8(b"Tether"),
            utf8(b"devUSDT"),
            8
        );

        init_coin_and_register<DevnetDAI>(
            admin,
            utf8(b"DAI"),
            utf8(b"devDAI"),
            8
        );

    }

    #[test(admin = @coin_list, user = @0x0123)]
    fun test(admin: &signer, user: &signer) acquires CoinCaps {
        use aptos_framework::aptos_account;
        aptos_account::create_account(signer::address_of(user));

        let amount = 10000;
        initialize<DevnetUSDC>(admin,8);

        mint_to_wallet<DevnetUSDC>(user,amount);
        assert!(coin::balance<DevnetUSDC>(signer::address_of(user)) == amount, 1);

        let c = coin::withdraw<DevnetUSDC>(user,amount);
        assert!(coin::value(&c) == amount, 1);

        burn(c)
    }

    #[test(admin = @coin_list)]
    fun test_deploy(admin: &signer){
        deploy(admin)
    }

}
