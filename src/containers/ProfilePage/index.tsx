import { connect } from 'react-redux';

import ProfilePage from '../../pages/ProfilePage';
import { IRootState } from '../../reducers/initialState';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions } from '../../reducers';

const mapStateToProps = (state: IRootState) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, null, RootActions>) => {
  return {
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);

export default Container;
