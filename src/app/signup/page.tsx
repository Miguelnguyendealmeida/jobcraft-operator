'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'react-toastify'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email.toLowerCase())
  }

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      toast.error('Invalid email address')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Account created successfully!')
      router.push('/dashboard')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <form role="form" aria-labelledby="signup-form" className="flex flex-col space-y-4">
          <label id="email-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            aria-labelledby="email-label"
            className="p-4 border rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label id="password-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            aria-labelledby="password-label"
            className="p-4 border rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            aria-label="Submit Signup Form"
            onClick={handleSignup}
            className="p-4 bg-blue-500 text-white rounded w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
