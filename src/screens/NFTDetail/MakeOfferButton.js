import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './NFTDetail.module.sass';
import { ConnectWalletContext } from '../../utils';

const BUTTON_STATUS = {
  NOT_CONNECTED: 'NOT_CONNECTED',
  MINE: 'MINE',
  OTHER: 'OTHER',
};

const MakeOfferButton = ({ collection, onClick }) => {
  const walletContext = React.useContext(ConnectWalletContext);
  const [status, setStatus] = React.useState(BUTTON_STATUS.NOT_CONNECTED);

  React.useEffect(() => {
    if (walletContext.address) {
      // wallet is connected
      if (collection === walletContext.address) {
        setStatus(BUTTON_STATUS.MINE);
      } else {
        setStatus(BUTTON_STATUS.OTHER);
      }
    } else {
      setStatus(BUTTON_STATUS.NOT_CONNECTED);
    }
  }, [collection, walletContext.address]);

  const handleClick = () => {
    switch (status) {
      case BUTTON_STATUS.NOT_CONNECTED:
        walletContext.onboard.walletSelect();
        break;
      case BUTTON_STATUS.MINE:
        break;
      case BUTTON_STATUS.OTHER:
        onClick();
        break;
      default:
        break;
    }
  };

  return (
    <button className={cn('button')} onClick={handleClick}>
      Make offer
    </button>
  );
};

MakeOfferButton.propTypes = {
  collection: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MakeOfferButton.defaultProps = {
  onClick: () => {},
};

export default MakeOfferButton;
