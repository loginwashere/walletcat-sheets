import { connect } from 'react-redux';

import CurrencyNewPage from '../../pages/CurrencyNewPage';
import { saveEntity, ISaveEntityPayload } from '../../actions';
import { IRootState } from '../../reducers/initialState';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions } from '../../reducers';

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
)(CurrencyNewPage);

export default Container;
