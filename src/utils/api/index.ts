import { BaseAPI } from "./baseApi";
import { CalcAPI } from "./calcApi";
import { UserAPI } from "./userApi";

export const api = {
    calc: new CalcAPI(),
    user: new UserAPI(),
    base: new BaseAPI(),
};