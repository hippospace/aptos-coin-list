import {parseTypeTagOrThrow, strToU8, print} from "@manahippo/move-to-ts";
import {AptosAccount, AptosClient, HexString, Types} from "aptos";
import { Command } from "commander";
import { App, stdlib } from "./lib";
import * as fs from "fs";
import * as yaml from "yaml";
import { REQUESTS } from "./requestList";
import { RawCoinInfo } from "./list";
import { CoinListClient, NetworkType } from "./client";
import {tokenTypeToTag} from "./utils";

const readConfig = (program: Command) => {
  const {config, profile} = program.opts();
  const ymlContent = fs.readFileSync(config, {encoding: "utf-8"});
  const result = yaml.parse(ymlContent);
  //console.log(result);
  if (!result.profiles) {
    throw new Error("Expect a profiles to be present in yaml config");
  }
  if (!result.profiles[profile]) {
    throw new Error(`Expect a ${profile} profile to be present in yaml config`);
  }
  const url = result.profiles[profile].rest_url;
  const privateKeyStr = result.profiles[profile].private_key;
  if (!url) {
    throw new Error(`Expect rest_url to be present in ${profile} profile`);
  }
  if (!privateKeyStr) {
    throw new Error(`Expect private_key to be present in ${profile} profile`);
  }
  const privateKey = new HexString(privateKeyStr);
  const client = new AptosClient(result.profiles[profile].rest_url);
  const account = new AptosAccount(privateKey.toUint8Array());
  console.log(`Using address ${account.address().hex()}`);
  return {client, account};
}

const getCoinInfoBySymbol = (symbol: string): RawCoinInfo => {
  const rawInfos = REQUESTS.filter(req => req.symbol === symbol);
  if (rawInfos.length === 0) {
    throw new Error(`Not found in REQUESTS: ${symbol}`);
  }
  if (rawInfos.length > 1) {
    throw new Error(`Found multiple entries of the same symbol: ${symbol}`);
  }
  return rawInfos[0]
}

const approveCoin = async(info: RawCoinInfo, isUpdate: boolean) => {
  const {client, account} = readConfig(program);
  const CoinType = parseTypeTagOrThrow(info.token_type.type);

  const app = new App(client).coin_list.coin_list;
  let res = await app.add_to_registry_by_approver(
      account,
      makeStr(info.name),
      makeStr(info.symbol),
      makeStr(info.coingecko_id),
      makeStr(info.logo_url),
      makeStr(info.project_url),
      isUpdate,
      [CoinType])
  consoleTransactionResult(isUpdate?"Update":"Approve", info, res)

  if (!isUpdate) {
    res = await app.add_to_list(account,app.moduleAddress, [CoinType])
    consoleTransactionResult("Add to list", info, res)
  }
}

const removeCoin = async(info: RawCoinInfo) => {
  const {client, account} = readConfig(program);
  const CoinType = parseTypeTagOrThrow(info.token_type.type);

  const app = new App(client).coin_list.coin_list;
  let res = await app.remove_from_list(
      account,
      [CoinType])
  consoleTransactionResult("Remove from list", info, res)
  res = await app.remove_from_registry_by_approver(account, [CoinType])
  consoleTransactionResult("Remove from registry", info, res)
}

const consoleTransactionResult = (prefix:string, info: RawCoinInfo, res: Types.UserTransaction) => {
  console.log(prefix +" " + info.token_type.type + " "+ res.success)
  if (!res.success){
    console.log(res.vm_status)
  }
}

const makeStr = (s: string) => {
  return new stdlib.String.String({bytes: strToU8(s)}, stdlib.String.String.getTag())
}


const program = new Command();

program
  .name('yarn adminCli')
  .requiredOption('-c, --config <path>', 'path to your aptos config.yml (generated with "aptos init")')
  .option('-p, --profile <PROFILE>', 'aptos config profile to use', 'default')



const showList = async() => {
  const {client} = readConfig(program);
  const app = new App(client).coin_list.coin_list;
  let res = await app.query_fetch_full_list(app.moduleAddress, []);
  print(res.coin_info_list);
}

program
  .command("show-list")
  .action(showList);


const showDefaultList = async() => {
  const client = new CoinListClient();
  console.log(JSON.stringify(client.coinList, null, 2));
}

program
  .command("show-default-list")
  .action(showDefaultList);


const writeDefaultListJson = async(network: string, outfile: string) => {
  const {client} = readConfig(program);
  if (!['mainnet', 'testnet'].includes(network)) {
    console.log(`network can only be mainnet or testnet`);
    return;
  }
  const listClient = new CoinListClient(network as NetworkType);
  const list = await listClient.update(client);
  const content = JSON.stringify(list, null, 2);
  fs.writeFileSync(outfile, content);
  console.log(`Done writing to ${outfile}`);
}

program
  .command("write-default-list-json")
  .argument("network", "mainnet or testnet")
  .argument("JSON_FILENAME")
  .action(writeDefaultListJson);

const adminApproveBySymbol = async (symbol: string) => {
  const info = getCoinInfoBySymbol(symbol)
  await approveCoin(info, false);
}

program
  .command("approve-symbol")
  .description("")
  .argument('<TYPE_CoinType>')
  .action(adminApproveBySymbol);

const adminUpdateBySymbol = async (symbol: string) => {
  const info = getCoinInfoBySymbol(symbol)
  await approveCoin(info, true);
}

program
  .command("update-symbol")
  .description("")
  .argument('<TYPE_CoinType>')
  .action(adminUpdateBySymbol);

const adminRemoveBySymbol = async (symbol: string) => {
  const info = getCoinInfoBySymbol(symbol);
  await removeCoin(info);
}

program
    .command("remove-symbol")
    .description("")
    .argument('<TYPE_CoinType>')
    .action(adminRemoveBySymbol);

const registerCoin = async (symbol: string) => {
  const info = getCoinInfoBySymbol(symbol)
  const {client, account} = readConfig(program)
  const app = new App(client)
  try {
    await client.getAccount(account.address())
  } catch (e: any){
    if (e.status === 404 && e.errorCode === "resource_not_found"){
      throw new Error("Account of " + account.address() + " has not bean created")
    } else {
      throw e
    }
  }
  console.log("Register " + symbol + " " + info.token_type.type + " ...")
  const result = await app.stdlib.managed_coin.register(account, [tokenTypeToTag(info.token_type)], undefined, true)
  if (result.success){
    console.log("Register success")
  } else if (result.vm_status === "Move abort in 0x1::coin: ECOIN_STORE_ALREADY_PUBLISHED(0x80004): Account already has `CoinStore` registered for `CoinType`"){
    console.log("Coin has bean registered")
  } else {
    console.log(result)
  }
}

program
    .command("register-coin-symbol")
    .description("")
    .argument('<TYPE_CoinType>')
    .action(registerCoin);

program.parse();
