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

    interface object_guru_piket {
        id_guru: number;
        mapel: strring;
        nama: string;
        whatsapp: string;
    }

    var route: typeof ziggyRoute;
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
