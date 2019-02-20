import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { withStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { routes } from '../../config';
import { ENTITY_STATUS } from '../../app';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IDataState } from '../../reducers/initialState';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
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
  sideListItem: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

export interface IProps<ClassKey extends string = string> {
  classes: Partial<ClassNameMap<ClassKey>>;
  data: IDataState;
}

class TransactionList extends Component<IProps> {
  render() {
    const { classes, data } = this.props;

    return (
      <React.Fragment>
        <List component="nav">
          {
            data.transactionIds.map((id: string, index: number) => {
              const item = data.transactions[id];
              return (
                <NavLink
                  to={routes.transactions.view.replace(':id', id)}
                  className={classes.sideListItem}
                  key={index}
                >
                  <ListItem
                    button
                    dense={true}
                  >
                    <ListItemText
                      primary={(
                        <span className={classes.titlePrimary}>
                          <span>
                            {
                              data.transactionItemIds
                                .filter(transactionItemId => data.transactionItems[transactionItemId])
                                .map(transactionItemId => data.transactionItems[transactionItemId])
                                .filter(transactionItem => transactionItem.transactionId === item.id)
                                .filter(transactionItem => transactionItem.status === ENTITY_STATUS.active)
                                .map((transactionItem, index) => {
                                  const account = data.accounts[transactionItem.accountId];
                                  return (
                                    <React.Fragment key={index}>
                                      <span>
                                        {account.name} {transactionItem.amount} {data.currencies[account.currencyId].symbol}
                                      </span>
                                      {' -> '}
                                    </React.Fragment>
                                  )
                                })
                            }
                            <span>{item.toAccount} {item.toAccountCurrency}</span>
                          </span>
                          <span>{item.date}</span>
                        </span>
                      )}
                      secondary={(
                        <span className={classes.titleSecondary}>
                          <span>{data.categories[item.categoryId].name}</span>
                          <span>{item.amount}</span>
                        </span>
                      )}
                    />
                  </ListItem>
                </NavLink>
              )
            })
          }
        </List>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TransactionList);
