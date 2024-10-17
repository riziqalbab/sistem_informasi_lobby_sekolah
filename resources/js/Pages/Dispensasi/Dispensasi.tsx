import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Clock, Phone } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useState } from "react";
// Tipe data untuk informasi dispensasi
interface DispensasiInfo {
    guruPiket: {
        id: number
        guru:{
            id: number
            nama: string
        }
    }
    guruPengajar: string;
    nomorWhatsapp: string;
    waktuDispen: string;
    alasan: string;
    deskripsi: string;
    siswa: {
        nama: string;
        kelas: string;
        nis: number;
    }[];
}


// Data contoh, Anda bisa menggantinya dengan data yang sebenarnya dari API atau database

export default function DetailDispensasi() {
    const { props } = usePage();
    const [alasan, setAlasan] = useState("")
    const dispensasiInfo: DispensasiInfo = props.dispensasi as DispensasiInfo;
    
    console.log(props);

    const handleAccept = ()=>{
        router.post(`/keluar/confirm`, {
            status: 1,
            // @ts-ignore
            id_guru_piket: dispensasiInfo.guruPiket.id,
            // @ts-ignore
            id_dispen: props.dispensasi.id_dispen 
        })
    }
    const handleRejected = ()=>{
        router.post(`/keluar/confirm`, {
            status: 0,
            // @ts-ignore
            id_dispen: props.dispensasi.id_dispen,
            alasan: alasan
        })
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Detail Informasi Dispensasi
            </h1>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Umum</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* @ts-ignore */}
                    <Badge variant={props.dispensasi.status == "accepted" ? "default": props.dispensasi.status == "pending" ? "outline" : "destructive"} className={props.dispensasi.status == "accepted" ? "bg-green-600" : ""}>{props.dispensasi.status}</Badge>
                        <dl className="grid grid-cols-2 gap-2">
                            <dt className="font-semibold">Guru Piket:</dt>
                            <dd>{dispensasiInfo.guruPiket.guru.nama}</dd>
                            <dt className="font-semibold">Guru Pengajar:</dt>
                            <dd>{dispensasiInfo.guruPengajar}</dd>
                            <dt className="font-semibold">Nomor WhatsApp:</dt>
                            <dd className="flex items-center">
                                <Phone className="mr-1 h-4 w-4" />
                                <a
                                    href={`https://wa.me/${dispensasiInfo.nomorWhatsapp.replace(
                                        /\+/g,
                                        ""
                                    )}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    {dispensasiInfo.nomorWhatsapp}
                                </a>
                            </dd>
                            <dt className="font-semibold">Waktu Dispensasi:</dt>
                            <dd className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {dispensasiInfo.waktuDispen}
                            </dd>
                            {/* @ts-ignore */}
                            {/* (props.dispensasi.status !== "pending" ? "hidden" : "flex") */}
                            <div className={"w-full items-center gap-3 "}>
                                <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-800">
                                    IZINKAN
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive" >
                                            TOLAK
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                TULISKAN ALASAN
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="">
                                                <Label
                                                    htmlFor="alasan"
                                                    className="text-right"
                                                >
                                                    Alasan
                                                </Label>
                                                
                                                <Textarea
                                                    id="Alasan"
                                                    onChange={e=>{
                                                        setAlasan(e.target.value)
                                                    }}
                                                    className="col-span-3"
                                                />
                                            </div>
                                           
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" variant="destructive" onClick={handleRejected}>
                                                TOLAK
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Alasan dan Deskripsi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge className="mb-2">{dispensasiInfo.alasan}</Badge>
                        <CardDescription>
                            {dispensasiInfo.deskripsi}
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Daftar Siswa</CardTitle>
                        <CardDescription>
                            Siswa yang mengikuti dispensasi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                            <div className="space-y-4">
                                {dispensasiInfo.siswa.map((siswa, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-4"
                                    >
                                        <div>
                                            <p className="text-sm font-medium">
                                                {siswa.nama}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {siswa.kelas}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
