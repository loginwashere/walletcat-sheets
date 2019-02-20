import React from 'react';
import ReactDOM from 'react-dom';
import TransactionList from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const data = {
    transactionIds: [],
    transactions: {},
    transactionItemIds: [],
    transactionItems: {},
  }
  ReactDOM.render(
    <TransactionList
      data={data}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
