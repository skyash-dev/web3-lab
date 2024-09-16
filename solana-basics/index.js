const { Connection, clusterApiUrl, PublicKey } = require("@solana/web3.js");

async function getBalanceUsingWeb3(address) {
  const connection = new Connection(clusterApiUrl("devnet"));
  return connection.getBalance(address);
}

const publicKey = new PublicKey("2jtx37CWtkMCq73ATFjnPbac3XyQThNL3fbhdDb13h2n");
getBalanceUsingWeb3(publicKey).then((balance) => {
  console.log(balance);
});
