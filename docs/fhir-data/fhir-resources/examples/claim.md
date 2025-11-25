# Claim

Represents insurance claims for reimbursement of healthcare services provided to a patient.

## Resource Overview

The Claim resource is used to request reimbursement from insurance payers for healthcare services, procedures, medications, and supplies provided to a patient. It contains detailed information about diagnoses, procedures performed, and associated costs.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Claim"`
- **status**: Current state of the claim (active, cancelled, draft, entered-in-error)
- **type**: Type of claim (institutional, oral, pharmacy, professional, vision)
- **use**: Purpose of the claim (claim, preauthorization, predetermination)
- **patient**: Reference to the Patient
- **created**: Date the claim was created
- **provider**: Reference to the Practitioner who provided services
- **priority**: Processing priority (stat, normal, deferred)
- **insurance**: Insurance coverage information
- **item**: Line items for services/products provided

### Important Optional Fields

- **extension**: Custom extensions for queue assignment, workflow status
- **diagnosis**: Diagnoses associated with the claim
- **supportingInfo**: Additional information like reason for visit
- **procedure**: Procedures performed
- **total**: Total claim amount

## Field Descriptions

### status

Current state of the claim:

- **active**: Claim is currently being processed
- **cancelled**: Claim has been cancelled
- **draft**: Claim is being prepared but not yet submitted
- **entered-in-error**: Claim was entered by mistake

### type

The category of claim:

- **professional**: Services provided by physicians, nurses, other professionals
- **institutional**: Services provided by hospitals and facilities
- **oral**: Dental services
- **pharmacy**: Prescription medications
- **vision**: Vision/optical services

