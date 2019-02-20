import { ActionType, getType } from 'typesafe-actions';
import { initialState, IAuthClientLoadState } from './initialState';
import * as actions from '../actions';

export type Actions = ActionType<typeof actions.authClientLoadActions>;

export default (state: IAuthClientLoadState = initialState.authClientLoad, action: Actions) => {
  switch (action.type) {
    case getType(actions.authClientLoadActions.request): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(actions.authClientLoadActions.success): {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case getType(actions.authClientLoadActions.failure): {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    default:
      return state;
  }
};
