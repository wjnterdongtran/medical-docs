# Observation

Records measurements, findings, and assertions about a patient's health status.

## Resource Overview

The Observation resource is used to record clinical measurements, lab results, vital signs, and other findings about a patient. It's one of the most versatile and commonly used FHIR resources.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Observation"`
- **status**: Status of the observation result
- **code**: What was observed/measured
- **subject**: Reference to the Patient

### Important Optional Fields

- **category**: Classification of observation type (vital-signs, laboratory, etc.)
- **effectiveDateTime**: When observation was made
- **valueQuantity**: Numeric result with units
- **valueString**: Text result
- **valueBoolean**: True/false result
- **component**: For multi-component observations (e.g., blood pressure)
- **hasMember**: For panel/group observations
- **derivedFrom**: Source observations
- **interpretation**: Clinical significance (normal, abnormal, high, low)
- **referenceRange**: Normal ranges

## Observation Patterns

### Simple Value Observation

Single measurement with a value (e.g., body weight, temperature):

```json
{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "29463-7",
      "display": "Weight"
    }]
  },
  "valueQuantity": {
    "value": 50,
    "unit": "kg"
  }
}
```

### Component Observation

Multiple related measurements (e.g., blood pressure systolic/diastolic):

```json
{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "85354-9",
      "display": "BP"
    }]
  },
  "component": [
    {
      "code": {
        "coding": [{
          "system": "http://loinc.org",
          "code": "8480-6",
          "display": "Systolic"
        }]
      },
      "valueQuantity": {"value": 120}
    },
    {
      "code": {
        "coding": [{
          "system": "http://loinc.org",
          "code": "8462-4",
          "display": "Diastolic"
        }]
      },
      "valueQuantity": {"value": 80}
    }
  ]
}
```

### Panel Observation

Groups related observations (e.g., vital signs panel):

```json
{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "85353-1",
      "display": "Vital Panel"
    }]
  },
  "hasMember": [
    {"reference": "Observation/weight-123"},
    {"reference": "Observation/bp-456"}
  ]
}
```

## Field Descriptions

### status

Current state of the observation:

- **registered**: Observation registered but not yet performed
- **preliminary**: Initial results available but not final
- **final**: Results are final and complete
- **amended**: Results have been modified after being final
- **corrected**: Results have been corrected
- **cancelled**: Observation was cancelled before completion
- **entered-in-error**: Observation should not have been recorded
- **unknown**: Status is not known

### category

Classification of observation type using [Observation Category Codes](https://terminology.hl7.org/CodeSystem-observation-category.html):

- **vital-signs**: Vital signs (BP, temp, weight, etc.)
- **laboratory**: Lab test results
- **imaging**: Imaging results
- **social-history**: Social history observations (smoking, alcohol)
- **exam**: Physical examination findings
- **survey**: Assessment tool/questionnaire results
- **therapy**: Non-medication treatment

### code

What was observed, typically using [LOINC codes](https://loinc.org/):

```json
{
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "29463-7",
        "display": "Body Weight"
      }
    ],
    "text": "Weight"
  }
}
```

### valueQuantity

Numeric results with units:

```json
{
  "valueQuantity": {
    "value": 50,
    "unit": "kg",
    "system": "http://unitsofmeasure.org",
    "code": "kg"
  }
}
```

Uses [UCUM unit codes](https://ucum.org/).

### interpretation

Clinical significance of the result:

- **N**: Normal
- **A**: Abnormal
- **H**: High
- **L**: Low
- **HH**: Critical high
- **LL**: Critical low

Uses [Observation Interpretation Codes](https://terminology.hl7.org/CodeSystem-v3-ObservationInterpretation.html).

### referenceRange

Normal ranges for comparison:

```json
{
  "referenceRange": [
    {
      "low": {"value": 3.6},
      "high": {"value": 4.6},
      "text": "3.6-4.6"
    }
  ]
}
```

### derivedFrom

References to observations this one was derived from:

```json
{
  "derivedFrom": [
    {
      "reference": "Observation/previous-observation-123"
    }
  ]
}
```

## Complete Examples

### Simple Value Observation (Weight)

```json
{
  "resourceType": "Observation",
  "status": "unknown",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "29463-7",
        "display": "Weight"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "effectiveDateTime": "2022-09-29T08:50:24.883809+00:00",
  "valueQuantity": {
    "value": 50,
    "unit": "kg"
  },
  "derivedFrom": [
    {
      "reference": "Observation/{{observation_id}}"
    }
  ]
}
```

### Component Observation (Blood Pressure)

```json
{
  "resourceType": "Observation",
  "status": "unknown",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "85354-9",
        "display": "BP"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "effectiveDateTime": "2022-06-01T08:50:24.883809+00:00",
  "derivedFrom": [
    {
      "reference": "Observation/{{observation_id}}"
    }
  ],
  "component": [
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8480-6",
            "display": "BP - Systolic"
          }
        ]
      },
      "valueQuantity": {
        "value": 100
      }
    },
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8462-4",
            "display": "BP - Diastole"
          }
        ]
      },
      "valueQuantity": {
        "value": 80
      }
    }
  ]
}
```

### Panel Observation

```json
{
  "resourceType": "Observation",
  "status": "unknown",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "85353-1",
        "display": "Vital Panel"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "effectiveDateTime": "2022-08-29T08:50:24.883809+00:00",
  "hasMember": [
    {
      "reference": "Observation/{{observation_id}}"
    },
    {
      "reference": "Observation/{{observation_id}}"
    }
  ]
}
```

## Usage Notes

1. **Choose the Right Pattern**:
   - Use simple value for single measurements
   - Use components for measurements that must stay together (BP, pregnancy test)
   - Use panels (hasMember) for grouping separate but related observations

2. **Status Management**: Use appropriate status:
   - `preliminary` for lab results pending confirmation
   - `final` for completed results
   - `amended` if results change after being finalized

3. **LOINC Codes**: Always use [LOINC codes](https://loinc.org/) for observation codes. LOINC provides standardized codes for lab tests and clinical observations.

4. **Units**: Use [UCUM units](http://unitsofmeasure.org/) for quantities (kg, mmHg, mg/dL, etc.).

5. **Reference Ranges**: Include reference ranges for lab values to aid clinical interpretation.

6. **Interpretation**: Add interpretation codes (Normal, High, Low) to help clinicians quickly assess results.

7. **Vital Signs Profile**: For vital signs, follow the [FHIR Vital Signs Profile](https://hl7.org/fhir/observation-vitalsigns.html) requirements.

## Common LOINC Codes

### Vital Signs
- **29463-7**: Body weight
- **8302-2**: Body height
- **8867-4**: Heart rate
- **9279-1**: Respiratory rate
- **8310-5**: Body temperature
- **85354-9**: Blood pressure panel
- **8480-6**: Systolic blood pressure
- **8462-4**: Diastolic blood pressure
- **2708-6**: Oxygen saturation

### Lab Tests
- **2885-2**: Protein, Total
- **1751-7**: Albumin
- **1975-2**: Bilirubin, Total
- **6768-6**: Alkaline Phosphatase
- **1920-8**: AST (SGOT)
- **1742-6**: ALT (SGPT)

## FHIR Specification References

- [Observation Resource](https://hl7.org/fhir/observation.html)
- [Vital Signs Profile](https://hl7.org/fhir/observation-vitalsigns.html)
- [US Core Observation Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-observation-lab.html)
- [LOINC Code System](https://loinc.org/)
- [UCUM Units](http://unitsofmeasure.org/)
- [Observation Category Codes](https://terminology.hl7.org/CodeSystem-observation-category.html)
