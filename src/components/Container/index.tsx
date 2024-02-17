import { cn } from "@/utils/helpers/classnames";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Container = ({ children, className, ...rest }: ContainerProps) => {
    return (
        <div {...rest} className={cn(!!className && className, "max-w-[1230px] w-full mx-auto px-[15px]")}>
            {children}
        </div>
    );
};

export default Container;