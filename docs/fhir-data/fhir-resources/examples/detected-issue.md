# DetectedIssue

Records clinical and administrative issues identified during care delivery.

## Resource Overview

The DetectedIssue resource represents a clinical or administrative issue detected during the provision of care. This includes drug interactions, duplicate therapy, coding gaps, quality measures, and other potential problems that may require attention or mitigation.

## Key Fields

### Required Fields

- **resourceType**: Must be `"DetectedIssue"`
- **status**: The status of the detected issue

### Important Optional Fields

- **identifier**: Business identifier for the issue
- **code**: Type of issue detected
- **severity**: Severity level (high, moderate, low)
- **patient**: Reference to the Patient
- **identified[x]**: When the issue was identified
- **author**: Who identified the issue
- **implicated**: Resources that are the subject of the issue
- **evidence**: Supporting evidence for the issue
- **detail**: Detailed description of the issue
- **reference**: Link to additional information
- **mitigation**: Steps taken to mitigate the issue

## Field Descriptions

### status

The status of the detected issue:

- **registered**: The issue has been registered
- **preliminary**: Preliminary assessment
- **final**: Final assessment
- **amended**: The issue has been amended
- **corrected**: The issue has been corrected
- **cancelled**: The issue was cancelled
- **entered-in-error**: The issue was entered in error
- **unknown**: Status is unknown

### code

The type of detected issue. Common codes include:

- **DUPTHPY**: Duplicate Therapy
- **DUPTHPGEN**: Duplicate Therapy (Generic)
- **DUPTHPCLS**: Duplicate Therapy (Class)
- **DACT**: Drug Action
- **TIME**: Timing Issue
- **ALGY**: Allergy
- **COND**: Condition Issue
- **CODINGGAP**: Coding Gap
- **QUALITY**: Quality Measure
- **FORMAT**: Format Issue

Uses codes from the [v3-ActCode](https://terminology.hl7.org/CodeSystem/v3-ActCode) value set.

### severity

The severity of the issue:

- **high**: High severity - requires immediate attention
- **moderate**: Moderate severity - should be addressed
- **low**: Low severity - may be addressed

### patient

Reference to the Patient resource for whom the issue was detected. This provides context for the detected issue.

### identified[x]

When the issue was identified. Can be:

- **identifiedDateTime**: Specific date and time
- **identifiedPeriod**: Period when identified

### author

Reference to the entity that detected the issue:

- Practitioner
- PractitionerRole
- Device (for automated detection systems)

### implicated

References to resources that are the subject or cause of the issue. This could include:

- MedicationRequest (for drug interactions)
- Observation (for abnormal results)
- Condition (for condition-related issues)
- Claim (for billing issues)
- Any other relevant resource

### evidence

Supporting evidence for the detected issue:

- **code**: Coded evidence (e.g., specific conditions, lab values)
- **detail**: Reference to detailed evidence resources

Multiple pieces of evidence can be provided in an array.

### detail

A textual description providing additional details about the issue. This should explain:

- What the issue is
- Why it's a concern
- What might happen if not addressed

### reference

URI to additional documentation or information about the issue. This could link to:

- Clinical decision support rules
- Literature references
- Internal protocols
- External guidelines

### mitigation

Actions taken to address the issue:

- **action**: The mitigation action taken
- **date**: When the mitigation occurred
- **author**: Who performed the mitigation

Common mitigation actions:

- **valid**: Reviewed and determined to be valid
- **override**: Override the alert
- **documented**: Issue documented for future reference
- **resolved**: Issue has been resolved

## Complete Example

```json
{
  "resourceType": "DetectedIssue",
  "identifier": [
    {
      "system": "http://external.identifier.system/url",
      "value": "080abebd"
    }
  ],
  "status": "preliminary",
  "code": {
    "coding": [
      {
        "system": "https://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": "CODINGGAP",
        "display": "Codinggap"
      }
    ],
    "text": "Codinggap"
  },
  "severity": "moderate",
  "patient": {
    "reference": "Patient/{{patient_id}}",
    "type": "Patient"
  },
  "identifiedDateTime": "2024-08-10T14:23:08+00:00",
  "author": {
    "reference": "Practitioner/{{practitioner_a_id}}",
    "type": "Practitioner"
  },
  "evidence": [
    {
      "code": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/sid/icd-10-cm",
              "code": "V97.21XS",
              "display": "Parachutist entangled in object, sequela"
            }
          ]
        }
      ]
    }
  ],
  "detail": "Detail for detected issue",
  "reference": "https://example.com",
  "mitigation": [
    {
      "action": {
        "coding": [
          {
            "system": "https://schemas.canvasmedical.com/fhir/detectedissue-mitigation-action",
            "code": "valid"
          }
        ]
      },
      "date": "2024-08-09T14:23:08+00:00",
      "author": {
        "reference": "Practitioner/{{practitioner_b_id}}",
        "type": "Practitioner"
      }
    }
  ]
}
```

## Usage Notes

1. **Clinical Decision Support**: DetectedIssue is commonly used to record alerts from clinical decision support systems.

2. **Severity Assessment**: Always assign an appropriate severity level to help clinicians prioritize their attention.

3. **Mitigation Documentation**: When a clinician addresses an issue, document the mitigation action, even if it's just acknowledging and accepting the risk.

4. **Evidence Linking**: Link to supporting evidence (lab results, conditions, medications) to provide context for the issue.

5. **Coding Gaps**: Use DetectedIssue to track coding gaps and quality measure deficiencies for value-based care programs.

6. **Drug Interactions**: For medication-related issues, include references to the implicated medications and the interaction type.

7. **Automated Detection**: When issues are detected automatically, reference the Device resource as the author.

8. **Workflow Integration**: Integrate DetectedIssue resources into clinical workflows to ensure timely review and resolution.

## Common Issue Types

### Drug Interaction

```json
{
  "code": {
    "coding": [{
      "system": "https://terminology.hl7.org/CodeSystem/v3-ActCode",
      "code": "DACT"
    }]
  },
  "implicated": [
    {
      "reference": "MedicationRequest/medication-1"
    },
    {
      "reference": "MedicationRequest/medication-2"
    }
  ]
}
```

### Coding Gap

```json
{
  "code": {
    "coding": [{
      "system": "https://terminology.hl7.org/CodeSystem/v3-ActCode",
      "code": "CODINGGAP"
    }]
  },
  "evidence": [
    {
      "code": [{
        "coding": [{
          "system": "http://hl7.org/fhir/sid/icd-10-cm",
          "code": "E11.9"
        }]
      }]
    }
  ]
}
```

### Duplicate Therapy

```json
{
  "code": {
    "coding": [{
      "system": "https://terminology.hl7.org/CodeSystem/v3-ActCode",
      "code": "DUPTHPY"
    }]
  },
  "implicated": [
    {
      "reference": "MedicationRequest/med-1"
    },
    {
      "reference": "MedicationRequest/med-2"
    }
  ]
}
```

## FHIR Specification References

- [DetectedIssue Resource](https://hl7.org/fhir/detectedissue.html)
- [v3-ActCode System](https://terminology.hl7.org/CodeSystem/v3-ActCode)
- [Detected Issue Severity Codes](http://hl7.org/fhir/valueset-detectedissue-severity.html)
- [Observation Status Codes](http://hl7.org/fhir/observation-status)
