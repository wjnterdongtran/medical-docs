# Condition

Records clinical conditions, problems, diagnoses, or other health events relevant to a patient.

## Resource Overview

The Condition resource represents a clinical condition, problem, diagnosis, or other event, situation, issue, or clinical concept that has risen to a level of concern for the patient. It can be used to record both current and historical conditions.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Condition"`
- **subject**: Reference to the Patient resource
- **code**: Identification of the condition

### Important Optional Fields

- **clinicalStatus**: The clinical status of the condition (active, recurrence, relapse, inactive, remission, resolved)
- **verificationStatus**: The verification status (unconfirmed, provisional, differential, confirmed, refuted, entered-in-error)
- **category**: Category of the condition (problem-list-item, encounter-diagnosis)
- **severity**: Subjective severity of the condition (mild, moderate, severe)
- **onsetDateTime**: When the condition began
- **abatementDateTime**: When the condition resolved or went into remission
- **recordedDate**: Date the condition was first recorded
- **recorder**: Who recorded the condition
- **encounter**: Encounter when the condition was first asserted
- **note**: Additional notes about the condition

## Field Descriptions

### clinicalStatus

Indicates the current clinical status of the condition:

- **active**: The condition is active and ongoing
- **recurrence**: The condition has returned after a period of remission
- **relapse**: The condition has returned after being resolved
- **inactive**: The condition is not currently active
- **remission**: The condition is in remission
- **resolved**: The condition has been resolved

Uses the [Condition Clinical Status Codes](http://terminology.hl7.org/CodeSystem/condition-clinical) value set.

### verificationStatus

Indicates the verification status of the condition:

- **unconfirmed**: The condition has not been confirmed
- **provisional**: This is a tentative diagnosis
- **differential**: One of a set of potential diagnoses
- **confirmed**: The condition has been confirmed
- **refuted**: The condition has been refuted
- **entered-in-error**: The condition was entered in error

Uses the [Condition Verification Status Codes](http://terminology.hl7.org/CodeSystem/condition-ver-status) value set.

### category

Categories help classify the condition:

- **problem-list-item**: An item on the patient's problem list
- **encounter-diagnosis**: A diagnosis made during an encounter
- **health-concern**: A health concern or risk

Uses the [Condition Category Codes](http://terminology.hl7.org/CodeSystem/condition-category) value set.

### code

The identification of the condition, problem, or diagnosis. Commonly coded using:

- **ICD-10-CM**: [http://hl7.org/fhir/sid/icd-10-cm](http://hl7.org/fhir/sid/icd-10-cm) - International Classification of Diseases, 10th Revision, Clinical Modification
- **SNOMED CT**: [http://snomed.info/sct](http://snomed.info/sct) - Systematized Nomenclature of Medicine Clinical Terms

### severity

Subjective assessment of the severity:

- **mild**: Mild severity
- **moderate**: Moderate severity
- **severe**: Severe severity

### onset[x]

When the condition started. Can be represented as:

- **onsetDateTime**: Specific date/time
- **onsetAge**: Age when started
- **onsetPeriod**: Period when started
- **onsetRange**: Range of dates
- **onsetString**: Text description

### abatement[x]

When the condition resolved or went into remission. Can be:

- **abatementDateTime**: Specific date/time of resolution
- **abatementAge**: Age when resolved
- **abatementPeriod**: Period when resolved
- **abatementRange**: Range of dates
- **abatementString**: Text description
- **abatementBoolean**: True if resolved

## Complete Example

```json
{
  "resourceType": "Condition",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
        "code": "resolved",
        "display": "Resolved"
      }
    ],
    "text": "Resolved"
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        "code": "confirmed",
        "display": "Confirmed"
      }
    ],
    "text": "Confirmed"
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/condition-category",
          "code": "encounter-diagnosis",
          "display": "Encounter Diagnosis"
        }
      ],
      "text": "Encounter Diagnosis"
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10-cm",
        "code": "V97.21XS",
        "display": "Parachutist entangled in object, sequela"
      }
    ],
    "text": "Parachutist entangled in object, sequela"
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "onsetDateTime": "2023-06-15",
  "abatementDateTime": "2023-06-17",
  "recordedDate": "2023-06-18T15:00:00-04:00",
  "recorder": {
    "reference": "Practitioner/{{practitioner_a_id}}"
  },
  "note": [
    {
      "text": "Condition note"
    }
  ]
}
```

## Usage Notes

1. **Clinical vs Verification Status**: Both statuses should be maintained. A condition can be clinically active but have unconfirmed verification status.

2. **Category Classification**: Use `encounter-diagnosis` for diagnoses made during encounters and `problem-list-item` for ongoing problems on the patient's problem list.

3. **Onset and Abatement**: Document both when the condition started and when it resolved to maintain a complete timeline.

4. **Coding Systems**: Use ICD-10-CM for billing-related diagnoses and SNOMED CT for clinical documentation.

5. **Historical Records**: Keep resolved conditions in the record with appropriate `clinicalStatus` and `abatementDateTime` for medical history.

6. **Evidence**: Link to supporting evidence like observations or diagnostic reports when available.

7. **Encounter Association**: Always link conditions to the encounter where they were diagnosed for proper context.

## FHIR Specification References

- [Condition Resource](https://hl7.org/fhir/condition.html)
- [Condition Clinical Status Codes](http://terminology.hl7.org/CodeSystem/condition-clinical)
- [Condition Verification Status Codes](http://terminology.hl7.org/CodeSystem/condition-ver-status)
- [Condition Category Codes](http://terminology.hl7.org/CodeSystem/condition-category)
- [US Core Condition Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-condition-encounter-diagnosis.html)
