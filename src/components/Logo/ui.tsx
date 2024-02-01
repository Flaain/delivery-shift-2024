import getImageUrl from "@/utils/helpers/getImageUrl";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to='/'>
            <img src={getImageUrl("logo.svg")} alt='логотип Шифт Delivery' />
        </Link>
    );
};

export default Logo;