Uses [Claim Type Codes](https://terminology.hl7.org/CodeSystem-claim-type.html).

### use

The purpose of the claim:

- **claim**: Standard claim for reimbursement
- **preauthorization**: Request for pre-approval before service
- **predetermination**: Request for estimate of coverage

### diagnosis

Array of diagnoses relevant to the claim:

- **sequence**: Sequence number for ordering
- **diagnosisCodeableConcept**: The diagnosis code (typically ICD-10-CM)
- **type**: Type of diagnosis (principal, admitting, discharge, etc.)

### supportingInfo

Additional information supporting the claim:

- **sequence**: Sequence number for ordering
- **category**: Type of information (e.g., patientreasonforvisit)
- **valueString**: The actual information

### item

Line items representing services or products:

- **sequence**: Line item number
- **diagnosisSequence**: References to diagnoses (array of sequence numbers)
- **productOrService**: CPT/HCPCS code for the service
- **modifier**: Service modifiers affecting reimbursement
- **servicedDate**: Date service was provided
- **quantity**: Number of units
- **unitPrice**: Price per unit
- **net**: Total price for line item

### insurance

Coverage information:

- **sequence**: Sequence number if multiple coverages
- **focal**: Whether this is the primary coverage
- **coverage**: Reference to Coverage resource

## Complete Example

```json
{
  "resourceType": "Claim",
  "extension": [
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/claim-queue",
      "valueCoding": {
        "system": "http://canvasmedical.com",
        "code": "NeedsClinicianReview",
        "display": "Clinician"
      }
    }
  ],
  "status": "active",
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/claim-type",
        "code": "professional",
        "display": "Professional"
      }
    ]
  },
  "use": "claim",
  "patient": {
    "reference": "Patient/{{patient_id}}",
    "type": "Patient"
  },
  "created": "2020-08-16",
  "provider": {
    "reference": "Practitioner/{{practitioner_a_id}}",
    "type": "Practitioner"
  },
  "priority": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/processpriority",
        "code": "normal",
        "display": "Normal"
      }
    ]
  },
  "supportingInfo": [
    {
      "sequence": 1,
      "category": {
        "coding": [
          {
            "code": "patientreasonforvisit",
            "system": "http://terminology.hl7.org/CodeSystem/claiminformationcategory",
            "display": "Patient Reason for Visit"
          }
        ]
      },
      "valueString": "Does not feel well - cough and fever"
    }
  ],
  "diagnosis": [
    {
      "sequence": 1,
      "diagnosisCodeableConcept": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/sid/icd-10-cm",
            "code": "H9190",
            "display": "Unspecified hearing loss, unspecified ear"
          }
        ]
      }
    },
    {
      "sequence": 2,
      "diagnosisCodeableConcept": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/sid/icd-10-cm",
            "code": "R0602",
            "display": "Shortness of breath"
          }
        ]
      }
    }
  ],
  "insurance": [
    {
      "sequence": 1,
      "focal": true,
      "coverage": {
        "reference": "Coverage/{{coverage_id}}",
        "type": "Coverage"
      }
    }
  ],
  "item": [
    {
      "sequence": 1,
      "diagnosisSequence": [1, 2],
      "productOrService": {
        "coding": [
          {
            "system": "http://www.ama-assn.org/go/cpt",
            "code": "99213",
            "display": "OFFICE OUTPATIENT VISIT 15 MINUTES"
          }
        ]
      },
      "modifier": [
        {
          "coding": [
            {
              "system": "https://www.cms.gov/Medicare/Coding/HCPCSReleaseCodeSets",
              "code": "25"
            }
          ]
        }
      ],
      "servicedDate": "2023-12-05",
      "quantity": {
        "value": 1
      },
      "unitPrice": {
        "value": 100.0
      },
      "net": {
        "value": 100.0
      }
    },
    {
      "sequence": 2,
      "diagnosisSequence": [2],
      "productOrService": {
        "coding": [
          {
            "system": "http://www.ama-assn.org/go/cpt",
            "code": "90715",
            "display": "TDAP VACCINE 7 YRS/> IM"
          }
        ]
      },
      "servicedDate": "2023-12-05",
      "quantity": {
        "value": 1
      },
      "unitPrice": {
        "value": 0.0
      },
      "net": {
        "value": 0
      }
    }
  ]
}
```

## Usage Notes

1. **Diagnosis Linking**: Use `diagnosisSequence` in line items to link services to specific diagnoses. This is required for claim processing.

2. **CPT Codes**: Use valid CPT codes from the [AMA CPT code set](https://www.ama-assn.org/practice-management/cpt) for procedures and services.

3. **ICD-10-CM Codes**: Use valid ICD-10-CM codes for diagnoses. These are maintained by [CDC](https://www.cdc.gov/nchs/icd/icd-10-cm.htm).

4. **Modifiers**: Include appropriate modifiers (e.g., modifier 25 for separately identifiable E/M service) to ensure correct reimbursement.

5. **Pricing**: Ensure `unitPrice` and `net` values are accurate. The `net` should equal `unitPrice` × `quantity`.

6. **Coverage Reference**: Always reference a valid Coverage resource that contains the patient's insurance information.

7. **Supporting Info**: Include patient reason for visit and other supporting information to help justify medical necessity.

## Adding Activity Log Comments

To add a comment to a claim's activity log, use the Parameters resource:

```json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "comment",
      "valueString": "Comment added to claim activity log"
    }
  ]
}
```

Post this to the claim's activity log endpoint.

## Common Extensions

### Claim Queue Assignment

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/extensions/claim-queue",
  "valueCoding": {
    "system": "http://canvasmedical.com",
    "code": "NeedsClinicianReview",
    "display": "Clinician"
  }
}
```

## FHIR Specification References

- [Claim Resource](https://hl7.org/fhir/claim.html)
- [Claim Type Codes](https://terminology.hl7.org/CodeSystem-claim-type.html)
- [ICD-10-CM Diagnosis Codes](https://www.cdc.gov/nchs/icd/icd-10-cm.htm)
- [CPT Procedure Codes](https://www.ama-assn.org/practice-management/cpt)
- [HCPCS Codes](https://www.cms.gov/Medicare/Coding/HCPCSReleaseCodeSets)
