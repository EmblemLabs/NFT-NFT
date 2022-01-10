import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './AssetCard.module.sass';

const AssetCard = ({ className, item, isSelected, onClick }) => {
  return (
    <div className={cn(styles.card, className, { [styles.selected]: isSelected })} onClick={(e) => onClick()}>
      <div className={styles.preview}>
        <img srcSet={`${item.image} 2x`} src={item.image} alt="Card" />
      </div>
      <Link className={styles.link} to={item.external_url}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item.name}</div>
            <div className={styles.price}>2.45 ETH</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

AssetCard.propTypes = {
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

AssetCard.defaultProps = {
  isSelected: false,
  className: null,
  onClick: () => {},
};

export default AssetCard;
