// @ts-nocheck

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Clock, Phone } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { ReactNode } from "react";

function MasukDetail() {
    const { props } = usePage();

    console.log(props);

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Detail Informasi Keterlambatan Siswa
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Umum</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                <li>
                                    GURU PIKET :{" "}
                                    <span className="font-black">
                                        {props.guru_piket.guru.nama}
                                    </span>
                                </li>
                                <li>
                                    GURU PENGAJAR :{" "}
                                    <span className="font-black">
                                        {props.guru.nama}
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Daftar Siswa</CardTitle>
                            <CardDescription>
                                Siswa yang mengikuti dispensasi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                                <div className="space-y-4">
                                    {props.siswa.map((siswa, index) => (
                                        // <Card
                                        //     key={index}
                                        //     className="flex items-center space-x-4"
                                        // >
                                        //     <CardHeader>
                                        //         <CardTitle>
                                        //             <p className="text-sm font-medium">
                                        //                 {siswa.nama}
                                        //             </p>
                                        //         </CardTitle>
                                        //         <CardDescription>
                                        //             {siswa.kelas}
                                        //         </CardDescription>
                                        //     </CardHeader><br />
                                        //     <CardContent>
                                        //         <p>Card Content</p>
                                        //     </CardContent>
                                        //     <div></div>
                                        // </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-sm font-medium">
                                                    {siswa.nama}
                                                </CardTitle>
                                                <CardDescription>
                                                    {siswa.kelas}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{siswa.alasan}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default MasukDetail;
