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
import { StatCard } from "@/Components/StatCard";
import Select from "react-select";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

function Home() {
    const [guruChoice, setGuruChoice] = useState<number>();
    const { props } = usePage();

    console.log(props);

    const guru: object_guru[] = props.guru as object_guru[];

    const optionGuru = guru.map((e, index) => {
        return {
            value: e.id_guru,
            label: e.nama,
        };
    });

    const handleSubmitGuruPiket = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                        <Card className="w-full max-w-lg">
                            <CardHeader className="-mb-3">
                                <CardTitle>GURU PIKET</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base text-muted-foreground">
                                    ARIF MUNANDAR, S.KOM
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
