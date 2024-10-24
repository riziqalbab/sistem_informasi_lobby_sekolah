"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Calendar, Clock, Building, Phone, MessageSquare } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function DetailTamu() {
    const { props } = usePage();

    const tamu: tamu = props.tamu as tamu;
    const [pesan, setPesan] = useState("");

    const handlePesanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPesan(e.target.value);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex flex-col items-center justify-center gap-3 mb-10">
                <img
                    className="w-24"
                    src="https://github.com/user-attachments/assets/fcd299ec-0a77-4631-972e-53c47f982d3c"
                    alt=""
                />
                <h1 className="font-black text-xl">SMK NEGERI 1 KEBUMEN</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Detail Buku Tamu</CardTitle>
                    <CardDescription>
                        Informasi lengkap kunjungan tamu
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{tamu.nama}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{tamu.instansi}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{tamu.whatsapp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {new Date(tamu.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {
                                    new Date(tamu.created_at)
                                        .toLocaleString()
                                        .split(",")[1]
                                }
                            </span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold">Tujuan Kunjungan</h4>
                        <p>{tamu.tujuan}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Keterangan</h4>
                        <p>{tamu.keterangan}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
