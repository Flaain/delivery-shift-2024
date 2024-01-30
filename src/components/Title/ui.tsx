import cn from "@/utils/helpers/classnames";
import { TitleProps, Variants } from "./types";

const Title = ({ title, variant = "2xl", className, ...rest }: TitleProps) => {
    const variants: { [key in Variants]: string } = {
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "4xl": "text-4xl",
        "6xl": "text-6xl",
    }; // возможно лучше вынести в constants

    return (
        <h1 {...rest} className={cn(!!className && className, variants[variant])}>
            {title}
        </h1>
    );
};

export default Title;