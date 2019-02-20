import { connect } from 'react-redux';

import {
  apiInit,
  initLoad,
  spreadhsheetChanged,
} from '../../actions';

import SpreadsheetPage from '../../pages/SpreadsheetPage';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions } from '../../reducers';
import { IRootState } from '../../reducers/initialState';

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

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpreadsheetPage);

export default Container;
