export interface AuditInfo {
  email: string;
  timestamp: string;
}

export interface MedicalTerm {
  id: string;
  term: string;
  definition: string;
  category: 'Diagnosis' | 'Procedure' | 'Laboratory' | 'Medication' | 'Anatomy' | 'Symptom';
  code?: string;
  codeSystem?: 'ICD-10' | 'SNOMED CT' | 'LOINC' | 'CPT' | 'RxNorm' | 'HCPCS';
  // Audit fields
  createdBy?: AuditInfo;
  updatedBy?: AuditInfo;
}

export const medicalTerms: MedicalTerm[] = [
  // Diagnoses
  {
    id: '1',
    term: 'Hypertension',
    definition:
      'A chronic medical condition in which the blood pressure in the arteries is persistently elevated.',
    category: 'Diagnosis',
    code: 'I10',
    codeSystem: 'ICD-10',
  },
  {
    id: '2',
    term: 'Type 2 Diabetes Mellitus',
    definition:
      'A metabolic disorder characterized by high blood sugar, insulin resistance, and relative lack of insulin.',
    category: 'Diagnosis',
    code: 'E11',
    codeSystem: 'ICD-10',
  },
  {
    id: '3',
    term: 'Acute Myocardial Infarction',
    definition:
      'Commonly known as a heart attack, occurs when blood flow decreases or stops to a part of the heart, causing damage to the heart muscle.',
    category: 'Diagnosis',
    code: 'I21',
    codeSystem: 'ICD-10',
  },
  {
    id: '4',
    term: 'Pneumonia',
    definition:
      'An inflammatory condition of the lung primarily affecting the alveoli, typically caused by infection.',
    category: 'Diagnosis',
    code: 'J18.9',
    codeSystem: 'ICD-10',
  },
  {
    id: '5',
    term: 'Chronic Obstructive Pulmonary Disease',
    definition:
      'A type of progressive lung disease characterized by long-term respiratory symptoms and airflow limitation.',
    category: 'Diagnosis',
    code: 'J44',
    codeSystem: 'ICD-10',
  },
  // Procedures
  {
    id: '6',
    term: 'Appendectomy',
    definition:
      'A surgical operation to remove the appendix when it has become inflamed (appendicitis).',
    category: 'Procedure',
    code: '44950',
    codeSystem: 'CPT',
  },
  {
    id: '7',
    term: 'Colonoscopy',
    definition:
      'An endoscopic examination of the large bowel and distal part of the small bowel using a camera on a flexible tube.',
    category: 'Procedure',
    code: '45378',
    codeSystem: 'CPT',
  },
  {
    id: '8',
    term: 'Magnetic Resonance Imaging',
    definition:
      'A medical imaging technique using magnetic fields and radio waves to generate detailed images of organs and tissues.',
    category: 'Procedure',
    code: '70553',
    codeSystem: 'CPT',
  },
  // Laboratory
  {
    id: '9',
    term: 'Complete Blood Count',
    definition:
      'A blood test used to evaluate overall health and detect a wide range of disorders, including anemia, infection, and leukemia.',
    category: 'Laboratory',
    code: '26604-2',
    codeSystem: 'LOINC',
  },
  {
    id: '10',
    term: 'Hemoglobin A1c',
    definition:
      'A blood test that measures average blood sugar levels over the past 2-3 months, used to diagnose and monitor diabetes.',
    category: 'Laboratory',
    code: '4548-4',
    codeSystem: 'LOINC',
  },
  {
    id: '11',
    term: 'Basic Metabolic Panel',
    definition:
      'A group of blood tests that measure electrolytes, blood sugar, and kidney function.',
    category: 'Laboratory',
    code: '24320-4',
    codeSystem: 'LOINC',
  },
  {
    id: '12',
    term: 'Lipid Panel',
    definition:
      'A blood test that measures fats and fatty substances used as a source of energy by the body, including cholesterol and triglycerides.',
    category: 'Laboratory',
    code: '24331-1',
    codeSystem: 'LOINC',
  },
  // Medications
  {
    id: '13',
    term: 'Metformin',
    definition:
      'A first-line medication for the treatment of type 2 diabetes, particularly in people who are overweight.',
    category: 'Medication',
    code: '6809',
    codeSystem: 'RxNorm',
  },
  {
    id: '14',
    term: 'Lisinopril',
    definition:
      'An ACE inhibitor used to treat high blood pressure, heart failure, and after heart attacks.',
    category: 'Medication',
    code: '29046',
    codeSystem: 'RxNorm',
  },
  {
    id: '15',
    term: 'Atorvastatin',
    definition:
      'A statin medication used to prevent cardiovascular disease and treat abnormal lipid levels.',
    category: 'Medication',
    code: '83367',
    codeSystem: 'RxNorm',
  },
  // Anatomy
  {
    id: '16',
    term: 'Left Ventricle',
    definition:
      'One of four chambers of the heart, located in the bottom left portion, responsible for pumping oxygenated blood to the body.',
    category: 'Anatomy',
    code: '87878005',
    codeSystem: 'SNOMED CT',
  },
  {
    id: '17',
    term: 'Cerebral Cortex',
    definition:
      'The outer layer of neural tissue of the cerebrum, playing a key role in memory, attention, perception, and cognition.',
    category: 'Anatomy',
    code: '16973008',
    codeSystem: 'SNOMED CT',
  },
  // Symptoms
  {
    id: '18',
    term: 'Dyspnea',
    definition: 'Difficult or labored breathing, commonly known as shortness of breath.',
    category: 'Symptom',
    code: '267036007',
    codeSystem: 'SNOMED CT',
  },
  {
    id: '19',
    term: 'Tachycardia',
    definition:
      'A heart rate that exceeds the normal resting rate, generally over 100 beats per minute in adults.',
    category: 'Symptom',
    code: '3424008',
    codeSystem: 'SNOMED CT',
  },
  {
    id: '20',
    term: 'Edema',
    definition: "Swelling caused by excess fluid trapped in the body's tissues.",
    category: 'Symptom',
    code: '79654002',
    codeSystem: 'SNOMED CT',
  },
];

export const categories = [
  'All',
  'Diagnosis',
  'Procedure',
  'Laboratory',
  'Medication',
  'Anatomy',
  'Symptom',
] as const;

export const codeSystems = [
  'All',
  'ICD-10',
  'SNOMED CT',
  'LOINC',
  'CPT',
  'RxNorm',
  'HCPCS',
] as const;
