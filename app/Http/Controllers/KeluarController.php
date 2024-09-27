<?php

namespace App\Http\Controllers;

use App\Models\Dispen;
use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\SiswaDispen;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Services\FonnteService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class KeluarController extends Controller
{


    protected $fonnteService;

    public function __construct(FonnteService $fonnteService)
    {
        $this->fonnteService = $fonnteService;
    }
    public function __invoke()
    {

        $table_guru_piket = GuruPiket::query()->with("guru")->whereDate('tanggal', Carbon::today())->get()->toArray();
        $guru_piket = count($table_guru_piket) > 0 ? $table_guru_piket[0]["guru"] : null;

        $guru = Guru::all();
        return Inertia::render("Keluar", [
            "guru" => $guru,
            "guru_piket" => $guru_piket
        ]);
    }

    public function store(Request $request)
    {

        // Log::info($request->all());
        $validator = Validator::make($request->all(), [
            "siswa" => "required",
            "alasan" => "required",
            "id_guru" => "required",
            "waktu_awal" => "required",
            "id_guru_piket" => "required",
            "whatsapp" => "required",
        ], [
            "siswa" => "Siswa belum diinputkan",
            "id_guru" => "Guru belum diisi",
            "alasan" => "Alasan belum diisi",
            "waktu_awal" => "Waktu mulai harus diisi",
            "id_guru_piket" => "Guru piket belum diatur",
            "whatsapp" => "Nomor whatsapp wajib diisi, untuk verifikasi",
        ]);


        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $is_sampai_pulang = $request->post("waktu_akhir") == null && 1;

        $dispen_created = Dispen::create([
            "id_guru_piket" => $request->post("id_guru_piket"),
            "id_guru" => $request->post("id_guru"),
            "alasan" => $request->post("alasan"),
            "deskripsi" => $request->post("deskripsi"),
            "whatsapp" => $request->post("whatsapp"),
            "waktu_awal" => $request->post("waktu_awal"),
            "waktu_akhir" => $request->post("sampai"),
            "is_sampai_pulang" => $is_sampai_pulang,
        ]);




        $guru = Guru::where("id_guru", $request->post("id_guru"))->firstOrFail()->toArray();
        $nama_guru = $guru["nama"];
        $nomor_guru = $guru["whatsapp"];



        $id_dispen = $dispen_created->id_dispen;

        $siswa_dispen = array_map(function ($item) use ($id_dispen, $request) {
            return [
                "id_dispen" => $id_dispen,
                "nis" => $item["nis"],
                "nama" => $item["nama"],
                "kelas" => $item["kelas"],
                "tanggal" => $request->post("waktu_awal"),
                "alasan" => $request->post("alasan"),
            ];
        }, $request->post("siswa"));


        // Log::info($siswa_dispen);
        SiswaDispen::insert($siswa_dispen);

        Log::info($request->post("siswa"));

$site_url = url("/");


Log::info($site_url);

//         $message_siswa = "
// *PERMOHONAN DISPENSASI DIGITAL SMK NEGERI 1 KEBUMEN*
// \n
// Hai, {$request->nama_siswa},\n
// Permohonan dispensasi kamu telah berhasil diajukan. Berikut adalah detail pengajuan dispensasi:
// \n
// *Alasan*      : {$request->alasan}\n
// *Deskripsi*   : {$request->deskripsi}\n
// *Waktu*   : {$request->waktu_awal}\n
// \n
// Silakan pantau status pengajuan kamu dengan mengunjungi tautan berikut untuk detail lebih lanjut:
// \n
// [Klik di sini untuk melihat detail dispensasi kamu](https://{$site_url}/dispensasi/{$request->id_dispensasi})
// \n
// Terima kasih,
// \n
// SMK Negeri 1 Kebumen";



$message_guru = "
*DISPENSASI DIGITAL SMK NEGERI 1 KEBUMEN*
\n
KEPADA YTH BPK/IBU {$nama_guru},\n
\n
Dengan ini kami sampaikan bahwa siswa dengan data sebagai berikut telah melakukan pengajuan dispensasi:
\n";
foreach ($request->post("siswa") as $key => $value) {
    $message_guru .= "
*Nama*  : " . $value["nama"] . "\n" .
"*Kelas* : " . $value["kelas"] . "\n" .
"*NIS*   : " . $value["nis"] . "\n\n";
}
$message_guru .= "
Dengan alasan sebagai berikut:\n
*Alasan* : {$request->alasan}\n
*Deskripsi* : {$request->deskripsi}\n
\n
Terima kasih atas perhatiannya.
\n
Salam hormat,\n
SMK Negeri 1 Kebumen
";



        Log::info($message_guru);

        $result = $this->fonnteService->sendMessage($nomor_guru, $message_guru);
        // $result_siswa = $this->fonnteService->sendMessage($request->post("whatsapp"), $message_siswa);

        return redirect()->back()->with("success", true);
    }
}
