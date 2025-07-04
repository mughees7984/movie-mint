import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export const sendSolUsingPhantom = async (recipientAddress, amountInSOL) => {
  try {
    if (!window.solana || !window.solana.isPhantom) {
      throw new Error("Phantom wallet not installed");
    }

    const provider = window.solana;
    const sender = provider.publicKey;
    const recipient = new PublicKey(recipientAddress);

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports: amountInSOL * LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = sender;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const signed = await provider.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());

    await connection.confirmTransaction(signature, "confirmed");

    return signature;
  } catch (error) {
    throw new Error(`Send failed: ${error.message}`);
  }
};
