import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CurrencyForm from '../../components/CurrencyForm';
import { IAuthState, IDataState } from '../../reducers/initialState';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { History } from 'history';
import { ISaveEntityPayload } from '../../actions';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export interface IProps<ClassKey extends string = string> extends React.ClassAttributes<CurrencyNewPage> {
  auth: IAuthState;
  data: IDataState;
  classes: Partial<ClassNameMap<ClassKey>>;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): void;
}

class CurrencyNewPage extends Component<IProps> {
  render() {
    const { classes, auth, data, history } = this.props;

    return (
      <div className={classes.root}>
        {auth.signedIn && (
          <Paper className={classes.root} elevation={1}>
            <CurrencyForm
              data={data}
              onEntitySave={this.props.onEntitySave}
              history={history}
            />
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CurrencyNewPage);
