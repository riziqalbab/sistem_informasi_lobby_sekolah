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
import { Link, router, usePage } from "@inertiajs/react";
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
    const [date, setDate] = useState<string>()

    const paginator: Paginator<siswa_dispen> =
        props.dispens as Paginator<siswa_dispen>;
    const dataDispen: Array<siswa_dispen> = (
        props.dispens as { data: Array<siswa_dispen> }
    ).data;
    const site_url: string = props.site_url as string;


    const onSubmitDate = (e: React.FormEvent<HTMLFormElement>)=>{
       
    }


    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <main className="w-screen flex pt-5 items-center justify-center ">
                <div className="container ">
                    <form action="" className="flex gap-2">
                        <Input type="date" className="w-64" onChange={(e)=>{
                            setDate(e.target.value)
                        }}/>




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
                            {dataDispen.map((dispensi) => (
                                <TableRow>
                                    <TableCell>{dispensi.nis}</TableCell>
                                    <TableCell>{dispensi.nama}</TableCell>
                                    <TableCell>{dispensi.kelas}</TableCell>
                                    <TableCell>{dispensi.tanggal}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={`${site_url}/dispensasi/${dispensi.id_dispen}`}
                                            className="flex items-center gap-1 border rounded-lg border-black p-1 px-2"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            <span className="w-14">
                                                Lihat Detail
                                            </span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={`${paginator.prev_page_url}`}
                                />
                            </PaginationItem>
                           
                            {paginator.next_page_url != null && (
                                <PaginationItem>
                                    <PaginationNext
                                        href={`${paginator.next_page_url}`}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>
        </div>
    );
}
