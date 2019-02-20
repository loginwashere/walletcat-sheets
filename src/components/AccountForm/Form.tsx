import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, Theme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import Select from '../Select';
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { IAccount } from "../../app";
import { FormikProps } from "formik";
import { IDataState } from "../../reducers/initialState";

const styles = (theme: Theme) => ({
  formControlControls: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    // width: 400,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 200,
  },
});

export interface IProps<ClassKey extends string = string> extends FormikProps<IAccount> {
  classes: Partial<ClassNameMap<ClassKey>>;
  data: IDataState;
  onGoBack: () => any;
}

class Form extends React.Component<IProps> {
  handleChange = (name: string) => (event: React.SyntheticEvent) => {
    const {
      handleChange,
      setFieldTouched,
    } = this.props;

    event.persist();

    handleChange(event);
    setFieldTouched(name, true, false);
  }

  render() {
    const {
      data,

      classes,
      values: {
        name,
        currencyId,
        description,
      },
      errors,
      touched,
      isValid,
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
          id="name"
          name="name"
          label="Name"
          helperText={touched.name ? errors.name : ""}
          error={touched.name && Boolean(errors.name)}
          className={classes.textField}
          value={name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <br />
        <Select
          classes={classes}
          label="Currency"
          placeholder="Currency"
          name="currencyId"
          options={data.currencyIds.map(item => ({value: item, label: data.currencies[item].name}))}
          value={currencyId}
          onChange={this.handleChange('currencyId')}
        />
        <br />
        <TextField
          id="description"
          name="description"
          label="Description"
          helperText={touched.description ? errors.description : ""}
          error={touched.description && Boolean(errors.description)}
          className={classes.textField}
          value={description}
          onChange={this.handleChange('description')}
          margin="normal"
        />
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
            // fullWidth
            variant="contained"
            color="primary"
            disabled={!isValid}
            className={classes.button}
          >
            Save
          </Button>
        </FormControl>
      </form>
    );
  }
};

export default withStyles(styles, { withTheme: true })(Form);
