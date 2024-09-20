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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";

function Siswa() {
    return (
        <>
            <Navbar />

            <main className="w-screen flex items-center justify-center">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Tambah Data Siswa</CardTitle>
                        <CardDescription>
                            Isi form berikut untuk menambahkan data siswa baru.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                placeholder="Masukkan nama siswa"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nis">NIS</Label>
                            <Input
                                id="nis"
                                type="number"
                                placeholder="Masukkan NIS"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="class">Kelas</Label>
                            <Select>
                                <SelectTrigger id="class">
                                    <SelectValue placeholder="Pilih kelas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kelas-a">
                                        Kelas A
                                    </SelectItem>
                                    <SelectItem value="kelas-b">
                                        Kelas B
                                    </SelectItem>
                                    <SelectItem value="kelas-c">
                                        Kelas C
                                    </SelectItem>
                                    <SelectItem value="kelas-d">
                                        Kelas D
                                    </SelectItem>
                                    <SelectItem value="kelas-e">
                                        Kelas E
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit">Simpan</Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
}

export default Siswa;
