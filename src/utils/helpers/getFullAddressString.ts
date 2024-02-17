import { ILocation } from "@/pages/Delivery/types";

export const getFullAddressString = (data: Omit<ILocation, "comment">) => {
    return `${data.street}, ${data.house}, ${data.appartament}`;
};