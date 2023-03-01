import { Command } from "commander";
import * as fs from "fs";
import { REQUESTS } from "./requestList";
import { RawCoinInfo } from "./list";
import { CoinListClient } from "./client";

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



const program = new Command();

program
  .name('yarn cli');


const outputValidatedList = (file: string, permissioned: boolean) => {
  const idxSet = new Set<number>();
  const symbolToIdx = new Map<string, number>();
  const listToPrint: RawCoinInfo[] = [];
  for(const info of REQUESTS) {
    if (permissioned && !info.permissioned_listing) {
      continue;
    }
    const index = info.unique_index || 99999999;
    const symbol = info.symbol;
    if (info.unique_index) {
      if (idxSet.has(index)) {
        throw new Error(`Index ${index} used by multiple coins`);
      }
      idxSet.add(index);
    }
    if (symbolToIdx.has(symbol)) {
      throw new Error(`Symbol ${symbol} used by multiple coins`);
    }
    symbolToIdx.set(symbol, index);

    // set hippo_symbol and pancake_symbol
    if (info.source && info.source.toLowerCase()===('wormhole')) {
      info.hippo_symbol = `w${info.official_symbol}`;
      info.pancake_symbol = `wh${info.official_symbol}`;
      if (symbolToIdx.has(info.hippo_symbol) && symbolToIdx.get(info.hippo_symbol) !== index)  {
        throw new Error(`${info.hippo_symbol} has repeats: ${info.unique_index}`);
      }
      if (symbolToIdx.has(info.pancake_symbol) && symbolToIdx.get(info.pancake_symbol) !== index)  {
        throw new Error(`${info.pancake_symbol} has repeats: ${info.unique_index}`);
      }
      symbolToIdx.set(info.hippo_symbol, index);
      symbolToIdx.set(info.pancake_symbol, index);
    }
    if (info.source && info.source.toLowerCase()===('layerzero')) {
      info.hippo_symbol = `z${info.official_symbol}`;
      info.pancake_symbol = `lz${info.official_symbol}`;
      if (symbolToIdx.has(info.hippo_symbol) && symbolToIdx.get(info.hippo_symbol) !== index)  {
        throw new Error(`${info.hippo_symbol} has repeats: ${info.unique_index}`);
      }
      if (symbolToIdx.has(info.pancake_symbol) && symbolToIdx.get(info.pancake_symbol) !== index)  {
        throw new Error(`${info.pancake_symbol} has repeats: ${info.unique_index}`);
      }
      symbolToIdx.set(info.hippo_symbol, index);
      symbolToIdx.set(info.pancake_symbol, index);
    }

    listToPrint.push(info);
  }
  listToPrint.sort((a, b)=> (a.unique_index || 0) - (b.unique_index || 0));
  const content = JSON.stringify(listToPrint, null, 2);
  fs.writeFileSync(file, content);
  console.log(`Done writing to ${file}`);
}

const outputPermissionedList = (file: string) => {outputValidatedList(file, true);}
const outputPermissionlessList = (file: string) => {outputValidatedList(file, false);}

program
    .command("output-permissioned-list")
    .argument("<FILE>")
    .action(outputPermissionedList);

program
    .command("output-permissionless-list")
    .argument("<FILE>")
    .action(outputPermissionlessList);

const printList = (permissioned: boolean) => {
  const client = new CoinListClient(permissioned);
  const list = client.getCoinInfoList();
  console.log(JSON.stringify(list, null, 2));
};

const printPermissionedList = () => {printList(true);}
const printPermissionlessList = () => {printList(false);}

program
    .command("print-permissioned-list")
    .action(printPermissionedList);

program
    .command("print-permissionless-list")
    .action(printPermissionlessList);

program.parse();
