import axios from 'axios';
import * as _ from 'lodash';

const openseaConstants = {
  KEY: 'opensea',
  STALE_TIME: 5 * 60 * 1000, // 5 min
};

// TODO: switch the opensea api
const apiUrl = 'https://testnets-api.opensea.io/api/v1';

function useOpensea() {
  let api = {
    async getSingleAsset(collection, tokenId) {
      const { data } = await axios.get(`${apiUrl}/asset/${collection}/${tokenId}`);
      return data;
    },
  };

  _.bindAll(api);

  return {
    api,
    constants: openseaConstants,
  };
}

export { useOpensea };
