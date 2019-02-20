import { connect } from 'react-redux';

import {
  apiInit,
  initLoad,
  spreadhsheetChanged,
} from '../../actions';

import TransactionListPage from '../../pages/TransactionListPage';
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
  };
};

const TransactionListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionListPage);

export default TransactionListPageContainer;
