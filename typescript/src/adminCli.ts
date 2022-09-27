import { parseTypeTagOrThrow, TypeTag, strToU8, sendPayloadTx } from "@manahippo/move-to-ts";
import { AptosAccount, AptosClient, HexString } from "aptos";
import { Command } from "commander";
import { App, stdlib } from "./src";
import * as fs from "fs";
import * as yaml from "yaml";
import { REQUESTS } from "./requestList";

export const readConfig = (program: Command) => {
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

const program = new Command();

program
  .name('yarn adminCli')
  .requiredOption('-c, --config <path>', 'path to your aptos config.yml (generated with "aptos init")')
  .option('-p, --profile <PROFILE>', 'aptos config profile to use', 'default')


const makeStr = (s: string) => {
  return new stdlib.String.String({bytes: strToU8(s)}, stdlib.String.String.getTag())
}


const adminApprove = async (coinType: string) => {
  const {client, account} = readConfig(program);
  let CoinType: TypeTag;
  try{
    CoinType = parseTypeTagOrThrow(coinType);
  }
  catch (e) {
    console.log(`Bad type: ${coinType}`);
    return;
  }
  const rawInfos = REQUESTS.filter(req => req.token_type.type === coinType);
  if (rawInfos.length === 0) {
    console.log(`Not found in REQUESTS: ${coinType}`);
    return;
  }
  if (rawInfos.length > 1) {
    console.log(`Found multiple entries of the same type: ${coinType}`);
    return;
  }

  const info = rawInfos[0];

  const app = new App(client).coin_list.coin_list;

  const payload = app.payload_add_to_registry_by_admin(
    makeStr(info.name),
    makeStr(info.symbol),
    makeStr(info.coingecko_id),
    makeStr(info.logo_url),
    makeStr(info.project_url),
    false,
    []
  );
  await sendPayloadTx(client, account, payload, 1000, true);
  
  const payload2 = app.payload_add_to_list([CoinType]);
  await sendPayloadTx(client, account, payload2, 1000, true);

}

program
  .command("admin-approve")
  .description("")
  .argument('<TYPE_CoinType>')
  .action(adminApprove);


program.parse();
