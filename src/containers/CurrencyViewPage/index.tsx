import { connect } from 'react-redux';

import CurrencyViewPage from '../../pages/CurrencyViewPage';
import { saveEntity, ISaveEntityPayload } from '../../actions';
import { IRootState } from '../../reducers/initialState';
import { RootActions } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: IRootState) => {
  return {
    auth: state.auth,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, null, RootActions>) => {
  return {
    onEntitySave: (payload: ISaveEntityPayload) => dispatch(saveEntity(payload)),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyViewPage);

export default Container;
