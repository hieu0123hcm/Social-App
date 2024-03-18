import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux-store/store";

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = () => {
  return useDispatch();
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
