import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Link } from "@inertiajs/react";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFoundDispen() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <FileQuestion className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-2xl font-bold">
                            Dispensasi Tidak Ditemukan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground mb-4">
                            Maaf, data dispensasi yang Anda cari tidak dapat
                            ditemukan. Ini mungkin karena:
                        </p>
                        <ul className="list-disc text-left pl-6 mb-4">
                            <li>ID dispensasi yang dimasukkan tidak valid</li>
                        </ul>
                        <p className="text-muted-foreground">
                            Silakan periksa ID dispensasi dan coba lagi
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
