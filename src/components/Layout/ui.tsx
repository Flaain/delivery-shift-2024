import { Outlet } from "react-router-dom";
import { LayoutProps } from "./types";

const Layout = ({ headerSlot, bottomSlot, announcementSlot }: LayoutProps) => {
    return (
        <>
            {announcementSlot}
            {headerSlot}
            <main>
                <Outlet />
            </main>
            {bottomSlot}
        </>
    );
};

export default Layout;