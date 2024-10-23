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
import { Import, Upload } from "lucide-react";
import ExcelExport from "@/utils/exportExcel";

export default function IndexMasuk() {
    const { props } = usePage();
    const [dateDispen, setDateDispen] = useState<string>(props.date as string);
    const dataTerlambat: Array<siswa_terlambat> = props.terlambat as Array<siswa_terlambat>
    const site_url: string = props.site_url as string;

    const terlambat = dataTerlambat.map((item) => {
        return {
            id_masuk: item.id_masuk,
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
    

    
    
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className=" flex pt-5 items-center justify-center ">
                <div className="container">
                <h1 className="text-center font-bold text-xl">DATA SISWA TERLAMBAT</h1>
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

                    <Button className="float-right bg-green-600 flex gap-2" onClick={()=>{
                        ExcelExport(terlambat, `Terlambat-${dateDispen}`)
                    }}><Upload/> EXPORT EXCEL</Button>
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
                        
                            {terlambat.map((i) => (
                                <TableRow>
                                    <TableCell>{i.nis}</TableCell>
                                    <TableCell>{i.nama}</TableCell>
                                    <TableCell>{i.kelas}</TableCell>
                                    <TableCell>{i.alasan}</TableCell>
                                    <TableCell>{i.tanggal}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={`${site_url}/masuk/${i.id_masuk}`}

                                        >
                                            <Button>

                                                Lihat Detail
                                            </Button>
                                            
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
