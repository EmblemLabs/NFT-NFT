import Onboard from 'bnc-onboard'

const networkId = 4;
const apiUrl = process.env.REACT_APP_API_URL;
const dappId = '8c078d77-1fe5-4a81-8956-bf62aaadd667';

export function initOnboard(subscriptions) {
  return Onboard({
    dappId,
    hideBranding: false,
    networkId,
    apiUrl,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'walletConnect',
          infuraKey: 'infura-key'
        },
        { walletName: 'coinbase' },
      ]
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '0' }
    ]
  })
}
