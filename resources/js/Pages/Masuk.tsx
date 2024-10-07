import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Select from "react-select";
import { router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/Components/ui/toaster";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

function Masuk() {
    const { props } = usePage();
    const guru_piket = props.guru_piket as object_guru_piket;
    const [nis, setNis] = useState<string>();
    const [guruChoice, setGuruChoice] = useState<string>();
    const [siswa, setSiswa] = useState<Array<any>>([]);

    const updateAlasan = useCallback((index: number, alasan: string) => {
        setSiswa((prev) =>
            prev.map((data, i) => (i === index ? { ...data, alasan } : data))
        );
    }, []);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`/siswa/${nis}`);
            const data = await res.json();
            if (data.data.nis) {
                setSiswa([...siswa, data.data]);
            }
        } catch (e) {
            toast({
                variant: "destructive",
                title: "NIS TIDAK DITEMUKAN",
                description: `Nis ${nis} tidak ditemukan`,
            });
        }
    };

    const handleHapusSiswa = (nisIndex: number) => {
        const indexHapus = siswa.findIndex((item) => item.nis == nisIndex);

        setSiswa([
            ...siswa.slice(0, indexHapus),
            ...siswa.slice(indexHapus + 1),
        ]);
    };

    const guru: object_guru[] = props.guru as object_guru[];

    const optionGuru = guru.map((e, index) => {
        return {
            value: e.id_guru,
            label: e.nama,
        };
    });

    const handleSubmit = () => {
        const values = {
            id_guru_piket: guru_piket.id_guru,
            id_guru: guruChoice,
            siswa,
        };

        router.post("/masuk/store", { ...values });
    };

    return (
        <>
            <Toaster />
            <Navbar />
            <main className="w-screen flex items-center justify-center">
                <Card className="w-full max-w-2xl mx-auto">
                    {props.errors.id_guru_piket && (
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertDescription>
                                {props.errors.id_guru_piket}
                            </AlertDescription>
                        </Alert>
                    )}
                    <CardHeader>
                        <CardTitle>IZIN MASUK | TERLAMBAT</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <form
                                className="flex space-x-2"
                                onSubmit={handleSearch}
                            >
                                <div className="flex-grow">
                                    <Label htmlFor="nis">NIS SISWA</Label>
                                    <Input
                                        id="nis"
                                        type="number"
                                        onChange={(e) => {
                                            setNis(e.target.value);
                                        }}
                                        placeholder="Masukkan NIS"
                                    />
                                </div>
                                <Button className="mt-auto">
                                    Tambah Siswa
                                </Button>
                            </form>
                            <div className="flex space-x-2">
                                <div className="flex-grow">
                                    <Label htmlFor="guru">GURU PENGAJAR</Label>
                                    <Select
                                        onChange={(e) => {
                                            setGuruChoice(e?.value);
                                        }}
                                        options={optionGuru}
                                        id="guru"
                                        placeholder="Masukkan Guru"
                                    />
                                    {props.errors.id_guru && (
                                        <Alert
                                            variant="destructive"
                                            className="mt-2"
                                        >
                                            <ExclamationTriangleIcon className="h-4 w-4" />
                                            <AlertDescription>
                                                {props.errors.id_guru}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </div>

                            {siswa.map((data, index) => (
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <CardTitle className="text-base">
                                                    {data.nama}
                                                </CardTitle>
                                                <CardDescription>{`${data.nis} | ${data.kelas}`}</CardDescription>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    handleHapusSiswa(data.nis);
                                                }}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                        <Textarea
                                            placeholder="Alasan terlambat"
                                            onChange={(e) => {
                                                updateAlasan(
                                                    index,
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSubmit}>Kirim Izin</Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
}

export default Masuk;
