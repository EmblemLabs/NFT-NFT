import * as React from 'react';
import PropTypes from 'prop-types';

const ConnectWalletContext = React.createContext();

const ConnectWalletProvider = ({ children }) => {
  const [address, setAddress] = React.useState(null);
  const [ens, setEns] = React.useState(null);
  const [network, setNetwork] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [wallet, setWallet] = React.useState({});
  const [web3, setWeb3] = React.useState(null);

  return (
    <ConnectWalletContext.Provider
      value={{
        address,
        setAddress,
        ens,
        setEns,
        network,
        setNetwork,
        balance,
        setBalance,
        wallet,
        setWallet,
        web3,
        setWeb3,
        reset: () => {
          setAddress(null);
          setEns(null);
          setNetwork(null);
          setBalance(null);
          setWallet({});
        },
      }}
    >
      {children}
    </ConnectWalletContext.Provider>
  );
};

ConnectWalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConnectWalletContext;
export { ConnectWalletProvider };
