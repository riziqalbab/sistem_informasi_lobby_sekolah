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

const listKelas = [
    { value: "X PPLG 1", label: "X PPLG 1" },
    { value: "X PPLG 2", label: "X PPLG 2" },
    { value: "X AKL 1", label: "X AKL 1" },
    { value: "X AKL 2", label: "X AKL 2" },
    { value: "X AKL 3", label: "X AKL 3" },
    { value: "X AKL 4", label: "X AKL 4" },
    { value: "X DKV 1", label: "X DKV 1" },
    { value: "X DKV 2", label: "X DKV 2" },
    { value: "X PMS 1", label: "X PMS 1" },
    { value: "X PMS 2", label: "X PMS 2" },
    { value: "X PMS 3", label: "X PMS 3" },
    { value: "X MPLB 1", label: "X MPLB 1" },
    { value: "X MPLB 2", label: "X MPLB 2" },
    { value: "XI PPLG 1", label: "XI PPLG 1" },
    { value: "XI PPLG 2", label: "XI PPLG 2" },
    { value: "XI AKL 1", label: "XI AKL 1" },
    { value: "XI AKL 2", label: "XI AKL 2" },
    { value: "XI AKL 3", label: "XI AKL 3" },
    { value: "XI AKL 4", label: "XI AKL 4" },
    { value: "XI DKV 1", label: "XI DKV 1" },
    { value: "XI DKV 2", label: "XI DKV 2" },
    { value: "XI PMS 1", label: "XI PMS 1" },
    { value: "XI PMS 2", label: "XI PMS 2" },
    { value: "XI PMS 3", label: "XI PMS 3" },
    { value: "XI MPLB 1", label: "XI MPLB 1" },
    { value: "XI MPLB 2", label: "XI MPLB 2" },
    { value: "XII PPLG 1", label: "XII PPLG 1" },
    { value: "XII PPLG 2", label: "XII PPLG 2" },
    { value: "XII AKL 1", label: "XII AKL 1" },
    { value: "XII AKL 2", label: "XII AKL 2" },
    { value: "XII AKL 3", label: "XII AKL 3" },
    { value: "XII AKL 4", label: "XII AKL 4" },
    { value: "XII DKV 1", label: "XII DKV 1" },
    { value: "XII DKV 2", label: "XII DKV 2" },
    { value: "XII PMS 1", label: "XII PMS 1" },
    { value: "XII PMS 2", label: "XII PMS 2" },
    { value: "XII PMS 3", label: "XII PMS 3" },
    { value: "XII MPLB 1", label: "XII MPLB 1" },
    { value: "XII MPLB 2", label: "XII MPLB 2" },
];

interface ValuesType {
    nis: string;
    nama: string;
}

function Siswa() {
    const { props }: any = usePage();
    console.log(usePage());

    const [values, setValues] = useState<ValuesType>({
        nis: "",
        nama: "",
    });

    // console.log(props);

    const [kelas, setKelas] = useState<string>();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.post("/siswa/store", {
            ...values,
            kelas: kelas,
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
        <>
            <Navbar />
            <main className="w-screen flex items-center justify-center">
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
                                    options={listKelas}
                                    onChange={(e) => {
                                        setKelas(e?.value);
                                    }}
                                />
                                {props.errors.kelas && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {props.errors.kelas}
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
        </>
    );
}

export default Siswa;
