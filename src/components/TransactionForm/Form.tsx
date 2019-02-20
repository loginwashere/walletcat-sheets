import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from 'material-ui-pickers';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {Field, FieldArray, FormikProps, FieldProps} from 'formik';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Select from '../Select';
import { ENTITY_STATUS } from '../../app';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IDataState } from '../../reducers/initialState';

const styles = (theme: Theme) => ({
  root: {
    // flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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
    // width: 400,
  },
  fab: {
    position: 'absolute' as 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    // flexGrow: 0,
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    minWidth: 120,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControlControls: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
  },

  transactionItemsContainer: {
    alignItems: 'baseline',
    display: 'flex',
    flexGrow: 0,
  },
});

export interface IValuesTransactionItem {
  id?: string;
  amount: number;
  accountId: string;
  status: ENTITY_STATUS;
}

export interface IValues {
  id?: string;
  categoryId: string;
  description: string;
  date: string|Date;
  status: ENTITY_STATUS;
  transactionItems: IValuesTransactionItem[];
}

export interface IProps<ClassKey extends string = string> extends FormikProps<IValues> {
  classes: Partial<ClassNameMap<ClassKey>>;
  data: IDataState;
  onGoBack: () => any;
}

class TransactionNewForm extends Component<IProps> {
  handleDateChange = (date: Date) => {
    const name = 'date';
    const {
      setFieldTouched,
      setFieldValue,
    } = this.props;

    setFieldValue(name, date);
    setFieldTouched(name, true, false);
  };

  handleChange = (name: keyof IValues) => (event: React.SyntheticEvent) => {
    const {
      setFieldTouched,
      handleChange,
    } = this.props;

    event.persist();

    handleChange(event);
    setFieldTouched(name, true, false);
  }

  handleFieldArrayChange = (name: string) => (event: React.SyntheticEvent) => {
    this.handleChange(name as any)(event); // TODO
  }

  render() {
    const { classes, data, } = this.props;

    console.log('data', data);
    console.log('values', this.props.values);
    const {
      values: {
        categoryId,
        description,
        date,
        transactionItems,
      },
      errors,
      touched,
      handleChange,
      isValid,
      setFieldTouched,
      handleSubmit,
    } = this.props;

    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="description"
          label="Description"
          fullWidth
          className={classes.textField}
          value={description}
          onChange={this.handleChange('description')}
          margin="normal"
        />
        <DateTimePicker
          label="Date"
          value={date}
          className={classes.textField}
          onChange={this.handleDateChange}
          margin="normal"
        />
        <Select
          classes={classes}
          label="Category"
          placeholder="Category"
          options={data.categoryIds.map(item => ({value: item, label: data.categories[item].name}))}
          value={categoryId}
          onChange={this.handleChange('categoryId')}
          name="categoryId"
        />
        <br />
        <FieldArray
          name="transactionItems"
          render={arrayHelpers => (
            <React.Fragment>
              {transactionItems
                .filter(transactionItem => transactionItem.status === ENTITY_STATUS.active)
                .map((transactionItem, index) => {
                  return (
                    <div key={index} className={classes.transactionItemsContainer}>
                      <Field
                        type="hidden"
                        name={`transactionItems.${index}.id`}
                        value={transactionItem.id}
                      />
                      <Field
                        name={`transactionItems.${index}.amount`}
                        render={({ field /* _form */ }: FieldProps<IValues>) => (
                          <TextField
                            {...field}
                            id={`transactionItems.${index}.amount`}
                            label="Amount"
                            className={classes.textField}
                            value={transactionItem.amount}
                            onChange={this.handleFieldArrayChange(`transactionItems.${index}.amount`)}
                            margin="normal"
                          />
                        )}
                      />
                      <Select
                        classes={classes}
                        label="Account"
                        placeholder="Account"
                        options={data.accountIds.map(item => ({value: item, label: data.accounts[item].name}))}
                        value={transactionItem.accountId}
                        onChange={this.handleFieldArrayChange(`transactionItems.${index}.accountId`)}
                        name="accountId"
                      />
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="Remove"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <RemoveIcon />
                      </Fab>
                    </div>
                  );
                })
              }
              <Fab
                size="small"
                color="secondary"
                aria-label="Add"
                onClick={() => arrayHelpers.push({
                  amount: '',
                  accountId: '',
                  status: ENTITY_STATUS.active,
                })}
              >
                <AddIcon />
              </Fab>
            </React.Fragment>
          )}
        />
        <br />
        <FormControl className={classes.formControlControls} fullWidth>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.props.onGoBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!isValid}
          >
            Save
          </Button>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TransactionNewForm);
