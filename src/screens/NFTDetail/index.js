import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import cn from 'classnames';
import styles from './NFTDetail.module.sass';
import { useOpensea } from '../../services';
import Loader from '../../components/Loader';

const NFTDetail = () => {
  const { api: openseaApi, constants: openseaConstants } = useOpensea();
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const collection = params.collection;
  const tokenId = params.tokenId;

  // if collection or tokenId is not specified, push back to homepage
  if (!collection || !tokenId) {
    history.push('/');
  }

  const { data, isLoading } = useQuery(
    [openseaConstants.KEY, collection, tokenId],
    (key, collection, tokenId) => openseaApi.getSingleAsset(collection, tokenId),
    {
      staleTime: openseaConstants.STALE_TIME,
    }
  );

  return (
    <>
      <div className={cn('section', styles.section)}>
        {!isLoading ? (
          <div className={cn('container', styles.container)}>
            <div className={styles.bg}>
              <div className={styles.preview}>
                <img srcSet={data.image_url} src={data.image_url} alt="Item" />
              </div>
            </div>
            <div className={styles.details}>
              <h1 className={cn('h3', styles.title)}>{data.name}</h1>
              <div className={styles.cost}>
                <div className={cn('status-stroke-green', styles.price)}>2.5 ETH</div>
                <div className={cn('status-stroke-black', styles.price)}>$4,429.87</div>
                <div className={styles.counter}>10 in stock</div>
              </div>
              <div className={styles.info}>
                {data.description}
              </div>
            </div>
          </div>
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
    </>
  );
};

export default NFTDetail;
