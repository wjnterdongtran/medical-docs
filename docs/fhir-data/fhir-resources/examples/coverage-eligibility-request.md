# CoverageEligibilityRequest

Request to check insurance coverage eligibility and benefits for a patient.

## Resource Overview

The CoverageEligibilityRequest resource is used to query an insurer to determine coverage eligibility, benefits, and pre-authorization requirements. This is typically used before providing services to verify that a patient's insurance will cover planned treatments or procedures.

## Key Fields

### Required Fields

- **resourceType**: Must be `"CoverageEligibilityRequest"`
- **status**: The status of the request
- **purpose**: The type of information requested
- **patient**: Reference to the Patient
- **created**: When the request was created
- **insurer**: The insurance company being queried

### Important Optional Fields

- **identifier**: Business identifier for tracking
- **priority**: Processing priority
- **serviced[x]**: Date or period of service
- **enterer**: Who created the request
- **provider**: The healthcare provider requesting eligibility
- **facility**: The facility where service will be provided
- **insurance**: Insurance coverage being validated
- **item**: Specific service items to check eligibility for
- **supportingInfo**: Supporting clinical or administrative information

## Field Descriptions

### status

The status of the eligibility request:

- **active**: The request is active and awaiting response
- **cancelled**: The request was cancelled
- **draft**: The request is being prepared
- **entered-in-error**: The request was entered in error

### purpose

The type of information being requested. Can include one or more of:

- **auth-requirements**: What authorization is required
- **benefits**: Coverage benefits information
- **discovery**: Insurance discovery and validation
- **validation**: Validation of coverage

This is an array, so multiple purposes can be specified.

### patient

Reference to the Patient resource for whom eligibility is being checked. This is required to identify the covered individual.

### created

The date and time when the eligibility request was created. Should be in ISO 8601 format with timezone.

### insurer

Reference to the Organization that is being queried for eligibility. This can be:

- Organization reference
- Identifier (e.g., payer ID)

### priority

Indicates the processing priority:

- **stat**: Immediate priority
- **normal**: Normal priority
- **deferred**: Deferred priority

Uses codes from the [Process Priority Codes](http://terminology.hl7.org/CodeSystem/processpriority) value set.

### serviced[x]

The date or period when services are planned:

- **servicedDate**: Specific date of service
- **servicedPeriod**: Period during which services will be provided

### provider

Reference to the Practitioner or Organization requesting the eligibility check. This is typically the rendering provider or facility.

### facility

Reference to the Location where services will be provided. This may affect network status and coverage.

### insurance

Array of insurance coverage being validated:

- **focal**: Whether this is the primary coverage being validated
- **coverage**: Reference to the Coverage resource
- **businessArrangement**: Special business arrangement with the insurer

At least one insurance entry must have `focal: true`.

### item

Specific services or products to check eligibility for:

- **supportingInfoSequence**: Links to supporting information
- **category**: Service category (professional, institutional, pharmacy, vision)
- **productOrService**: Specific procedure or product code
- **modifier**: Service modifiers
- **provider**: Provider for this specific service
- **quantity**: Quantity of service
- **unitPrice**: Expected price per unit
- **facility**: Facility for this specific service
- **diagnosis**: Diagnosis links for this service
- **detail**: Sub-items or details

### supportingInfo

Additional supporting information:

- **sequence**: Sequence number for reference
- **information**: Reference to supporting resource
- **appliesToAll**: Whether this applies to all items

## Complete Example

```json
{
  "resourceType": "CoverageEligibilityRequest",
  "status": "active",
  "purpose": ["benefits"],
  "patient": {
    "reference": "Patient/{{patient_id}}"
  },
  "created": "2024-02-13T02:53:00-04:00",
  "insurer": {},
  "insurance": [
    {
      "focal": true,
      "coverage": {
        "reference": "Coverage/{{coverage_id}}"
      }
    }
  ]
}
```

## Usage Notes

1. **Pre-Service Verification**: Create eligibility requests before scheduled services to verify coverage and avoid claim denials.

2. **Purpose Selection**: Specify the appropriate purpose codes. Use "benefits" for general coverage checking, "auth-requirements" to determine if pre-authorization is needed.

3. **Focal Coverage**: When a patient has multiple coverages, set `focal: true` on the primary coverage being validated.

4. **Service Details**: Include specific service codes in the `item` array to get detailed benefit information for planned procedures.

5. **Real-Time vs Batch**: Some systems process eligibility requests in real-time, others batch them. Check the response timing with your clearinghouse.

6. **Required Information**: Ensure the linked Coverage resource has complete subscriber and payer information for successful processing.

7. **Response Handling**: The response will be a CoverageEligibilityResponse resource with benefit details, coverage status, and any limitations.

## Common Use Cases

### General Eligibility Check

```json
{
  "purpose": ["benefits", "validation"],
  "insurance": [
    {
      "focal": true,
      "coverage": {
        "reference": "Coverage/{{coverage_id}}"
      }
    }
  ]
}
```

### Pre-Authorization Check

```json
{
  "purpose": ["auth-requirements"],
  "item": [
    {
      "category": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/ex-benefitcategory",
          "code": "medical"
        }]
      },
      "productOrService": {
        "coding": [{
          "system": "http://www.ama-assn.org/go/cpt",
          "code": "99213"
        }]
      }
    }
  ]
}
```

### Specific Service Eligibility

```json
{
  "purpose": ["benefits"],
  "servicedDate": "2024-03-15",
  "item": [
    {
      "productOrService": {
        "coding": [{
          "system": "http://www.ama-assn.org/go/cpt",
          "code": "45378",
          "display": "Colonoscopy"
        }]
      },
      "quantity": {
        "value": 1
      }
    }
  ]
}
```

## FHIR Specification References

- [CoverageEligibilityRequest Resource](https://hl7.org/fhir/coverageeligibilityrequest.html)
- [CoverageEligibilityResponse Resource](https://hl7.org/fhir/coverageeligibilityresponse.html)
- [Eligibility Request Purpose Codes](http://hl7.org/fhir/valueset-eligibilityrequest-purpose.html)
- [Process Priority Codes](http://terminology.hl7.org/CodeSystem/processpriority)
