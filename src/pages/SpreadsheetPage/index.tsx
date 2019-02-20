import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SpreadsheetForm from '../../components/SpreadsheetForm';
import { IAuthState, ISpreadsheetIdState } from '../../reducers/initialState';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IValues } from '../../components/SpreadsheetForm/Form';
import { History } from 'history';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export interface IProps<ClassKey extends string = string> extends React.ClassAttributes<SpreadsheetPage> {
  auth: IAuthState;
  classes: Partial<ClassNameMap<ClassKey>>;
  spreadsheetId: ISpreadsheetIdState;
  history: History;
  onSpreadsheetIdChange(spreadsheetId: string): any;
  onInitLoad(spreadsheetId: string): any;
}

class SpreadsheetPage extends Component<IProps> {
  handleChangeSpreadsheetId = ({spreadsheetId}: IValues) => {
    console.log('handleChangeSpreadsheetId', spreadsheetId)
    if (this.props.spreadsheetId.value !== spreadsheetId) {
      this.props.onSpreadsheetIdChange(spreadsheetId);
      this.props.onInitLoad(spreadsheetId);
    }
  };

  render() {
    const { classes, auth, history } = this.props;

    return (
      <div className={classes.root}>
        {auth.signedIn && (
          <Paper className={classes.root} elevation={1}>
            <SpreadsheetForm
              spreadsheetId={this.props.spreadsheetId}
              onSpreadsheetChange={this.handleChangeSpreadsheetId}
              history={history}
            />
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SpreadsheetPage);
