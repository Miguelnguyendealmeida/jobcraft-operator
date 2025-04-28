'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function UploadCV() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [parsedData, setParsedData] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const uploadFile = async () => {
    if (!file) return

    setUploading(true)
    const { data, error } = await supabase.storage
      .from('cv')
      .upload(`public/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error(error)
      setUploading(false)
      return
    }

    // Call the API to parse the CV
    const response = await fetch('/api/profile/parsed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filePath: `public/${file.name}` }),
    })

    const result = await response.json()
    setParsedData(result.parsedData)
    setUploading(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={uploadFile}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload CV'}
      </button>
      {parsedData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Parsed CV Data:</h3>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
