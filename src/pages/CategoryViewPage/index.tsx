import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CategoryForm from '../../components/CategoryForm';
import { RouteComponentProps } from 'react-router';
import { IDataState, IAuthState } from '../../reducers/initialState';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { ISaveEntityPayload } from '../../actions';
import { History } from 'history';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export interface IRouteParams {
  id: string;
}

export interface IProps<ClassKey extends string = string>
  extends RouteComponentProps<IRouteParams>, React.ClassAttributes<CategoryViewPage>
{
  auth: IAuthState;
  data: IDataState;
  classes: Partial<ClassNameMap<ClassKey>>;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): void;
}

class CategoryViewPage extends Component<IProps> {
  render() {
    const { classes, auth, data, history, match } = this.props;

    return (
      <div className={classes.root}>
        {auth.signedIn && (
          <Paper className={classes.root} elevation={1}>
            <CategoryForm
              data={data}
              onEntitySave={this.props.onEntitySave}
              history={history}
              id={match.params.id}
            />
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CategoryViewPage);
