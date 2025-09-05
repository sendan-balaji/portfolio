import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase URL and Key
const supabaseUrl = 'https://wydmlwbuypeeuoqzfmse.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5ZG1sd2J1eXBlZXVvcXpmbXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3OTc3NzgsImV4cCI6MjA3MjM3Mzc3OH0.zMI4O1dZGGC2Q5eE70ihUNlojLE27IwDt76CXXZamRY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)