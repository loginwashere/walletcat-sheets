import { ActionType, getType } from 'typesafe-actions';
import { initialState, IDataState } from './initialState';
import * as actions from '../actions';
import { sheetNames, entityStateKeys, parseEntity, ENTITY_TYPE, Entity } from '../app';

export type Actions = ActionType<typeof actions.initLoadActions|typeof actions.saveEntityActions>;

export default (state: IDataState = initialState.data, action: Actions) => {
  switch (action.type) {
    case getType(actions.initLoadActions.request): {
      return {
        ...state,
        processing: true,
      };
    }
    case getType(actions.initLoadActions.success): {
      if (!action.payload || !action.payload.result) {
        return state;
      }
      const valueRanges = action.payload.result.valueRanges;

      console.log({valueRanges})

      const parsedValues = Object
        .keys(sheetNames)
        .reduce((result, current: string, index: number) => {
          const currentValueRange: string[][] = valueRanges[index] && valueRanges[index].values
            ? valueRanges[index].values
            : [];
          const values = currentValueRange
            .map(parseEntity(current as ENTITY_TYPE))
            .filter((item: Entity) => item.id)
            .reduce(
              (result, current: Entity) => {
                if (current.id) {
                  return {...result, [current.id]: current};
                }
                return result;
              },
              {}
            );
          return {
            ...result,
            [entityStateKeys[current].keys]: Object.keys(values),
            [entityStateKeys[current].values]: values,
          };
        }, {});

      return {
        ...state,
        ...parsedValues,
        processing: false,
        loaded: true,
        loading: false,
      };
    }
    case getType(actions.saveEntityActions.request): {
      return {
        ...state,
        processing: true,
      };
    }
    case getType(actions.saveEntityActions.success): {
      return {
        ...state,
        processing: false,
      };
    }
    default:
      return state;
  }
};
