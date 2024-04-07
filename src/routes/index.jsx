import { Suspense, useEffect } from "react";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";

import { Home, Details } from "../pages/index.js"
import { NavBar } from "../components";
import { ConfigProvider } from "antd";

const Layout = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#bc1e34",
                },
                components: {
                    Button: {
                        defaultColor: "#bc1e34",
                        defaultHoverBg: "#bc1e34",
                        defaultHoverColor: "#ffffff",
                        defaultHoverBorderColor: "#bc1e34",
                        borderRadius: 0

                    },
                    Input: {
                        activeBorderColor: "#4096ff",
                        hoverBorderColor: "#4096ff"
                    },
                }
            }}

        >
            <NavBar />
            <Outlet />
        </ConfigProvider >
    )
};
const Router = () => {
    const router = createBrowserRouter([
        {
            element: (
                <Layout />
            ),
            children: [
                {
                    index: true,
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/article/:id",
                    element: <Details />,
                },

            ],
        },
    ]);

    return (
        <Suspense fallback={<></>}>
            <RouterProvider router={router}></RouterProvider>
        </Suspense>
    );
};

export default Router;
