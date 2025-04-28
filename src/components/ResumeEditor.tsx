'use client'

import { useState } from 'react'

export default function ResumeEditor({ initialResume, onSave }: { initialResume: string, onSave: (resume: string) => void }) {
  const [resume, setResume] = useState(initialResume)

  const handleSave = () => {
    onSave(resume)
  }

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="p-4 rounded border"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />
      <button className="p-2 bg-green-500 text-white rounded" onClick={handleSave}>
        Save Resume
      </button>
    </div>
  )
}
