import { createAsyncAction, ActionType, createAction, } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import {
  sheetNames,
  formatEntity,
  Entity,
  ENTITY_TYPES,
} from '../app';
import * as api from '../api';
import { ActionTypes } from '../constants';
import { IRootState } from '../reducers/initialState';

export const authClientLoadActions = createAsyncAction(
  ActionTypes.AUTH_CLIENT_LOAD_REQUEST,
  ActionTypes.AUTH_CLIENT_LOAD_SUCCESS,
  ActionTypes.AUTH_CLIENT_LOAD_SUCCESS,
)<void, void, void>();

export const handleAuthClientLoad = () => (
  dispatch: ThunkDispatch<IRootState, null, ActionType<typeof authClientLoadActions>>,
) => {
  dispatch(authClientLoadActions.request());

  return api.load('client:auth2')
    .then(() => {
      return dispatch(authClientLoadActions.success());
    })
    .catch(() => {
      return dispatch(authClientLoadActions.failure());
    });
};

export const authChanged = createAction(ActionTypes.AUTH_CHANGED, action => {
  return (signedIn: boolean) => action(signedIn);
});

export const authClientInitActions = createAsyncAction(
  ActionTypes.AUTH_CLIENT_INIT_REQUEST,
  ActionTypes.AUTH_CLIENT_INIT_SUCCESS,
  ActionTypes.AUTH_CLIENT_INIT_FAILURE,
)<void, void, void>();

export const handleAuthClientInit = () => (
  dispatch: ThunkDispatch<IRootState, null, ActionType<typeof authClientInitActions|typeof authChanged>>,
) => {
  dispatch(authClientInitActions.request());

  return api.init(`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`)
    .then(() => {
      console.log('after client init');

      dispatch(authClientInitActions.success());

      api.authListen((auth) => dispatch(authChanged(auth)));

      dispatch(authChanged(api.getAuth()));

      return dispatch(authClientInitActions.success());
    })
    .catch((error: any) => {
      console.log('error', error);
      return dispatch(authClientInitActions.failure());
    });
};

export const apiInit = () => (
  dispatch: ThunkDispatch<IRootState, null, ActionType<typeof authClientLoadActions|typeof authClientInitActions|typeof authChanged>>,
  getState: () => IRootState
) => {
  const {authClientLoad, authClientInit,} = getState();

  if (!authClientLoad.loaded && !authClientLoad.loading) {
    dispatch(handleAuthClientLoad());
  }

  if (authClientLoad.loaded && (!authClientInit.initiated && !authClientInit.initiating)) {
    dispatch(handleAuthClientInit());
  }
}

export const initLoadActions = createAsyncAction(
  ActionTypes.INIT_LOAD_REQUEST,
  ActionTypes.INIT_LOAD_SUCCESS,
  ActionTypes.INIT_LOAD_FAILURE,
)<void, api.IBatchGetResponse, string>();

export const initLoad = (spreadsheetId: string) => (
  dispatch: ThunkDispatch<IRootState, null, ActionType<typeof initLoadActions>>,
) => {
  dispatch(initLoadActions.request());

  api.batchGet({
      spreadsheetId,
      ranges: Object
        .keys(sheetNames)
        .map(key => `${sheetNames[key]}!A2:K`)
    })
    .then((response: api.IBatchGetResponse) => {
      console.log('initLoad', response);

      dispatch(initLoadActions.success(response));
    })
    .catch((error: string) => {
      console.log(error)
      dispatch(initLoadActions.failure(error));
    });
};

export const spreadhsheetChanged = createAction(ActionTypes.SPREADSHEET_CHANGED, action => {
  return (spreadsheetId: string) => action(spreadsheetId);
});

export interface ISaveEntityPayload {
  type: ENTITY_TYPES;
  entity: Entity;
}

export interface ISaveEntityResponse {
  spreadsheetId: string;
  tableRange: string;
  updates: {
    spreadsheetId: string;
    updatedRange: string;
    updatedRows: number;
    updatedColumns: number;
    updatedCells: number;
  }
}

export const saveEntityActions = createAsyncAction(
  ActionTypes.SAVE_ENTITY_REQUEST,
  ActionTypes.SAVE_ENTITY_SUCCESS,
  ActionTypes.SAVE_ENTITY_FAILURE,
)<void, ISaveEntityResponse, string>();

export const saveEntity = (
  {type, entity}: ISaveEntityPayload
) => (
  dispatch: ThunkDispatch<IRootState, null, ActionType<typeof saveEntityActions>>,
  getState: () => IRootState
) => {
  dispatch(saveEntityActions.request());

  const {spreadsheetId} = getState();

  console.log('saveEntity', type, entity);
  console.log('saveEntity', type, entity, formatEntity(type, entity));

  (
    entity.id
      ? api.update(spreadsheetId.value, type, entity)
      : api.append(spreadsheetId.value, type, entity)
  )
    .then(async (response: ISaveEntityResponse) => {
      console.log(response);

      dispatch(saveEntityActions.success(response));

      try {
        await initLoad(spreadsheetId.value)(dispatch);
      } catch (e) {
        console.log(e)
      }
    })
    .catch((error: string) => {
      dispatch(saveEntityActions.failure(error));
    });
};

export const signIn = createAction(ActionTypes.SIGN_IN, action => {
  return () => {
    api.signIn();
    return action();
  }
});

export const signOut = createAction(ActionTypes.SIGN_OUT, action => {
  return () => {
    api.signOut();
    return action();
  }
});
