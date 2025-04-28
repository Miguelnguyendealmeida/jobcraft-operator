'use client'

import { useState } from 'react'
import UploadCV from '@/components/UploadCV'
import PDFPreview from '@/components/PDFPreview'
import ResumeEditor from '@/components/ResumeEditor'

export default function Profile() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [resume, setResume] = useState('')

  const handleSaveResume = (newResume: string) => {
    setResume(newResume)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="flex flex-col gap-4 mt-4">
        <UploadCV />
        {pdfUrl && <PDFPreview pdfUrl={pdfUrl} />}
        <ResumeEditor initialResume={resume} onSave={handleSaveResume} />
      </div>
    </div>
  )
}
