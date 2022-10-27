import {RawCoinInfo, TokenType} from "./list";
import {StructTag} from "@manahippo/move-to-ts";
import {HexString} from "aptos";

export function tokenTypeToTag(tokenType:TokenType):StructTag{
   return new StructTag(
            new HexString(tokenType.account_address),
            tokenType.module_name,
            tokenType.struct_name,
        []
    );
}
export function coinInfoToTag(coinInfo:RawCoinInfo):StructTag{
    return tokenTypeToTag(coinInfo.token_type)
}