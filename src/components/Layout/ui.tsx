import Container from "../Container/ui";
import { Outlet } from "react-router-dom";
import { LayoutProps } from "./types";

const Layout = ({ headerSlot, bottomSlot, announcementSlot }: LayoutProps) => {
    return (
        <Container>
            {announcementSlot}
            {headerSlot}
            <main>
                <Outlet />
            </main>
            {bottomSlot}
        </Container>
    );
};

export default Layout;