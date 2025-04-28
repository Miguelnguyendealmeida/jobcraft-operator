import { NextResponse } from 'next/server'

export async function GET() {
  const matchedJobs = [
    { id: 1, title: 'Software Engineer', company: 'Tech Corp' },
    { id: 2, title: 'Frontend Developer', company: 'Web Solutions' },
  ]

  return NextResponse.json({ jobs: matchedJobs })
}
