'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  nama: z.string({
    required_error: 'Nama wajib diisi'
  }),
  nik: z.coerce
    .number({
      invalid_type_error: 'NIK wajib diisi',
      required_error: 'NIK wajib diisi'
    })
    .int()
    .positive({
      message: 'NIK wajib diisi'
    }),
  no_kk: z.coerce
    .number({
      required_error: 'Nomor Kartu Keluarga wajib diisi',
      invalid_type_error: 'Nomor Kartu Keluarga wajib diisi'
    })
    .int()
    .positive({ message: 'Nomor Kartu Keluarga wajib diisi' }),
  foto_ktp: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'Foto KTP wajib diisi'
    })
    .refine((file) => file?.size <= 2 * 1024 * 1024, {
      message: 'Ukuran file tidak boleh lebih dari 2 MB'
    })
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/bimp'].includes(file?.type), {
      message: 'File harus berekstensi jpg/jpeg/png/bmp'
    }),
  foto_kk: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'Foto KK wajib diisi'
    })
    .refine((file) => file?.size <= 2 * 1024 * 1024, {
      message: 'Ukuran file tidak boleh lebih dari 2 MB'
    })
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/bimp'].includes(file?.type), {
      message: 'File harus berekstensi jpg/jpeg/png/bmp'
    }),
  umur: z.coerce
    .number({
      required_error: 'Umur wajib diisi',
      invalid_type_error: 'Umur wajib diisi'
    })
    .gte(25, {
      message: 'Umur harus 25 tahun ke atas'
    }),
  jk: z.string({
    required_error: 'Jenis Kelamin wajib diisi'
  }),
  provinsi: z.string({
    required_error: 'Provinsi wajib diisi'
  }),
  kota: z.string({
    required_error: 'Kab/Kota wajib diisi'
  }),
  kecamatan: z.string({
    required_error: 'Kecamatan wajib diisi'
  }),
  kelurahan: z.string({
    required_error: 'Kelurahan/Desa wajib diisi'
  }),
  alamat: z.string({ required_error: 'Alamat wajib diisi' }).max(255, {
    message: 'Alamat tidak boleh lebih dari 255 karakter'
  }),
  rt: z.string({
    required_error: 'RT wajib diisi'
  }),
  rw: z.string({
    required_error: 'RW wajib diisi'
  }),
  penghasilan_sebelum_pandemi: z.coerce
    .number({
      required_error: 'Penghasilan sebelum pandemi wajib diisi',
      invalid_type_error: 'Penghasilan sebelum pandemi wajib diisi'
    })
    .int()
    .positive({
      message: 'Penghasilan sebelum pandemi wajib diisi'
    }),
  penghasilan_setelah_pandemi: z.coerce
    .number({
      required_error: 'Penghasilan setelah pandemi wajib diisi',
      invalid_type_error: 'Penghasilan setelah pandemi wajib diisi'
    })
    .int()
    .positive({
      message: 'Penghasilan setelah pandemi wajib diisi'
    }),
  alasan: z.string({
    required_error: 'Alasan membutuhkan bantuan wajib diisi'
  })
})

export default function Home() {
  const [isChecked, setIsChecked] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [isCustom, setIsCustom] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (data) => {
    console.log(data)

    const ktpReader = new FileReader()
    const kkReader = new FileReader()

    if (data.foto_ktp) {
      ktpReader.onload = () => {
        data.foto_ktp = ktpReader.result
      }

      ktpReader.readAsDataURL(data.foto_ktp)
    }

    if (data.foto_kk) {
      kkReader.onload = () => {
        data.foto_kk = kkReader.result
      }

      kkReader.readAsDataURL(data.foto_kk)
    }

    setSubmissionResult(null)

    setTimeout(() => {
      const isSuccess = Math.random() > 0.5

      if (isSuccess) {
        localStorage.setItem('formData', JSON.stringify(data))
        router.push('/view')
      } else {
        setSubmissionResult('failure')
      }
    }, 1500)
  }

  return (
    <div className="flex justify-center mt-20 mb-5 flex-col items-center w-full">
      <div>
        <h1 className="text-2xl">Form Bansos</h1>
        {submissionResult === 'failure' && <p className="text-red-500 pt-3">Submit gagal. Coba lagi</p>}
      </div>
      <div className="mt-10 w-1/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Masukkan NIK" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_kk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Masukkan Nomor Kartu Keluarga" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto_ktp"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Foto KTP</FormLabel>
                  <FormControl>
                    <Input {...fieldProps} type="file" onChange={(event) => onChange(event.target.files && event.target.files[0])} accept="image/*" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto_kk"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Foto Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input {...fieldProps} type="file" onChange={(event) => onChange(event.target.files && event.target.files[0])} accept="image/*" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="umur"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Umur</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Masukkan Umur" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provinsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provinsi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Provinsi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kab/Kota</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Kab/Kota" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kecamatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kecamatan</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Kecamatan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kelurahan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelurahan/Desa</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Kelurahan/Desa" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Masukkan Alamat" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RT</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nomor RT" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RW</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nomor RW" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="penghasilan_sebelum_pandemi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Penghasilan sebelum pandemi</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Masukkan Penghasilan sebelum pandemi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="penghasilan_setelah_pandemi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Penghasilan setelah pandemi</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="numeric" {...field} placeholder="Masukkan Penghasilan setelah pandemi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alasan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan membutuhkan bantuan</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        if (value === 'lainnya') {
                          setIsCustom(true)
                          form.setValue('alasan', '')
                        } else {
                          setIsCustom(false)
                          field.onChange(value)
                        }
                      }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Alasan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kehilangan pekerjaan">Kehilangan pekerjaan</SelectItem>
                        <SelectItem value="Kepala keluarga">Kepala keluarga</SelectItem>
                        <SelectItem value="Tergolong fakir/miskin">Tergolong fakir/miskin</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {isCustom && (
                    <FormControl>
                      <Input placeholder="Jelaskan alasan lainnya" {...form.register('alasan')} />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-x-1">
              <Checkbox id="terms" checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
              <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-4">
                “Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.”
              </label>
            </div>
            <Button className="w-full" disabled={!isChecked} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
