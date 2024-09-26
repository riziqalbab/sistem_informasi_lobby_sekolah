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
import { usePage } from "@inertiajs/react";
import Select from "react-select";

function Keluar() {
    const [nis, setNis] = useState<number>();
    const [siswa, setSiswa] = useState<Array<object_nis_data>>([]);
    const { toast } = useToast();
    const { props } = usePage();
    const guru: object_guru[] = props.guru as object_guru[];

    const [values, setValues] = useState();

    useEffect(() => {
        console.log(siswa);
    }, [siswa]);

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
            value: e.nama,
            label: e.nama,
        };
    });

    const handleSubmitDispen = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <Toaster />
            <Navbar />
            <main className="flex w-screen items-center justify-center">
                <div className="container  px-5 flex flex-col items-center ">
                    <form
                        className="flex gap-4 py-4 w-full max-w-2xl"
                        action=""
                        onSubmit={handleSearch}
                    >
                        <Input
                            type="number"
                            placeholder="MASUKAN NIS"
                            onChange={(e) => {
                                setNis(e.target.valueAsNumber);
                            }}
                        />
                        <Button>TAMBAH</Button>
                    </form>

                    <section className="py-4 w-full max-w-2xl">
                        {/* 
                        
                        */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="default" className="w-full">
                                    DISPENSASI
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>DISPENSASI SISWA</DialogTitle>
                                    <DialogDescription>
                                        Isi data berikut
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmitDispen}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="name"
                                                className="text-right"
                                            >
                                                ALASAN
                                            </Label>

                                            <Creatable
                                                id="name"
                                                options={optionsAlasan}
                                                placeholder="Alasan"
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="deskripsi"
                                                className="text-right"
                                            >
                                                Deskripsi
                                            </Label>
                                            <Textarea
                                                id="deskripsi"
                                                placeholder="Deskripsi"
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="deskripsi"
                                                className="text-right"
                                            >
                                                Guru
                                            </Label>
                                            <Select
                                                id="guru"
                                                placeholder="Guru"
                                                options={optionGuru}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="deskripsi"
                                                className="text-right"
                                            >
                                                Mulai
                                            </Label>
                                            <Input
                                                id="guru"
                                                type="datetime-local"
                                                placeholder="Guru"
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="deskripsi"
                                                className="text-right"
                                            >
                                                Sampai{" "}
                                                <span className="text-red-500">
                                                    [Abaikan jika sampai kbm
                                                    selesai]
                                                </span>
                                            </Label>
                                            <Input
                                                id="guru"
                                                type="datetime-local"
                                                placeholder="Guru"
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">KIRIM</Button>
                                    </DialogFooter>
                                </form>
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
                                    {item.kelas}
                                </AlertDescription>
                            </Alert>
                        ))}
                    </section>
                </div>
            </main>
        </>
    );
}

export default Keluar;
