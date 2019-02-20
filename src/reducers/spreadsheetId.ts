import { ActionType, getType } from 'typesafe-actions';
import { initialState, ISpreadsheetIdState } from './initialState';
import * as actions from '../actions';

export type Actions = ActionType<typeof actions.spreadhsheetChanged>;

export default (state: ISpreadsheetIdState = initialState.spreadsheetId, action: Actions) => {
  switch (action.type) {
    case getType(actions.spreadhsheetChanged): {
      return {
        ...state,
        value: action.payload,
      };
    }
    default:
      return state;
  }
};
