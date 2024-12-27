/*
  # Resume Management System

  1. New Tables
    - `resumes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `file_name` (text)
      - `original_name` (text)
      - `status` (enum: pending, processed, failed)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `resume_data`
      - `id` (uuid, primary key)
      - `resume_id` (uuid, references resumes)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `summary` (text)
      - `skills` (text[])
      - `parsed_data` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for secure access
*/

-- Create resume status enum
CREATE TYPE resume_status AS ENUM ('pending', 'processed', 'failed');

-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    file_name text NOT NULL,
    original_name text NOT NULL,
    status resume_status DEFAULT 'pending',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create resume_data table
CREATE TABLE IF NOT EXISTS resume_data (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id uuid REFERENCES resumes(id) ON DELETE CASCADE,
    full_name text,
    email text,
    phone text,
    summary text,
    skills text[],
    education jsonb[],
    experience jsonb[],
    parsed_data jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_data ENABLE ROW LEVEL SECURITY;

-- Policies for resumes table
CREATE POLICY "Users can view their own resumes"
    ON resumes FOR SELECT
    TO authenticated
    USING (auth.uid() IN (
        SELECT user_id FROM profiles WHERE id = resumes.user_id
    ));

CREATE POLICY "Users can insert their own resumes"
    ON resumes FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() IN (
        SELECT user_id FROM profiles WHERE id = resumes.user_id
    ));

-- Policies for resume_data table
CREATE POLICY "Users can view their own resume data"
    ON resume_data FOR SELECT
    TO authenticated
    USING (resume_id IN (
        SELECT id FROM resumes WHERE user_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid()
        )
    ));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_resumes_updated_at
    BEFORE UPDATE ON resumes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_data_updated_at
    BEFORE UPDATE ON resume_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();