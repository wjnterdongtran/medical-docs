# DiagnosticReport

Records results and interpretations of diagnostic tests and procedures.

## Resource Overview

The DiagnosticReport resource represents the findings and interpretation of diagnostic tests performed on patients. This includes laboratory tests, imaging studies, pathology reports, and other diagnostic procedures. The resource combines the report metadata with references to the detailed observations and results.

## Key Fields

### Required Fields

- **resourceType**: Must be `"DiagnosticReport"`
- **status**: The status of the report
- **code**: Type of diagnostic report
- **subject**: Reference to the Patient

### Important Optional Fields

- **identifier**: Business identifier for the report
- **basedOn**: Request or order that this report fulfills
- **category**: Service category (LAB, RAD, etc.)
- **effectiveDateTime**: Clinically relevant time
- **issued**: When the report was issued
- **performer**: Who performed the test
- **resultsInterpreter**: Who interpreted the results
- **specimen**: Specimens used
- **result**: Observations included in the report
- **conclusion**: Clinical interpretation of results
- **conclusionCode**: Coded conclusions
- **presentedForm**: Entire report as PDF or image

## Field Descriptions

### status

The status of the diagnostic report:

- **registered**: Report has been registered but not yet available
- **partial**: Report is partially available
- **preliminary**: Preliminary results available
- **final**: Final verified results
- **amended**: Report has been modified after final
- **corrected**: Report has been corrected after final
- **appended**: Additional information added
- **cancelled**: Report cancelled
- **entered-in-error**: Report entered in error
- **unknown**: Status unknown

### category

Service category of the diagnostic report:

- **LAB**: Laboratory
- **RAD**: Radiology/Imaging
- **PAT**: Pathology
- **AU**: Audiology
- **OTH**: Other

