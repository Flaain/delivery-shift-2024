import { IPoint } from "@/utils/redux/calculator/types";

export interface SelectProps {
    items: Array<IPoint>;
    activeItem?: IPoint | null;
    role: "from" | "to";
    withSuggestions?: boolean;
    onClick: (item: IPoint) => void;
    iconSlot?: React.ReactNode;
    label?: string;
}