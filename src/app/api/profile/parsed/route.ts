import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Configuration, OpenAIApi } from 'openai'

export async function POST(request: Request) {
  const { filePath } = await request.json()

  if (!filePath) {
    return NextResponse.json({ error: 'File path is required' }, { status: 400 })
  }

  // Retrieve the file from Supabase Storage
  const { data: file, error: downloadError } = await supabase.storage.from('cv').download(filePath)
  if (downloadError || !file) {
    return NextResponse.json({ error: downloadError?.message || 'Download failed' }, { status: 500 })
  }

  // Convert file Blob to text
  const fileText = await file.text()

  // Initialize OpenAI API
  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }))

  // Parse the CV
  const parsedData = await openai.createChatCompletion({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a CV parsing assistant. Return structured JSON only with fields education, experience, and skills.' },
      { role: 'user', content: `Here is a resume:\n\n${fileText}` }
    ],
    temperature: 0.2,
  })

  return NextResponse.json({ parsedData: parsedData.data.choices[0].message?.content })
}
