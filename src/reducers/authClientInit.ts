import { ActionType, getType } from 'typesafe-actions';
import { initialState, IAuthClientInitState } from './initialState';
import * as actions from '../actions';

export type Actions = ActionType<typeof actions.authClientInitActions>;

export default (state: IAuthClientInitState = initialState.authClientInit, action: Actions) => {
  switch (action.type) {
    case getType(actions.authClientInitActions.request): {
      return {
        ...state,
        initiating: true,
      };
    }
    case getType(actions.authClientInitActions.success): {
      return {
        ...state,
        initiating: false,
        initiated: true,
      };
    }
    case getType(actions.authClientInitActions.failure): {
      return {
        ...state,
        initiating: false,
        initiated: false,
      };
    }
    default:
      return state;
  }
};
