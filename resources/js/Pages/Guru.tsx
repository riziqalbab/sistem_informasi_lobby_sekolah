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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import { Button } from "@/Components/ui/button";
import Navbar from "@/Components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Guru() {
    const { props }: any = usePage();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { guru } = props;

    const [values, setValues] = useState<guru>({
        nama: "",
        mapel: "",
        whatsapp: "",
    });

    const [namaEdit, setNamaEdit] = useState<string>();
    const [mapelEdit, setMapelEdit] = useState<string>();
    const [whatsappEdit, setWhatsappEdit] = useState<string>();
    const [idGuruEdit, setIdGuruEdit] = useState(0);

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
        router.post("/master/guru/store", { ...values });
    };

    const handleSubmitEdit = () => {
    
        const values = {
            id_guru: idGuruEdit,
            nama_edit: namaEdit,
            mapel_edit: mapelEdit,
            whatsapp_edit: whatsappEdit,
        };

        router.post("/master/guru/edit", values, {
            onSuccess: ()=>{
                setIsDialogOpen(!isDialogOpen)
            }
        });
    };



    const handleClickEdit = (item: object_guru) => {
        setIdGuruEdit(item.id_guru)
        setWhatsappEdit(item.whatsapp);
        setNamaEdit(item.nama);
        setMapelEdit(item.mapel);
    };

    return (
        <>
            <Navbar />
            <div className="w-screen h-screen flex items-start justify-center">
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
                                                                {
                                                                    props.errors
                                                                        .nama
                                                                }
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
                                                                {
                                                                    props.errors
                                                                        .mapel
                                                                }
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
                                                        Berhasil menambahkan
                                                        data guru
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
                                {guru.map((teacher: object_guru) => (

                                    <TableRow key={teacher.id_guru}>
                                        <TableCell>{teacher.nama}</TableCell>
                                        <TableCell>{teacher.mapel}</TableCell>
                                        <TableCell>
                                            {teacher.whatsapp}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog
                                                open={isDialogOpen}
                                                onOpenChange={setIsDialogOpen}
                                            >
                                                <DialogTrigger>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            handleClickEdit(
                                                                teacher
                                                            );
                                                        }}
                                                    >
                                                        EDIT
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <Card className="w-full max-w-md">
                                                        <form>
                                                            <CardHeader>
                                                                <CardTitle>
                                                                    Edit Guru
                                                                </CardTitle>
                                                            </CardHeader>
                                                            <CardContent className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="nama">
                                                                        Nama
                                                                    </Label>
                                                                    <Input
                                                                        name="nama"
                                                                        value={
                                                                            namaEdit
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setNamaEdit(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        }}
                                                                        id="nama"
                                                                        placeholder="Masukkan nama guru"
                                                                    />
                                                                    {props
                                                                        .errors
                                                                        .nama_edit && (
                                                                        <Alert variant="destructive">
                                                                            <AlertDescription>
                                                                                {
                                                                                    props
                                                                                        .errors
                                                                                        .nama_edit
                                                                                }
                                                                            </AlertDescription>
                                                                        </Alert>
                                                                    )}
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="mapel">
                                                                        Mata
                                                                        Pelajaran
                                                                    </Label>
                                                                    <Input
                                                                        name="mapel"
                                                                        value={
                                                                            mapelEdit
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setMapelEdit(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        }}
                                                                        id="mapel"
                                                                        placeholder="Masukkan mata pelajaran yang diajar"
                                                                    />
                                                                    {props
                                                                        .errors
                                                                        .mapel_edit && (
                                                                        <Alert variant="destructive">
                                                                            <AlertDescription>
                                                                                {
                                                                                    props
                                                                                        .errors
                                                                                        .mapel
                                                                                }
                                                                            </AlertDescription>
                                                                        </Alert>
                                                                    )}
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <Label htmlFor="whatsapp">
                                                                        Nomor
                                                                        WhatsApp
                                                                    </Label>
                                                                    <Input
                                                                        name="whatsapp"
                                                                        value={
                                                                            whatsappEdit
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setWhatsappEdit(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        }}
                                                                        id="whatsapp"
                                                                        placeholder="Masukkan nomor WhatsApp guru"
                                                                    />
                                                                    {props
                                                                        .errors
                                                                        .whatsapp_edit && (
                                                                        <Alert variant="destructive">
                                                                            <AlertDescription>
                                                                                {
                                                                                    props
                                                                                        .errors
                                                                                        .whatsapp_edit
                                                                                }
                                                                            </AlertDescription>
                                                                        </Alert>
                                                                    )}
                                                                </div>
                                                            </CardContent>
                                                            <CardFooter>
                                                                <Button
                                                                    className="w-full"
                                                                    type="button"
                                                                    onClick={() => {
                                                                        handleSubmitEdit();
                                                                        
                                                                        setIdGuruEdit(teacher.id_guru)
                                                                    }}
                                                                >
                                                                    Simpan
                                                                </Button>
                                                            </CardFooter>
                                                        </form>
                                                    </Card>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </>
    );
}
