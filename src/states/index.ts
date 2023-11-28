import { proxy, useSnapshot } from "valtio";
import { SessionType, StateType, TreeNode } from "../typing";

export * from "./actions";

const session: SessionType = proxy({
  openapi: undefined,
  type: undefined,
  key: undefined,
  apiTree: undefined,
  dbTree: undefined,
  enumTree: [{ title: "Enum", key: "enum", isLeaf: true }] as TreeNode[],
});
export const state: StateType = proxy({
  session,
});

export function useMyState() {
  const snap = useSnapshot<StateType>(state);
  return { snap };
}
