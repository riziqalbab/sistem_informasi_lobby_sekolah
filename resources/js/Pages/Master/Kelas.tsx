"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import Navbar from "@/Components/Navbar";
import { router, usePage } from "@inertiajs/react";
import Edit from "../Profile/Edit";
import AppLayout from "@/Layouts/AppLayout";

export default function ClassManagement() {
    const [inputKelas, setInputKelas] = useState<string>();
    const [inputKelasEdit, setInputKelasEdit] = useState<string>();
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { props } = usePage();

    console.log(props);
    

    const kelas: Array<object_kelas> = props.kelas as Array<object_kelas>;

    console.log(kelas);
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const values = {
            nama: inputKelas,
        };
        router.post("/master/kelas", values);
    };

    const handleEdit = (id_kelas: string) => {
        const values = {
            id_kelas: id_kelas,
            nama_edit: inputKelasEdit,
        };
        router.post("/master/kelas/edit", values, {
            onSuccess: ()=>{
                setIsDialogOpen(!isDialogOpen)
            }
        });
    };

    return (
        <AppLayout>
            
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">
                    KELAS | <span className="text-red-500">MASTER DATA</span>
                </h1>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Tambah Kelas Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="name">Nama Kelas</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    onChange={(e) => {
                                        setInputKelas(e.target.value);
                                    }}
                                    placeholder="Contoh: X PPLG"
                                    required
                                />
                                {props.errors.nama && (
                                    <Alert
                                        variant="destructive"
                                        className="mt-3"
                                    >
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle>
                                            {props.errors.nama}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>

                            <Button type="submit">Tambah Kelas</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Kelas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Kelas</TableHead>
                                    <TableHead>AKSI</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {kelas.map((item) => (
                                    <TableRow key={item.id_kelas}>
                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell>
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            setInputKelasEdit(
                                                                item.nama
                                                            );
                                                        }}
                                                    >
                                                        EDIT
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            EDIT NAMA KELAS
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Buat perubahan jika
                                                            diperlukan
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="flex flex-col gap-3 items-start">
                                                            <Label
                                                                htmlFor="kelasEdit"
                                                                className="text-right"
                                                            >
                                                                Nama kelas
                                                            </Label>
                                                            <Input
                                                                id="kelasEdit"
                                                                value={
                                                                    inputKelasEdit
                                                                }
                                                                className="col-span-3"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setInputKelasEdit(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            />

                                                            {props.errors
                                                                .nama_edit && (
                                                                <Alert
                                                                    variant="destructive"
                                                                    className="mt-3"
                                                                >
                                                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                                                    <AlertTitle>
                                                                        {
                                                                            props
                                                                                .errors
                                                                                .nama_edit
                                                                        }
                                                                    </AlertTitle>
                                                                </Alert>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            type="button"
                                                            onClick={() => {
                                                                handleEdit(
                                                                    item.id_kelas
                                                                );
                                                            }}
                                                        >
                                                            SIMPAN
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
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
