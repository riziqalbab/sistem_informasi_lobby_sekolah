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
import { usePage } from "@inertiajs/react";

// Tipe data untuk informasi dispensasi
interface DispensasiInfo {
    guruPiket: string;
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

    const dispensasiInfo: DispensasiInfo = props.dispensasi as DispensasiInfo;

    console.log(props);

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
                        <dl className="grid grid-cols-2 gap-2">
                            <dt className="font-semibold">Guru Piket:</dt>
                            <dd>{dispensasiInfo.guruPiket}</dd>
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
