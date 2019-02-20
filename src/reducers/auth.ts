import { ActionType, getType } from 'typesafe-actions';
import { initialState, IAuthState } from './initialState';
import * as actions from '../actions';

export type Actions = ActionType<typeof actions.authChanged>;

export default (state: IAuthState = initialState.auth, action: Actions) => {
  switch (action.type) {
    case getType(actions.authChanged): {
      return {
        ...state,
        signedIn: action.payload,
      };
    }
    default:
      return state;
  }
};
