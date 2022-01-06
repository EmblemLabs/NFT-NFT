import axios from 'axios';
import * as _ from 'lodash';

const constants = {
  KEY: 'emblem',
  STALE_TIME: 5 * 60 * 1000, // 5 min
};

// TODO: switch the opensea api
const apiUrl = 'https://api.emblemvault.io/myvaults';
const headers = {
  chainid: 4,
  vaulttype: 'unclaimed',
  service: 'evmetadata',
};

function useEmblemVault() {
  let api = {
    async getAssets(address) {
      const { data } = await axios.get(`${apiUrl}/${address}`, { headers });
      return data;
    },
  };

  _.bindAll(api);

  return {
    api,
    constants,
  };
}

export { useEmblemVault };
