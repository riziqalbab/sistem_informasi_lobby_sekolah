import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import { PageProps as AppPageProps } from "./";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    interface Teacher {
        id: string;
        name: string;
        subject: string;
        whatsapp: string;
    }

    interface ComponentProps {
        teachers?: Teacher[];
        onEdit: (teacher: Teacher) => void;
    }

    interface GuruObject {
        id_guru: number;
        mapel: string;
        nama: string;
        whatsapp: string;
    }

    interface ValuesType {
        nama: string;
        mapel: string;
        whatsapp: string;
    }

    interface object_nis_data {
        kelas: string;
        nama: string;
        nis: number;
    }

    interface object_option_alasan {
        value: string;
        label: string;
    }

    interface object_guru {
        id_guru: number;
        mapel: string;
        nama: string;
        whatsapp: string;
    }

    export interface Paginator<T> {
        current_page: number;
        data: T[];
        first_page_url: string;
        from: number | null;
        last_page: number;
        last_page_url: string;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number | null;
        total: number;
        links: Array<{
                active: boolean
                label: string
                url: string
        }>
      }

    interface siswa_dispen{
        alasan: string
        id_dispen: string
        kelas: string
        nama: string
        nis: number
        tanggal: string
    }

    interface object_dispensasi {
        alasan: string;
        deskripsi: string;
        id_dispen: string;
        waktu_awal: string;
        waktu_akhir: string;
    }

    interface object_guru_piket {
        id: number;
        id_guru: number
        tanggal: string
        guru:{
            id_guru: number
            mapel: string
            nama: string
            whatsapp: string
        }
    }

    

    var route: typeof ziggyRoute;
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
