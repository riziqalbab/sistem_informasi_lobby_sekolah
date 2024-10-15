"use client";

import { useState } from "react";
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
import { Badge } from "@/Components/ui/badge";
import { Calendar, Clock, Building, Phone, MessageSquare } from "lucide-react";
import { usePage } from "@inertiajs/react";

const bukuTamuData = {
    id: "BT001",
    nama: "Budi Santoso",
    instansi: "Dinas Pendidikan Kota",
    noTelp: "081234567890",
    tujuan: "Rapat",
    keterangan: "Rapat koordinasi program pendidikan",
    tanggalKunjungan: "2023-06-15",
    waktuKunjungan: "10:00",
    status: "Aktif",
};

export default function DetailTamu() {
    const { props } = usePage();

    const tamu: tamu = props.tamu as tamu;
    const [bukuTamu, setBukuTamu] = useState(bukuTamuData);
    const [pesan, setPesan] = useState("");

    const handleStatusChange = () => {
        setBukuTamu((prevState) => ({
            ...prevState,
            status: prevState.status === "Aktif" ? "Selesai" : "Aktif",
        }));
    };

    const handlePesanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPesan(e.target.value);
    };

    const handleKirimPesan = () => {
        console.log("Pesan terkirim:", pesan);
        alert("Pesan telah terkirim ke tamu!");
        setPesan("");
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Detail Buku Tamu</CardTitle>
                    <CardDescription>
                        Informasi lengkap kunjungan tamu
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">
                            {tamu.nama}
                        </h3>
                        <Badge
                            variant={
                                tamu.isActive
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            Aktif
                        </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{tamu.instansi}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{tamu.whatsapp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(tamu.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(tamu.created_at).toLocaleString().split(",")[1]}</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold">Tujuan Kunjungan</h4>
                        <p>{tamu.tujuan}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Keterangan</h4>
                        <p>{tamu.keterangan}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleStatusChange}>
                        {bukuTamu.status === "Aktif"
                            ? "Tandai Selesai"
                            : "Aktifkan Kembali"}
                    </Button>
                </CardFooter>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Kirim Pesan ke Tamu</CardTitle>
                    <CardDescription>
                        Sampaikan informasi tambahan kepada tamu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="pesan">Pesan</Label>
                        <Textarea
                            id="pesan"
                            placeholder="Tulis pesan Anda di sini..."
                            value={pesan}
                            onChange={handlePesanChange}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleKirimPesan} disabled={!pesan.trim()}>
                        <MessageSquare className="mr-2 h-4 w-4" /> Kirim Pesan
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
