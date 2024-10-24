import { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import Navbar from "@/Components/Navbar";

function AppLayout({ children }: PropsWithChildren) {
    return (
        <>
           <AppSidebar/>
            <SidebarInset className="w-svw">
                <Navbar />
                {children}
            </SidebarInset>
        </>
    );
}

export default AppLayout;
