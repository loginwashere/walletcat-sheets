import React, { Component } from 'react';
import { Formik, FormikActions } from "formik";
import Form from './Form';
import {categoryNewForm} from '../../validation';
import { ENTITY_TYPE, ENTITY_STATUS, ICategory } from '../../app';
import { routes } from '../../config';
import { IDataState } from '../../reducers/initialState';
import { ISaveEntityPayload } from '../../actions';
import { History } from 'history';

export interface IProps extends React.ClassAttributes<CategoryForm> {
  id?: string;
  data: IDataState;
  history: History;
  onEntitySave(payload: ISaveEntityPayload): any;
}

class CategoryForm extends Component<IProps> {
  handleSubmit = async (values: ICategory, actions: FormikActions<ICategory>) => {
    try {
      await this.props.onEntitySave({
        type: ENTITY_TYPE.category,
        entity: values,
      });
      actions.setSubmitting(false);

      this.props.history.push(routes.categories.list)
    } catch (error) {
      console.log('error', error);
      actions.setSubmitting(false);
      actions.setErrors(error);
      actions.setStatus({ msg: 'Set some arbitrary status or data' });
    }
  }

  handleGoBack = () => this.props.history.goBack()

  render() {
    const item: Partial<ICategory> = this.props.id
      ? this.props.data.categories[this.props.id]
      : {};

    const values = {
      id: item.id,
      parentId: item.parentId || '',
      name: item.name || '',
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
        validationSchema={categoryNewForm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default CategoryForm;
