module coin_list::coin_list {
    use aptos_framework::coin;
    use coin_list::iterable_table;
    use aptos_std::simple_map;
    use aptos_std::type_info;
    use std::string::String;
    use std::signer;
    use std::vector;
    use std::option;


    const E_CONTRACT_OWNER_ONLY: u64 = 0;
    const E_COIN_OWNER_ONLY: u64 = 1;
    const E_TYPE_ALREADY_EXISTS:u64 = 2;
    const E_COIN_NOT_IN_REGISTRY:u64 = 3;
    const E_LIST_DOES_NOT_EXIST:u64 = 4;
    const E_APPROVER_ONLY: u64 = 5;


    // For ease of iteration, we do not store CoinInfo as independent resource. Instead we put all CoinInfo under a
    // CoinRegistry.
    // In this way, CoinInfo does not have type parameters and can be easily enumerated/iterated using TypeInfo as key
    struct CoinInfo has store, drop, copy {
        name: String,
        symbol: String,
        coingecko_id: String,
        decimals: u8,
        logo_url: String,
        project_url: String,
        token_type: type_info::TypeInfo,
        extensions: simple_map::SimpleMap<String, String>,
    }


    struct CoinRegistry has key {
        type_to_coin_info: iterable_table::IterableTable<type_info::TypeInfo, CoinInfo>,
        approvers: vector<address>,
    }

    struct Nothing has store, copy, drop {}

    struct CoinList has key {
        coin_types: iterable_table::IterableTable<type_info::TypeInfo, Nothing>,
        approvers: vector<address>,
    }

    entry fun init_module(admin: &signer) {
        initialize(admin);
    }

    #[cmd]
    public entry fun initialize(admin: &signer) {
        assert!(signer::address_of(admin) == @coin_list, E_CONTRACT_OWNER_ONLY);
        let approvers = vector::empty<address>();
        vector::push_back(&mut approvers, std::signer::address_of(admin));
        move_to(admin, CoinRegistry {
            type_to_coin_info: iterable_table::new<type_info::TypeInfo, CoinInfo>(),
            approvers,
        });
        create_list(admin);
    }

    #[cmd]
    public entry fun create_list(list_owner: &signer) {
        let approvers = vector::empty<address>();
        vector::push_back(&mut approvers, std::signer::address_of(list_owner));
        move_to(list_owner, CoinList {
            coin_types: iterable_table::new<type_info::TypeInfo, Nothing>(),
            approvers,
        })
    }

    #[cmd]
    public entry fun add_approver_to_registry(admin: &signer, approver: address) acquires CoinRegistry {
        assert!(signer::address_of(admin) == @coin_list, E_CONTRACT_OWNER_ONLY);
        let registry = borrow_global_mut<CoinRegistry>(@coin_list);
        assert!(!vector::contains(&registry.approvers, &approver), 0);
        vector::push_back(&mut registry.approvers, approver);
    }

    #[cmd]
    public entry fun remove_approver_from_registry(admin: &signer, approver: address) acquires CoinRegistry {
        assert!(signer::address_of(admin) == @coin_list, E_CONTRACT_OWNER_ONLY);
        let registry = borrow_global_mut<CoinRegistry>(@coin_list);
        assert!(vector::contains(&registry.approvers, &approver), 0);
        let (_, i) = vector::index_of(&registry.approvers, &approver);
        vector::remove(&mut registry.approvers, i);
    }

    #[cmd]
    public entry fun add_approver_to_list(list_owner: &signer, approver: address) acquires CoinList {
        let list = borrow_global_mut<CoinList>(std::signer::address_of(list_owner));
        assert!(!vector::contains(&list.approvers, &approver), 0);
        vector::push_back(&mut list.approvers, approver);
    }

    #[cmd]
    public entry fun remove_approver_from_list(list_owner: &signer, approver: address) acquires CoinList {
        let list = borrow_global_mut<CoinList>(std::signer::address_of(list_owner));
        assert!(vector::contains(&list.approvers, &approver), 0);
        let (_, i) = vector::index_of(&list.approvers, &approver);
        vector::remove(&mut list.approvers, i);
    }

    #[cmd]
    public entry fun add_to_registry_by_signer<CoinType>(
        coin_owner: &signer,
        name: String,
        symbol: String,
        coingecko_id: String,
        logo_url: String,
        project_url: String,
        is_update: bool,
    ) acquires CoinRegistry {
        let type_info = type_info::type_of<CoinType>();
        assert!(signer::address_of(coin_owner) == type_info::account_address(&type_info), E_COIN_OWNER_ONLY);
        let registry = borrow_global_mut<CoinRegistry>(@coin_list);
        add_to_registry<CoinType>(registry, name, symbol, coingecko_id, logo_url, project_url, is_update);
    }

