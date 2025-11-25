---
sidebar_position: 1
---

# FHIR Request Body Examples

This section contains JSON request body examples for creating various FHIR (Fast Healthcare Interoperability Resources) resources. These examples demonstrate the structure and required fields for each resource type.

## Overview

FHIR is a standard for exchanging healthcare information electronically. Each resource type has specific fields and follows HL7 FHIR specifications. The examples provided here are ready-to-use JSON structures for creating resources via FHIR APIs.

## Common Fields

Most FHIR resources share these common fields:

- **resourceType**: Identifies the type of FHIR resource (e.g., "Patient", "Observation")
- **id**: Unique identifier for the resource instance
- **status**: Current state of the resource (e.g., "active", "completed")
- **identifier**: Business identifiers for the resource
- **extension**: Additional data elements not part of the base resource

## Reference Format

FHIR uses references to link related resources:

```json
{
  "reference": "Patient/{{patient_id}}",
  "type": "Patient"
}
```

Variables like `{{patient_id}}` should be replaced with actual resource IDs.

## Coding Systems

FHIR uses standardized coding systems for medical concepts:

- **[LOINC](https://loinc.org/)** ([http://loinc.org](http://loinc.org)) - Laboratory and clinical observations
- **[SNOMED CT](https://www.snomed.org/)** ([http://snomed.info/sct](http://snomed.info/sct)) - Clinical terminology
- **[ICD-10-CM](https://www.cdc.gov/nchs/icd/icd-10-cm.htm)** ([http://hl7.org/fhir/sid/icd-10-cm](http://hl7.org/fhir/sid/icd-10-cm)) - Diagnosis codes
- **[CPT](https://www.ama-assn.org/practice-management/cpt)** ([http://www.ama-assn.org/go/cpt](http://www.ama-assn.org/go/cpt)) - Procedure codes
- **[CVX](https://www2.cdc.gov/vaccines/iis/iisstandards/vaccines.asp?rpt=cvx)** ([http://hl7.org/fhir/sid/cvx](http://hl7.org/fhir/sid/cvx)) - Vaccine codes
- **[RxNorm](https://www.nlm.nih.gov/research/umls/rxnorm/)** ([http://www.nlm.nih.gov/research/umls/rxnorm](http://www.nlm.nih.gov/research/umls/rxnorm)) - Medication codes

## Resource Categories

### Clinical Resources

Resources related to patient clinical data:

- [AllergyIntolerance](./examples/allergy-intolerance) - Patient allergies and intolerances
- [Condition](./examples/condition) - Patient diagnoses and problems
- [Observation](./examples/observation) - Measurements and findings
- [Immunization](./examples/immunization) - Vaccination records
- [MedicationStatement](./examples/medication-statement) - Medication usage
- [DiagnosticReport](./examples/diagnostic-report) - Lab and imaging reports

### Administrative Resources

Resources for managing healthcare operations:

- [Patient](./examples/patient) - Patient demographics
- [Practitioner](./examples/practitioner) - Healthcare providers
- [Appointment](./examples/appointment) - Scheduled visits

### Financial Resources

Resources for billing and coverage:

- [Claim](./examples/claim) - Insurance claims
- [Coverage](./examples/coverage) - Insurance coverage details
- [PaymentNotice](./examples/payment-notice) - Payment notifications
- [CoverageEligibilityRequest](./examples/coverage-eligibility-request) - Coverage verification

### Workflow Resources

Resources for care coordination:

- [Task](./examples/task) - Work items and assignments
- [Communication](./examples/communication) - Messages and notifications
- [DetectedIssue](./examples/detected-issue) - Clinical decision support alerts

### Supporting Resources

Additional resource types:

- [Consent](./examples/consent) - Patient consent records
- [DocumentReference](./examples/document-reference) - Document metadata
- [Media](./examples/media) - Photos and attachments
- [Group](./examples/group) - Patient groups and teams
- [QuestionnaireResponse](./examples/questionnaire-response) - Form responses

## Key Concepts

### Extensions

Extensions allow adding custom data not in the base FHIR specification:

```json
{
  "extension": [
    {
      "url": "http://example.com/custom-field",
      "valueString": "custom value"
    }
  ]
}
```

### CodeableConcept

Used to represent coded values with optional text:

```json
{
  "coding": [
    {
      "system": "http://loinc.org",
      "code": "29463-7",
      "display": "Weight"
    }
  ],
  "text": "Body Weight"
}
```

### References

Links between resources use the `reference` field:

```json
{
  "patient": {
    "reference": "Patient/12345",
    "type": "Patient"
  }
}
```

### Identifiers

Business identifiers from external systems:

```json
{
  "identifier": [
    {
      "system": "http://hospital.org/mrn",
      "value": "MRN123456"
    }
  ]
}
```

## HL7 FHIR References

- [Official FHIR Documentation](https://hl7.org/fhir/)
- [FHIR Resource Index](https://hl7.org/fhir/resourcelist.html)
- [FHIR Data Types](https://hl7.org/fhir/datatypes.html)
- [FHIR Terminology](https://terminology.hl7.org/)
- [US Core Implementation Guide](https://hl7.org/fhir/us/core/)

## Usage Notes

1. Replace all placeholder variables (e.g., `{{patient_id}}`) with actual resource IDs
2. Ensure all required fields are populated according to your FHIR server's requirements
3. Validate JSON structure before sending to FHIR API
4. Check that coding systems and codes are valid for your use case
5. Follow your organization's FHIR profile requirements (e.g., US Core)

## Next Steps

Browse the examples in the sidebar to see detailed JSON structures for each resource type with field-by-field explanations
