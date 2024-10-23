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
import { Badge } from "@/Components/ui/badge";

export default function IndexTamu() {
    const { props } = usePage();
    const [dateDispen, setDateDispen] = useState<string>(props.date as string);
    const dataTamu: Array<tamu> = (props.tamu as { data: Array<tamu> }).data
    const site_url: string = props.site_url as string;




    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className=" flex pt-5 items-center justify-center ">
                <div className="container">
                <h1 className="text-center font-bold text-xl">DATA BUKU TAMU</h1>
                <br /><br />
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
                                <TableHead>NO</TableHead>
                                <TableHead>NAMA</TableHead>
                                <TableHead>INSTANSI</TableHead>
                                <TableHead>TUJUAN</TableHead>
                                <TableHead>STATUS</TableHead>
                                <TableHead>NO WHATSAPP</TableHead>
                                <TableHead>WAKTU</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataTamu.map((tamu, index) => (
                                <TableRow>
                                    <TableCell>{index++}</TableCell>
                                    <TableCell>{tamu.nama}</TableCell>
                                    <TableCell>{tamu.instansi}</TableCell>
                                    <TableCell>{tamu.tujuan}</TableCell>
                                    <TableCell>{tamu.whatsapp}</TableCell>
                                    <TableCell>
                                        {
                                            tamu.isActive ? (
                                                <Badge>AKTIF</Badge>
                                            ): (
                                                
                                                <Badge>SELESAI</Badge>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>{tamu.created_at}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/buku/${tamu.id_tamu}`}

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
