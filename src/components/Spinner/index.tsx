import { cn } from "@/utils/helpers/classnames";

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    position?: "top" | "right" | "bottom" | "left" | "center";
    size?: "sm" | "md" | "lg";
}

const positions: Record<NonNullable<SpinnerProps["position"]>, string> = {
    top: "mb-auto",
    right: "ml-auto",
    bottom: "mt-auto",
    left: "mr-auto",
    center: "mx-auto my-auto",
};

const sizes: Record<NonNullable<SpinnerProps["size"]>, string> = {
    sm: "w-[25px] h-[25px] border-[3px]",
    md: "w-[50px] h-[50px] border-[5px]",
    lg: "w-[100px] h-[100px] border-[10px]",
};

const Spinner = ({ position = "center", size = "md", className, ...rest }: SpinnerProps) => {
    return (
        <span
            className={cn(
                "flex animate-spin border-t-transparent border-solid border-primary-blue rounded-full",
                positions[position],
                sizes[size],
                !!className && className,
            )}
            {...rest}
        ></span>
    );
};

export default Spinner;