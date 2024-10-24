import Navbar from "@/Components/Navbar";
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
import { Button } from "@/Components/ui/button";
import Select from "react-select";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import AppLayout from "@/Layouts/AppLayout";




function Siswa() {
    const { props }: any = usePage();
    const [kelas, setKelas] = useState<string>();

    console.log(props);
    
    const listKelas: Array<object_kelas> = props.kelas
    
    const valueKelas = listKelas.map(item=>{
        return {
            value: item.id_kelas,
            label: item.nama
        }
    })
    const [values, setValues] = useState({
        nis: "",
        nama: "",
    });
    
    console.log(kelas);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.post("/master/siswa/store", {
            ...values,
            id_kelas: kelas,
        });
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    return (
        <AppLayout>
            <main className=" flex items-center justify-center">
                <Card className="w-full max-w-md mx-auto">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Tambah Data Siswa</CardTitle>
                            <CardDescription>
                                Isi form berikut untuk menambahkan data siswa
                                baru.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="nama"
                                    name="nama"
                                    onChange={handleChange}
                                    value={values.nama}
                                    placeholder="Masukkan nama siswa"
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
                                <Label htmlFor="nis">NIS</Label>
                                <Input
                                    id="nis"
                                    name="nis"
                                    onChange={handleChange}
                                    value={values.nis}
                                    type="number"
                                    placeholder="Masukkan NIS"
                                />
                                {props.errors.nis && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {props.errors.nis}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="class">Kelas</Label>

                                <Select
                                    options={valueKelas}
                                    onChange={(e) => {
                                        setKelas(e?.value);
                                    }}
                                />
                                {props.errors.id_kelas && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {props.errors.id_kelas}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-end gap-4 flex-col">
                            <Button type="submit">Simpan</Button>
                            {props.success && (
                                <Alert>
                                    <RocketIcon className="h-4 w-4" />
                                    <AlertTitle>Sukses!!</AlertTitle>
                                    <AlertDescription>
                                        Berhasil menambahkan data siswa
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </AppLayout>
    );
}

export default Siswa;
