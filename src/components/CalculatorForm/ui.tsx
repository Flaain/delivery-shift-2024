import SelectPoint from "../SelectPoint/ui";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { selectSlice, setFrom, setTo } from "@/utils/redux/calculator/slice";
import { IPoint } from "@/utils/redux/calculator/types";

const CalculatorForm = () => {
    const { points, packages, from, to } = useAppSelector(selectSlice);

    const dispatch = useAppDispatch();
    
    return (
        <>
            <SelectPoint
                items={points}
                onClick={(item: IPoint) => {
                    if (item.id === to?.id) {
                        dispatch(setTo(from as IPoint));
                        dispatch(setFrom(to as IPoint));
                        return;
                    }

                    dispatch(setFrom(item)); /* TODO: вынести в отдельную функцию */
                }}
                role='from'
                label='Город отправки'
                activeItem={from}
                withSuggestions
            />
            <SelectPoint
                items={points}
                onClick={(item: IPoint) => {
                    if (item.id === from?.id) {
                        dispatch(setTo(from as IPoint));
                        dispatch(setFrom(to as IPoint));
                        return;
                    }

                    dispatch(setTo(item));
                }}
                role='to'
                label='Город назначения'
                activeItem={to}
                withSuggestions
            />
        </>
    );
};

export default CalculatorForm;