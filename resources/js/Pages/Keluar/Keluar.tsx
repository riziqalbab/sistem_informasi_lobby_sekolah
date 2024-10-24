import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Navbar from "@/Components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useEffect, useState } from "react";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import Creatable from "react-select/creatable";
import { Textarea } from "@/Components/ui/textarea";
import { router, usePage } from "@inertiajs/react";
import Select from "react-select";

import QRCode from "react-qr-code";
import AppLayout from "@/Layouts/AppLayout";

const optionsAlasan: Array<object_option_alasan> = [
    { value: "organisasi", label: "Organisasi" },
    { value: "ekstra", label: "Ekstra Kurikuler" },
    { value: "sekolah", label: "Tugas Sekolah" },
    { value: "eksternal", label: "Tugas eksternal" },
];

function Keluar() {
    const [nis, setNis] = useState<number>();
    const [siswa, setSiswa] = useState<Array<object_nis_data>>([]);

    const [alasan, setAlasan] = useState<string>();
    const [deskripsi, setDeskripsi] = useState<string>();
    const [guruChoice, setGuruChoice] = useState<number | undefined>(undefined);
    const [whatsapp, setWhatsapp] = useState<string>();
    const [mulai, setMulai] = useState<string>();
    const [sampai, setSampai] = useState<string>();
    const [success, setSuccess] = useState();
    const { toast } = useToast();
    const [disableButton, setDisableButton] = useState(true);
    const [successDispen, setSuccessDispen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // const [valueQr, setValueQr] = useState(null);
    const { props } = usePage();
    const valueQr = `${props.site_url}/keluar/${props.id_dispensasi}`;

    const guru_piket = props.guru_piket as object_guru_piket;

    const guru: object_guru[] = props.guru as object_guru[];
    const handleHapusSiswa = (nis: number) => {
        const indexHapus = siswa.findIndex((item, i) => {
            return item.nis == nis;
        });
        setSiswa([
            ...siswa.slice(0, indexHapus),
            ...siswa.slice(indexHapus + 1),
        ]);
    };

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

    const optionGuru = guru.map((e, index) => {
        return {
            value: e.id_guru,
            label: e.nama,
        };
    });
    const handleSubmitDispen = (e: React.FormEvent<HTMLFormElement>) => {
        // @ts-ignore
        setSuccess(props.success);
        e.preventDefault();

        const values = {
            siswa,
            id_guru_piket: guru_piket.id,
            alasan,
            deskripsi,
            id_guru: guruChoice,
            whatsapp,
            waktu_awal: mulai,
            waktu_akhir: sampai,
        };

        router.post(
            "/keluar/store",
            // @ts-ignore
            { ...values },
            {
                onSuccess: () => {
                    setSuccessDispen(true);
                    setDisableButton(false);
                    toast({
                        title: "Dispensasi sukes",
                        description: "Sukses",
                    });
                },
            }
        );
    };

    useEffect(() => {
        console.log(isDialogOpen);
    }, [isDialogOpen]);

    return (
        <AppLayout>
            <Toaster />

            <main className="flex  items-center justify-center">
                <div className="container  px-5 flex flex-col items-center ">
                    <form
                        className="flex gap-4 py-4 w-full max-w-2xl"
                        onSubmit={handleSearch}
                    >
                        <Input
                            type="number"
                            placeholder="MASUKAN NIS"
                            onChange={(e) => {
                                setNis(e.target.valueAsNumber);
                            }}
                        />
                        <div>
                            <Button>TAMBAH</Button>
                        </div>
                    </form>

                    <section className="py-4 w-full max-w-2xl">
                        {!props.guru_piket && (
                            <Alert variant="destructive" className="mt-2 mb-3">
                                <ExclamationTriangleIcon className="h-4 w-4" />
                                <AlertDescription>
                                    GURU PIKET BELUM DIATUR
                                </AlertDescription>
                            </Alert>
                        )}
                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                        >
                            <DialogTrigger>
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() => {
                                        if (siswa.length < 1) {
                                            setIsDialogOpen(false);
                                            toast({
                                                title: "Dispensasi Gagal",
                                                description:
                                                    "Minimal dispensasi memiliki 1 siswa",
                                                variant: "destructive",
                                            });
                                        }
                                    }}
                                >
                                    DISPENSASI
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                {successDispen ? (
                                    <div className="text-center">
                                        <DialogTitle>DISPENSASI</DialogTitle>
                                        <DialogDescription>
                                            SIMPAN KODE QR BERIKUT UNTUK
                                            VERIFIKASI
                                        </DialogDescription>
                                        <br />
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
                                        <Button
                                            className="w-full mt-10"
                                            onClick={() => {
                                                location.reload();
                                            }}
                                        >
                                            SELESAI
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        {siswa.length < 1 ? (
                                            <Alert variant="destructive">
                                                <ExclamationTriangleIcon className="h-4 w-4" />
                                                <AlertTitle>DISPENSASI MINIMAL DILAKUKAN OLEH SATU SISWA</AlertTitle>
                                                <AlertDescription>
                                                    Ulangi dan masukan nis siswa
                                                </AlertDescription>
                                            </Alert>
                                        ) : (
                                            <>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        DISPENSASI SISWA
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Isi data berikut
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <form
                                                    onSubmit={
                                                        handleSubmitDispen
                                                    }
                                                >
                                                    <div className="grid gap-4 py-4">
                                                        <div className="">
                                                            <Label
                                                                htmlFor="name"
                                                                className="text-right"
                                                            >
                                                                ALASAN
                                                            </Label>

                                                            <Creatable
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setAlasan(
                                                                        e?.value
                                                                    );
                                                                }}
                                                                id="name"
                                                                options={
                                                                    optionsAlasan
                                                                }
                                                                placeholder="Alasan"
                                                                className="col-span-3"
                                                            />
                                                            {props.errors
                                                                .alasan && (
                                                                <Alert
                                                                    variant="destructive"
                                                                    className="mt-2"
                                                                >
                                                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                                                    <AlertTitle>
                                                                        {
                                                                            props
                                                                                .errors
                                                                                .alasan
                                                                        }
                                                                    </AlertTitle>
                                                                </Alert>
                                                            )}
                                                        </div>
                                                        <div className="">
                                                            <Label
                                                                htmlFor="deskripsi"
                                                                className="text-right"
                                                            >
                                                                Deskripsi
                                                            </Label>
                                                            <Textarea
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setDeskripsi(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                id="deskripsi"
                                                                placeholder="Deskripsi"
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="">
                                                            <Label
                                                                htmlFor="deskripsi"
                                                                className="text-right"
                                                            >
                                                                Guru
                                                            </Label>
                                                            <Select
                                                                id="guru"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setGuruChoice(
                                                                        e?.value
                                                                    );
                                                                }}
                                                                placeholder="Guru"
                                                                options={
                                                                    optionGuru
                                                                }
                                                                className="col-span-3"
                                                            />
                                                            {props.errors
                                                                .guru && (
                                                                <Alert
                                                                    variant="destructive"
                                                                    className="mt-2"
                                                                >
                                                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                                                    <AlertTitle>
                                                                        {
                                                                            props
                                                                                .errors
                                                                                .guru
                                                                        }
                                                                    </AlertTitle>
                                                                </Alert>
                                                            )}
                                                        </div>
                                                        <div className="">
                                                            <Label
                                                                htmlFor="deskripsi"
                                                                className="text-right"
                                                            >
                                                                Whatsapp
                                                                [082+++]
                                                            </Label>
                                                            <Input
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setWhatsapp(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                id="whatsapp"
                                                                placeholder="Whatsapp"
                                                                className="col-span-3"
                                                            />
                                                            {props.errors
                                                                .whatsapp && (
                                                                <Alert
                                                                    variant="destructive"
                                                                    className="mt-2"
                                                                >
                                                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                                                    <AlertTitle>
                                                                        {
                                                                            props
                                                                                .errors
                                                                                .whatsapp
                                                                        }
                                                                    </AlertTitle>
                                                                </Alert>
                                                            )}
                                                        </div>
                                                        <div className="">
                                                            <Label
                                                                htmlFor="deskripsi"
                                                                className="text-right"
                                                            >
                                                                Mulai
                                                            </Label>
                                                            <Input
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setMulai(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                id="guru"
                                                                type="datetime-local"
                                                                placeholder="Guru"
                                                                className="col-span-3"
                                                            />
                                                            {props.errors
                                                                .waktu_awal && (
                                                                <Alert
                                                                    variant="destructive"
                                                                    className="mt-2"
                                                                >
                                                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                                                    <AlertTitle>
                                                                        {
                                                                            props
                                                                                .errors
                                                                                .waktu_awal
                                                                        }
                                                                    </AlertTitle>
                                                                </Alert>
                                                            )}
                                                        </div>
                                                        <div className="">
                                                            <Label
                                                                htmlFor="deskripsi"
                                                                className="text-right"
                                                            >
                                                                Sampai{" "}
                                                                <span className="text-red-500">
                                                                    [Abaikan
                                                                    jika sampai
                                                                    kbm selesai]
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setSampai(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                id="guru"
                                                                type="datetime-local"
                                                                placeholder="Guru"
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        {disableButton ? (
                                                            <Button type="submit">
                                                                KIRIM
                                                            </Button>
                                                        ) : (
                                                            <Button type="submit">
                                                                KIRIM
                                                            </Button>
                                                        )}
                                                    </DialogFooter>
                                                </form>
                                            </>
                                        )}
                                    </>
                                )}
                            </DialogContent>
                        </Dialog>
                        {/* dsf

                        //
                        /
                        //
                         */}
                    </section>
                    <section className="w-full max-w-2xl">
                        {siswa.map((item, index) => (
                            <Alert className="my-3" key={index}>
                                <div className="float-right flex items-center justify-center ">
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            handleHapusSiswa(item.nis);
                                        }}
                                    >
                                        HAPUS
                                    </Button>
                                </div>
                                <AlertTitle>{item.nama}</AlertTitle>
                                <AlertDescription>
                                    {item.kelas.nama}
                                </AlertDescription>
                            </Alert>
                        ))}
                    </section>
                </div>
            </main>
        </AppLayout>
    );
}

export default Keluar;
