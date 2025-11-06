import { Outlet, useLocation } from "react-router-dom";
import React, { useRef } from "react";

const MainLayout = () => {
    const location = useLocation();
    const infoModalHandler = useRef(null);

    const handleRequestInfoModal = (openModalFn) => {
        infoModalHandler.current = openModalFn;
    };

    return (
        <main className="main-content">
            {location.pathname === "/delivery" ? (
                <Outlet context={{ onRequestInfoModal: handleRequestInfoModal }} />
            ) : (
                <Outlet />
            )}
        </main>
    );
};

export default MainLayout;