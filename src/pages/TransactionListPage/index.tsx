import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import { withStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TransactionList from '../../components/TransactionList';
import { routes } from '../../config';
import { IAuthState, ISpreadsheetIdState, IDataState } from '../../reducers/initialState';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  fab: {
    position: 'fixed' as 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  titlePrimary: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleSecondary: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export interface IProps<ClassKey extends string = string> extends React.ClassAttributes<TransactionListPage> {
  auth: IAuthState;
  spreadsheetId: ISpreadsheetIdState;
  data: IDataState;
  classes: Partial<ClassNameMap<ClassKey>>;
}

class TransactionListPage extends Component<IProps> {
  render() {
    const { classes, auth, data, spreadsheetId } = this.props;

    if (auth.signedIn && !spreadsheetId.value) {
      console.log('TransactionListPage redirect');
      return <Redirect to={routes.spreadsheet} />
    }
    return (
      <React.Fragment>
        <div className={classes.root}>
          {auth.signedIn && spreadsheetId.value && (
            <Paper className={classes.root} elevation={1}>
              <TransactionList
                data={data}
              />
            </Paper>
          )}
        </div>
        {auth.signedIn && spreadsheetId.value && (
          <Link to={routes.transactions.new}>
            <Fab color="primary" aria-label="Add" className={classes.fab}>
              <AddIcon />
            </Fab>
          </Link>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TransactionListPage);
