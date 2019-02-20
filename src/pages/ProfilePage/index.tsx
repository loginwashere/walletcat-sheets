import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IAuthState } from '../../reducers/initialState';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export interface IProps<ClassKey extends string = string> extends React.ClassAttributes<ProfilePage> {
  auth: IAuthState;
  classes: Partial<ClassNameMap<ClassKey>>;
}

class ProfilePage extends Component<IProps> {
  render() {
    const { classes, auth } = this.props;

    return (
      <div className={classes.root}>
        {auth.signedIn && (
          <Paper className={classes.root} elevation={1}>
            Profile
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProfilePage);
