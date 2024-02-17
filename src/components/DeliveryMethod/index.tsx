import { ActionTypes, MultiStepFormProps } from "@/pages/Delivery/types";

import { cn } from "@/utils/helpers/classnames";
import { declOfNum } from "@/utils/helpers/declOfNum";
import { getImageUrl } from "@/utils/helpers/getImageUrl";
import { getRelativePrice } from "@/utils/helpers/getRelativePrice";
import { IOption } from "@/utils/redux/calculator/types";

import Button from "../Button";
import Title from "../Title";

interface DeliveryMethodProps extends Omit<MultiStepFormProps, "nextMenu"> {
    options: Array<IOption>;
}

const icons = {
    DEFAULT: "bus.svg",
    EXPRESS: "plane.svg",
};

const DeliveryMethod = ({ dispatch, options, state, title }: DeliveryMethodProps) => {
    return (
        <div className="flex flex-col gap-5 pt-12">
            <Title title={title} className="font-bold" />
            <form className="flex flex-col justify-between h-full pb-5 gap-5">
                <ul className="flex flex-col gap-6 md:grid md:grid-cols-2">
                    {options.map((option) => {
                        const isActive = state.option?.id === option.id;
                        return (
                            <li key={option.id}>
                                <label
                                    className={cn(
                                        "flex gap-4 min-h-32 p-4 box-border rounded-3xl transition-colors duration-200 ease-in-out cursor-pointer",
                                        isActive
                                            ? "bg-primary-blue"
                                            : "bg-transparent border border-solid border-gray-200",
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "p-2 rounded-full self-start",
                                            isActive ? "bg-white" : "bg-gray-200",
                                        )}
                                    >
                                        <img
                                            src={getImageUrl(icons[option.type as keyof typeof icons])}
                                            alt={option.name}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p
                                            className={cn(
                                                "text-base font-normal leading-none",
                                                isActive ? "text-white" : "text-gray-400",
                                            )}
                                        >
                                            {option.name}
                                        </p>
                                        <h2
                                            className={cn(
                                                "text-xl font-bold",
                                                isActive ? "text-white" : "text-primary-t",
                                            )}
                                        >
                                            {getRelativePrice(Math.floor(option.price / 100))}
                                        </h2>
                                        <p
                                            className={cn(
                                                "mt-auto text-base font-normal leading-none",
                                                isActive ? "text-white" : "text-gray-400",
                                            )}
                                        >
                                            {option.days} {declOfNum(option.days, ["рабочий", "рабочих", "рабочих"])}{" "}
                                            {declOfNum(option.days, ["день", "дня", "дней"])}
                                        </p>
                                    </div>
                                    <input
                                        type="radio"
                                        value={option.id}
                                        className="sr-only"
                                        name="method"
                                        checked={isActive}
                                        onChange={() => dispatch({ type: ActionTypes.SET_OPTION, payload: option })}
                                    />
                                </label>
                            </li>
                        );
                    })}
                </ul>
                <Button
                    isRoundedFull
                    className="self-end mt-10"
                    type="button"
                    size="md"
                    isFilled
                    title="Продолжить"
                    isDisabled={!state.option}
                    onClick={() => dispatch({ type: ActionTypes.SET_MENU, payload: { value: "receiver" } })}
                />
            </form>
        </div>
    );
};

export default DeliveryMethod;