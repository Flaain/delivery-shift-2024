import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
    headerSlot?: React.ReactNode;
    bottomSlot?: React.ReactNode;
    announcementSlot?: React.ReactNode;
}

const Layout = ({ headerSlot, bottomSlot, announcementSlot }: LayoutProps) => {
    return (
        <>
            <Toaster />
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