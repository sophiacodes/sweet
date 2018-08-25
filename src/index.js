import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'
import { LoadingContainer } from 'drizzle-react-components'

// Pages
import App from './App'
import HomeContainer from './pages/home/HomeContainer'
import ProfileContainer from './pages/profile/ProfileContainer'
import AdminContainer from './pages/admin/AdminContainer'
import MarketplaceContainer from './pages/marketplace/MarketplaceContainer'
import StorefrontContainer from './pages/store/StorefrontContainer'
import AssetContainer from './pages/asset/AssetContainer'

import store from './store'
import drizzleOptions from './drizzleOptions'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={HomeContainer} />
            <Route path="/profile" component={ProfileContainer} />
            <Route path="/admin" component={AdminContainer} />
            <Route path="/marketplace" component={MarketplaceContainer} />
            <Route path="/store/:storeId" component={StorefrontContainer} />
            <Route path="/asset/:storeId/:assetId" component={AssetContainer} />
            <Route path="/store" component={StorefrontContainer} />
            <Route path="/asset" component={AssetContainer} />
          </Route>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
