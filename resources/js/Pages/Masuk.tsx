import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Select from "react-select";
import { usePage } from "@inertiajs/react";

function Masuk() {
    const { props } = usePage();

    const guru: object_guru[] = props.guru as object_guru[];


console.log();


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
                        <CardTitle>Form Izin Siswa Terlambat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex space-x-2">
                                <div className="flex-grow">
                                    <Label htmlFor="nis">NIS SISWA</Label>
                                    <Input
                                        id="nis"
                                        placeholder="Masukkan NIS"
                                        />
                                </div>
                                <Button className="mt-auto">
                                    Tambah Siswa
                                </Button>
                            </div>
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

                            {/*  */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <strong></strong> (NIS:)
                                        </div>
                                        <Button variant="destructive" size="sm">
                                            Hapus
                                        </Button>
                                    </div>
                                    <Textarea placeholder="Alasan terlambat" />
                                </CardContent>
                            </Card>
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
