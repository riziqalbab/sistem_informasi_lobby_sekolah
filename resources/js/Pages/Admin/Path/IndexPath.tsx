"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import AppLayout from "@/Layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/Components/ui/toaster";

export default function IndexPath() {
    const { props } = usePage();
    const { toast } = useToast();
    const roles: Array<roles> = props.roles as Array<roles>;

    const [path, setPath] = useState("");
    const [role, setRole] = useState("");

    const permissions: Array<RoutePermission> = props.permission as Array<RoutePermission>;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const values = {
            id_role: role,
            nama: path,
        };

        // @ts-ignore
        router.post("/admin/path", values, {
            onSuccess: () => {
                toast({
                    title: "Berhasil disimpan",
                });
            },
        });
    };


    return (
        <AppLayout>
            <Toaster />
            <div className="container mx-auto p-4">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Tambah Route Permission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="">
                                <Label htmlFor="path" className="text-right">
                                    Path URL
                                </Label>
                                <Input
                                    id="path"
                                    value={path}
                                    onChange={(e) => setPath(e.target.value)}
                                    placeholder="/api/users"
                                    className="col-span-3"
                                />
                                {props.errors.nama && (
                                    <Alert
                                        variant="destructive"
                                        className="my-3"
                                    >
                                        <AlertTitle>
                                            {props.errors.nama}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>
                            <div className="">
                                <Label htmlFor="roles" className="text-right">
                                    Role User
                                </Label>
                                <Select
                                    onValueChange={(value) => {
                                        setRole(value);
                                    }}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem
                                                key={role.id_role}
                                                value={role.id_role.toString()}
                                            >
                                                {role.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {props.errors.id_role && (
                                    <Alert
                                        variant="destructive"
                                        className="my-3"
                                    >
                                        <AlertTitle>
                                            {props.errors.id_role}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>
                            <Button className="ml-auto" type="submit">
                                <Plus className="mr-2 h-4 w-4" /> Tambah
                                Permission
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Route Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Path URL</TableHead>
                                    <TableHead>Role User</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permissions.map((permission, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{permission.path}</TableCell>
                                        <TableCell>
                                            {permission.nama_role}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
