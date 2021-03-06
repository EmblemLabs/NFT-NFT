import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import cn from 'classnames';
import styles from './NFTDetail.module.sass';
import { useEmblemVault, useOpensea } from '../../services';
import { ListAssets, Loader, Modal, NotFound } from '../../components';
import MakeOfferButton from './MakeOfferButton';
import { ConnectWalletContext } from '../../utils';

const NFTDetail = () => {
  const walletContext = React.useContext(ConnectWalletContext);
  const [isOfferModalOpen, setIsOfferModalOpen] = React.useState(false);
  const { api: openseaApi, constants: openseaConstants } = useOpensea();
  const { api: emblemApi, constants: emblemConstants } = useEmblemVault();

  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const collection = params.collection;
  const tokenId = params.tokenId;

  // if collection or tokenId is not specified, push back to homepage
  if (!collection || !tokenId) {
    history.push('/');
  }

  const {
    data: singleAsset,
    isLoading,
    error: getAssetQueryError,
  } = useQuery(
    [openseaConstants.KEY, collection, tokenId],
    (key, collection, tokenId) => openseaApi.getSingleAsset(collection, tokenId),
    {
      staleTime: openseaConstants.STALE_TIME,
    }
  );

  const { data: myAssets, isLoading: isMyAssetsLoading } = useQuery(
    [emblemConstants.KEY, 'my-assets', walletContext.address],
    async (key) => {
      if (!walletContext.address) {
        return [];
      }
      return await emblemApi.getAssets(walletContext.address);
    },
    {
      staleTime: emblemConstants.STALE_TIME,
    }
  );

  return (
    <>
      <div className={cn('section', styles.section)}>
        {!isLoading ? (
          getAssetQueryError ? (
            <NotFound />
          ) : (
            <div className={cn('container', styles.container)}>
              <div className={styles.bg}>
                <div className={styles.preview}>
                  <img srcSet={singleAsset.image_url} src={singleAsset.image_url} alt="Item" />
                </div>
              </div>
              <div className={styles.details}>
                <h1 className={cn('h3', styles.title)}>{singleAsset.name}</h1>
                <div className={styles.cost}>
                  <div className={cn('status-stroke-green', styles.price)}>2.5 ETH</div>
                  <div className={cn('status-stroke-black', styles.price)}>$4,429.87</div>
                  <div className={styles.counter}>10 in stock</div>
                </div>
                <div className={styles.offerButton}>
                  <MakeOfferButton collection={collection} onClick={() => setIsOfferModalOpen(true)} />
                </div>
                <div className={styles.info}>{singleAsset.description}</div>
              </div>
            </div>
          )
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
      {!isMyAssetsLoading && (
        <Modal
          visible={isOfferModalOpen}
          outerClassName={styles.modalContainer}
          onClose={() => setIsOfferModalOpen(false)}
        >
          <ListAssets items={myAssets} />
        </Modal>
      )}
    </>
  );
};

export default NFTDetail;
