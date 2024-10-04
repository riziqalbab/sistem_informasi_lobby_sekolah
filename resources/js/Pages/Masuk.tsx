import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Select from "react-select";
import { usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

function Masuk() {
    const { props } = usePage();
    const [nis, setNis] = useState<number>();
    const [siswa, setSiswa] = useState<Array<object_siswa_masuk>>([]);

    const updateAlasan = useCallback((index: number, alasan: string) => {
        setSiswa((prev) =>
            prev.map((data, i) => (i === index ? { ...data, alasan } : data))
        );
    }, []);

    useEffect(() => {
        console.log(siswa);
    }, [siswa]);

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
    const guru: object_guru[] = props.guru as object_guru[];

    const optionGuru = guru.map((e, index) => {
        return {
            value: e.id_guru,
            label: e.nama,
        };
    });

    return (
        <>
            <Navbar />
            <main className="w-screen flex items-center justify-center">
                <Card className="w-full max-w-2xl mx-auto">
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
                                            setNis(e.target.valueAsNumber);
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
                                        options={optionGuru}
                                        id="guru"
                                        placeholder="Masukkan NIS"
                                    />
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
                        <Button>Kirim Izin</Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
}

export default Masuk;
