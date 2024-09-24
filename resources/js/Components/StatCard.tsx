import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Link } from "@inertiajs/react";

interface propsStat {
    title: string;
    value: number;
    url: string;
    desc: string;
}

export function StatCard({ title, value, url, desc }: propsStat) {
    return (
        <Card className="w-full max-w-lg">
            <CardHeader className="-mb-3">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{desc}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href={url}>
                    <Button>TAMBAH</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
