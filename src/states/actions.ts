import { state } from "./index";

export const stateActions = {
  setOpenApi: async (openapi: object | undefined) => {
    state.session.openapi = openapi;
  },
  setType: (type: string | undefined) => {
    state.session.type = type;
  },
  setKey: (key: string | undefined) => {
    state.session.key = key;
  },
};
