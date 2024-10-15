import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Skeleton } from "@/Components/ui/skeleton";
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

import Select from "react-select";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Navbar from "@/Components/Navbar";
import { router, usePage } from "@inertiajs/react";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";

export default function CreateTamu() {
    const { props } = usePage();

    const guru_piket = props.guru_piket as object_guru_piket;

    const [loading, setLoading] = useState(false);
    const [nama, setNama] = useState<string>();
    const [instansi, setInstansi] = useState<string>();
    const [whatsapp, setWhatsapp] = useState<string>();
    const [tujuan, setTujuan] = useState<string>();
    const [stafTujuan, setStafTujuan] = useState<string>();
    const [ketTambahan, setKetTambahan] = useState<string>();
    const [valueQr, setValueQr] = useState(
        `${props.site_url}/tamu/${props.id_tamu}`
    );

    const guru: object_guru[] = props.guru as object_guru[];
    const optionGuru = guru.map((e, index) => {
        return {
            value: e.id_guru,
            label: e.nama,
        };
    });

    const { toast } = useToast();

    useEffect(() => {
        if (!guru_piket) {
            toast({
                title: "Guru piket belum diatur",
                description: "Silakan untuk mengatur guru piket",
                variant: "destructive",
            });
        }
    }, []);

    useEffect(() => {
        setValueQr(`${props.site_url}/tamu/${props.id_tamu}`);
    }, [props]);

    const handleSubmit = (e: React.FormEvent) => {
        const values = {
            id_guru_piket: guru_piket.id ? guru_piket.id : null,
            id_guru: stafTujuan,
            nama,
            instansi,
            whatsapp,
            tujuan,
            keterangan: ketTambahan,
        };
        router.post("/tamu/store", values, {
            onStart: () => {
                setLoading(true);
            },

            onSuccess: () => {
                setLoading(false);
            },
        });
    };

    console.log(props);
    
    return (
        <>
            <Toaster />
            <Navbar />
            {props.errors.id_guru_piket && (
                <div className="p-5">
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>{props.errors.id_guru_piket}</AlertTitle>
                    </Alert>
                </div>
            )}
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Buku Tamu</CardTitle>
                    <CardDescription>
                        Silakan isi form buku tamu sekolah kami
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nama">Nama Lengkap</Label>
                                <Input
                                    id="nama"
                                    name="nama"
                                    required
                                    onChange={(e) => {
                                        setNama(e.target.value);
                                    }}
                                />
                                {props.errors.nama && (
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle>
                                            {props.errors.nama}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="instansi">
                                    Instansi [Opsional]
                                </Label>
                                <Input
                                    id="instansi"
                                    name="instansi"
                                    onChange={(e) => {
                                        setInstansi(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="whatsapp">
                                    Nomor Whatsapp [08xxxx]
                                </Label>
                                <Input
                                    id="whatsapp"
                                    name="whatsapp"
                                    type="tel"
                                    required
                                    onChange={(e) => {
                                        setWhatsapp(e.target.value);
                                    }}
                                />
                                {props.errors.whatsapp && (
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle>
                                            {props.errors.whatsapp}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="tujuan">Tujuan Kunjungan</Label>
                                <Input
                                    onChange={(e) => setTujuan(e?.target.value)}
                                    id="tujuan"
                                    placeholder="Tujuan"
                                    className="col-span-3"
                                />
                                {props.errors.tujuan && (
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle>
                                            {props.errors.tujuan}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="tujuan">
                                    Staf Tujuan [Opsional]
                                </Label>
                                <Select
                                    onChange={(e) => setStafTujuan(e?.value)}
                                    id="guru"
                                    placeholder="Guru"
                                    options={optionGuru}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="keterangan">
                                    Keterangan Tambahan
                                </Label>
                                <Textarea
                                    id="keterangan"
                                    name="keterangan"
                                    onChange={(e) => {
                                        setKetTambahan(e.target.value);
                                    }}
                                />
                                {props.errors.keterangan && (
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle>
                                            {props.errors.keterangan}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
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
                                    {props.errors && (
                                        <Alert variant="destructive">
                                            <ExclamationTriangleIcon className="h-4 w-4" />
                                            <AlertTitle>DATA BELUM LENGKAP</AlertTitle>
                                            <AlertDescription>
                                                Lengkapi data yang wajib diisi
                                            </AlertDescription>
                                        </Alert>
                                    )}

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
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </>
    );
}
