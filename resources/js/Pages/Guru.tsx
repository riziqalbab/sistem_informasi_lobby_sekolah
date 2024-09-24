import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { PencilIcon } from "lucide-react";
import Navbar from "@/Components/Navbar";

import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";

interface Teacher {
    id: string;
    name: string;
    subject: string;
    nip: string;
    whatsapp: string;
}

interface ComponentProps {
    teachers?: Teacher[];
    onEdit: (teacher: Teacher) => void;
}

export default function Guru({ teachers = [], onEdit }: ComponentProps) {
    return (
        <>
            <Navbar />
            <main className="w-screen flex items-center justify-center flex-col ">
                <div className="w-full container">
                    <div className="flex items-center mb-10">
                        <Dialog>
                            <DialogTrigger>
                                <Button>TAMBAH</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <Card className="w-full max-w-md">
                                    <CardHeader>
                                        <CardTitle>Tambah Data Guru</CardTitle>
                                        <CardDescription>
                                            Isi form berikut untuk menambahkan
                                            data guru baru.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nama</Label>
                                            <Input
                                                id="name"
                                                placeholder="Masukkan nama guru"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">
                                                Mata Pelajaran
                                            </Label>
                                            <Input
                                                id="subject"
                                                placeholder="Masukkan mata pelajaran yang diajar"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nip">NIP</Label>
                                            <Input
                                                id="nip"
                                                placeholder="Masukkan NIP guru"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="whatsapp">
                                                Nomor WhatsApp
                                            </Label>
                                            <Input
                                                id="whatsapp"
                                                placeholder="Masukkan nomor WhatsApp guru"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            Simpan
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Mata Pelajaran</TableHead>
                                <TableHead>NIP</TableHead>
                                <TableHead>Nomor WhatsApp</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.subject}</TableCell>
                                    <TableCell>{teacher.nip}</TableCell>
                                    <TableCell>{teacher.whatsapp}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(teacher)}
                                            aria-label={`Edit ${teacher.name}`}
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </>
    );
}
