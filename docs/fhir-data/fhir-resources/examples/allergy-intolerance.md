# AllergyIntolerance

Records allergies and intolerances for a patient, including medications, foods, environmental factors, and other substances.

## Resource Overview

The AllergyIntolerance resource is used to document a patient's propensity or potential risk of an adverse reaction when exposed to a substance. This includes allergies to medications, foods, environmental allergens, and other substances.

## Key Fields

### Required Fields

- **resourceType**: Must be `"AllergyIntolerance"`
- **patient**: Reference to the Patient resource
- **code**: The substance that causes the allergy/intolerance

### Important Optional Fields

- **clinicalStatus**: The clinical status (active, inactive, resolved)
- **verificationStatus**: The verification status (confirmed, unconfirmed, refuted, entered-in-error)
- **type**: Whether it's an allergy or intolerance
- **category**: Category of the allergy (food, medication, environment, biologic)
- **criticality**: Estimate of potential severity (low, high, unable-to-assess)
- **encounter**: Reference to the Encounter when allergy was documented
- **onsetDateTime**: When the allergy was first observed
- **recorder**: Who recorded the allergy
- **reaction**: Details about reactions experienced

## Field Descriptions

### clinicalStatus

Indicates the current clinical status of the allergy or intolerance:

- **active**: The allergy is currently active and relevant
- **inactive**: The allergy is not currently active but may become active
- **resolved**: The allergy has been resolved and is no longer a concern

Uses the [AllergyIntolerance Clinical Status Codes](https://terminology.hl7.org/CodeSystem-allergyintolerance-clinical.html) value set.

### verificationStatus

Indicates the verification status of the allergy:

- **unconfirmed**: The allergy has been reported but not verified
- **confirmed**: The allergy has been verified by testing or clinical judgement
- **refuted**: The allergy has been refuted and should not be considered
- **entered-in-error**: The allergy was entered by mistake

Uses the [AllergyIntolerance Verification Status Codes](https://terminology.hl7.org/CodeSystem-allergyintolerance-verification.html) value set.

### code

The substance that causes the allergy. Common coding systems include:

- **FDB (First Databank)**: [http://www.fdbhealth.com/](http://www.fdbhealth.com/) - Medication database codes
- **RxNorm**: [http://www.nlm.nih.gov/research/umls/rxnorm](http://www.nlm.nih.gov/research/umls/rxnorm) - Medication codes
- **SNOMED CT**: [http://snomed.info/sct](http://snomed.info/sct) - General substance codes

### reaction

Array of reactions experienced by the patient:

- **manifestation**: How the reaction manifested (rash, anaphylaxis, etc.)
- **severity**: mild, moderate, or severe
- **exposureRoute**: How the patient was exposed to the substance
- **onset**: When the reaction occurred

## Complete Example

```json
{
  "resourceType": "AllergyIntolerance",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
        "code": "active",
        "display": "Active"
      }
    ],
    "text": "Active"
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
        "code": "confirmed",
        "display": "Confirmed"
      }
    ],
    "text": "Confirmed"
  },
  "type": "allergy",
  "code": {
    "coding": [
      {
        "system": "http://www.fdbhealth.com/",
        "code": "2-15588",
        "display": "Allergy Medicine"
      }
    ],
    "text": "Allergy Medicine"
  },
  "patient": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "onsetDateTime": "2023-06-15",
  "recorder": {
    "reference": "Practitioner/{{practitioner_a_id}}"
  },
  "lastOccurrence": "2023-06-17",
  "note": [
    {
      "text": "AllergyIntolerance note"
    }
  ],
  "reaction": [
    {
      "manifestation": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "unknown",
              "display": "Unknown"
            }
          ],
          "text": "Unknown"
        }
      ],
      "severity": "moderate"
    }
  ]
}
```

## Usage Notes

1. **Patient Safety**: AllergyIntolerance records are critical for patient safety. Always verify accuracy before creating or updating.

2. **Verification**: Use appropriate `verificationStatus` to indicate confidence level. Confirmed allergies should be clearly distinguished from patient-reported allergies.

3. **Clinical Status**: Keep `clinicalStatus` updated if the allergy resolves or becomes inactive.

4. **Reactions**: Document specific reactions when known, as this helps clinicians assess risk and make treatment decisions.

5. **Coding**: Use standardized codes (FDB, RxNorm, SNOMED CT) for better interoperability and clinical decision support.

## FHIR Specification References

- [AllergyIntolerance Resource](https://hl7.org/fhir/allergyintolerance.html)
- [AllergyIntolerance Clinical Status](https://terminology.hl7.org/CodeSystem-allergyintolerance-clinical.html)
- [AllergyIntolerance Verification Status](https://terminology.hl7.org/CodeSystem-allergyintolerance-verification.html)
- [US Core AllergyIntolerance Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-allergyintolerance.html)
