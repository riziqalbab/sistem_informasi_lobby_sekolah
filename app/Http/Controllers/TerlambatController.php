<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\Masuk;
use App\Models\SiswaMasuk;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Services\FonnteService;


class TerlambatController extends Controller
{
    protected $fonnteService;
    public function __construct(FonnteService $fonnteService)
    {
        $this->fonnteService = $fonnteService;
    }

    public function __invoke(Request $request)
    {

        $site_url = url("/"); 

        $date = $request->get("date") != null ? $request->get("date") : Carbon::now()->toDateString();
        $siswa_terlambat = SiswaMasuk::all();

        $terlambat = SiswaMasuk::whereDate("tanggal", $date)->with("kelas")->get()->toArray();
        return Inertia::render("Masuk/IndexMasuk", [
            "terlambat" => $terlambat,
            "date" => $date,
            "site_url" => $site_url
        ]);
    }
    public function tambah()
    {
        $site_url = url("/");
        $guru = Guru::all();
        $table_guru_piket = GuruPiket::query()->with("guru")->whereDate('tanggal', Carbon::today())->get()->toArray();
        $guru_piket = count($table_guru_piket) > 0 ? $table_guru_piket[0] : null;

        return Inertia::render("Masuk/Masuk", [
            "guru" => $guru,
            "guru_piket" => $guru_piket,
            "site_url" => $site_url
        ]);
    }
    public function detail(string $id_masuk)
    {

        try {
            $dispensasi = Masuk::findOrFail($id_masuk)->toArray();

            $piket = GuruPiket::find($dispensasi["id_guru_piket"])->with('guru')->get()->first();
            $guru = Guru::where("id_guru", $dispensasi["id_guru"])->firstOrFail()->toArray();
            $siswa = SiswaMasuk::where("id_masuk", $id_masuk)->get()->toArray();

            Log::info($guru);


            return Inertia::render("Masuk/TerlambatDetail", [
                "guru_piket" => $piket,
                "guru" => $guru,
                "siswa" => $siswa,

            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }
    }

    public function store(Request $request)
    {

        Log::info($request);
        
        $date_now = Carbon::now()->toDateString();

        $validator = Validator::make($request->all(), [
            "id_guru" => ["required"],
            "id_guru_piket" => ["required"],
        ], [
            "id_guru" => "Guru Wajib Diisi",
            "id_guru_piket" => "Guru piket belum diatur",
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $values_dispen = [
            "id_guru" => $request->id_guru,
            "id_guru_piket" => $request->id_guru_piket,
            "tanggal" => $date_now,
        ];
        $masuk_created = Masuk::create($values_dispen);
        $id_masuk = $masuk_created->id_masuk;


        
        
        $value_siswa_masuk = array_map(function ($item) use ($id_masuk, $date_now) {
            return [
                "id_masuk" => $id_masuk,
                "nis" => $item["nis"],
                "id_kelas" => $item["kelas"]["id_kelas"],
                "nama" => $item["nama"],
                "alasan" => $item["alasan"] ?? "",
                "tanggal" => $date_now
            ];
        }, $request->post("siswa"));
             
        $dispensasi = Masuk::findOrFail($id_masuk)->toArray();

        SiswaMasuk::insert($value_siswa_masuk);
        $piket = GuruPiket::find($dispensasi["id_guru_piket"])->with('guru')->get()->first();
        $guru = Guru::where("id_guru", $dispensasi["id_guru"])->firstOrFail()->toArray();

        $whatsapp_piket = $piket->guru->whatsapp;
        $whatsapp_guru = $guru["whatsapp"];


        $nama_guru = $guru["nama"];


        
$message_guru = "
*DISPENSASI DIGITAL SMK NEGERI 1 KEBUMEN*
\n
KEPADA YTH BPK/IBU {$nama_guru},\n
\n
Dengan ini kami sampaikan bahwa siswa dengan data sebagai berikut telah melakan keterlambatan masuk:
\n";
foreach ($request->post("siswa") as $key => $value) {
    $message_guru .= "
*Nama*  : " . $value["nama"] . "\n" .
"*Kelas* : " . $value["kelas"]["nama"] . "\n" .
"*NIS*   : " . $value["nis"] . "\n\n".
"*ALASAN*: " . $value["alasan"] . "\n\n";

}
$message_guru .= "
Terima kasih atas perhatiannya.
\n
Salam hormat,\n
SMK Negeri 1 Kebumen
";


$message_piket = "
*DISPENSASI DIGITAL SMK NEGERI 1 KEBUMEN*
\n
KEPADA YTH BPK/IBU GURU PIKET LOBBY,\n
\n
Kami informasikan bahwa siswa dengan data sebagai berikut telah melakukan keterlambatan:
\n";
foreach ($request->post("siswa") as $key => $value) {
    $message_piket .= "
*Nama*  : " . $value["nama"] . "\n" .
"*Kelas* : " . $value["kelas"]["nama"] . "\n" .
"*NIS*   : " . $value["nis"] . "\n".
"*ALASAN*: " . $value["alasan"] . "\n\n";
}
$message_piket .= "
Mohon izin untuk memberikan akses kepada siswa yang bersangkutan. Terima kasih atas perhatian dan kerja samanya.
\n
Salam hormat,\n
SMK Negeri 1 Kebumen
";




$result = $this->fonnteService->sendMessage($whatsapp_guru, $message_guru);
$result = $this->fonnteService->sendMessage($whatsapp_piket, $message_piket);



        return redirect()->back()->with([
            "success" => true,
            "id_masuk" => $id_masuk
        ]);
    }
}
