import { IPerson } from "@/pages/Delivery/types";

export const getFullNameString = (data: Omit<IPerson, "phone">) => {
    return `${
        data.lastname[0].toUpperCase() + data.lastname.slice(1)
    } ${data.firstname[0].toUpperCase() + data.firstname.slice(1)} 
        ${data.middlename ? data.middlename[0].toUpperCase() + data.middlename.slice(1) : ""}`.trim();
};