    #[cmd]
    public entry fun add_to_registry_by_approver<CoinType>(
        approver: &signer,
        name: String,
        symbol: String,
        coingecko_id: String,
        logo_url: String,
        project_url: String,
        is_update: bool,
    ) acquires CoinRegistry {
        let registry = borrow_global_mut<CoinRegistry>(@coin_list);
        assert!(vector::contains(&registry.approvers, &std::signer::address_of(approver)), E_APPROVER_ONLY);
        add_to_registry<CoinType>(registry, name, symbol, coingecko_id, logo_url, project_url, is_update);
    }

    public fun add_to_registry_by_proof<CoinType, OwnershipProof>(
        _ownership_proof: &OwnershipProof,
        name: String,
        symbol: String,
        coingecko_id: String,
        logo_url: String,
        project_url: String,
        is_update: bool,
    ) acquires CoinRegistry {
        let coin_type = type_info::type_of<CoinType>();
        let ownership_type = type_info::type_of<OwnershipProof>();
        let type_address = type_info::account_address(&coin_type);
        let ownership_address = type_info::account_address(&ownership_type);
        let ownership_name = type_info::module_name(&ownership_type);
        assert!(ownership_name == b"OwnershipProof", E_COIN_OWNER_ONLY);
        assert!(type_address == ownership_address, E_COIN_OWNER_ONLY);
        let registry = borrow_global_mut<CoinRegistry>(@coin_list);
        add_to_registry<CoinType>(registry, name, symbol, coingecko_id, logo_url, project_url, is_update);
    }

    #[cmd]
    public entry fun add_extension<CoinType>(
        coin_owner: &signer,
        key: String,
        value: String,
    ) acquires CoinRegistry {
        let registry = borrow_global_mut<CoinRegistry>(@coin_list);
        let type_info = type_info::type_of<CoinType>();
        assert!(signer::address_of(coin_owner) == type_info::account_address(&type_info), E_COIN_OWNER_ONLY);

        let coin_info = iterable_table::borrow_mut(&mut registry.type_to_coin_info, type_info);
        simple_map::add(&mut coin_info.extensions, key, value);
    }

    #[cmd]
    public entry fun drop_extension<CoinType>(
        coin_owner: &signer,
        key: String,
        value: String,
    ) acquires CoinRegistry {
        let registry = borrow_global_mut<CoinRegistry>(@coin_list);
        let type_info = type_info::type_of<CoinType>();
        assert!(signer::address_of(coin_owner) == type_info::account_address(&type_info), E_COIN_OWNER_ONLY);

        let coin_info = iterable_table::borrow_mut(&mut registry.type_to_coin_info, type_info);
        simple_map::add(&mut coin_info.extensions, key, value);
    }

    fun add_to_registry<CoinType>(
        registry: &mut CoinRegistry,
        name: String,
        symbol: String,
        coingecko_id: String,
        logo_url: String,
        project_url: String,
        is_update: bool,
    ) {
        let type_info = type_info::type_of<CoinType>();

        let coin_info = CoinInfo {
            name,
            symbol,
            coingecko_id,
            decimals: coin::decimals<CoinType>(),
            logo_url,
            project_url,
            token_type: type_info,
            extensions: simple_map::create<String, String>(),
        };

        if (!is_update) {
            assert!(!iterable_table::contains(&registry.type_to_coin_info, type_info), E_TYPE_ALREADY_EXISTS);
        }
        else {
            iterable_table::remove(&mut registry.type_to_coin_info, type_info);
        };
        // add it to table
        iterable_table::add(&mut registry.type_to_coin_info, type_info, coin_info);
    }

    public fun is_registry_initialized(): bool {
        exists<CoinRegistry>(@coin_list)
    }

    public fun is_coin_registered<CoinType>(): bool acquires CoinRegistry {
        let registry = borrow_global<CoinRegistry>(@coin_list);
        let type_info = type_info::type_of<CoinType>();
        iterable_table::contains(&registry.type_to_coin_info, type_info)
    }

    public fun get_coin_info<CoinType>(): CoinInfo acquires CoinRegistry {
        let registry = borrow_global<CoinRegistry>(@coin_list);
        let type_info = type_info::type_of<CoinType>();
        *iterable_table::borrow(&registry.type_to_coin_info, type_info)
    }

