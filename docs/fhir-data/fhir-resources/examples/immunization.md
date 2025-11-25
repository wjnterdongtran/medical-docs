# Immunization

Records immunization (vaccination) events and details.

## Resource Overview

The Immunization resource describes the event of a patient being administered a vaccine or a record of an immunization as reported by a patient, clinician, or other party. It includes information about the vaccine product, administration details, and any reactions or contraindications.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Immunization"`
- **status**: The status of the immunization event
- **vaccineCode**: The vaccine product administered
- **patient**: Reference to the Patient who received the immunization
- **occurrenceDateTime**: When the immunization occurred

### Important Optional Fields

- **identifier**: Business identifier for the immunization
- **statusReason**: Reason for status (if not done)
- **vaccineCode**: Vaccine product code
- **encounter**: Encounter when immunization was given
- **occurrence[x]**: When immunization occurred
- **recorded**: When immunization was first recorded
- **primarySource**: Whether record is from primary source
- **reportOrigin**: Source of secondary report
- **location**: Where immunization occurred
- **manufacturer**: Vaccine manufacturer
- **lotNumber**: Vaccine lot number
- **expirationDate**: Vaccine expiration date
- **site**: Body site where vaccine was administered
- **route**: How vaccine was administered
- **doseQuantity**: Amount of vaccine administered
- **performer**: Who performed the immunization
- **note**: Additional notes
- **reasonCode**: Why immunization occurred
- **reasonReference**: Why immunization occurred (reference)
- **reaction**: Adverse reaction details
- **protocolApplied**: Protocol followed
- **education**: Educational materials provided

## Field Descriptions

### status

The current state of the immunization event:

- **completed**: The immunization was completed
- **entered-in-error**: The immunization was entered in error
- **not-done**: The immunization was not done

### statusReason

If status is "not-done", this explains why:

- Patient refusal
- Medical contraindication
- Product out of stock
- Patient illness

