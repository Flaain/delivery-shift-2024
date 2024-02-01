import cn from "@/utils/helpers/classnames";
import { ContainerProps } from "./types";

const Container = ({ children, className, ...rest }: ContainerProps) => {
    return (
        <div {...rest} className={cn(className ?? "max-w-[1200px] w-full box-border mx-auto")}>
            {children}
        </div>
    );
};

export default Container;