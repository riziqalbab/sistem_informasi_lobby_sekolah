import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { RocketIcon } from "@radix-ui/react-icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

import { Button } from "@/Components/ui/button";
import { Delete, DeleteIcon, PencilIcon } from "lucide-react";
import Navbar from "@/Components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Guru({ teachers = [], onEdit }: ComponentProps) {
    const { props }: any = usePage();

    const { guru } = props;

    const [values, setValues] = useState<ValuesType>({
        nama: "",
        mapel: "",
        whatsapp: "",
    });

    console.log(guru);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post("/guru/store", { ...values });
    };

    const handleDelete = (id: number) => {
        router.delete(`/guru/delete/${id}`);
        // console.log(id);
    };

    return (
        <>
            <Navbar />
            <main className="w-screen flex items-center justify-center flex-col ">
                <div className="w-full container p-3">
                    <div className="flex items-center mb-10">
                        <Dialog>
                            <DialogTrigger>
                                <Button>TAMBAH</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <Card className="w-full max-w-md">
                                    <form onSubmit={handleSubmit}>
                                        <CardHeader>
                                            <CardTitle>
                                                Tambah Data Guru
                                            </CardTitle>
                                            <CardDescription>
                                                Isi form berikut untuk
                                                menambahkan data guru baru.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="nama">
                                                    Nama
                                                </Label>
                                                <Input
                                                    name="nama"
                                                    value={values.nama}
                                                    onChange={handleChange}
                                                    id="nama"
                                                    placeholder="Masukkan nama guru"
                                                />
                                                {props.errors.nama && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>
                                                            {props.errors.nama}
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="mapel">
                                                    Mata Pelajaran
                                                </Label>
                                                <Input
                                                    name="mapel"
                                                    value={values.mapel}
                                                    onChange={handleChange}
                                                    id="mapel"
                                                    placeholder="Masukkan mata pelajaran yang diajar"
                                                />
                                                {props.errors.mapel && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>
                                                            {props.errors.mapel}
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="whatsapp">
                                                    Nomor WhatsApp
                                                </Label>
                                                <Input
                                                    name="whatsapp"
                                                    value={values.whatsapp}
                                                    onChange={handleChange}
                                                    id="whatsapp"
                                                    placeholder="Masukkan nomor WhatsApp guru"
                                                />
                                                {props.errors.whatsapp && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>
                                                            {
                                                                props.errors
                                                                    .whatsapp
                                                            }
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                className="w-full"
                                                type="submit"
                                            >
                                                Simpan
                                            </Button>
                                        </CardFooter>
                                        {props.success && (
                                            <Alert>
                                                <RocketIcon className="h-4 w-4" />
                                                <AlertTitle>
                                                    Sukses!!
                                                </AlertTitle>
                                                <AlertDescription>
                                                    Berhasil menambahkan data
                                                    guru
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </form>
                                </Card>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Mata Pelajaran</TableHead>
                                <TableHead>Nomor WhatsApp</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {guru.map((teacher: GuruObject) => (
                                <TableRow key={teacher.id_guru}>
                                    <TableCell>{teacher.nama}</TableCell>
                                    <TableCell>{teacher.mapel}</TableCell>
                                    <TableCell>{teacher.whatsapp}</TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    HAPUS
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you absolutely sure?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete your
                                                        account and remove your
                                                        data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>

                                                    <Button
                                                        onClick={() => {
                                                            handleDelete(
                                                                teacher.id_guru
                                                            );
                                                        }}
                                                    >
                                                        HAPUS
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </>
    );
}
