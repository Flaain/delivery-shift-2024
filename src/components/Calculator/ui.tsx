import React from "react";

import Spinner from "../Spinner/ui";
import CalculatorForm from "../CalculatorForm/ui";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { getCalculatorData, selectSlice } from "@/utils/redux/calculator/slice";
import { Status } from "@/utils/redux/calculator/types";

const Calculator = () => {
    const { points, packages, status, error } = useAppSelector(selectSlice);

    const statuses: Record<Exclude<Status, "none">, React.ReactNode> = {
        loading: <Spinner />,
        error: <p className='text-red-500 text-base font-semibold mt-5'>{error}</p>,
        success: <CalculatorForm />,
    };

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const controller = new AbortController();

        dispatch(getCalculatorData(controller));

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className='flex flex-col px-[72px] py-8 box-border border border-solid shadow-lg border-gray-100 rounded-3xl max-w-[500px] w-full min-h-[500px] relative bg-white gap-6'>
            <h2 className='text-primary-t text-2xl font-bold'>Рассчитать доставку</h2>
            {statuses[status as keyof typeof statuses]}
        </div>
    );
};

export default Calculator;