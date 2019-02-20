export enum ActionTypes {
  AUTH_CHANGED = '@@walletcat/AUTH_CHANGED',

  AUTH_CLIENT_LOAD_REQUEST = '@@walletcat/AUTH_CLIENT_LOAD_REQUEST',
  AUTH_CLIENT_LOAD_SUCCESS = '@@walletcat/AUTH_CLIENT_LOAD_SUCCESS',
  AUTH_CLIENT_LOAD_FAILURE = '@@walletcat/AUTH_CLIENT_LOAD_FAILURE',

  AUTH_CLIENT_INIT_REQUEST = '@@walletcat/AUTH_CLIENT_INIT_REQUEST',
  AUTH_CLIENT_INIT_SUCCESS = '@@walletcat/AUTH_CLIENT_INIT_SUCCESS',
  AUTH_CLIENT_INIT_FAILURE = '@@walletcat/AUTH_CLIENT_INIT_FAILURE',

  INIT_LOAD_REQUEST = '@@walletcat/INIT_LOAD_REQUEST',
  INIT_LOAD_SUCCESS = '@@walletcat/INIT_LOAD_SUCCESS',
  INIT_LOAD_FAILURE = '@@walletcat/INIT_LOAD_FAILURE',

  SPREADSHEET_CHANGED = '@@walletcat/SPREADSHEET_CHANGED',

  SAVE_ENTITY_REQUEST = '@@walletcat/SAVE_ENTITY_REQUEST',
  SAVE_ENTITY_SUCCESS = '@@walletcat/SAVE_ENTITY_SUCCESS',
  SAVE_ENTITY_FAILURE = '@@walletcat/SAVE_ENTITY_FAILURE',

  SIGN_IN = '@@walletcat/SIGN_IN',
  SIGN_OUT = '@@walletcat/SIGN_OUT',
}
