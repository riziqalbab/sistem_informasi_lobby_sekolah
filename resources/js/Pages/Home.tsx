import Navbar from "@/Components/Navbar";

function Home() {
    return (
        <>
            <Navbar />
            <main className="w-screen flex items-center justify-center">
                <div className="container">
                    <h1>THIS IS DASHBOARD</h1>
                </div>
            </main>
        </>
    );
}

export default Home;
