'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')
  const supabase = await createClient()

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Credenciais inválidas')
  }
  
  const data = {email, password}

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/')
  }

  revalidatePath('/feed', 'layout')
  redirect('/feed')
}

export async function signup({email, password}: {email: string, password: string}) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({email, password})

  if (error) {
    redirect('/')
  }

  revalidatePath('/feed', 'layout')
  redirect('/feed')
}