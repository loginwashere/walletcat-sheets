import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TransactionForm from '../../components/TransactionForm';
import { RouteComponentProps } from 'react-router';
import { IAuthState, IDataState, ISpreadsheetIdState } from '../../reducers/initialState';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { ISaveEntityPayload } from '../../actions';
import { History } from 'history';

const styles = (theme: Theme) => ({
  root: {
    // flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export interface IRouteParams {
  id: string;
}

export interface IProps<ClassKey extends string = string>
  extends RouteComponentProps<IRouteParams>, React.ClassAttributes<TransactionViewPage>
{
  auth: IAuthState;
  data: IDataState;
  spreadsheetId: ISpreadsheetIdState;
  classes: Partial<ClassNameMap<ClassKey>>;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): void;
}

class TransactionViewPage extends Component<IProps> {
  render() {
    const { classes, auth, data, history, match, spreadsheetId } = this.props;
    console.log('data', data);
    console.log('history', history);

    return (
      <div className={classes.root}>
        {auth.signedIn && spreadsheetId.value && (
          <Paper className={classes.root} elevation={1}>
            <TransactionForm
              data={data}
              history={history}
              onEntitySave={this.props.onEntitySave}
              id={match.params.id}
            />
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TransactionViewPage);
