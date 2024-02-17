import { NavLink, NavLinkRenderProps } from "react-router-dom";

import { NAVBAR } from "@/utils/constants/navbar";
import { getImageUrl } from "@/utils/helpers/getImageUrl";

/* есть проблема с изменением цвета при наведении. Можно добавить state hovered и изменять src, но это будет не плавно, я не уверен, 
можно также использовать вместо картинки svg, но тогда пропадет весь смысл вынесения ссылок в отдельный файл, ведь у каждой ссылки своя иконка. */

const setActiveLink = ({ isActive }: NavLinkRenderProps) => ["flex items-center gap-4 group", isActive ? "text-primary-blue" : "text-primary-t"].join(" ");

const Navbar = () => {
    return (
        <nav>
            <ul className="flex items-center gap-8">
                {NAVBAR.map((link, index) => (
                    <li key={index}>
                        <NavLink to={link.href ?? "#"} className={setActiveLink}>
                            <img src={getImageUrl(link.icon)} alt="икона пункта меню" />
                            <span className="font-medium group-hover:text-primary-blue transition-colors duration-200 ease-in-out">
                                {link.title}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;