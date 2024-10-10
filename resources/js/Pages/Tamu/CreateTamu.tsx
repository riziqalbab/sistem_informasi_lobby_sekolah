import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
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
import { usePage } from "@inertiajs/react";

export default function CreateTamu() {
    const { props } = usePage();

    const [nama, setNama] = useState<string>();
    const [instansi, setInstansi] = useState<string>();
    const [whatsapp, setWhatsapp] = useState<string>();
    const [tujuan, setTujuan] = useState<string>();
    const [stafTujuan, setStafTujuan] = useState<string>();
    const [ketTambahan, setKetTambahan] = useState<string>();

    const guru: object_guru[] = props.guru as object_guru[];
    const optionGuru = guru.map((e, index) => {
        return {
            value: e.id_guru,
            label: e.nama,
        };
    });

    console.log(optionGuru);

    const handleSubmit = (e: React.FormEvent) => {
        alert("Terima kasih telah mengisi buku tamu!");
    };

    return (
        <>
            <Navbar />
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
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="tujuan">Tujuan Kunjungan</Label>
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
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Kirim
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
