import { proxy, useSnapshot } from "valtio";
import { SessionType, StateType } from "../typing";

export * from "./actions";

const session: SessionType = proxy({
  openapi: undefined,
  type: undefined,
  key: undefined,
  treeNodes: undefined,
});
export const state: StateType = proxy({
  session,
});

export function useMyState() {
  const snap = useSnapshot<StateType>(state);
  return { snap };
}
