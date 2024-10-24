import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { AppSidebar } from "./Components/app-sidebar";

const appName = `${import.meta.env.VITE_APP_NAME} | ${
    import.meta.env.VITE_NAMA_INSTITUSI
}`;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <SidebarProvider>
                    <App {...props} />
                </SidebarProvider>
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
