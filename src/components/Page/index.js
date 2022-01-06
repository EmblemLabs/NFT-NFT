import React, { useEffect, useState } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import Web3 from 'web3';

import { ConnectWalletContext, initOnboard } from '../../utils';
import NFTTrade from '../../contracts/NFTrade.json';
import styles from './Page.module.sass';
import Header from '../Header';
import Footer from '../Footer';

const Page = ({ children }) => {
  const { pathname } = useLocation();
  const [onboard, setOnboard] = useState(null);
  const connectWalletContext = React.useContext(ConnectWalletContext);

  useEffect(() => {
    const onboard = initOnboard({
      address: connectWalletContext.setAddress,
      ens: connectWalletContext.setEns,
      network: connectWalletContext.setNetwork,
      balance: connectWalletContext.setBalance,
      wallet: async (wallet) => {
        if (wallet.provider) {
          connectWalletContext.setWallet(wallet);

          // Initialize web3 object
          const web3 = new Web3(wallet.provider);
          const nftContract = new web3.eth.Contract(NFTTrade.abi, NFTTrade.networks.address);
          connectWalletContext.setWeb3(web3);

          window.localStorage.setItem('selectedWallet', wallet.name);
          onboard.walletCheck();
        } else {
          // provider = null
          connectWalletContext.setWallet({});
        }
      },
    });

    connectWalletContext.setOnboard(onboard);
    setOnboard(onboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet');

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  const handleConnectWallet = () => {
    onboard.walletSelect();
  };

  const handleDisconnectWallet = () => {
    onboard.walletReset();
    connectWalletContext.reset();
    window.localStorage.clear();
  };

  return (
    <div className={styles.page}>
      <Header
        wallet={connectWalletContext.wallet}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
};

export default withRouter(Page);
