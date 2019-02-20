import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { routes } from '../../config';
import CurrencyList from '../../components/CurrencyList';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IAuthState, ISpreadsheetIdState, IDataState } from '../../reducers/initialState';

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

export interface IProps<ClassKey extends string = string> extends React.ClassAttributes<CurrencyListPage> {
  auth: IAuthState;
  spreadsheetId: ISpreadsheetIdState;
  data: IDataState;
  classes: Partial<ClassNameMap<ClassKey>>;
}

class CurrencyListPage extends Component<IProps> {
  render() {
    const { classes, auth, spreadsheetId, data } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          {auth.signedIn && (
            <Paper className={classes.root} elevation={1}>
              <CurrencyList
                data={data}
              />
            </Paper>
          )}
        </div>
        {auth.signedIn && spreadsheetId.value && (
          <Link to={routes.currencies.new}>
            <Fab color="primary" aria-label="Add" className={classes.fab}>
              <AddIcon />
            </Fab>
          </Link>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CurrencyListPage);
