import React from 'react';
import styles from '../styles/balance/balance.module.css'; // Import CSS Module
import balanceImg from '../assets/IMG/flat-design-cryptocurrency-concept-with-device-removebg-preview (1).png';
import transferImg from '../assets/IMG/people-using-mobile-bank-remittance-money.png';

const BalanceTransfer = () => {
  return (
    <main className={styles.main}>
      <section id="balance-check" className={styles.section}>
        <img src={balanceImg} alt="Check Balance" className={styles.sectionImage} />
        <h1 className={styles.headerH1}>Balance</h1>
        <p className={styles.paragraph}>To check your balance, provide your ID.</p>
        <form action="/check-balance" method="post" className={styles.form}>
          <label htmlFor="id" className={styles.formLabel}>ID:</label>
          <input type="number" id="id" name="id" required className={styles.formInput} />
          <button type="submit" className={styles.formButton}>Submit</button>
        </form>
      </section>

      <section id="money-transfer" className={styles.section}>
        <img src={transferImg} alt="Money Transfer" className={styles.sectionImage} />
        <h2 className={styles.headerH2}>Transfer Money</h2>
        <p className={styles.paragraph}>To transfer money, fill out the details below.</p>
        <form action="/transfer-money" method="post" className={styles.form}>
          <label htmlFor="amount" className={styles.formLabel}>Amount:</label>
          <input type="number" id="amount" name="amount" min="0" required className={styles.formInput} />
          
          <label htmlFor="receiver" className={styles.formLabel}>Receiver ID:</label>
          <input type="text" id="receiver" name="receiver" required className={styles.formInput} />
          
          <button type="submit" className={styles.formButton}>Submit</button>
        </form>
      </section>
    </main>
  );
};

export default BalanceTransfer;
