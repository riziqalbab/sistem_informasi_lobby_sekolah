import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/Components/ui/sidebar";
import {
    ChevronLeft,
    Icon,
    LayoutDashboard,
    LucideGitPullRequestCreate,
    Menu,
    Settings,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

const items = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Inbox",
        url: "#",
    },
    {
        title: "Calendar",
        url: "#",
    },
    {
        title: "Search",
        url: "#",
    },
    {
        title: "Settings",
        url: "#",
    },
];

// <li>
//                             <Link href="/tamu">TAMU</Link>
//                         </li>
//                         <li>
//                             <Link href="/keluar">DISPENSASI</Link>
//                         </li>
//                         <li>
//                             <Link href="/masuk">TERLAMBAT</Link>
//                         </li>
//                         <li>
//                             <Link href="/statistik">STATISTIK</Link>
//                         </li>

export function AppSidebar() {
    return (
        <Sidebar className="h-screen border-r" variant="inset">
            <SidebarHeader>
                <h1 className="font-bold">ADMINISTRATOR</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link
                                href="/statistik"
                                className="w-full justify-start"
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard Statistik</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem></SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Link href="/tamu">TAMU</Link>
                        </SidebarMenuButton>
                        <SidebarMenuButton>
                            <Link href="/keluar">DISPENSASI</Link>
                        </SidebarMenuButton>
                        <SidebarMenuButton>
                            <Link href="/masuk">TERLAMBAT</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
