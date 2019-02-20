import React, { Component } from 'react';
import { Formik, FormikActions } from "formik";
import Form, { IValues, IValuesTransactionItem } from './Form';
import {transactionNewForm} from '../../validation';
import {
  ENTITY_TYPE,
  generateId,
  ENTITY_STATUS,
  ITransaction,
} from '../../app';
import { routes } from '../../config';
import { ISaveEntityPayload } from '../../actions';
import { IDataState } from '../../reducers/initialState';
import { History } from 'history';

export interface IProps extends React.ClassAttributes<TransactionForm> {
  id?: string;
  data: IDataState;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): any;
}

class TransactionForm extends Component<IProps> {
  handleSave = async (values: IValues, actions: FormikActions<IValues>) => {
    let result;
    try {
      result = await this.props.onEntitySave({
        type: ENTITY_TYPE.transaction,
        entity: values as any, // TODO
      });

      const transactionId = values.id || generateId(ENTITY_TYPE.transaction, this.props.data.transactionIds.length);
      console.log({transactionId});

      const updatePromises = values.transactionItems
        .map(async (transactionItem: IValuesTransactionItem) => {
          return await this.props.onEntitySave({
            type: ENTITY_TYPE.transactionItem,
            entity: {
              ...transactionItem,
              transactionId,
            } as any, // TODO
          });
        });

      await Promise.all(updatePromises);

      const transactionItemIds = values.transactionItems
        .filter((item: IValuesTransactionItem) => item.id)
        .map((item: IValuesTransactionItem) => item.id);

      const deletePromises = this.props.data.transactionItemIds
        .map(transactionItemId => this.props.data.transactionItems[transactionItemId])
        .filter(transactionItem => transactionItem.transactionId === transactionId)
        .filter(transactionItem => transactionItemIds.indexOf(transactionItem.id) === -1)
        .map(async transactionItem => {
          return await this.props.onEntitySave({
            type: ENTITY_TYPE.transactionItem,
            entity: {
              ...transactionItem,
              transactionId,
              status: ENTITY_STATUS.deleted,
              deletedAt: new Date(),
            },
          });
        });

      await Promise.all(deletePromises);

      actions.setSubmitting(false);

      this.props.history.push(routes.transactions.list)
    } catch (error) {
      console.log('error', error);
      actions.setSubmitting(false);
      actions.setErrors(error);
      actions.setStatus({ msg: 'Set some arbitrary status or data' });
    }
  }

  handleGoBack = () => this.props.history.goBack()

  render() {
    const item: Partial<ITransaction> = this.props.id
      ? this.props.data.transactions[this.props.id]
      : {};
    const transactionItems = this.props.data.transactionItemIds
      .map(id => this.props.data.transactionItems[id])
      .filter(transactionItem => transactionItem.transactionId === item.id)
      .map(transactionItem => ({
        id: transactionItem.id,
        amount: transactionItem.amount || 0,
        accountId: transactionItem.accountId || '',
        status: transactionItem.status || ENTITY_STATUS.active,
      }));
    const defaultTransactionItems = [
      {
        id: '',
        amount: 0,
        accountId: '',
        status: ENTITY_STATUS.active,
      },
      {
        id: '',
        amount: 0,
        accountId: '',
        status: ENTITY_STATUS.active,
      },
    ];

    const values: IValues = {
      id: item.id,
      categoryId: item.categoryId || '',
      description: item.description || '',
      date: item.date || new Date(),
      status: item.status || ENTITY_STATUS.active,
      transactionItems: transactionItems.length
        ? transactionItems
        : defaultTransactionItems,
    };

    console.log({values})

    return (
      <Formik
        render={props => <Form
          {...props}
          data={this.props.data}
          onGoBack={this.handleGoBack}
        />}
        initialValues={values}
        validationSchema={transactionNewForm}
        onSubmit={this.handleSave}
      />
    );
  }
}

export default TransactionForm;
