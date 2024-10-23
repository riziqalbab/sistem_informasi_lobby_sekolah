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

export default function AllDispensasi() {
    const { props } = usePage();
    const [dateDispen, setDateDispen] = useState<string>(props.date as string);

    
    // const paginator: Paginator<siswa_dispen> = props.dispens as Paginator<siswa_dispen>;
    const dataTerlambat: Array<siswa_dispen> = (props.terlambat as { data: Array<siswa_dispen> }).data
    const site_url: string = props.site_url as string;
    console.log(dataTerlambat);


    
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
                    <Table>
                        <TableCaption>Daftar Detail Dispensasi</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIS</TableHead>
                                <TableHead>NAMA</TableHead>
                                <TableHead>KELAS</TableHead>
                                <TableHead>WAKTU</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataTerlambat.map((dispensi) => (
                                <TableRow>
                                    <TableCell>{dispensi.nis}</TableCell>
                                    <TableCell>{dispensi.nama}</TableCell>
                                    {/* @ts-ignore */}
                                    <TableCell>{dispensi.kelas}</TableCell>
                                    <TableCell>{dispensi.tanggal}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={`${site_url}/keluar/${dispensi.id_dispen}`}

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
                    <Pagination>
                        {/* <PaginationContent>
                            {paginator.next_page_url != null && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={`${paginator.prev_page_url}&date=${dateDispen}`}
                                    />
                                </PaginationItem>
                            )}
                            {paginator.next_page_url != null && (
                                <PaginationItem>
                                    <PaginationNext
                                        href={`${paginator.next_page_url}&date=${dateDispen}`}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent> */}
                    </Pagination>
                </div>
            </main>
        </div>
    );
}