    public fun is_coin_in_list<CoinType>(list_owner_addr: address):bool acquires CoinList {
        if (!exists<CoinList>(list_owner_addr)) {
           return false
        };
        let list = borrow_global<CoinList>(list_owner_addr);
        let coin_type = type_info::type_of<CoinType>();
        iterable_table::contains(&list.coin_types, coin_type)
    }
    
    #[cmd]
    public entry fun add_to_list<CoinType>(approver: &signer, list: address) acquires CoinRegistry, CoinList {
        assert!(is_coin_registered<CoinType>(), E_COIN_NOT_IN_REGISTRY);
        if (!exists<CoinList>(list) && list == std::signer::address_of(approver)) {
            create_list(approver);
        };
        let list = borrow_global_mut<CoinList>(list);
        assert!(vector::contains(&list.approvers, &std::signer::address_of(approver)), E_APPROVER_ONLY);
        let coin_type = type_info::type_of<CoinType>();
        iterable_table::add(&mut list.coin_types, coin_type, Nothing {});
    }

    #[cmd]
    public entry fun remove_from_list<CoinType>(list_owner: &signer) acquires CoinList {
        let list = borrow_global_mut<CoinList>(signer::address_of(list_owner));
        let coin_type = type_info::type_of<CoinType>();
        iterable_table::remove(&mut list.coin_types, coin_type);
    }

    struct FullList has key, store, copy, drop {
        coin_info_list: vector<CoinInfo>,
    }

    public fun get_full_list(
        list_owner_addr: address,
    ): FullList acquires CoinList, CoinRegistry {
        let list = borrow_global<CoinList>(list_owner_addr);
        let registry = borrow_global<CoinRegistry>(@coin_list);
        let tail = iterable_table::tail_key(&list.coin_types);
        let fulllist = FullList {
            coin_info_list: vector::empty<CoinInfo>(),
        };

        while (option::is_some(&tail)) {
            let tail_key = *option::borrow(&tail);
            let coin_info = iterable_table::borrow(&registry.type_to_coin_info, tail_key);
            vector::push_back(&mut fulllist.coin_info_list, *coin_info);
            let (_, prev, _) = iterable_table::borrow_iter(&list.coin_types, tail_key);
            tail = prev;
        };

        fulllist
    }

    #[query]
    public entry fun fetch_full_list(
        fetcher: &signer,
        list_owner_addr: address,
    ) acquires CoinList, CoinRegistry {
        move_to(fetcher, get_full_list(list_owner_addr))
    }

    public fun get_all_registered_coin_info(): FullList acquires CoinRegistry {
        let registry = borrow_global<CoinRegistry>(@coin_list);
        let tail = iterable_table::tail_key(&registry.type_to_coin_info);
        let fulllist = FullList {
            coin_info_list: vector::empty<CoinInfo>(),
        };

        while (option::is_some(&tail)) {
            let tail_key = *option::borrow(&tail);
            let coin_info = iterable_table::borrow(&registry.type_to_coin_info, tail_key);
            vector::push_back(&mut fulllist.coin_info_list, *coin_info);
            let (_, prev, _) = iterable_table::borrow_iter(&registry.type_to_coin_info, tail_key);
            tail = prev;
        };

        fulllist
    }

    #[query]
    public entry fun fetch_all_registered_coin_info(
        fetcher: &signer,
    ) acquires CoinRegistry {
        move_to(fetcher, get_all_registered_coin_info())
    }

    #[test_only]
    struct FakeBtc {}

    #[test_only]
    struct FakeEth {}

    #[test(admin=@coin_list)]
    fun test_initialize(admin: &signer){
        assert!(!is_registry_initialized(), 5);
        initialize(admin);
        assert!(is_registry_initialized(), 5);
    }

    #[test(admin=@coin_list)]
    #[expected_failure]
    fun test_initialize_twice(admin: &signer){
        initialize(admin);
        initialize(admin);
    }

    #[test_only]
    use std::string;


    #[test_only]
    fun do_add_token<CoinType>(admin: &signer) acquires CoinRegistry {
        let name = b"name123";
        let symbol = b"SYMBOL";
        let coingecko_id = b"id123";
        let logo = b"logo123";
        let project = b"project123";
        add_to_registry_by_signer<CoinType>(
            admin,
            string::utf8(name),
            string::utf8(symbol),
            string::utf8(coingecko_id),
            string::utf8(logo),
            string::utf8(project),
            false,
        );
        let coin_type = type_info::type_of<CoinType>();

        let registry = borrow_global<CoinRegistry>(@coin_list);
        let token_info = iterable_table::borrow(&registry.type_to_coin_info, coin_type);
        assert!(token_info.name == string::utf8(name), 5);
        assert!(token_info.coingecko_id == string::utf8(coingecko_id), 5);
        assert!(token_info.logo_url == string::utf8(logo), 5);
        assert!(token_info.project_url == string::utf8(project), 5);
    }


