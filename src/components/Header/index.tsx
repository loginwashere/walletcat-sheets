import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { withStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import { routes } from '../../config';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IAuthState, IAuthClientInitState, IAuthClientLoadState, IDataState } from '../../reducers/initialState';

const styles = (theme: Theme) => ({
  brand: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  sideListItem: {
    color: 'inherit',
    textDecoration: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  fab: {
    position: 'absolute' as 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  container: {
    marginBottom: 48,
  },
  progress: {
    position: 'relative' as 'relative',
    top: 49,
  },
  padding: {
    padding: theme.spacing.unit,
  },
});

export interface IProps<ClassKey extends string = string> {
  auth: IAuthState;
  authClientInit: IAuthClientInitState;
  authClientLoad: IAuthClientLoadState;
  data: IDataState;
  classes: Partial<ClassNameMap<ClassKey>>;
  onApiInit(): any;
  onSignIn(): any;
  onSignOut(): any;
}

export interface IState {
  isDrawerOpen: boolean;
}

class Header extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isDrawerOpen: false,
    };
  }

  componentWillReceiveProps() {
    this.props.onApiInit();
  }

  componentDidMount() {
    this.props.onApiInit();
  }

  toggleDrawer = (open: boolean) => () => {
    this.setState({
      isDrawerOpen: open,
    });
  };

  render() {
    const { classes, auth, data, authClientLoad, authClientInit } = this.props;
    console.log('loading', this.props.authClientLoad.loading || this.props.authClientInit.initiating);

    const sideList = (
      <div className={classes.list}>
        <List>
          <NavLink to={routes.currencies.new} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary={'New Currency'} />
            </ListItem>
          </NavLink>
          <NavLink to={routes.currencies.list} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary={'List Currencies'} />
            </ListItem>
          </NavLink>
          <NavLink to={routes.categories.new} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary={'New Category'} />
            </ListItem>
          </NavLink>
          <NavLink to={routes.categories.list} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary={'List Categories'} />
            </ListItem>
          </NavLink>
          <NavLink to={routes.accounts.new} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary={'New Account'} />
            </ListItem>
          </NavLink>
          <NavLink to={routes.accounts.list} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary={'List Accounts'} />
            </ListItem>
          </NavLink>
          <NavLink to={routes.transactions.new} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary={'New Transaction'} />
            </ListItem>
          </NavLink>
          <NavLink to={routes.transactions.list} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary={'List Transactions'} />
            </ListItem>
          </NavLink>
          <NavLink to={routes.spreadsheet} className={classes.sideListItem}>
            <ListItem button>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary={'Spreadsheet'} />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          {!auth.signedIn && (
            <ListItem
              button
              onClick={e => {
                e.preventDefault();
                this.props.onSignIn();
              }}
            >
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary={'Login'} />
            </ListItem>
          )}
          {auth.signedIn && (
            <NavLink to={routes.profile} className={classes.sideListItem}>
              <ListItem button>
                <ListItemIcon><AccountCircle /></ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>
            </NavLink>
          )}
          {auth.signedIn && (
            <ListItem
              button
              onClick={e => {
                e.preventDefault();
                this.props.onSignOut();
              }}
            >
              <ListItemIcon><PowerSettingsNew /></ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          )}
        </List>
      </div>
    );

    return (
      <div className={classes.container}>
        <AppBar
          position="fixed"
        >
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon onClick={this.toggleDrawer(true)} />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <NavLink to={routes.default} className={classes.brand}>
                Wallet Cat
              </NavLink>
            </Typography>
            {!auth.signedIn && (
              <div>
                <Button
                  color="inherit"
                  // color="primary"
                  disabled={this.props.authClientLoad.loading || this.props.authClientInit.initiating}
                  // variant="contained"
                  onClick={e => {
                    e.preventDefault();
                    this.props.onSignIn();
                  }}
                >Login</Button>
              </div>
            )}
            {auth.signedIn && (
              <div>
                <IconButton
                  color="inherit"
                  className={classes.padding}
                >
                  <NavLink to={routes.profile} className={classes.brand}>
                    <AccountCircle fontSize="small" />
                  </NavLink>
                </IconButton>
                <Button
                  color="inherit"
                  // color="primary"
                  disabled={this.props.authClientLoad.loading || this.props.authClientInit.initiating}
                  // variant="contained"
                  onClick={e => {
                    e.preventDefault();
                    this.props.onSignOut();
                  }}
                >Logout</Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        { (data.processing || authClientInit.initiating || authClientLoad.loading) &&
          <LinearProgress className={classes.progress} color="secondary" />
        }
        <Drawer open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
