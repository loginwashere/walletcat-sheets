import * as Yup from 'yup';

export const spreadsheetForm = Yup.object({
  spreadsheetId: Yup
    .string()
    .required("spreadsheetId is required"),
});

export const transactionNewForm = Yup.object({
  categoryId:  Yup
    .string()
    .required("category is required"),
  transactionItems: Yup
    .array()
    .of(
      Yup.object().shape({
        amount: Yup.number().required(),
        accountId: Yup.string().required(),
      })
    )
    .min(2)
    .required("category is required"),
});

export const currencyNewForm = Yup.object({
  name: Yup
    .string()
    .required("name is required"),
  symbol: Yup
    .string()
    .required("symbol is required"),
  description: Yup
    .string(),
});

export const categoryNewForm = Yup.object({
  name: Yup
    .string()
    .required("name is required"),
  parentId: Yup
    .string(),
  description: Yup
    .string(),
});

export const accountNewForm = Yup.object({
  name: Yup
    .string()
    .required("name is required"),
  currencyId: Yup
    .string()
    .required("currency is required"),
  description: Yup
    .string(),
});
