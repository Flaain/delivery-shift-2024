import { ROUTES } from "@/utils/constants/router";
import { getImageUrl } from "@/utils/helpers/getImageUrl";

import Container from "../Container";
import Link from "../Link";
import Title from "../Title";

const EmptyHistory = () => {
    return (
        <Container className="flex h-[calc(100vh-80px)] flex-col gap-2 items-center justify-center">
            <img src={getImageUrl("disappointed-face.svg")} alt="заявок нет" className="mb-5" />
            <Title title="Заявок нет" className="font-bold" />
            <p className="text-secondary-t text-center">Перейдите на главную страницу чтобы оформить заявку</p>
            <Link className="mt-5" to={ROUTES.HOME} title="Перейти на главную" size="md" isFilled isRoundedFull />
        </Container>
    );
};

export default EmptyHistory;