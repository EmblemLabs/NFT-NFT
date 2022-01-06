import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Slider from 'react-slick';
import styles from './ListAssets.module.sass';
import Icon from '../Icon';
import AssetCard from './AssetCard';

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => <button {...props}>{children}</button>;

const ListAssets = ({ items, className }) => {
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
          <div className={styles.list}>
            <Slider className={cn('discover-slider', styles.slider)} {...settings}>
              {items.map((x, index) => (
                <AssetCard className={styles.card} item={x} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

ListAssets.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};

ListAssets.defaultProps = {
  items: [],
  className: null,
};

export default ListAssets;
