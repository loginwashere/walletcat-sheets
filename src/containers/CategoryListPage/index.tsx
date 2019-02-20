import { connect } from 'react-redux';

import CategoryListPage from '../../pages/CategoryListPage';
import { IRootState } from '../../reducers/initialState';
import { ThunkDispatch } from 'redux-thunk';
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
)(CategoryListPage);

export default Container;
