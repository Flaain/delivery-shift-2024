import getImageUrl from "@/utils/helpers/getImageUrl";
import { navbar } from "@/utils/constants/navbar";

import { Link } from "react-router-dom";

/* есть проблема с изменением цвета при наведении. Можно добавить state hovered и изменять src, но это будет не плавно, я не уверен, 
можно также использовать вместо картинки svg, но тогда пропадет весь смысл вынесения ссылок в отдельный файл, ведь у каждой ссылки своя иконка. */

const Navbar = () => {
    return (
        <nav>
            <ul className='flex items-center gap-8'>
                {navbar.map((link, index) => (
                    <li key={index}>
                        <Link to={link.href ?? "#"} className='flex items-center gap-4 group'>
                            <img src={getImageUrl(link.icon)} alt='икона пункта меню' />
                            <span className='text-primary-t text-base font-medium group-hover:text-primary-blue transition-colors duration-200 ease-in-out'>
                                {link.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;