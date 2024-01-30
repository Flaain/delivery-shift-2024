export type Variants = "lg" | "xl" | "2xl" | "4xl" | "6xl";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    variant?: Variants;
    title: string;
}