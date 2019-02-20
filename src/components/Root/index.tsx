import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import Header from '../../containers/Header';
import AccountListPage from '../../containers/AccountListPage';
import AccountNewPage from '../../containers/AccountNewPage';
import AccountViewPage from '../../containers/AccountViewPage';
import CurrencyListPage from '../../containers/CurrencyListPage';
import CurrencyNewPage from '../../containers/CurrencyNewPage';
import CurrencyViewPage from '../../containers/CurrencyViewPage';
import CategoryListPage from '../../containers/CategoryListPage';
import CategoryNewPage from '../../containers/CategoryNewPage';
import CategoryViewPage from '../../containers/CategoryViewPage';
import TransactionListPage from '../../containers/TransactionListPage';
import TransactionNewPage from '../../containers/TransactionNewPage';
import TransactionViewPage from '../../containers/TransactionViewPage';
import SpreadsheetPage from '../../containers/SpreadsheetPage';
import ProfilePage from '../../containers/ProfilePage';
import NoMatchPage from '../../containers/NoMatchPage';
import { routes } from '../../config';
import { Store } from 'redux';
import { IRootState } from '../../reducers/initialState';
import { History } from 'history';
import { Persistor } from 'redux-persist';

export interface IProps {
  store: {
    store: Store<IRootState>;
    persistor: Persistor;
  };
  history: History;
}

const Root = ({ store, history }: IProps) => (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path={routes.spreadsheet} component={SpreadsheetPage} />
              <Route path={routes.transactions.new} component={TransactionNewPage} />
              <Route path={routes.transactions.view} component={TransactionViewPage} />
              <Route path={routes.transactions.list} component={TransactionListPage} />
              <Route path={routes.accounts.list} component={AccountListPage} />
              <Route path={routes.accounts.new} component={AccountNewPage} />
              <Route path={routes.accounts.view} component={AccountViewPage} />
              <Route path={routes.currencies.list} component={CurrencyListPage} />
              <Route path={routes.currencies.new} component={CurrencyNewPage} />
              <Route path={routes.currencies.view} component={CurrencyViewPage} />
              <Route path={routes.categories.list} component={CategoryListPage} />
              <Route path={routes.categories.new} component={CategoryNewPage} />
              <Route path={routes.categories.view} component={CategoryViewPage} />
              <Route path={routes.profile} component={ProfilePage} />
              <Route path={routes.default} component={TransactionListPage} exact={true} />
              <Route component={NoMatchPage} />
            </Switch>
          </div>
        </Router>
      </MuiPickersUtilsProvider>
    </PersistGate>
  </Provider>
);

export default Root;
