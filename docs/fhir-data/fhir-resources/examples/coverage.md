# Coverage

Records insurance coverage and benefit plan information for a patient.

## Resource Overview

The Coverage resource represents insurance or payment coverage for healthcare services. It includes information about the insurance plan, subscriber, beneficiary, coverage period, and plan details necessary for billing and claims processing.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Coverage"`
- **status**: The status of the coverage
- **beneficiary**: Reference to the Patient who is covered
- **payor**: The insurance company or payer

### Important Optional Fields

- **identifier**: Business identifiers (member ID, policy number)
- **type**: Type of coverage (medical, dental, vision, pharmacy)
- **subscriber**: The subscriber (if different from beneficiary)
- **subscriberId**: The subscriber's member ID
- **relationship**: Relationship of beneficiary to subscriber
- **period**: Coverage validity period
- **class**: Additional classification (group, plan, subgroup)
- **order**: Order of coverage (primary, secondary, tertiary)
- **network**: Insurer network identifier
- **costToBeneficiary**: Patient cost sharing information
- **contract**: Associated insurance contract

## Field Descriptions

### status

Current state of the coverage:

- **active**: Coverage is in force
- **cancelled**: Coverage has been cancelled
- **draft**: Coverage is in draft state
- **entered-in-error**: Coverage was entered in error

### identifier

Business identifiers for the coverage:

- **type**: Type of identifier (Member Number, Policy Number, etc.)
- **system**: Namespace for the identifier
- **value**: The actual identifier value

Common identifier types:
- **MB**: Member Number
- **MA**: Patient Medicaid Number
- **MC**: Patient's Medicare Number

### type

The type of coverage:

- **EHCPOL**: Extended healthcare
- **DENTAL**: Dental care policy
- **PUBLICPOL**: Public healthcare
- **MILITARY**: Military health program
- **SUBPOL**: Substance use policy
- **VISPOL**: Vision care policy

Uses codes from the [v3-ActCode](http://terminology.hl7.org/CodeSystem/v3-ActCode) value set.

### subscriber

Reference to the Person, Patient, or RelatedPerson who is the subscriber (the person who has the insurance policy). This may be different from the beneficiary (e.g., when a child is covered under a parent's insurance).

### subscriberId

The identifier assigned by the insurer to the subscriber. This is often called the member ID or subscriber ID.

### beneficiary

Reference to the Patient who benefits from the insurance coverage. This is typically the patient receiving care.

### relationship

Relationship of the beneficiary to the subscriber:

- **self**: The beneficiary is the subscriber
- **spouse**: Spouse
- **child**: Child
- **parent**: Parent
- **other**: Other relationship

Uses codes from the [Subscriber Relationship Codes](http://terminology.hl7.org/CodeSystem/subscriber-relationship) value set.

### period

The time period during which the coverage is active:

- **start**: When coverage begins
- **end**: When coverage ends (if known)

### payor

Reference to the organization that is financially responsible for payment. This can be:

- Organization (insurance company)
- Patient (self-pay)
- RelatedPerson

Include an identifier with the payer ID used for claims submission.

### class

Additional classification of the coverage:

- **group**: Group identifier
- **subgroup**: Subgroup identifier
- **plan**: Plan identifier
- **subplan**: Subplan identifier
- **class**: Class of trade
- **subclass**: Subclass of trade
- **sequence**: Sequence number
- **rxbin**: RX Bin number
- **rxpcn**: RX PCN number
- **rxid**: RX Id
- **rxgroup**: RX Group number

Each class has:
- **type**: The type of classification
- **value**: The value of the classification
- **name**: Display name for the classification

### order

The order of applicability of this coverage when there are multiple coverages:

- **1**: Primary coverage
- **2**: Secondary coverage
- **3**: Tertiary coverage

### costToBeneficiary

Patient cost-sharing information:

- **type**: Type of cost (copay, coinsurance, deductible, etc.)
- **valueMoney**: Amount of cost
- **valueQuantity**: Percentage or other quantity

## Complete Example

```json
{
  "resourceType": "Coverage",
  "identifier": [
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "MB",
            "display": "Member Number"
          }
        ]
      },
      "value": "1234"
    }
  ],
  "status": "active",
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": "MILITARY",
        "display": "military health program"
      }
    ],
    "text": "Military"
  },
  "subscriber": {
    "reference": "Patient/{{patient_id}}"
  },
  "subscriberId": "123",
  "beneficiary": {
    "reference": "Patient/{{patient_id}}"
  },
  "relationship": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
        "code": "self"
      }
    ]
  },
  "period": {
    "start": "2021-06-27"
  },
  "payor": [
    {
      "identifier": {
        "system": "https://www.claim.md/services/era/",
        "value": "AMM03"
      },
      "display": "Independence Blue Cross Blue Shield"
    }
  ],
  "class": [
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "group"
          }
        ]
      },
      "value": "Captains Only"
    },
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "subgroup"
          }
        ]
      },
      "value": "Subgroup 2"
    },
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "plan"
          }
        ]
      },
      "value": "Starfleet HMO"
    },
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "subplan"
          }
        ]
      },
      "value": "Stars Subplan"
    }
  ],
  "order": 1
}
```

## Usage Notes

1. **Member Identifiers**: Always include the member ID in the `identifier` array and `subscriberId` field for claims processing.

2. **Payer Identification**: Include the payer identifier that matches what's used in your claims clearinghouse for automated processing.

3. **Coverage Order**: Set `order` to indicate primary (1), secondary (2), or tertiary (3) coverage for coordination of benefits.

4. **Period Tracking**: Keep `period.start` and `period.end` current to reflect active coverage dates.

5. **Self vs Dependent**: Use `relationship` to indicate if the patient is the subscriber or a dependent.

6. **Plan Details**: Use the `class` array to capture group, plan, subgroup, and subplan information needed for claims.

7. **Multiple Coverages**: A patient may have multiple Coverage resources (primary, secondary, Medicare + supplement, etc.).

8. **Verification**: Regularly verify coverage is active before services to prevent claim denials.

## Coverage Coordination

### Primary Insurance

```json
{
  "order": 1,
  "relationship": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
      "code": "self"
    }]
  }
}
```

### Secondary Insurance

```json
{
  "order": 2,
  "relationship": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
      "code": "spouse"
    }]
  }
}
```

## FHIR Specification References

- [Coverage Resource](https://hl7.org/fhir/coverage.html)
- [Coverage Class Codes](http://terminology.hl7.org/CodeSystem/coverage-class)
- [Subscriber Relationship Codes](http://terminology.hl7.org/CodeSystem/subscriber-relationship)
- [v3-ActCode](http://terminology.hl7.org/CodeSystem/v3-ActCode)
- [v2-0203 Identifier Type](http://terminology.hl7.org/CodeSystem/v2-0203)
