import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { routes } from '../../config';
import TransactionForm from '../../components/TransactionForm';
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

export interface IProps<ClassKey extends string = string> extends React.ClassAttributes<TransactionNewPage> {
  auth: IAuthState;
  data: IDataState;
  spreadsheetId: ISpreadsheetIdState;
  classes: Partial<ClassNameMap<ClassKey>>;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): void;
}

class TransactionNewPage extends Component<IProps> {
  render() {
    const { classes, auth, data, history, spreadsheetId } = this.props;
    console.log('data', data);
    console.log('history', history);

    if (auth.signedIn && !spreadsheetId.value) {
      console.log('TransactionNewPage redirect');
      return <Redirect to={routes.spreadsheet} />
    }
    return (
      <div className={classes.root}>
        {auth.signedIn && this.props.spreadsheetId && (
          <Paper className={classes.root} elevation={1}>
            <TransactionForm
              data={data}
              history={history}
              onEntitySave={this.props.onEntitySave}
            />
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TransactionNewPage);
