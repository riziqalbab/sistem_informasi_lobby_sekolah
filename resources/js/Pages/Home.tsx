import Navbar from "@/Components/Navbar";
import { StatCard } from "@/Components/StatCard";

function Home() {
    return (
        <>
            <Navbar />
            <main className="w-screen flex items-center justify-center">
                <div className="container p-5">
                    <div className="statistic-dispen w-full flex items-center justify-center flex-wrap gap-5">
                        <StatCard
                            url="#"
                            value={100}
                            title="DISPENSASI MASUK"
                            desc="JUMLAH SISWA TERLAMBAT | IZIN MASUK"
                        />
                        <StatCard
                            url="#"
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
