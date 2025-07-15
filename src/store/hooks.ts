import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useSelectorTyped<T>(fn: (state: RootState) => T): T {
  return useSelector(fn, shallowEqual);
}
