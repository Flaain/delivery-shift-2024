import { Link } from "react-router-dom";

import { getImageUrl } from "@/utils/helpers/getImageUrl";

const Logo = () => {
    return (
        <Link to='/'>
            <img src={getImageUrl("logo.svg")} alt='логотип Шифт Delivery' />
        </Link>
    );
};

export default Logo;