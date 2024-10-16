// @ts-nocheck

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
} from "@/Components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { StatCard } from "@/Components/StatCard";
import Select from "react-select";
import { ReactNode, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Chart } from "@/Components/Chart";

function Home() {
    const [guruChoice, setGuruChoice] = useState<number>();
    const { props } = usePage();
    const two_weeks: Array<any> = props.two_weeks as unknown as Array<any>
    const guru: object_guru[] = props.guru as object_guru[];
    const guru_piket = props.guru_piket as object_guru_piket;

    const nama_guru_piket: string = guru_piket?.guru.nama;
    const optionGuru = guru.map((e, index) => {
        return {
            value: e.id_guru,
            label: e.nama,
        };
    });
    const handleSubmitGuruPiket = (e: React.FormEvent<HTMLFormElement>) => {
        router.post("/master/guru/piket/store", {
            id_guru: guruChoice,
        });
    };

    console.log(optionGuru);
    
    
    return (
        <>
            <Navbar />
            <main className="w-screen ">
            <div className="w-full h-96 object-cover rounded-lg bg-[url(https://github-production-user-asset-6210df.s3.amazonaws.com/108043896/376852115-a3f9abff-1d3a-4ffc-b1bf-077ffa740d50.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241016%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241016T012650Z&X-Amz-Expires=300&X-Amz-Signature=6119a241071bc6c653cf772fc0de5873556cdaf18a4ef43990741ddc47b2e986&X-Amz-SignedHeaders=host)] bg-left bg-cover flex items-center justify-center">
                <h1 className="font-black text-slate-900 text-3xl text-center">LOBBY SMK NEGERI 1 KEBUMEN</h1>
            </div>
                <div className="w-full p-5 relative mt-16 z-50">
                    {guru_piket == null ? (
                        <Alert variant="destructive" className="my-5">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>
                                ATUR GURU PIKET UNTUK HARI INI
                            </AlertTitle>
                            <AlertDescription>
                                Hari ini guru piket belum diatur!
                            </AlertDescription>
                        </Alert>
                    ) : null}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
                        <StatCard
                            url="/tamu/tambah"
                            value={props.tamu_count}
                            title="BUKU TAMU"
                            desc="JUMLAH BUKU TAMU"
                        />
                        <StatCard
                            url="/masuk/tambah"
                            value={props.total_terlambat as number}
                            title="DISPENSASI MASUK"
                            desc="JUMLAH SISWA TERLAMBAT | IZIN MASUK"
                        />
                        <StatCard
                            url="/keluar/tambah"
                            value={props.total_dispen as number}
                            title="DISPENSASI KELUAR"
                            desc="JUMLAH SISWA IZIN | IZIN KELUAR"
                        />

                        {/* <Card className="w-full max-w-lg">
                            <CardHeader className="-mb-3">
                                <CardTitle>Total</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{props.total_dispen as ReactNode}</div>
                                <p className="text-xs text-muted-foreground">
                                    Total Keseluruhan
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="w-full max-w-lg">
                            <CardHeader className="-mb-3">
                                <CardTitle>Total 2 Minggu Dispensasi Keluar</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{props.two_weeks_count as ReactNode}</div>
                                <p className="text-xs text-muted-foreground">
                                    Data 2 minggu kebelakang
                                </p>
                            </CardContent>
                        </Card> */}
                        <Card className="w-full max-w-lg">
                            <CardHeader className="-mb-3">
                                <CardTitle>Total 2 Minggu Siswa Terlambat</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{props.two_weeks_count_terlambat as ReactNode}</div>
                                <p className="text-xs text-muted-foreground">
                                    Data 2 minggu kebelakang
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="container p-5">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-8">
                        <Chart data={two_weeks } description="Grafik dispensasi 2 minggu terkahir" keyX="label" keyY="count" title="2 MINGGU DISPENSASI" />
                    </div>
                   
                </div>
            </main>
        </>
    );
}

export default Home;
