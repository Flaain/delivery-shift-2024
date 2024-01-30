import cn from "@/utils/helpers/classnames";
import { SpinnerProps } from "./types";

const Spinner = ({ position }: SpinnerProps) => {
    const positions = {
        top: "top-0",
        center: "top-[50%]",
        bottom: "bottom-0",
    };

    return (
        <span
            className={cn(
                "absolute left-[50%] w-[50px] animate-spin h-[50px] border-[5px] border-t-transparent border-solid border-primary-blue rounded-full",
                positions[position ?? "center"]
            )}
        ></span>
    );
};

export default Spinner;