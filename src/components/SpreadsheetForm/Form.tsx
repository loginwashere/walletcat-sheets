import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, Theme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import { FormikProps } from "formik";
import { ISpreadsheetIdState } from "../../reducers/initialState";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

const styles = (theme: Theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControlControls: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
  },
});

export interface IValues {
  spreadsheetId: string;
}

export interface IProps<ClassKey extends string = string> extends FormikProps<IValues> {
  classes: Partial<ClassNameMap<ClassKey>>;
  onGoBack: () => any;
}

class Form extends React.Component<IProps> {
  handleChange = (name: keyof IValues) => (e: React.SyntheticEvent) => {
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
      values: { spreadsheetId },
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
          id="spreadsheetId"
          name="spreadsheetId"
          label="Spreadsheet Id"
          helperText={touched.spreadsheetId ? errors.spreadsheetId : ""}
          error={touched.spreadsheetId && Boolean(errors.spreadsheetId)}
          className={classes.textField}
          value={spreadsheetId}
          onChange={this.handleChange('spreadsheetId')}
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
          >
            Save
          </Button>
        </FormControl>
      </form>
    );
  }
};

export default withStyles(styles, { withTheme: true })(Form);
