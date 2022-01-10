import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ConnectWalletContext } from '../../utils';

const BUTTON_STATUS = {
  NOT_CONNECTED: 'NOT_CONNECTED',
  MINE: 'MINE',
  OTHER: 'OTHER',
};

const MakeOfferButton = ({ asset, onClick }) => {
  const walletContext = React.useContext(ConnectWalletContext);
  const [status, setStatus] = React.useState(BUTTON_STATUS.NOT_CONNECTED);

  React.useEffect(() => {
    if (walletContext.address) {
      // wallet is connected
      if (asset?.owner?.address === walletContext.address) {
        setStatus(BUTTON_STATUS.MINE);
      } else {
        setStatus(BUTTON_STATUS.OTHER);
      }
    } else {
      setStatus(BUTTON_STATUS.NOT_CONNECTED);
    }
  }, [asset.owner.address, walletContext.address]);

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
    <button className={cn('button', { disabled: status === BUTTON_STATUS.MINE })} onClick={handleClick}>
      Make offer
    </button>
  );
};

MakeOfferButton.propTypes = {
  onClick: PropTypes.func,
  asset: PropTypes.object,
};

MakeOfferButton.defaultProps = {
  myAssets: {},
  onClick: () => {},
};

export default MakeOfferButton;
