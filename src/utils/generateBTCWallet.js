// import * as bitcoin from "bitcoinjs-lib";
// import * as ecc from "tiny-secp256k1";

// bitcoin.initEccLib(ecc);

// export function generateBTCWallet() {
//   const testnet = bitcoin.networks.testnet;
//   const keyPair = bitcoin.ECPair.makeRandom({ network: testnet });

//   const { address } = bitcoin.payments.p2wpkh({
//     pubkey: keyPair.publicKey,
//     network: testnet,
//   });

//   const wif = keyPair.toWIF();

//   return { address, wif };
// }
