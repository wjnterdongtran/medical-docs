# MedicationStatement

Records a patient's medication usage or administration history.

## Resource Overview

The MedicationStatement resource represents a record of a medication that is being consumed by a patient. It may indicate that the patient is taking the medication now, has taken it in the past, or will be taking it in the future. The source of this information can be the patient, significant other (such as a family member or spouse), or a clinician.

## Key Fields

### Required Fields

- **resourceType**: Must be `"MedicationStatement"`
- **status**: Status of the medication statement
- **medication[x]**: What medication was taken
- **subject**: Reference to the Patient

### Important Optional Fields

- **identifier**: Business identifier for the statement
- **basedOn**: Request or order fulfilled by this statement
- **partOf**: Larger event (procedure, medication administration)
- **context**: Encounter or episode associated with statement
- **statusReason**: Reason for status
- **category**: Type of medication usage
- **effective[x]**: Time period when medication was/is taken
- **dateAsserted**: When statement was asserted
- **informationSource**: Person or organization providing information
- **derivedFrom**: Supporting information
- **reasonCode**: Why medication is/was taken
- **reasonReference**: Condition or observation for taking medication
- **note**: Additional information
- **dosage**: How medication was/is taken

## Field Descriptions

### status

The status of the medication statement:

- **active**: The medication is currently being taken
- **completed**: The medication is no longer being taken
- **entered-in-error**: The statement was entered in error
- **intended**: The patient intends to take the medication
- **stopped**: The medication was stopped
- **on-hold**: The medication has been paused
- **unknown**: The status is unknown
- **not-taken**: The medication was not taken

### statusReason

Reason for the current status. Common reasons include:

- Patient stopped taking medication
- Medication discontinued by provider
- Side effects
- Cost concerns
- Feeling better

### medication[x]

Identifies the medication:

- **medicationCodeableConcept**: Coded medication (RxNorm, NDC, etc.)
- **medicationReference**: Reference to a Medication resource

Common coding systems:

