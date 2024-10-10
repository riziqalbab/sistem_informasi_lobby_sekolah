"use client"

import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"

export default function CreateTamu() {
  const [formData, setFormData] = useState({
    nama: "",
    instansi: "",
    noTelp: "",
    tujuan: "",
    keterangan: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      tujuan: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Di sini Anda bisa menambahkan logika untuk mengirim data ke server
    alert("Terima kasih telah mengisi buku tamu!")
    setFormData({
      nama: "",
      instansi: "",
      noTelp: "",
      tujuan: "",
      keterangan: ""
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Buku Tamu</CardTitle>
        <CardDescription>Silakan isi form buku tamu sekolah kami</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input id="nama" name="nama" value={formData.nama} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="instansi">Instansi</Label>
              <Input id="instansi" name="instansi" value={formData.instansi} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="noTelp">Nomor Telepon</Label>
              <Input id="noTelp" name="noTelp" type="tel" value={formData.noTelp} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tujuan">Tujuan Kunjungan</Label>
              <Select onValueChange={handleSelectChange} value={formData.tujuan}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tujuan kunjungan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Konsultasi">Konsultasi</SelectItem>
                  <SelectItem value="Pendaftaran">Pendaftaran</SelectItem>
                  <SelectItem value="Rapat">Rapat</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="keterangan">Keterangan Tambahan</Label>
              <Textarea id="keterangan" name="keterangan" value={formData.keterangan} onChange={handleChange} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setFormData({ nama: "", instansi: "", noTelp: "", tujuan: "", keterangan: "" })}>Reset</Button>
        <Button type="submit" onClick={handleSubmit}>Kirim</Button>
      </CardFooter>
    </Card>
  )
}