Uses codes from the [v2-0074 Diagnostic Service Section](http://terminology.hl7.org/CodeSystem/v2-0074) value set.

### code

Describes the type of diagnostic report. Common coding systems:

- **LOINC**: [http://loinc.org](http://loinc.org) - Laboratory test codes
- **SNOMED CT**: [http://snomed.info/sct](http://snomed.info/sct) - Clinical procedure codes
- **Local codes**: Custom laboratory test catalogs

### subject

Reference to the Patient (or Group) for whom the report is about. This is required to associate results with the correct patient.

### effectiveDateTime

The clinically relevant time for the report:

- For specimen-based tests: Collection time
- For imaging: Time of the imaging procedure
- For other tests: Time most relevant clinically

Can also use `effectivePeriod` for tests performed over a time range.

### issued

When the report was issued/published. This is when the report became available.

### performer

Reference to the organization or practitioner responsible for performing the diagnostic service:

- Organization (laboratory, imaging center)
- Practitioner
- PractitionerRole

### resultsInterpreter

Who was responsible for interpreting the results:

- Practitioner (radiologist, pathologist, etc.)
- PractitionerRole
- Organization

### result

References to Observation resources that are part of this report. These contain the actual test results and values.

### conclusion

Clinical interpretation and summary of the diagnostic report in textual form. This is the radiologist's impression, pathologist's diagnosis, or laboratory director's interpretation.

### conclusionCode

Coded conclusions or diagnoses:

- ICD-10 codes for diagnoses
- SNOMED CT codes for findings
- LOINC codes for interpretations

### presentedForm

The entire report in its original format:

- **contentType**: MIME type (application/pdf, image/jpeg, etc.)
- **data**: Base64-encoded report data
- **title**: Title of the document
- **creation**: When the document was created

This is commonly used for scanned reports, imaging reports, or PDF lab reports.

## Complete Example

### Lab Report with Parameters

```json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "labReport",
      "resource": {
        "resourceType": "DiagnosticReport",
        "status": "final",
        "category": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
                "code": "LAB",
                "display": "Laboratory"
              }
            ]
          }
        ],
        "subject": {
          "reference": "Patient/4cc6fd69f81042a0b6d123e2080a7c1a",
          "type": "Patient"
        },
        "presentedForm": [
          {
            "data": "(base64 encoded PDF data - truncated)",
            "contentType": "application/pdf"
          }
        ],
        "effectiveDateTime": "2024-02-25T14:46:39.219042",
        "code": {
          "coding": []
        }
      }
    },
    {
      "name": "labTestCollection",
      "part": [
        {
          "name": "labTest",
          "resource": {
            "resourceType": "Observation",
            "code": {
              "text": "Hepatic Function Panel (7)",
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "24325-3",
                  "display": "Hepatic Function Panel (7)"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "status": "final"
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "2885-2",
                  "display": "Protein, Total"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "value": "9.6",
              "unit": "g/dL",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "6.0" },
                "high": { "value": "8.5" },
                "text": "6.0-8.5"
              }
            ],
            "interpretation": [
              {
                "text": "Abnormal",
                "coding": [
                  {
                    "code": "A",
                    "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    "display": "Abnormal"
                  }
                ]
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "coding": [
                {
                  "code": "1751-7",
                  "system": "http://loinc.org",
                  "display": "Albumin"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "g/dL",
              "value": "3.8",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "3.6" },
                "high": { "value": "4.6" },
                "text": "3.6-4.6"
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "text": "Bilirubin, Total",
              "coding": [
                {
                  "code": "1975-2",
                  "system": "http://loinc.org",
                  "display": "Bilirubin, Total"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "mg/dL",
              "value": "0.3",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "0.0" },
                "high": { "value": "1.2" },
                "text": "0.0-1.2"
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "text": "Alkaline Phosphatase",
              "coding": [
                {
                  "code": "6768-6",
                  "system": "http://loinc.org",
                  "display": "Alkaline Phosphatase"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "IU/L",
              "value": "83.6",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "44.0" },
                "high": { "value": "121.0" },
                "text": "44-121"
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "text": "AST (SGOT)",
              "coding": [
                {
                  "code": "1920-8",
                  "system": "http://loinc.org",
                  "display": "AST (SGOT)"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "IU/L",
              "value": "19.4",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "0.0" },
                "high": { "value": "40.0" },
                "text": "0-40"
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "text": "ALT (SGPT)",
              "coding": [
                {
                  "code": "1742-6",
                  "system": "http://loinc.org",
                  "display": "ALT (SGPT)"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "IU/L",
              "value": "13.5",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "0.0" },
                "high": { "value": "44.0" },
                "text": "0-44"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## Usage Notes

1. **Status Management**: Update status appropriately as results become available (registered → preliminary → final).

2. **Presented Form**: Include the original report document (PDF, image) in `presentedForm` for reference and archival purposes.

3. **Observation Linking**: Link individual test results through the `result` array to maintain the relationship between the report and individual values.

4. **Panel Hierarchy**: For test panels (e.g., Comprehensive Metabolic Panel), create a hierarchy with panel-level and individual test-level Observations.

5. **Effective Date**: Use `effectiveDateTime` for the clinically relevant time (specimen collection, imaging time), not when the report was created.

6. **Interpreters**: Include `resultsInterpreter` for reports requiring specialized interpretation (radiology, pathology).

7. **Coding**: Use standard codes (LOINC for labs, SNOMED for procedures) for interoperability.

8. **Corrections**: Use appropriate status (amended, corrected) when modifying final reports, maintaining audit trail.

## Common Report Types

### Laboratory Report

```json
{
  "category": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
      "code": "LAB"
    }]
  }],
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "24323-8",
      "display": "Comprehensive metabolic panel"
    }]
  }
}
```

### Radiology Report

```json
{
  "category": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
      "code": "RAD"
    }]
  }],
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "36643-5",
      "display": "XR Chest Views"
    }]
  }
}
```

## FHIR Specification References

- [DiagnosticReport Resource](https://hl7.org/fhir/diagnosticreport.html)
- [v2-0074 Diagnostic Service Section](http://terminology.hl7.org/CodeSystem/v2-0074)
- [Diagnostic Report Status Codes](http://hl7.org/fhir/diagnostic-report-status)
- [US Core DiagnosticReport Lab Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-diagnosticreport-lab.html)
- [LOINC](https://loinc.org/)
