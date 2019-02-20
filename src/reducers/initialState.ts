import { RouterState } from 'connected-react-router';
import { ITransaction, IAccount, ICategory, ICurrency, ITransactionItem } from '../app';

export interface IAuthState {
  signedIn: boolean;
}

export interface IAuthClientLoadState {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface IAuthClientInitState {
  initiating: boolean;
  initiated: boolean;
  error: string;
}

export interface IAccounts {
  [key: string]: IAccount;
}

export interface ICategories {
  [key: string]: ICategory;
}

export interface ICurrencies {
  [key: string]: ICurrency;
}

export interface ITransactions {
  [key: string]: ITransaction;
}

export interface ITransactionItems {
  [key: string]: ITransactionItem;
}

export interface IDataState {
  accountIds: string[];
  accounts: IAccounts,
  categoryIds: string[];
  categories: ICategories,
  currencyIds: string[];
  currencies: ICurrencies,
  transactionIds: string[];
  transactions: ITransactions,
  transactionItemIds: string[];
  transactionItems: ITransactionItems,
  processing: boolean;
  loading: boolean;
  loaded: boolean;
}

export interface ISpreadsheetIdState {
  value: string;
}

export interface IRootState {
  auth: IAuthState;
  authClientLoad: IAuthClientLoadState;
  authClientInit: IAuthClientInitState;
  data: IDataState;
  spreadsheetId: ISpreadsheetIdState;
  router?: RouterState;
}

export const initialState: IRootState = {
  auth: {
    signedIn: false,
  },
  authClientLoad: {
    loading: false,
    loaded: false,
    error: '',
  },
  authClientInit: {
    initiating: false,
    initiated: false,
    error: '',
  },
  data: {
    accountIds: [],
    accounts: {},
    categoryIds: [],
    categories: {},
    currencyIds: [],
    currencies: {},
    transactionIds: [],
    transactions: {},
    transactionItemIds: [],
    transactionItems: {},
    processing: false,
    loading: false,
    loaded: false,
  },
  spreadsheetId: {
    value: '',
  },
};
