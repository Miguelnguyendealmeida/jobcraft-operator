'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Loader from '@/components/Loader'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      const response = await fetch('/api/jobs/match', { cache: 'no-store' })
      const result = await response.json()
      setJobs(result.jobs)
      setLoading(false)
    }

    const fetchSavedLetters = async () => {
      const { data, error } = await supabase
        .from('generated_letters')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)

      if (error) {
        console.error(error)
        return
      }
      setSavedLetters(data)
    }

    fetchJobs()
    fetchSavedLetters()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateLetter = async (job: any) => {
    setGenerating(true)
    const response = await fetch('/api/letter/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cvData: {}, jobData: job }),
    })

    const result = await response.json()
    setGenerating(false)

    if (result.error) {
      toast.error('Failed to generate the letter.')
    } else {
      toast.success('Letter generated successfully!')
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p>{job.company}</p>
            <button
              className="mt-2 p-2 bg-green-500 text-white rounded w-full"
              onClick={() => generateLetter(job)}
              disabled={generating}
            >
              {generating ? 'Generating...' : 'Generate Letter'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
