import React, { Component } from 'react';
import { Formik, FormikActions } from "formik";
import Form, { IValues } from './Form';
import {spreadsheetForm} from '../../validation';
import { History } from 'history';
import { ISpreadsheetIdState } from '../../reducers/initialState';
import { routes } from '../../config';

export interface IProps {
  history: History;
  spreadsheetId: ISpreadsheetIdState;
  onSpreadsheetChange(values: IValues): void;
}

class SpreadsheetForm extends Component<IProps> {
  handleSubmit = (values: IValues, actions: FormikActions<IValues>) => {
    this.props.onSpreadsheetChange(values);
    actions.setSubmitting(false);
    this.props.history.push(routes.default);
  }

  handleGoBack = () => this.props.history.goBack()

  render() {
    const values: IValues = {
      spreadsheetId: this.props.spreadsheetId.value || ''
    };

    return (
      <Formik
        render={props => <Form
          {...props}
          onGoBack={this.handleGoBack}
        />}
        initialValues={values}
        validationSchema={spreadsheetForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default SpreadsheetForm;
