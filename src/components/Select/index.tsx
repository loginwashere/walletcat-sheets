import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MUSelect from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export interface IOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface IProps<ClassKey extends string = string> {
  label: string;
  name: string;
  options: IOption[];
  value: string;
  classes: Partial<ClassNameMap<ClassKey>>;
  onChange(event: React.SyntheticEvent): void;
  placeholder?: string;
}

const Select = ({
  classes,
  options,
  value,
  label,
  name,
  onChange,
  placeholder,
}: IProps) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <MUSelect
      value={value}
      onChange={onChange}
      displayEmpty={false}
      name={name}
      className={classes.select}
    >
      <MenuItem value="" disabled={true} key="">
        {placeholder}
      </MenuItem>
      {
        options.map(option => (
          <MenuItem value={option.value} disabled={option.disabled} key={option.value}>{option.label}</MenuItem>
        ))
      }
    </MUSelect>
  </FormControl>
);

export default Select;
