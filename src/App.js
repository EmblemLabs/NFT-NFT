import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import './styles/app.sass';
import Page from './components/Page';
import Home from './screens/Home';
import UploadVariants from './screens/UploadVariants';
import UploadDetails from './screens/UploadDetails';
import ConnectWallet from './screens/ConnectWallet';
import Faq from './screens/Faq';
import Activity from './screens/Activity';
import Search01 from './screens/Search01';
import Search02 from './screens/Search02';
import Profile from './screens/Profile';
import ProfileEdit from './screens/ProfileEdit';
import Item from './screens/Item';
import PageList from './screens/PageList';
import NFTDetail from './screens/NFTDetail';
import { ConnectWalletProvider } from './utils';

const reactQueryOverrides = {
  queries: {
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if ([403, 404].includes(error?.response?.status)) {
        return false;
      }
      return failureCount < 3;
    },
  },
};

function App() {
  return (
    <ReactQueryConfigProvider config={reactQueryOverrides}>
      <ConnectWalletProvider>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Page>
                  <Home />
                </Page>
              )}
            />
            <Route
              exact
              path="/upload-variants"
              render={() => (
                <Page>
                  <UploadVariants />
                </Page>
              )}
            />
            <Route
              exact
              path="/upload-details"
              render={() => (
                <Page>
                  <UploadDetails />
                </Page>
              )}
            />
            <Route
              exact
              path="/connect-wallet"
              render={() => (
                <Page>
                  <ConnectWallet />
                </Page>
              )}
            />
            <Route
              exact
              path="/faq"
              render={() => (
                <Page>
                  <Faq />
                </Page>
              )}
            />
            <Route
              exact
              path="/activity"
              render={() => (
                <Page>
                  <Activity />
                </Page>
              )}
            />
            <Route
              exact
              path="/search01"
              render={() => (
                <Page>
                  <Search01 />
                </Page>
              )}
            />
            <Route
              exact
              path="/search02"
              render={() => (
                <Page>
                  <Search02 />
                </Page>
              )}
            />
            <Route
              exact
              path="/profile"
              render={() => (
                <Page>
                  <Profile />
                </Page>
              )}
            />
            <Route
              exact
              path="/profile-edit"
              render={() => (
                <Page>
                  <ProfileEdit />
                </Page>
              )}
            />
            <Route
              exact
              path="/item"
              render={() => (
                <Page>
                  <Item />
                </Page>
              )}
            />
            <Route
              exact
              path="/pagelist"
              render={() => (
                <Page>
                  <PageList />
                </Page>
              )}
            />
            <Route
              exact
              path="/nft"
              render={() => (
                <Page>
                  <NFTDetail />
                </Page>
              )}
            />
          </Switch>
        </Router>
      </ConnectWalletProvider>
    </ReactQueryConfigProvider>
  );
}

export default App;
