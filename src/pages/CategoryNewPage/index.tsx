import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CategoryForm from '../../components/CategoryForm';
import { History } from 'history';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { ISaveEntityPayload } from '../../actions';
import { IAuthState, IDataState } from '../../reducers/initialState';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export interface IProps<ClassKey extends string = string> extends React.ClassAttributes<CategoryNewPage> {
  auth: IAuthState;
  data: IDataState;
  classes: Partial<ClassNameMap<ClassKey>>;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): void;
}

class CategoryNewPage extends Component<IProps> {
  render() {
    const { classes, auth, data, history } = this.props;

    return (
      <div className={classes.root}>
        {auth.signedIn && (
          <Paper className={classes.root} elevation={1}>
            <CategoryForm
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

export default withStyles(styles, { withTheme: true })(CategoryNewPage);
