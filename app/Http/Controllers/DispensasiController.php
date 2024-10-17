<?php

namespace App\Http\Controllers;

use App\Models\Dispen;
use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\SiswaDispen;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Services\FonnteService;

class DispensasiController extends Controller
{

    public function __construct(FonnteService $fonnteService)
    {
        $this->fonnteService = $fonnteService;
    }
    public function __invoke(Request $request)
    {

        $site_url = url("/");
        $date = $request->get("date") != null ? $request->get("date") : Carbon::now()->toDateString();
        return Inertia::render("Dispensasi/IndexDispensasi", [
            "dispen" => SiswaDispen::with("kelas")->with("dispen")->whereDate("tanggal", $date)->get()->toArray(),
            "site_url" => $site_url,
            "date" => $date
        ]);
    }

    public function dispensasi(string $id_dispen)
    {

        try {
            $dispensasi = Dispen::findOrFail($id_dispen)->toArray();

            $siswa = SiswaDispen::where("id_dispen", $id_dispen)->get()->toArray();

            $guru = Guru::where("id_guru", $dispensasi["id_guru"])->firstOrFail()->toArray();
            $guru_piket = Guru::where("id_guru", $dispensasi["id_guru_piket"])->firstOrFail()->toArray();
            $id_guru_piket = $dispensasi["id_guru_piket"];
            $nama_guru = $guru["nama"];
            $guru_piket = GuruPiket::with("guru")->find($id_guru_piket);


            return Inertia::render("Dispensasi/Dispensasi", [
                "dispensasi" => [
                    "id_dispen" => $id_dispen,
                    "guruPiket" => $guru_piket,
                    "guruPengajar" => $nama_guru,
                    "nomorWhatsapp" => $dispensasi["whatsapp"],
                    "waktuDispen" => $dispensasi["waktu_awal"],
                    "waktuDispenAkhir" => $dispensasi["waktu_akhir"],
                    "alasan" => $dispensasi["alasan"],
                    "deskripsi" => $dispensasi["deskripsi"],
                    "siswa" => $siswa,
                    "status" => $dispensasi["status"]
                ]
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }
    }

    public function confirm(Request $request)
    {
        $id_dispen = $request->post("id_dispen");
        $status = $request->post("status");
        $id_guru_piket = $request->post("id_guru_piket");

        try {
            $dispen = Dispen::findOrFail($id_dispen)->toArray();
            if ($status) {
                Dispen::where("id_dispen", $id_dispen)->update([
                    "status" => "accepted"
                ]);
                $whatsapp_guru_piket = GuruPiket::find($id_guru_piket)->guru->whatsapp;
                $whatsapp_siswa = $dispen["whatsapp"];

$message_accept_siswa = "
*PERMOHONAN DISPENSASI DIGITAL SMK NEGERI 1 KEBUMEN*
\n
Hai,
\n
Kami informasikan bahwa permohonan dispensasi Anda telah *diterima* oleh guru pengajar.
\n
Anda mendapatkan izin dispensasi sesuai dengan ketentuan yang telah disetujui. Pastikan untuk memanfaatkan waktu ini dengan baik dan tetap memperhatikan aturan yang berlaku.
\n
Terima kasih.
";



            } else {

                

                $alasan = $request->post("alasan");
                Dispen::where("id_dispen", $id_dispen)->update([
                    "status" => "rejected"
                ]);
                $message_reject_siswa = "
*PERMOHONAN DISPENSASI DIGITAL SMK NEGERI 1 KEBUMEN*
\n
Hai,
\n
Kami informasikan bahwa permohonan dispensasi Anda telah *ditolak* oleh guru pengajar, dengan alasan : 
\n
{$alasan}
\n
\n
Mohon untuk memperhatikan kehadiran Anda dan segera menghubungi pihak terkait jika ada keperluan lebih lanjut.
\n
Terima kasih.
";

            }

        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }


    }
}
