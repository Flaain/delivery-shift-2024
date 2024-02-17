import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from "react-router-dom";

import { cn } from "@/utils/helpers/classnames";

type Sizes = "default" | "sm" | "md" | "lg" | "icon" | "none";

interface LinkProps extends ReactRouterLinkProps, BaseProps {}

interface BaseProps {
    title?: string;
    size?: Sizes;
    text?: Exclude<Sizes, "icon" | "none">;
    isFilled?: boolean;
    isText?: boolean;
    isTransparent?: boolean;
    isBordered?: boolean;
    isDisabled?: boolean;
    isRoundedFull?: boolean;
    leftIconSlot?: React.ReactNode;
    rightIconSlot?: React.ReactNode;
}

const Link = ({
    isBordered,
    isDisabled,
    isFilled,
    size = "default",
    text = "default",
    isTransparent,
    isText,
    isRoundedFull,
    className,
    title,
    leftIconSlot,
    rightIconSlot,
    ...rest
}: LinkProps) => {
    const variants: Record<string, boolean> = {
        "text-white bg-primary-blue enabled:hover:bg-blue-800/90 transition-colors duration-200": !!isFilled,
        "border border-solid border-primary-blue": !!isBordered,
        [`text-primary-blue hover:text-primary-blue/80 transition-colors duration-200 ${isTransparent ? "" : "hover:bg-primary-blue/10"}`]: !!isText,
        "opacity-50 cursor-default pointer-events-none": !!isDisabled,
        "rounded-full": !!isRoundedFull,
        "px-4 py-2": size === "default",
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
        <ReactRouterLink
            {...rest}
            className={cn(
                !!className && className,
                variants,
                "inline-flex items-center gap-4 justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            )}
        >
            {leftIconSlot}
            {title}
            {rightIconSlot}
        </ReactRouterLink>
    );
};

export default Link;