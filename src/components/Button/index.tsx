import { cn } from "@/utils/helpers/classnames";

type Sizes = "default" | "sm" | "md" | "lg" | "icon" | "none";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {}

interface BaseProps {
    title?: string;
    size?: Sizes;
    isFilled?: boolean;
    isText?: boolean;
    text?: Exclude<Sizes, "icon" | "none">;
    isTransparent?: boolean;
    isBordered?: boolean;
    isDisabled?: boolean;
    isRoundedFull?: boolean;
    fullWidth?: boolean;
    leftIconSlot?: React.ReactNode;
    rightIconSlot?: React.ReactNode;
}

const Button = ({
    isBordered,
    isDisabled,
    isFilled,
    size = "default",
    text = "default",
    isTransparent,
    isText,
    isRoundedFull,
    fullWidth,
    className,
    title,
    leftIconSlot,
    rightIconSlot,
    ...rest
}: ButtonProps) => {
    const variants: Record<string, boolean> = {
        "text-white bg-primary-blue enabled:hover:bg-blue-800/90 transition-colors duration-200": !!isFilled,
        "border border-solid border-primary-blue": !!isBordered,
        [`text-primary-blue hover:text-primary-blue/80 transition-colors duration-200 ${isTransparent ? "bg-transparent" : "hover:bg-primary-blue/10"}`]: !!isText,
        "opacity-50 cursor-default": !!isDisabled,
        "rounded-full": !!isRoundedFull,
        "w-full": !!fullWidth,
        "px-4 py-2": size === "default",
        "p-0": size === "none",
        "px-3 py-2": size === "sm",
        "px-8 py-4": size === "md",
        "px-10 py-5": size === "lg",
        "w-6 h-6": size === "icon",
        "text-sm": text === "sm",
        "text-base": text === "default",
        "text-lg": text === "md",
        "text-xl": text === "lg",
    };
    return (
        <button
            {...rest}
            disabled={isDisabled}
            className={cn(
                !!className && className,
                variants,
                "inline-flex items-center gap-4 justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            )}
        >
            {leftIconSlot}
            {title}
            {rightIconSlot}
        </button>
    );
};

export default Button;