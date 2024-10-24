import { Link } from "@inertiajs/react";
import { SidebarTrigger } from "./ui/sidebar";

function Navbar() {
    return (
        <>
            <nav className="navbar bg-white">
                <div className="navbar-start ">
                    <SidebarTrigger />
                    <Link href="/" className="btn btn-ghost lg:text-xl">
                        LOBBY | SMK NEGERI 1 KEBUMEN
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="/tamu">TAMU</Link>
                        </li>
                        <li>
                            <Link href="/keluar">DISPENSASI</Link>
                        </li>
                        <li>
                            <Link href="/masuk">TERLAMBAT</Link>
                        </li>
                        <li>
                            <Link href="/statistik">STATISTIK</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
