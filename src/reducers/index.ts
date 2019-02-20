import { combineReducers, } from 'redux';
import { connectRouter, RouterAction } from 'connected-react-router';
import auth, {Actions as AuthActions} from './auth';
import authClientLoad, {Actions as AuthClientLoadActions} from './authClientLoad';
import authClientInit, {Actions as AuthClientInitActions} from './authClientInit';
import data, {Actions as DataActions} from './data';
import spreadsheetId, {Actions as SpreadhsheetIdhActions} from './spreadsheetId';
import { History } from 'history';
import { IRootState } from './initialState';

export type RootActions = AuthActions|SpreadhsheetIdhActions|AuthClientLoadActions|AuthClientInitActions|DataActions|RouterAction;

export default (history: History) => combineReducers<IRootState>({
  auth,
  authClientLoad,
  authClientInit,
  data,
  spreadsheetId,
  router: connectRouter(history),
});
