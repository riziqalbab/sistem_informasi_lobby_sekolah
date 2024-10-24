import { Chart } from "@/Components/Chart";
import Navbar from "@/Components/Navbar";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";

function IndexStat() {
    const { props } = usePage();

    const kelas_dispensasi: Array<any> = props.count_kelas_dispensasi as Array<any>
    const perbandingan_dispen_terlambat: Array<any> = props.perbandingan_dispen_terlambat as Array<any>

    return (
        <AppLayout>
            <main>
                <h1 className="text-center text-3xl font-black">GRAFIK STATISTIK</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8 p-5">
                    {/* @ts-ignore */}
                    <Chart
                        data={props.count_kelas_dispensasi as Array<any>}
                        description="Grafik perbandingan seluruh kelas dispensasi keluar"
                        keyX="nama_kelas"
                        keyY="jumlah_dispen"
                        title="PERBANDINGAN KELAS DISPENSASI"
                    />
                    <Chart
                        data={props.count_kelas_terlambat as Array<any>}
                        description="Grafik perbandingan seluruh kelas paling banyak siswa terlambat"
                        keyX="nama_kelas"
                        keyY="jumlah_masuk"
                        title="PERBANDINGAN KELAS SISWA TERLAMBAT"
                    />
                    <Chart
                        data={props.perbandingan_dispen_terlambat as Array<any>}
                        description="Grafik perbandingan keluar dan masuk"
                        keyX="label"
                        keyY="jumlah"
                        title="PERBANDINGAN DISPENSASI KELUAR DAN MASUK"
                    />
                </div>
            </main>
        </AppLayout>
    );
}

export default IndexStat;
