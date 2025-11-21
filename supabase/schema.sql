-- Supabase Schema for Medical Dictionary
-- Run this in your Supabase SQL Editor to set up the required tables

-- ============================================
-- 1. Profiles Table (for storing usernames)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster username lookups
CREATE INDEX IF NOT EXISTS profiles_username_idx ON profiles(username);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      SPLIT_PART(NEW.email, '@', 1)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. Medical Terms Table
-- ============================================
CREATE TABLE IF NOT EXISTS medical_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Diagnosis', 'Procedure', 'Laboratory', 'Medication', 'Anatomy', 'Symptom')),
  code TEXT,
  code_system TEXT CHECK (code_system IS NULL OR code_system IN ('ICD-10', 'SNOMED CT', 'LOINC', 'CPT', 'RxNorm', 'HCPCS')),

  -- Audit fields for created by
  created_by_email TEXT,
  created_by_username TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Audit fields for updated by
  updated_by_email TEXT,
  updated_by_username TEXT,
  updated_at TIMESTAMPTZ
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS medical_terms_term_idx ON medical_terms(term);
CREATE INDEX IF NOT EXISTS medical_terms_category_idx ON medical_terms(category);
CREATE INDEX IF NOT EXISTS medical_terms_code_system_idx ON medical_terms(code_system);

-- Enable RLS
ALTER TABLE medical_terms ENABLE ROW LEVEL SECURITY;

-- Policies for medical_terms table
-- Allow all authenticated users to read terms
CREATE POLICY "Authenticated users can view terms" ON medical_terms
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to insert terms
CREATE POLICY "Authenticated users can insert terms" ON medical_terms
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to update terms
CREATE POLICY "Authenticated users can update terms" ON medical_terms
  FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users to delete terms
CREATE POLICY "Authenticated users can delete terms" ON medical_terms
  FOR DELETE TO authenticated USING (true);

-- ============================================
-- 3. Optional: Seed initial medical terms
-- ============================================
-- Uncomment and run this section if you want to seed the database with initial terms

/*
INSERT INTO medical_terms (term, definition, category, code, code_system) VALUES
  ('Hypertension', 'A chronic medical condition in which the blood pressure in the arteries is persistently elevated.', 'Diagnosis', 'I10', 'ICD-10'),
  ('Type 2 Diabetes Mellitus', 'A metabolic disorder characterized by high blood sugar, insulin resistance, and relative lack of insulin.', 'Diagnosis', 'E11', 'ICD-10'),
  ('Acute Myocardial Infarction', 'Commonly known as a heart attack, occurs when blood flow decreases or stops to a part of the heart, causing damage to the heart muscle.', 'Diagnosis', 'I21', 'ICD-10'),
  ('Pneumonia', 'An inflammatory condition of the lung primarily affecting the alveoli, typically caused by infection.', 'Diagnosis', 'J18.9', 'ICD-10'),
  ('Chronic Obstructive Pulmonary Disease', 'A type of progressive lung disease characterized by long-term respiratory symptoms and airflow limitation.', 'Diagnosis', 'J44', 'ICD-10'),
  ('Appendectomy', 'A surgical operation to remove the appendix when it has become inflamed (appendicitis).', 'Procedure', '44950', 'CPT'),
  ('Colonoscopy', 'An endoscopic examination of the large bowel and distal part of the small bowel using a camera on a flexible tube.', 'Procedure', '45378', 'CPT'),
  ('Magnetic Resonance Imaging', 'A medical imaging technique using magnetic fields and radio waves to generate detailed images of organs and tissues.', 'Procedure', '70553', 'CPT'),
  ('Complete Blood Count', 'A blood test used to evaluate overall health and detect a wide range of disorders, including anemia, infection, and leukemia.', 'Laboratory', '26604-2', 'LOINC'),
  ('Hemoglobin A1c', 'A blood test that measures average blood sugar levels over the past 2-3 months, used to diagnose and monitor diabetes.', 'Laboratory', '4548-4', 'LOINC'),
  ('Basic Metabolic Panel', 'A group of blood tests that measure electrolytes, blood sugar, and kidney function.', 'Laboratory', '24320-4', 'LOINC'),
  ('Lipid Panel', 'A blood test that measures fats and fatty substances used as a source of energy by the body, including cholesterol and triglycerides.', 'Laboratory', '24331-1', 'LOINC'),
  ('Metformin', 'A first-line medication for the treatment of type 2 diabetes, particularly in people who are overweight.', 'Medication', '6809', 'RxNorm'),
  ('Lisinopril', 'An ACE inhibitor used to treat high blood pressure, heart failure, and after heart attacks.', 'Medication', '29046', 'RxNorm'),
  ('Atorvastatin', 'A statin medication used to prevent cardiovascular disease and treat abnormal lipid levels.', 'Medication', '83367', 'RxNorm'),
  ('Left Ventricle', 'One of four chambers of the heart, located in the bottom left portion, responsible for pumping oxygenated blood to the body.', 'Anatomy', '87878005', 'SNOMED CT'),
  ('Cerebral Cortex', 'The outer layer of neural tissue of the cerebrum, playing a key role in memory, attention, perception, and cognition.', 'Anatomy', '16973008', 'SNOMED CT'),
  ('Dyspnea', 'Difficult or labored breathing, commonly known as shortness of breath.', 'Symptom', '267036007', 'SNOMED CT'),
  ('Tachycardia', 'A heart rate that exceeds the normal resting rate, generally over 100 beats per minute in adults.', 'Symptom', '3424008', 'SNOMED CT'),
  ('Edema', 'Swelling caused by excess fluid trapped in the body''s tissues.', 'Symptom', '79654002', 'SNOMED CT')
ON CONFLICT DO NOTHING;
*/
