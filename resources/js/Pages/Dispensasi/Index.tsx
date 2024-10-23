import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Eye, Upload } from "lucide-react";
import { Badge } from "@/Components/ui/badge"
import Navbar from "@/Components/Navbar";
import { Link, usePage } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import * as XLSX from "xlsx";
import ExcelExport from "@/utils/exportExcel";

export default function Index() {
    const { props } = usePage();
    const [dateDispen, setDateDispen] = useState<string>(props.date as string);

    // @ts-ignore
    const dataDispen: Array<siswa_dispen> = props.dispen  

    const site_url: string = props.site_url as string;
    const dispen = dataDispen.map((item) => {
        return {
            id_dispen: item.id_dispen,
            nis: item.nis,
            nama: item.nama,
            dispen: item.dispen,
            kelas: item.kelas.nama,
            alasan: item.alasan,
            tanggal: new Date(item.tanggal).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
        };
    });

    

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <h1 className="font-bold text-center text-lg">
                DAFTAR SISWA MELAKUKAN DISPENSASI
            </h1>
            <main className=" flex pt-5 items-center justify-center ">
                <div className="container ">
                    <form action="" method="get" className="flex gap-2">
                        <Input
                            type="date"
                            name="date"
                            className="w-64"
                            value={dateDispen}
                            onChange={(e) => {
                                setDateDispen(e.target.value);
                            }}
                        />
                        <Button>KIRIM</Button>
                    </form>
                    <Button onClick={()=>{
                        ExcelExport(dispen.map(item=>{
                            return{
                                id_dispen: item.id_dispen,
                                nis: item.nis,
                                nama: item.nama,
                                kelas: item.kelas,
                                alasan: item.alasan,
                                tanggal: item.tanggal
                            }
                        }), `Dispensasi-${dateDispen}`)
                    }} className="float-right bg-green-600 flex gap-2"><Upload/> EXPORT EXCEL</Button>
                    <Table>
                        <TableCaption>Daftar Detail Dispensasi</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIS</TableHead>
                                <TableHead>NAMA</TableHead>
                                <TableHead>KELAS</TableHead>
                                <TableHead>ALASAN</TableHead>
                                <TableHead>WAKTU</TableHead>
                                <TableHead>STATUS</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dispen.map((dispensi) => (
                                <TableRow>
                                    <TableCell>{dispensi.nis}</TableCell>
                                    <TableCell>{dispensi.nama}</TableCell>
                                    <TableCell>{dispensi.kelas}</TableCell>
                                    <TableCell>{dispensi.alasan}</TableCell>
                                    <TableCell>{dispensi.tanggal}</TableCell>
                                    <TableCell><Badge variant={dispensi.dispen.status == "accepted" ? "default": dispensi.dispen.status == "pending" ? "outline" : "destructive"} className={dispensi.dispen.status == "accepted" ? "bg-green-600" : ""}>{dispensi.dispen.status}</Badge></TableCell>
                                    <TableCell>
                                        <Link
                                            href={`${site_url}/keluar/${dispensi.id_dispen}`}
                                        >
                                            <Button>Lihat Detail</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    );
}
