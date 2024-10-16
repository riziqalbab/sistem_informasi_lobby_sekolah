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
import { Eye } from "lucide-react";
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

export default function AllDispensasi() {
    const { props } = usePage();
    const [dateDispen, setDateDispen] = useState<string>(props.date as string);

    // @ts-ignore
    const dataDispen: Array<siswa_dispen> = props.dispen  

    console.log(props);
    
    const site_url: string = props.site_url as string;
    const dispen = dataDispen.map((item) => {
        return {
            id_dispen: item.id_dispen,
            nis: item.nis,
            nama: item.nama,
            kelas: item.kelas.nama,
            alasan: item.alasan,
            tanggal: new Date(item.tanggal).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
        };
    });

    const exportToExcel = () => {
        
        const worksheet = XLSX.utils.json_to_sheet(dispen);

        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dispensasi");


        
        // Export to Excel file
        XLSX.writeFile(workbook, "Dispensasi_Data.xlsx");
    };

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <h1 className="font-bold text-center text-lg">
                DAFTAR SISWA MELAKUKAN DISPENSASI
            </h1>
            <main className="w-screen flex pt-5 items-center justify-center ">
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
                    <Button onClick={exportToExcel} className="float-right bg-green-600">EXPORT EXCEL</Button>
                    <Table>
                        <TableCaption>Daftar Detail Dispensasi</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIS</TableHead>
                                <TableHead>NAMA</TableHead>
                                <TableHead>KELAS</TableHead>
                                <TableHead>ALASAN</TableHead>
                                <TableHead>WAKTU</TableHead>
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