Uses codes from the [Immunization Status Reason Codes](http://terminology.hl7.org/CodeSystem/v3-ActReason) value set.

### vaccineCode

Identifies the vaccine product administered. Common coding systems:

- **CVX**: [http://hl7.org/fhir/sid/cvx](http://hl7.org/fhir/sid/cvx) - CDC Vaccine Codes
- **NDC**: [http://hl7.org/fhir/sid/ndc](http://hl7.org/fhir/sid/ndc) - National Drug Codes
- **CPT**: [http://www.ama-assn.org/go/cpt](http://www.ama-assn.org/go/cpt) - Current Procedural Terminology

Example CVX codes:

- **03**: MMR (Measles, Mumps, Rubella)
- **08**: Hepatitis B
- **21**: Varicella
- **115**: Tdap (Tetanus, Diphtheria, Pertussis)
- **213**: COVID-19 vaccine

### patient

Reference to the Patient resource for the person who received the immunization.

### occurrence[x]

When the immunization occurred:

- **occurrenceDateTime**: Specific date and time
- **occurrenceString**: Textual description

### primarySource

Indicates whether the record is from the primary source (true) or a secondary source like a patient report (false).

### reportOrigin

If `primarySource: false`, this indicates the source of the report:

- **record**: From written record
- **recall**: From patient recall
- **school**: School record
- **jurisdiction**: Immunization registry

### lotNumber

The lot number of the vaccine product. Important for tracking in case of recalls or adverse event investigations.

### expirationDate

The expiration date of the vaccine lot. Ensures vaccines are not administered past their expiration.

### site

Body site where vaccine was administered:

- **LA**: Left arm
- **RA**: Right arm
- **LT**: Left thigh
- **RT**: Right thigh

Uses codes from the [Immunization Site Codes](http://terminology.hl7.org/CodeSystem/v3-ActSite) value set.

### route

How the vaccine was administered:

- **IM**: Intramuscular
- **SC**: Subcutaneous
- **PO**: Oral
- **NASINHL**: Nasal inhalation
- **ID**: Intradermal

Uses codes from the [Immunization Route Codes](http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration) value set.

### doseQuantity

The amount of vaccine administered:

```json
{
  "value": 0.5,
  "unit": "ml",
  "system": "http://unitsofmeasure.org",
  "code": "ml"
}
```

### performer

Who performed the immunization:

- **function**: Role of performer (ordering, administering)
- **actor**: Reference to Practitioner or Organization

Common functions:

- **OP**: Ordering Provider
- **AP**: Administering Provider

### reaction

Details about any adverse reaction:

- **date**: When reaction occurred
- **detail**: Reference to Observation describing the reaction
- **reported**: Whether reaction was self-reported or observed

### protocolApplied

Protocol(s) followed during administration:

- **series**: Name of vaccine series (e.g., "Childhood Immunization Series")
- **authority**: Who published the protocol
- **targetDisease**: Disease(s) being targeted
- **doseNumber**: Dose number in series (1, 2, 3, etc.)
- **seriesDoses**: Total doses in series

### education

Educational material provided to patient:

- **documentType**: Type of document
- **reference**: URI to educational material
- **publicationDate**: When material was published
- **presentationDate**: When material was given to patient

## Complete Example

```json
{
  "resourceType": "Immunization",
  "status": "completed",
  "vaccineCode": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/cvx",
        "code": "40",
        "display": "rabies, intradermal injection"
      },
      {
        "system": "http://www.ama-assn.org/go/cpt",
        "code": "90676",
        "display": "RABIES VACCINE INTRADERMAL"
      }
    ]
  },
  "patient": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "occurrenceDateTime": "2024-08-01",
  "primarySource": false
}
```

## Usage Notes

1. **Historical Records**: When recording historical immunizations (e.g., from patient recall or old records), set `primarySource: false` and include `reportOrigin`.

2. **Lot Tracking**: Always record `lotNumber` and `expirationDate` for traceability and safety monitoring.

3. **VIS Documentation**: Document Vaccine Information Statements (VIS) provided using the `education` element.

4. **Series Tracking**: Use `protocolApplied` to track progress through vaccine series (e.g., 2 of 3 doses complete).

5. **Adverse Reactions**: Document any adverse reactions using the `reaction` element with a reference to a detailed Observation.

6. **Coding Systems**: Use CVX codes for interoperability with immunization registries and public health reporting.

7. **Route and Site**: Always document route and site for proper clinical documentation and billing.

8. **Not Done**: When documenting a declined or contraindicated vaccine, use status "not-done" with appropriate `statusReason`.

## Common Vaccine Examples

### Influenza Vaccine

```json
{
  "vaccineCode": {
    "coding": [{
      "system": "http://hl7.org/fhir/sid/cvx",
      "code": "158",
      "display": "Influenza, injectable, quadrivalent"
    }]
  },
  "route": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration",
      "code": "IM"
    }]
  },
  "site": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-ActSite",
      "code": "LA"
    }]
  }
}
```

### COVID-19 Vaccine (Series)

```json
{
  "vaccineCode": {
    "coding": [{
      "system": "http://hl7.org/fhir/sid/cvx",
      "code": "213",
      "display": "COVID-19, mRNA, LNP-S, PF, 30 mcg/0.3 mL dose"
    }]
  },
  "protocolApplied": [
    {
      "targetDisease": [{
        "coding": [{
          "system": "http://snomed.info/sct",
          "code": "840539006",
          "display": "COVID-19"
        }]
      }],
      "doseNumberPositiveInt": 1,
      "seriesDosesPositiveInt": 2
    }
  ]
}
```

### Vaccine Not Given

```json
{
  "status": "not-done",
  "statusReason": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-ActReason",
      "code": "PATOBJ",
      "display": "Patient objection"
    }]
  },
  "vaccineCode": {
    "coding": [{
      "system": "http://hl7.org/fhir/sid/cvx",
      "code": "115",
      "display": "Tdap"
    }]
  }
}
```

## FHIR Specification References

- [Immunization Resource](https://hl7.org/fhir/immunization.html)
- [US Core Immunization Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-immunization.html)
- [CVX Vaccine Codes](https://www2.cdc.gov/vaccines/iis/iisstandards/vaccines.asp?rpt=cvx)
- [Immunization Status Codes](http://hl7.org/fhir/valueset-immunization-status.html)
- [v3-RouteOfAdministration](http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration)
