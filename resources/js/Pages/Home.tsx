import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

import { StatCard } from "@/Components/StatCard";
import Select from "react-select";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

function Home() {
    const [guruChoice, setGuruChoice] = useState<number>();
    const { props } = usePage();
    const guru: object_guru[] = props.guru as object_guru[];
    const guru_piket = props.guru_piket as object_guru_piket;
    const nama_guru_piket: string = guru_piket?.nama;
    const optionGuru = guru.map((e, index) => {
        return {
            value: e.id_guru,
            label: e.nama,
        };
    });

    console.log(guru_piket);

    const handleSubmitGuruPiket = (e: React.FormEvent<HTMLFormElement>) => {
        router.post("/guru/piket/store", {
            id_guru: guruChoice,
        });
    };
    return (
        <>
            <Navbar />
            <main className="w-screen flex items-center justify-center">
                <div className="container p-5">
                    <div className="statistic-dispen w-full flex items-center justify-center flex-wrap gap-5 mb-10">
                        {guru_piket == null ? (
                            <Alert variant="destructive">
                                <ExclamationTriangleIcon className="h-4 w-4" />
                                <AlertTitle>
                                    ATUR GURU PIKET UNTUK HARI INI
                                </AlertTitle>
                                <AlertDescription>
                                    Hari ini guru piket belum diatur!
                                </AlertDescription>
                            </Alert>
                        ) : null}
                        <Card className="w-full max-w-lg">
                            <CardHeader className="-mb-3">
                                <CardTitle>GURU PIKET</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base text-muted-foreground">
                                    {nama_guru_piket}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Dialog>
                                    <DialogTrigger>
                                        <Button>UBAH</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Ubah Guru Piket
                                            </DialogTitle>
                                            <DialogDescription>
                                                <form
                                                    onSubmit={
                                                        handleSubmitGuruPiket
                                                    }
                                                    action=""
                                                    className="flex w-full gap-2"
                                                >
                                                    <Select
                                                        id="guru"
                                                        onChange={(e) => {
                                                            setGuruChoice(
                                                                e?.value
                                                            );
                                                        }}
                                                        placeholder="Guru"
                                                        options={optionGuru}
                                                        className="col-span-3 flex-1"
                                                    />
                                                    <Button type="submit">
                                                        OKE
                                                    </Button>
                                                </form>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="statistic-dispen w-full flex items-center justify-center flex-wrap gap-5">
                        <StatCard
                            url="/keluar"
                            value={100}
                            title="DISPENSASI KELUAR"
                            desc="JUMLAH SISWA IZIN | IZIN KELUAR"
                        />
                        <StatCard
                            url="/masuk"
                            value={100}
                            title="DISPENSASI MASUK"
                            desc="JUMLAH SISWA TERLAMBAT | IZIN MASUK"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;
