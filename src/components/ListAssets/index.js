import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Slider from 'react-slick';
import styles from './ListAssets.module.sass';
import Icon from '../Icon';
import AssetCard from './AssetCard';
import Dropdown from '../Dropdown';
import TextInput from '../TextInput';

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => <button {...props}>{children}</button>;

const dateOptions = ['All'];

const ListAssets = ({ items, selectedAsset, className, onSearch, onSelectedAsset }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 100000,
        settings: 'unslick',
      },
    ],
  };

  return (
    <div className={cn(className, styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.wrapper}>
          <h3 className={cn('h3', styles.title)}>My Wallet</h3>
          <div className={styles.filterContainer}>
            <div className={styles.col}>
              <TextInput
                name="Search"
                type="text"
                placeholder="Search Assets"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <div className={styles.col}>
              <Dropdown value={'All'} setValue={() => {}} options={dateOptions} />
            </div>
          </div>
          <div className={styles.list}>
            <Slider className={cn('discover-slider', styles.slider)} {...settings}>
              {items.map((x, index) => (
                <AssetCard
                  className={styles.card}
                  item={x}
                  isSelected={x.ipfs === selectedAsset}
                  key={index}
                  onClick={() => onSelectedAsset(x.ipfs)}
                />
              ))}
            </Slider>
          </div>
          <div className={styles.action}>
            <button className={cn('button', { disabled: !selectedAsset })} onClick={() => {}}>
              Trade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ListAssets.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  onSearch: PropTypes.func,
  selectedAsset: PropTypes.string,
  onSelectedAsset: PropTypes.func,
};

ListAssets.defaultProps = {
  items: [],
  selectedAsset: null,
  className: null,
  onSearch: () => {},
  onSelectedAsset: () => {},
};

export default ListAssets;
