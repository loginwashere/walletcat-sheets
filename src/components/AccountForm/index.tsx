import React, { Component } from 'react';
import { Formik, FormikActions } from "formik";
import Form from './Form';
import {accountNewForm} from '../../validation';
import { ENTITY_TYPE, ENTITY_STATUS, IAccount } from '../../app';
import { routes } from '../../config';
import { IDataState } from '../../reducers/initialState';
import { ISaveEntityPayload } from '../../actions';
import { History } from 'history';

export interface IProps extends React.ClassAttributes<AccountForm> {
  id?: string;
  data: IDataState;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): any;
}

class AccountForm extends Component<IProps> {
  handleSubmit = async (values: IAccount, actions: FormikActions<IAccount>) => {
    try {
      await this.props.onEntitySave({
        type: ENTITY_TYPE.account,
        entity: values,
      });
      actions.setSubmitting(false);

      this.props.history.push(routes.accounts.list);
    } catch (error) {
      console.log('error', error);
      actions.setSubmitting(false);
      actions.setErrors(error);
      actions.setStatus({ msg: 'Set some arbitrary status or data' });
    }
  }

  handleGoBack = () => this.props.history.goBack()

  render() {
    const item: Partial<IAccount> = this.props.id
      ? this.props.data.accounts[this.props.id]
      : {};

    const values: IAccount = {
      id: item.id,
      name: item.name || '',
      currencyId: item.currencyId || '',
      status: item.status || ENTITY_STATUS.active,
      description: item.description || '',
    };

    return (
      <Formik
        render={props => <Form
          {...props}
          data={this.props.data}
          onGoBack={this.handleGoBack}
        />}
        initialValues={values}
        validationSchema={accountNewForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default AccountForm;