- **RxNorm**: [http://www.nlm.nih.gov/research/umls/rxnorm](http://www.nlm.nih.gov/research/umls/rxnorm)
- **NDC**: [http://hl7.org/fhir/sid/ndc](http://hl7.org/fhir/sid/ndc)
- **FDB**: [http://www.fdbhealth.com/](http://www.fdbhealth.com/)

### subject

Reference to the Patient who is taking or was taking the medication.

### context

Reference to the Encounter or EpisodeOfCare during which the medication statement was made or applies.

### effective[x]

The interval of time during which the medication is/was/will be taken:

- **effectiveDateTime**: Specific date
- **effectivePeriod**: Time period with start and end dates

### dateAsserted

The date when the medication statement was asserted or documented.

### informationSource

The person or organization that provided the information about the medication:

- Patient
- Practitioner
- PractitionerRole
- RelatedPerson
- Organization

### category

Type of medication statement:

- **inpatient**: Inpatient medication
- **outpatient**: Outpatient medication
- **community**: Community medication
- **patientspecified**: Patient-specified medication

Uses codes from the [Medication Statement Category Codes](http://terminology.hl7.org/CodeSystem/medication-statement-category) value set.

### reasonCode

Why the medication is being/was taken:

```json
{
  "coding": [{
    "system": "http://snomed.info/sct",
    "code": "25064002",
    "display": "Headache"
  }]
}
```

Uses condition/problem codes (SNOMED CT, ICD-10).

### reasonReference

Reference to a Condition or Observation that is the reason for the medication:

```json
{
  "reference": "Condition/diabetes-type-2"
}
```

### dosage

How the medication is/was taken:

- **text**: Free text dosage instructions
- **timing**: When medication should be taken
- **route**: How medication is/was administered
- **method**: Technique for administering
- **doseAndRate**: Amount and rate
- **maxDosePerPeriod**: Maximum dose per period

## Complete Example

```json
{
  "resourceType": "MedicationStatement",
  "status": "active",
  "medicationReference": {
    "reference": "Medication/fdb-449732",
    "display": "Tylenol PM Extra Strength 25 mg-500 mg tablet"
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "context": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "effectivePeriod": {
    "start": "2023-06-15T15:00:00-04:00",
    "end": "2023-06-25T15:00:00-04:00"
  },
  "dosage": [
    {
      "text": "1-2 tablets once daily at bedtime as needed for restless legs"
    }
  ]
}
```

## Usage Notes

1. **Patient-Reported Medications**: MedicationStatement is ideal for recording medications reported by patients during medication reconciliation.

2. **Historical Records**: Use this resource to document past medication use, including over-the-counter medications and supplements.

3. **Active vs Completed**: Use status "active" for current medications and "completed" for medications that are no longer being taken.

4. **Time Periods**: Use `effectivePeriod` to track when the patient started and stopped the medication.

5. **Source Documentation**: Always include `informationSource` to indicate whether the information came from the patient, family member, or healthcare provider.

6. **Medication Reconciliation**: MedicationStatement is commonly used during admission, transfer, and discharge for medication reconciliation.

7. **Dosage Instructions**: Include detailed `dosage` information as provided by the patient or documented in records.

8. **Reason for Medication**: Link to conditions or include coded reasons to provide clinical context.

## Common Use Cases

### Current Home Medication

```json
{
  "status": "active",
  "category": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/medication-statement-category",
      "code": "outpatient"
    }]
  }],
  "effectivePeriod": {
    "start": "2024-01-01"
  },
  "informationSource": {
    "reference": "Patient/{{patient_id}}"
  }
}
```

### Discontinued Medication

```json
{
  "status": "stopped",
  "statusReason": [{
    "text": "Side effects - nausea"
  }],
  "effectivePeriod": {
    "start": "2024-01-01",
    "end": "2024-02-15"
  }
}
```

### As-Needed Medication

```json
{
  "status": "active",
  "dosage": [{
    "text": "Take 1-2 tablets every 4-6 hours as needed for pain",
    "asNeededBoolean": true
  }]
}
```

### Medication with Reason

```json
{
  "reasonCode": [{
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "44054006",
      "display": "Diabetes mellitus type 2"
    }]
  }],
  "reasonReference": [{
    "reference": "Condition/diabetes-type-2"
  }]
}
```

## Dosage Examples

### Simple Dosage

```json
{
  "dosage": [{
    "text": "Take 1 tablet by mouth daily"
  }]
}
```

### Structured Dosage

```json
{
  "dosage": [{
    "timing": {
      "repeat": {
        "frequency": 1,
        "period": 1,
        "periodUnit": "d"
      }
    },
    "route": {
      "coding": [{
        "system": "http://snomed.info/sct",
        "code": "26643006",
        "display": "Oral"
      }]
    },
    "doseAndRate": [{
      "doseQuantity": {
        "value": 1,
        "unit": "tablet"
      }
    }]
  }]
}
```

### PRN Dosage

```json
{
  "dosage": [{
    "text": "Take 1-2 tablets every 4-6 hours as needed for headache. Do not exceed 6 tablets in 24 hours.",
    "asNeededCodeableConcept": {
      "coding": [{
        "system": "http://snomed.info/sct",
        "code": "25064002",
        "display": "Headache"
      }]
    },
    "maxDosePerPeriod": {
      "numerator": {
        "value": 6,
        "unit": "tablet"
      },
      "denominator": {
        "value": 24,
        "unit": "hour"
      }
    }
  }]
}
```

## FHIR Specification References

- [MedicationStatement Resource](https://hl7.org/fhir/medicationstatement.html)
- [US Core MedicationStatement Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-medicationstatement.html)
- [Medication Statement Status Codes](http://hl7.org/fhir/valueset-medication-statement-status.html)
- [Medication Statement Category Codes](http://terminology.hl7.org/CodeSystem/medication-statement-category)
- [RxNorm](https://www.nlm.nih.gov/research/umls/rxnorm/)
