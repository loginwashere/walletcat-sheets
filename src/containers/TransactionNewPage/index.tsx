import { connect } from 'react-redux';

import {
  apiInit,
  initLoad,
  spreadhsheetChanged,
  signIn,
  signOut,
  saveEntity,
  ISaveEntityPayload,
} from '../../actions';

import TransactionNewPage from '../../pages/TransactionNewPage';
import { IRootState } from '../../reducers/initialState';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions } from '../../reducers';

const mapStateToProps = (state: IRootState) => {
  return {
    auth: state.auth,
    authClientLoad: state.authClientLoad,
    authClientInit: state.authClientInit,
    data: state.data,
    spreadsheetId: state.spreadsheetId,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, null, RootActions>) => {
  return {
    onApiInit: () => dispatch(apiInit()),
    onSpreadsheetIdChange: (spreadsheetId: string) => dispatch(spreadhsheetChanged(spreadsheetId)),
    onInitLoad: (spreadsheetId: string) => dispatch(initLoad(spreadsheetId)),
    onEntitySave: (payload: ISaveEntityPayload) => dispatch(saveEntity(payload)),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionNewPage);

export default Container;
