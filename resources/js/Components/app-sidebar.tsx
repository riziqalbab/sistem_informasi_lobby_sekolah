import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/Components/ui/sidebar";
import { ChevronLeft, LayoutDashboard } from "lucide-react";

import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import { cn } from "@/lib/utils";

export function AppSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const menu = [
        {
            title: "TAMU",
            children: [
                {
                    title: "SEMUA TAMU",
                    url: "/tamu",
                },
                {
                    title: "TAMBAH TAMU",
                    url: "/tamu/tambah",
                },
            ],
        },
        {
            title: "DISPENSASI KELUAR",
            children: [
                {
                    title: "SEMUA DISPENSASI",
                    url: "/keluar",
                },
                {
                    title: "TAMBAH DISPENSASI",
                    url: "/keluar/tambah",
                },
            ],
        },
    ];

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

                    {menu.map((item, index) => (
                        <SidebarMenuItem>
                            <Collapsible>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton className="w-full justify-between">
                                        <div className="flex items-center">
                                            <span
                                                className={cn(
                                                    "ml-2",
                                                    collapsed && "hidden"
                                                )}
                                            >
                                                {item.title}
                                            </span>
                                        </div>
                                        <ChevronLeft
                                            className={cn(
                                                "h-4 w-4 transition-transform"
                                            )}
                                        />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-6 pt-1">
                                    {item.children.map((child) => (
                                        <SidebarMenuButton
                                            asChild
                                            className="w-full justify-start py-1"
                                        >
                                            <Link
                                                href={child.url}
                                                className="w-full justify-start"
                                            >
                                                <span
                                                    className={cn(
                                                        collapsed && "hidden"
                                                    )}
                                                >
                                                    {child.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
