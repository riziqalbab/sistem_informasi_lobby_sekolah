import { Link } from "@inertiajs/react";

function Navbar() {
    return (
        <nav className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow "
                    >
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
                            <Link href="/guru">GURU</Link>
                        </li>
                        <li>
                            <Link href="/guru" className="text-red-500">
                                MASTER DATA
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-xl">
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
                        <Link href="/siswa">SISWA</Link>
                    </li>
                    <li>
                        <Link href="/guru">GURU</Link>
                    </li>
                    <li>
                        <Link href="/guru" className="text-red-500">
                            MASTER DATA
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
