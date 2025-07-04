// // src/utils/sendBitcoin.js
// import axios from "axios";
// import * as bitcoin from "bitcoinjs-lib";
// import * as ecc from "tiny-secp256k1";

// // Required for bitcoinjs-lib signing
// bitcoin.initEccLib(ecc);

// const TESTNET = bitcoin.networks.testnet;

// export const sendBitcoin = async ({ fromAddress, toAddress, amountSats, privateKeyWIF }) => {
//   try {
//     const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, TESTNET);

//     // 1. Get UTXOs
//     const { data: utxos } = await axios.get(
//       `https://blockstream.info/testnet/api/address/${fromAddress}/utxo`
//     );

//     if (!utxos.length) throw new Error("❌ No UTXOs found for this address.");

//     const psbt = new bitcoin.Psbt({ network: TESTNET });

//     let inputSum = 0;
//     const fee = 500;

//     for (const utxo of utxos) {
//       if (inputSum >= amountSats + fee) break;
//       psbt.addInput({
//         hash: utxo.txid,
//         index: utxo.vout,
//         witnessUtxo: {
//           script: bitcoin.address.toOutputScript(fromAddress, TESTNET),
//           value: utxo.value,
//         },
//       });
//       inputSum += utxo.value;
//     }

//     if (inputSum < amountSats + fee) {
//       throw new Error("❌ Insufficient balance to cover amount + fee.");
//     }

//     psbt.addOutput({
//       address: toAddress,
//       value: amountSats,
//     });

//     const change = inputSum - amountSats - fee;
//     if (change > 0) {
//       psbt.addOutput({
//         address: fromAddress,
//         value: change,
//       });
//     }

//     psbt.signAllInputs(keyPair);
//     psbt.finalizeAllInputs();

//     const rawTx = psbt.extractTransaction().toHex();

//     const res = await axios.post("https://blockstream.info/testnet/api/tx", rawTx);

//     return res.data; // txid
//   } catch (err) {
//     console.error("❌ Bitcoin transaction failed:", err);
//     throw new Error(err.message || "Bitcoin send failed");
//   }
// };
