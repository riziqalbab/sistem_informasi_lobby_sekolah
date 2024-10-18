import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import Select from "react-select";
import { router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { toast, useToast } from "@/hooks/use-toast";
import { Toaster } from "@/Components/ui/toaster";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import QRCode from "react-qr-code";

function Masuk() {
    const { props } = usePage();
    const guru_piket = props.guru_piket as object_guru_piket;
    const [nis, setNis] = useState<string>();
    const [guruChoice, setGuruChoice] = useState<string>();
    const [siswa, setSiswa] = useState<Array<object_nis_data>>([]);
    const [loading, setLoading] = useState(false);

    const [valueQr, setValueQr] = useState(
        `${props.site_url}/terlambat/${props.id_masuk}`
    );

    const updateAlasan = useCallback((index: number, alasan: string) => {
        setSiswa((prev) =>
            prev.map((data, i) => (i === index ? { ...data, alasan } : data))
        );
    }, []);

    useEffect(() => {
        setValueQr(`${props.site_url}/terlambat/${props.id_masuk}`);
    }, [props]);

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

    // console.log(siswa);

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
            id_guru_piket: guru_piket.id,
            id_guru: guruChoice,
            siswa,
        };

        router.post(
            "/masuk/store",
            // @ts-ignore
            { ...values },
            {
                onStart: () => {
                    setLoading(true);
                },

                onSuccess: () => {
                    setLoading(false);
                },
            }
        );
    };

    console.log(props);

    return (
        <>
            <Toaster />
            <Navbar />
            <main className="w-screen flex items-center justify-center">
                <Card className="w-full max-w-2xl mx-auto">
                    {!props.guru_piket && (
                        <Alert variant="destructive" className="">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertDescription>
                                GURU PIKET BELUM DIATUR
                            </AlertDescription>
                        </Alert>
                    )}
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
                                            // @ts-ignore
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
                                                <CardDescription>{`${data.nis} | ${data.kelas.nama}`}</CardDescription>
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button onClick={handleSubmit}>KIRIM</Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-center">
                                        SIMPAN KODE QR BERIKUT
                                    </DialogTitle>
                                    <DialogDescription className="text-center"></DialogDescription>
                                    <br />
                                </DialogHeader>
                                {loading ? (
                                    <>
                                        <div className="space-y-2">
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    </>
                                ) : (
                                    <QRCode
                                        size={256}
                                        style={{
                                            height: "auto",
                                            maxWidth: "100%",
                                            width: "100%",
                                        }}
                                        value={valueQr}
                                        viewBox={`0 0 256 256`}
                                    />
                                )}
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            setGuruChoice("");
                                            setSiswa([]);
                                        }}
                                    >
                                        SELESAI
                                    </Button>
                                </DialogTrigger>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
}

export default Masuk;
