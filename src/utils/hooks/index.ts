import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { StoreDispatch } from "../redux/store";
import { RootState } from "../../utils/redux/store";

type DispatchFunc = () => StoreDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;