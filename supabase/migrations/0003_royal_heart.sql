/*
  # Create test-related tables

  1. New Tables
    - `test_submissions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `aptitude_answers` (jsonb)
      - `coding_answers` (jsonb)
      - `time_spent` (integer)
      - `suspicious_activities` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `test_submissions` table
    - Add policy for authenticated users to insert their own submissions
    - Add policy for authenticated users to view their own submissions
*/

CREATE TABLE IF NOT EXISTS test_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    aptitude_answers jsonb NOT NULL,
    coding_answers jsonb NOT NULL,
    time_spent integer NOT NULL,
    suspicious_activities jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE test_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own test submissions"
    ON test_submissions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() IN (
        SELECT user_id FROM profiles WHERE id = test_submissions.user_id
    ));

CREATE POLICY "Users can view their own test submissions"
    ON test_submissions
    FOR SELECT
    TO authenticated
    USING (auth.uid() IN (
        SELECT user_id FROM profiles WHERE id = test_submissions.user_id
    ));

-- Create updated_at trigger
CREATE TRIGGER update_test_submissions_updated_at
    BEFORE UPDATE ON test_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();