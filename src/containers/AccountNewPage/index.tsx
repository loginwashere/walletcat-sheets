import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import AccountNewPage from '../../pages/AccountNewPage';
import { saveEntity, ISaveEntityPayload } from '../../actions';
import { IRootState } from '../../reducers/initialState';
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
)(AccountNewPage);

export default Container;
