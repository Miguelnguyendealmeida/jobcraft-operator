import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
import { createClient } from '@/utils/supabase/server' // Serveur side supabase correct
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { cvData, jobData } = await request.json()

  if (!cvData || !jobData) {
    return NextResponse.json({ error: 'CV data and job data are required' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))

  const coverLetterResponse = await openai.createChatCompletion({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a professional cover letter writer. Return only the letter.' },
      { role: 'user', content: `Generate a cover letter for the job:\n${JSON.stringify(jobData)}\nbased on the CV:\n${JSON.stringify(cvData)}` }
    ],
    temperature: 0.3,
  })

  const coverLetter = coverLetterResponse.data.choices[0].message?.content

  const { data, error } = await supabase
    .from('generated_letters')
    .insert([{
      user_id: user.id,
      job_title: jobData.title,
      company_name: jobData.company,
      generated_letter: coverLetter
    }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ coverLetter, letterId: data.id })
}
