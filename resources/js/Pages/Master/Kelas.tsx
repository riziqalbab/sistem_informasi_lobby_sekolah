"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import Navbar from "@/Components/Navbar";

export default function ClassManagement() {
    const [classes, setClasses] = useState<object_kelas[]>([]);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">
                    KELAS | <span className="text-red-500">MASTER DATA</span>
                </h1>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Tambah Kelas Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="name">Nama Kelas</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Contoh: X PPLG"
                                    required
                                />
                            </div>

                            <Button type="submit">Tambah Kelas</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Kelas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Kelas</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classes.map((item) => (
                                    <TableRow key={item.id_kelas}>
                                        <TableCell>{item.nama}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
