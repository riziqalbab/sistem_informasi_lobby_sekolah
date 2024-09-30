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
import { ReactNode, useState } from "react";
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

    console.log(props);

    const handleSubmitGuruPiket = (e: React.FormEvent<HTMLFormElement>) => {
        router.post("/guru/piket/store", {
            id_guru: guruChoice,
        });
    };
    return (
        <>
            <Navbar />
            <main className="w-screen ">
                <div className="w-full p-5">
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
                            url="/keluar"
                            value={props.total_dispen as number}
                            title="DISPENSASI KELUAR"
                            desc="JUMLAH SISWA IZIN | IZIN KELUAR"
                        />

                        <Card className="w-full max-w-lg">
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
                                <CardTitle>Total 2 Minggu</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{props.two_weeks as ReactNode}</div>
                                <p className="text-xs text-muted-foreground">
                                    Data 2 minggu kebelakang
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="container p-5">
                    <div className="statistic-dispen w-full flex items-center justify-center flex-wrap gap-5 mb-10"></div>
                    <div className="statistic-dispen w-full flex items-center justify-center flex-wrap gap-5"></div>
                </div>
            </main>
        </>
    );
}

export default Home;
