import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import AccountListPage from '../../pages/AccountListPage';
import { IRootState } from '../../reducers/initialState';
import { RootActions } from '../../reducers';

const mapStateToProps = (state: IRootState) => {
  return {
    auth: state.auth,
    data: state.data,
    spreadsheetId: state.spreadsheetId,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, null, RootActions>) => {
  return {
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountListPage);

export default Container;
