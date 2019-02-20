import React, { Component } from 'react';
import { Formik, FormikActions } from "formik";
import Form from './Form';
import {currencyNewForm} from '../../validation';
import { ENTITY_TYPE, ENTITY_STATUS, ICurrency } from '../../app';
import { routes } from '../../config';
import { IDataState } from '../../reducers/initialState';
import { ISaveEntityPayload } from '../../actions';
import { History } from 'history';

export interface IProps extends React.ClassAttributes<CurrencyForm> {
  id?: string;
  data: IDataState;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): any;
}

class CurrencyForm extends Component<IProps> {
  handleSubmit = async (values: ICurrency, actions: FormikActions<ICurrency>) => {
    let result;
    try {
      result = await this.props.onEntitySave({
        type: ENTITY_TYPE.currency,
        entity: values,
      });
      actions.setSubmitting(false);

      this.props.history.push(routes.currencies.list)
    } catch (error) {
      console.log('error', error);
      actions.setSubmitting(false);
      actions.setErrors(error);
      actions.setStatus({ msg: 'Set some arbitrary status or data' });
    }
  }

  handleGoBack = () => this.props.history.goBack()

  render() {
    const item: Partial<ICurrency> = this.props.id
      ? this.props.data.currencies[this.props.id]
      : {};

    const values: ICurrency = {
      id: item.id,
      name: item.name || '',
      symbol: item.symbol || '',
      status: item.status || ENTITY_STATUS.active,
      description: item.description || '',
    };

    return (
      <Formik
        render={props => <Form
          {...props}
          onGoBack={this.handleGoBack}
        />}
        initialValues={values}
        validationSchema={currencyNewForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default CurrencyForm;
