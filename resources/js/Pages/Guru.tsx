import Navbar from "@/Components/Navbar";
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
import { Button } from "@/Components/ui/button";

function Guru() {
    return (
        <>
            <Navbar />
            <main className="w-screen flex items-centere justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Tambah Data Guru</CardTitle>
                        <CardDescription>
                            Isi form berikut untuk menambahkan data guru baru.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" placeholder="Masukkan nama guru" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Mata Pelajaran</Label>
                            <Input
                                id="subject"
                                placeholder="Masukkan mata pelajaran yang diajar"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nip">NIP</Label>
                            <Input id="nip" placeholder="Masukkan NIP guru" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                            <Input
                                id="whatsapp"
                                placeholder="Masukkan nomor WhatsApp guru"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Simpan</Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
}

export default Guru;
