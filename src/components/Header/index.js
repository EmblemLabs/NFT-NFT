import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import * as _ from 'lodash';
import styles from './Header.module.sass';
import Icon from '../Icon';
import Image from '../Image';
import Notification from './Notification';
import User from './User';

const nav = [
  {
    url: '/search01',
    title: 'Discover',
  },
  {
    url: '/faq',
    title: 'How it work',
  },
  {
    url: '/item',
    title: 'Create item',
  },
  {
    url: '/profile',
    title: 'Profile',
  },
];

const Headers = ({ wallet, onConnectWallet, onDisconnectWallet }) => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <header className={styles.header}>
      <div className={cn('container', styles.container)}>
        <Link className={styles.logo} to="/">
          <Image className={styles.pic} src="/images/logo.png" srcDark="/images/logo.png" alt="Fitness Pro" />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav>
          <form className={styles.search} action="" onSubmit={() => handleSubmit()}>
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>
          <Link className={cn('button-small', styles.button)} to="/upload-variants">
            Upload
          </Link>
        </div>
        <Notification className={styles.notification} />
        <Link className={cn('button-small', styles.button)} to="/upload-variants">
          Upload
        </Link>
        {_.isEmpty(wallet) ? (
          <button className={cn('button-stroke button-small', styles.button)} onClick={onConnectWallet}>
            <span>Connect Wallet</span>
          </button>
        ) : (
          <button className={cn('button-stroke button-small', styles.button)} onClick={onDisconnectWallet}>
            <span>Disconnect Wallet</span>
          </button>
        )}
        <User className={styles.user} />
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

Headers.propTypes = {
  wallet: PropTypes.object,
  onConnectWallet: PropTypes.func,
  onDisconnectWallet: PropTypes.func,
};

Headers.defaultProps = {
  wallet: {},
  onConnectWallet: () => {},
  onDisconnectWallet: () => {},
};

export default Headers;
