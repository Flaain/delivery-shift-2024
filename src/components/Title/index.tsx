import { cn } from "@/utils/helpers/classnames";

type Variants = "lg" | "xl" | "2xl" | "4xl" | "5xl" | "6xl";


interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    variant?: Variants;
    title: string;
}

const variants: Record<Variants, string> = {
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "4xl": "text-4xl max-lg:text-3xl",
    "5xl": "text-5xl max-lg:text-4xl",
    "6xl": "text-6xl max-lg:text-5xl",
};

const Title = ({ title, variant = "2xl", className, ...rest }: TitleProps) => {
    return (
        <h1 {...rest} className={cn(!!className && className, variants[variant])}>
            {title}
        </h1>
    );
};

export default Title;