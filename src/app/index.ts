export enum ENTITY_TYPE {
  currency = 'currency',
  category = 'category',
  account = 'account',
  transactionItem = 'transactionItem',
  transaction = 'transaction',
}

export type ENTITY_TYPES = ENTITY_TYPE.currency|ENTITY_TYPE.category|ENTITY_TYPE.account|ENTITY_TYPE.transactionItem|ENTITY_TYPE.transaction;

export enum ENTITY_STATUS {
  active = 'active',
  deleted = 'deleted',
}

export interface ICurrency {
  id?: string;
  name: string;
  symbol: string;
  description?: string;
  status: ENTITY_STATUS;
  createdAt?: string|Date;
  updatedAt?: string|Date;
  deletedAt?: string|Date;
  [key: string]: string|ENTITY_STATUS|Date|undefined;
}
export interface ICategory {
  id?: string;
  name: string;
  parentId?: string;
  description?: string;
  status: ENTITY_STATUS;
  createdAt?: string|Date;
  updatedAt?: string|Date;
  deletedAt?: string|Date;
  [key: string]: string|ENTITY_STATUS|Date|undefined;
}
export interface IAccount {
  id?: string;
  name: string;
  currencyId: string;
  description?: string;
  status: ENTITY_STATUS;
  createdAt?: string|Date;
  updatedAt?: string|Date;
  deletedAt?: string|Date;
  [key: string]: string|ENTITY_STATUS|Date|undefined;
}
export interface ITransactionItem {
  id?: string;
  transactionId: string;
  amount: number;
  accountId: string;
  description?: string;
  status: ENTITY_STATUS;
  createdAt?: string|Date;
  updatedAt?: string|Date;
  deletedAt?: string|Date;
  [key: string]: string|ENTITY_STATUS|Date|undefined|number;
}
export interface ITransaction {
  id?: string;
  categoryId: string;
  description?: string;
  date: string|Date;
  status: ENTITY_STATUS;
  createdAt?: string|Date;
  updatedAt?: string|Date;
  deletedAt?: string|Date;
  [key: string]: string|ENTITY_STATUS|Date|undefined;
}

export type Entity = ICurrency|ICategory|IAccount|ITransactionItem|ITransaction;
export type EntityKeys = keyof ICurrency|keyof ICategory|keyof IAccount|keyof ITransactionItem|keyof ITransaction;

export interface IEntityFields {
  [key: string]: (keyof ICurrency)[]|(keyof ICategory)[]|(keyof IAccount)[]|(keyof ITransactionItem)[]|(keyof ITransaction)[];
  [ENTITY_TYPE.currency]: (keyof ICurrency)[];
  [ENTITY_TYPE.category]: (keyof ICategory)[];
  [ENTITY_TYPE.account]: (keyof IAccount)[];
  [ENTITY_TYPE.transactionItem]: (keyof ITransactionItem)[];
  [ENTITY_TYPE.transaction]: (keyof ITransaction)[];
}

export const entityFields: IEntityFields = {
  [ENTITY_TYPE.currency]: [
    'name',
    'symbol',
    'description',
    'status',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
  [ENTITY_TYPE.category]: [
    'name',
    'description',
    'parentId',
    'status',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
  [ENTITY_TYPE.account]: [
    'name',
    'description',
    'currencyId',
    'status',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
  [ENTITY_TYPE.transactionItem]: [
    'transactionId',
    'amount',
    'accountId',
    'description',
    'status',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
  [ENTITY_TYPE.transaction]: [
    'categoryId',
    'description',
    'date',
    'status',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

export interface IOneEntityStateKeys {
  keys: string;
  values: string;
}

export interface IEntityStateKeys {
  readonly [key: string]: IOneEntityStateKeys;
}

export const entityStateKeys: IEntityStateKeys = {
  [ENTITY_TYPE.currency]: {
    keys: 'currencyIds',
    values: 'currencies',
  },
  [ENTITY_TYPE.category]: {
    keys: 'categoryIds',
    values: 'categories',
  },
  [ENTITY_TYPE.account]: {
    keys: 'accountIds',
    values: 'accounts',
  },
  [ENTITY_TYPE.transactionItem]: {
    keys: 'transactionItemIds',
    values: 'transactionItems',
  },
  [ENTITY_TYPE.transaction]: {
    keys: 'transactionIds',
    values: 'transactions',
  },
}

export interface ISheetNames {
  readonly [key: string]: string;
}

export const sheetNames: ISheetNames = {
  [ENTITY_TYPE.currency]: 'Currencies',
  [ENTITY_TYPE.category]: 'Categories',
  [ENTITY_TYPE.account]: 'Accounts',
  [ENTITY_TYPE.transactionItem]: 'TransactionItems',
  [ENTITY_TYPE.transaction]: 'Transactions',
}

export const formatEntity = (type: ENTITY_TYPES, entity: Entity) => {
  console.log('formatEntity', type, entity);
  return entityFields[type]
    .map((field: EntityKeys) => entity[field]);
}

export const generateId = (type: ENTITY_TYPES, index: number): string => `${sheetNames[type]}!A${index + 2}`;

export const parseId = (id: string) => id.split('!A')[1];

export const parseEntity = (type: ENTITY_TYPES) => (row: string[], index: number): Entity => {
  const entity: Entity = entityFields[type]
    .reduce(
      (result: Entity, current: EntityKeys, index: number) => ({
        ...result,
        [current]: row[index]
      }),
      {} as Entity
    );
  return {
    ...entity,
    id: generateId(type, index),
  };
};
