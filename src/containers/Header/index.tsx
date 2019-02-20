import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  apiInit,
  initLoad,
  spreadhsheetChanged,
  signIn,
  signOut,
} from '../../actions';
import Header from '../../components/Header';
import { IRootState } from '../../reducers/initialState';
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
    onSignIn: () => signIn(),
    onSignOut: () => signOut(),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default Container;
