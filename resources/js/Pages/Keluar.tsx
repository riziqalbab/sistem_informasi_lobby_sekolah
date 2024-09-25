import Navbar from "@/Components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

interface object_nis_data {
    kelas: string;
    nama: string;
    nis: number;
}

function Keluar() {
    const [nis, setNis] = useState<number>();
    const [siswa, setSiswa] = useState<Array<object_nis_data>>([]);

    const { toast } = useToast();

    useEffect(() => {
        console.log(siswa);
    }, [siswa]);

    const handleHapusSiswa = (nis: number) => {
        const indexHapus = siswa.findIndex((item, i) => {
            return item.nis == nis;
        });

        const siswaHapus = siswa.splice(indexHapus, indexHapus);

        setSiswa([
            ...siswa.slice(0, indexHapus),
            ...siswa.slice(indexHapus + 1),
        ]);
    };

    const handleSearch = async () => {
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

    return (
        <>
            <Toaster />
            <Navbar />
            <main className="flex w-screen items-center justify-center">
                <div className="container  px-5 flex flex-col items-center ">
                    <section className="flex gap-4 py-4 w-full max-w-2xl">
                        <Input
                            type="number"
                            placeholder="MASUKAN NIS"
                            onChange={(e) => {
                                setNis(e.target.valueAsNumber);
                            }}
                        />
                        <Button onClick={handleSearch}>TAMBAH</Button>
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
