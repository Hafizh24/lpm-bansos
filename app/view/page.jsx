'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const View = () => {
  const router = useRouter()
  const [formData, setFormData] = useState(null)

  console.log(formData)
  // console.log(formData?.foto_ktp)

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData'))

    if (storedFormData) {
      setFormData(storedFormData)
    }
  }, [router])

  return (
    <div className="flex flex-col justify-center items-center pt-20 gap-5">
      <h1 className="text-3xl mb-10">Preview Data</h1>
      <p>Nama: {formData?.nama}</p>
      <p>NIK: {formData?.nik}</p>
      <p>Nomor Kartu Keluarga: {formData?.no_kk}</p>
      <div className="flex flex-col gap-y-3 items-center">
        <p>Foto KTP</p>
        {formData?.foto_ktp && <Image src={formData?.foto_ktp} alt="" width={120} height={100} />}
      </div>
      <div className="flex flex-col gap-y-3 items-center">
        <p>Foto KK</p>
        {formData?.foto_kk && <Image src={formData?.foto_kk} alt="" width={120} height={100} />}
      </div>
      <p>Umur: {formData?.umur}</p>
      <p>Jenis Kelamin: {formData?.jk}</p>
      <p>Provinsi: {formData?.provinsi}</p>
      <p>Kab/Kota: {formData?.kota}</p>
      <p>Kecamatan: {formData?.kecamatan}</p>
      <p>Kelurahan/Desa: {formData?.kelurahan}</p>
      <p>Alamat: {formData?.alamat}</p>
      <p>RW: {formData?.rt}</p>
      <p>RT: {formData?.rw}</p>
      <p>
        Penghasilan sebelum pandemi: {formData?.penghasilan_sebelum_pandemi.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
      </p>
      <p>
        Penghasilan setelah pandemi: {formData?.penghasilan_setelah_pandemi.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
      </p>
      <p>Alasan membutuhkan bantuan: {formData?.alasan}</p>
    </div>
  )
}

export default View
