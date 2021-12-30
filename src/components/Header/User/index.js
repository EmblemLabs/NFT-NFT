import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './User.module.sass';
import Icon from '../../Icon';
import Theme from '../../Theme';
import { addressAbbr, ConnectWalletContext, convertToFloat } from '../../../utils';

const items = [
  {
    title: 'My profile',
    icon: 'user',
    url: '/profile',
  },
  {
    title: 'My items',
    icon: 'image',
    url: '/item',
  },
  {
    title: 'Dark theme',
    icon: 'bulb',
  },
  {
    title: 'Disconnect',
    icon: 'exit',
    url: 'https://ui8.net/ui8/products/crypter-nft-marketplace-ui-kit',
  },
];

const User = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [ethAmount, setEthAmount] = useState(0);
  const connectWalletContext = React.useContext(ConnectWalletContext);

  React.useEffect(() => {
    async function getEthAmount() {
      const amount = await connectWalletContext.web3.eth.getBalance(connectWalletContext.address);
      setEthAmount(convertToFloat(amount, 4));
    }
    if (connectWalletContext.web3 && connectWalletContext.address) {
      getEthAmount();
    }
  }, [connectWalletContext.address, connectWalletContext.web3]);
  const handleClipboardAddress = () => {
    navigator.clipboard.writeText(connectWalletContext.address);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src="/images/content/avatar-user.jpg" alt="Avatar" />
          </div>
          <div className={styles.wallet}>
            {ethAmount} <span className={styles.currency}>ETH</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>Enrico Cole</div>
            {/* If the wallet is connected, show wallet address ... */}
            {connectWalletContext.address && (
              <>
                <div className={styles.code}>
                  <div className={styles.number}>{addressAbbr(connectWalletContext.address)}</div>
                  <button className={styles.copy} onClick={handleClipboardAddress}>
                    <Icon name="copy" size="16" />
                  </button>
                </div>
                <div className={styles.wrap}>
                  <div className={styles.line}>
                    <div className={styles.preview}>
                      <img src="/images/content/etherium-circle.jpg" alt="Etherium" />
                    </div>
                    <div className={styles.details}>
                      <div className={styles.info}>Balance</div>
                      <div className={styles.price}>{ethAmount} ETH</div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className={styles.menu}>
              {items.map((x, index) =>
                x.url ? (
                  x.url.startsWith('http') ? (
                    <a className={styles.item} href={x.url} rel="noopener noreferrer" key={index}>
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </a>
                  ) : (
                    <Link className={styles.item} to={x.url} onClick={() => setVisible(!visible)} key={index}>
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </Link>
                  )
                ) : (
                  <div className={styles.item} key={index}>
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
                    <Theme className={styles.theme} />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

Headers.propTypes = {
  className: PropTypes.string,
};

Headers.defaultProps = {
  className: '',
};

export default User;
