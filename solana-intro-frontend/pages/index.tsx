import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import AddressForm from "../components/AddressForm";

import {
  PublicKey,
  LAMPORTS_PER_SOL,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [IsExecutable, setIsExecutable] = useState(false);

  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address);

      const key = new PublicKey(address);
      const connection = new Connection(clusterApiUrl("devnet"));
      connection.getAccountInfo(key).then((info) => {
        setBalance(info ? info.lamports / LAMPORTS_PER_SOL : 0);
        setIsExecutable(info ? info.executable : false);
      });
    } catch (err) {
      alert(err);
      setBalance(0);
      setIsExecutable(false);
      setAddress("");
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>Start Your Solana Journey</p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable? ${IsExecutable ? "Yup!" : "Nope!"}`}</p>
      </header>
    </div>
  );
};

export default Home;
