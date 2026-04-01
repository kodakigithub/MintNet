import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "./connection";

export async function fetchTokens(publicKey: string) {
    const { value: tokenAccounts } = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(publicKey),
        { programId: TOKEN_PROGRAM_ID }
    );
    return tokenAccounts.map((account) => {
        const parsed = account.account.data.parsed.info;
        return {
            mint: parsed.mint,
            uiAmount: parsed.tokenAmount.uiAmount,
            decimals: parsed.tokenAmount.decimals,
            tokenAccount: account.pubkey.toBase58()
        }
    });
}   