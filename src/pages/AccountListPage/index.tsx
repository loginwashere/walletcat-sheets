import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { routes } from '../../config';
import AccountList from '../../components/AccountList';
import { IAuthState, ISpreadsheetIdState, IDataState } from '../../reducers/initialState';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  fab: {
    position: 'fixed' as 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

export interface IProps<ClassKey extends string = string> extends React.ClassAttributes<AccountListPage> {
  auth: IAuthState;
  spreadsheetId: ISpreadsheetIdState;
  data: IDataState;
  classes: Partial<ClassNameMap<ClassKey>>;
}

class AccountListPage extends Component<IProps> {
  render() {
    const { classes, auth, spreadsheetId, data } = this.props;

    return (
      <div className={classes.root}>
        {auth.signedIn && (
          <Paper className={classes.root} elevation={1}>
            <AccountList
              data={data}
            />
          </Paper>
        )}
        {auth.signedIn && spreadsheetId.value && (
          <Link to={routes.accounts.new}>
            <Fab color="primary" aria-label="Add" className={classes.fab}>
              <AddIcon />
            </Fab>
          </Link>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AccountListPage);
