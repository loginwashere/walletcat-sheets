export const routes = {
  profile: '/me',
  spreadsheet: '/spreadsheet',
  accounts: {
    list: '/accounts/list',
    new: '/accounts/new',
    view: '/accounts/edit/:id',
  },
  currencies: {
    list: '/currencies/list',
    new: '/currencies/new',
    view: '/currencies/edit/:id',
  },
  categories: {
    list: '/categories/list',
    new: '/categories/new',
    view: '/categories/edit/:id',
  },
  transactions: {
    list: '/transactions/list',
    new: '/transactions/new',
    view: '/transactions/edit/:id',
  },
  default: '/',
};
