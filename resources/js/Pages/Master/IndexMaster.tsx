import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import Navbar from "@/Components/Navbar";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

function IndexMaster() {
    return (
        <>
            <Navbar />

            <main className=" flex items-center justify-center flex-col">
                <div className="container">
                    <Alert variant="destructive" className="my-5">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>INI ADALAH HALAMAN MASTER DATA</AlertTitle>
                        <AlertDescription>
                            Perubahan data hanya saat diperlukan saja
                        </AlertDescription>
                    </Alert>
                </div>
                <div className="container flex gap-5">
                    <Card className="w-full max-w-lg">
                        <CardHeader className="-mb-3">
                            <CardTitle>KELAS</CardTitle>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <Link href="/master/kelas">
                                <Button>LIHAT</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="w-full max-w-lg">
                        <CardHeader className="-mb-3">
                            <CardTitle>GURU</CardTitle>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <Link href="/master/guru">
                                <Button>LIHAT</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="w-full max-w-lg">
                        <CardHeader className="-mb-3">
                            <CardTitle>SISWA</CardTitle>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <Link href="/master/siswa">
                                <Button>LIHAT</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </main>
        </>
    );
}

export default IndexMaster;