    #[test(admin=@coin_list)]
    #[expected_failure]
    fun test_add_token_before_initialize(admin: &signer) acquires CoinRegistry {
        do_add_token<FakeBtc>(admin);
    }

    #[test(admin=@coin_list)]
    fun test_add_token(admin: &signer) acquires CoinRegistry {
        initialize(admin);
        let (burn, freeze, mint) = coin::initialize<FakeBtc>(admin, string::utf8(b""), string::utf8(b""), 5, false);
        coin::destroy_mint_cap(mint);
        coin::destroy_freeze_cap(freeze);
        coin::destroy_burn_cap(burn);

        do_add_token<FakeBtc>(admin);
    }

    #[test(admin=@coin_list)]
    #[expected_failure]
    fun test_add_token_twice(admin: &signer) acquires CoinRegistry {
        initialize(admin);
        let (burn, freeze, mint) = coin::initialize<FakeBtc>(admin, string::utf8(b""), string::utf8(b""), 5, false);
        coin::destroy_mint_cap(mint);
        coin::destroy_freeze_cap(freeze);
        coin::destroy_burn_cap(burn);

        do_add_token<FakeBtc>(admin);
        coin::destroy_freeze_cap(freeze);
        do_add_token<FakeBtc>(admin);
    }

    #[test(admin=@coin_list)]
    #[expected_failure]
    fun test_add_token_same_type(admin: &signer) acquires CoinRegistry {
        initialize(admin);
        let (burn, freeze, mint) = coin::initialize<FakeBtc>(admin, string::utf8(b""), string::utf8(b""), 5, false);
        coin::destroy_mint_cap(mint);
        coin::destroy_freeze_cap(freeze);
        coin::destroy_burn_cap(burn);
        do_add_token<FakeBtc>(admin);
        do_add_token<FakeBtc>(admin);
    }

    #[test(admin=@coin_list)]
    fun test_add_two_coins(admin: &signer) acquires CoinRegistry {
        initialize(admin);
        let (burn, freeze, mint) = coin::initialize<FakeBtc>(admin, string::utf8(b""), string::utf8(b""), 5, false);
        coin::destroy_mint_cap(mint);
        coin::destroy_freeze_cap(freeze);
        coin::destroy_burn_cap(burn);

        let (burn, freeze, mint) = coin::initialize<FakeEth>(admin, string::utf8(b""), string::utf8(b""), 5, false);
        coin::destroy_mint_cap(mint);
        coin::destroy_freeze_cap(freeze);
        coin::destroy_burn_cap(burn);

        do_add_token<FakeBtc>(admin);
        do_add_token<FakeEth>(admin);
    }

    #[test(admin=@coin_list)]
    #[expected_failure]
    fun test_add_to_list_twice(admin: &signer) acquires CoinRegistry, CoinList {
        initialize(admin);
        let (burn, freeze, mint) = coin::initialize<FakeBtc>(admin, string::utf8(b""), string::utf8(b""), 5, false);
        coin::destroy_mint_cap(mint);
        coin::destroy_freeze_cap(freeze);
        coin::destroy_burn_cap(burn);

        do_add_token<FakeBtc>(admin);
        add_to_list<FakeBtc>(admin, std::signer::address_of(admin));
        add_to_list<FakeBtc>(admin, std::signer::address_of(admin));
    }

    #[test(admin=@coin_list)]
    fun test_add_then_delist_then_add(admin: &signer) acquires CoinRegistry, CoinList {
        initialize(admin);
        let (burn, freeze, mint) = coin::initialize<FakeBtc>(admin, string::utf8(b""), string::utf8(b""), 5, false);
        coin::destroy_mint_cap(mint);
        coin::destroy_freeze_cap(freeze);
        coin::destroy_burn_cap(burn);

        // add to registry
        assert!(!is_coin_registered<FakeBtc>(), 5);
        do_add_token<FakeBtc>(admin);
        assert!(is_coin_registered<FakeBtc>(), 6);

        // add to list
        assert!(!is_coin_in_list<FakeBtc>(signer::address_of(admin)), 7);
        add_to_list<FakeBtc>(admin, std::signer::address_of(admin));
        assert!(is_coin_in_list<FakeBtc>(signer::address_of(admin)), 8);

        remove_from_list<FakeBtc>(admin);
        assert!(!is_coin_in_list<FakeBtc>(signer::address_of(admin)), 9);

        add_to_list<FakeBtc>(admin, std::signer::address_of(admin));
    }


}
