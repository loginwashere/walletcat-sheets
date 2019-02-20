import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, Theme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { FormikProps } from "formik";
import { ICurrency } from "../../app";

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
});

export interface IProps<ClassKey extends string = string> extends FormikProps<ICurrency> {
  classes: Partial<ClassNameMap<ClassKey>>;
  onGoBack: () => any;
}

class Form extends React.Component<IProps> {
  handleChange = (name: string) => (e: React.SyntheticEvent) => {
    const {
      handleChange,
      setFieldTouched
    } = this.props;

    e.persist();

    handleChange(e);
    setFieldTouched(name, true, false);
  }

  render() {
    const {
      classes,
      values: {
        name,
        symbol,
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
        <TextField
          id="symbol"
          name="symbol"
          label="Symbol"
          helperText={touched.symbol ? errors.symbol : ""}
          error={touched.symbol && Boolean(errors.symbol)}
          className={classes.textField}
          value={symbol}
          onChange={this.handleChange('symbol')}
          margin="normal"
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
