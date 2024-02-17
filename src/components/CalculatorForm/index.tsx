import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/utils/constants/router";
import { getImageUrl } from "@/utils/helpers/getImageUrl";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { selectSlice, setPackage, setReceiverPoint, setSenderPoint } from "@/utils/redux/calculator/slice";
import { IPoint } from "@/utils/redux/calculator/types";

import Button from "../Button";
import PackageSelect from "../PackageSelect";
import PointSelect from "../PointSelect";

const CalculatorForm = () => {
    const { points, receiverPoint, senderPoint, packageProp, packages } = useAppSelector(selectSlice);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = (item: IPoint, role: "from" | "to") => {
        const isRoleFrom = role === "from";
        const oppositePoint = isRoleFrom ? receiverPoint : senderPoint;

        dispatch(isRoleFrom ? setSenderPoint(item) : setReceiverPoint(item));
        item.id === oppositePoint?.id && dispatch(isRoleFrom ? setReceiverPoint(senderPoint!) : setSenderPoint(receiverPoint!));
    };

    return (
        <>
            <PointSelect
                items={points}
                iconSlot={<img src={getImageUrl("marker.svg")} alt="иконка маркера" />}
                onClick={handleClick}
                role="from"
                label="Город отправки"
                activeItem={senderPoint}
                placeholder="Выберите город отправки"
                hasSuggestions
            />
            <PointSelect
                items={points}
                onClick={handleClick}
                role="to"
                label="Город назначения"
                iconSlot={<img src={getImageUrl("pointer.svg")} alt="иконка курсора" />}
                placeholder="Выберите город назначения"
                activeItem={receiverPoint}
                hasSuggestions
            />
            <PackageSelect
                items={packages}
                onClick={(item) => dispatch(setPackage(item))}
                activeItem={packageProp}
                label="Размер посылки"
                iconSlot={<img src={getImageUrl("email.svg")} alt="иконка упаковки" />}
                placeholder="Не выбран"
            />
            <Button
                className="mt-auto font-bold"
                title="Рассчитать"
                size="md"
                isFilled
                isRoundedFull
                onClick={() => navigate(ROUTES.DELIVERY)}
                isDisabled={!senderPoint || !receiverPoint || !packageProp}
            />
        </>
    );
};

export default CalculatorForm;
