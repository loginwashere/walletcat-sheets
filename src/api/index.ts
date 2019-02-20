import { formatEntity, sheetNames, Entity, ENTITY_TYPES } from "../app";

export interface CustomWindow extends Window {
  gapi: any;
}

declare let window: CustomWindow;

export const load = (type: string) => new Promise((resolve) => {
  window.gapi.load(type, () => {
    resolve(true);
  });
});

export const init = (clientId: string) => window.gapi.client
  .init({
    discoveryDocs: [
      "https://sheets.googleapis.com/$discovery/rest?version=v4"
    ],
    clientId,
    scope: "https://www.googleapis.com/auth/spreadsheets"
  });

export const signIn = () => window.gapi.auth2.getAuthInstance().signIn();

export const signOut = () => window.gapi.auth2.getAuthInstance().signOut();

export const authListen = (cb: (auth: boolean) => void) => window.gapi.auth2
  .getAuthInstance()
  .isSignedIn
  .listen(cb);

export const getAuth = () => window.gapi.auth2.getAuthInstance().isSignedIn.get();

export interface IValueRange {
  values: string[][];
}
export interface IBatchGetResponse {
  result: {
    valueRanges: IValueRange[]
  }
}

export const batchGet = ({spreadsheetId, ranges}: {
  spreadsheetId: string,
  ranges: string[],
}) => window.gapi.client.sheets.spreadsheets.values
  .batchGet({
    spreadsheetId,
    ranges,
  });

export const append = (spreadsheetId: string, type: ENTITY_TYPES, entity: Entity) => {
  return window.gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: `${sheetNames[type]}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    values: [formatEntity(type, {...entity, createdAt: new Date()})],
  });
};

export const update = (spreadsheetId: string, type: ENTITY_TYPES, entity: Entity) => {
  return window.gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId,
    range: entity.id,
    valueInputOption: "USER_ENTERED",
    values: [formatEntity(type, {...entity, updatedAt: new Date()})],
  });
};
