# Practitioner

Represents healthcare providers and other individuals who provide care or services.

## Resource Overview

The Practitioner resource contains information about healthcare professionals who are directly or indirectly involved in providing healthcare services. This includes doctors, nurses, pharmacists, technicians, and other clinical staff.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Practitioner"`

### Important Optional Fields

- **identifier**: External identifiers (NPI, license numbers)
- **name**: Provider's name
- **telecom**: Contact information
- **address**: Work addresses
- **gender**: Administrative gender
- **birthDate**: Date of birth
- **photo**: Profile photo URLs
- **qualification**: Licenses, certifications, degrees
- **extension**: Custom fields for username, meeting links, roles, etc.

## Field Descriptions

### identifier

Professional identifiers:

- **NPI**: [http://hl7.org/fhir/sid/us-npi](http://hl7.org/fhir/sid/us-npi) - National Provider Identifier
- **State License**: State-specific license numbers
- **DEA**: [http://hl7.org/fhir/sid/us-dea](http://hl7.org/fhir/sid/us-dea) - DEA number for prescribing controlled substances

```json
{
  "identifier": [
    {
      "system": "http://hl7.org/fhir/sid/us-npi",
      "value": "646460931"
    }
  ]
}
```

### name

Provider's name:

```json
{
  "name": [
    {
      "use": "usual",
      "family": "George",
      "given": ["Joshua"],
      "prefix": ["Dr."],
      "suffix": ["MD"]
    }
  ]
}
```

### telecom

Contact information with ranking:

```json
{
  "telecom": [
    {
      "system": "phone",
      "value": "5558675309",
      "use": "mobile",
      "rank": 1
    },
    {
      "system": "email",
      "value": "jgeorge@example.net",
      "use": "work",
      "rank": 1
    }
  ]
}
```

### qualification

Licenses, certifications, and degrees:

```json
{
  "qualification": [
    {
      "identifier": [
        {
          "system": "http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-url",
          "value": "A60695"
        }
      ],
      "code": {
        "text": "License"
      },
      "period": {
        "start": "2020-01-01",
        "end": "2024-05-05"
      },
      "issuer": {
        "display": "MEDICAL BOARD OF MASSACHUSETTS",
        "extension": [
          {
            "url": "http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-state",
            "valueString": "MA"
          },
          {
            "url": "http://schemas.canvasmedical.com/fhir/extensions/license-primary",
            "valueBoolean": true
          }
        ]
      }
    }
  ]
}
```

## Custom Extensions

### Username

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-user-username",
  "valueString": "jgeorge"
}
```

### Personal Meeting Room Link

For telemedicine appointments:

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-personal-meeting-room-link",
  "valueUrl": "https://meet.google.com/room-001"
}
```

### Primary Practice Location

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-primary-practice-location",
  "valueReference": {
    "reference": "Location/{{location_id}}"
  }
}
```

### Digital Signature

Base64-encoded signature image:

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-signature",
  "valueAttachment": {
    "data": "(base64 encoded signature image)"
  }
}
```

### Roles

Clinical roles the practitioner can perform:

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/extensions/roles",
  "extension": [
    {
      "url": "code",
      "valueCoding": {
        "system": "http://schemas.canvasmedical.com/fhir/roles",
        "code": "MD"
      }
    },
    {
      "url": "code",
      "valueCoding": {
        "system": "http://schemas.canvasmedical.com/fhir/roles",
        "code": "DO"
      }
    }
  ]
}
```

## Complete Example

```json
{
  "resourceType": "Practitioner",
  "extension": [
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-user-username",
      "valueString": "jgeorge"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-personal-meeting-room-link",
      "valueUrl": "https://meet.google.com/room-001"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-primary-practice-location",
      "valueReference": {
        "reference": "Location/{{location_id}}"
      }
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-signature",
      "valueAttachment": {
        "data": "(base64 encoded signature image - truncated)"
      }
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/roles",
      "extension": [
        {
          "url": "code",
          "valueCoding": {
            "system": "http://schemas.canvasmedical.com/fhir/roles",
            "code": "MD"
          }
        },
        {
          "url": "code",
          "valueCoding": {
            "system": "http://schemas.canvasmedical.com/fhir/roles",
            "code": "DO"
          }
        }
      ]
    }
  ],
  "identifier": [
    {
      "system": "http://hl7.org/fhir/sid/us-npi",
      "value": "646460931"
    }
  ],
  "name": [
    {
      "use": "usual",
      "family": "George",
      "given": ["Joshua"]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "5558675309",
      "use": "mobile",
      "rank": 1
    },
    {
      "system": "phone",
      "value": "5551234567",
      "use": "work",
      "rank": 1
    },
    {
      "system": "email",
      "value": "jgeorge@example.net",
      "use": "work",
      "rank": 1
    }
  ],
  "address": [
    {
      "use": "work",
      "type": "both",
      "line": ["428 Stephen Circles"],
      "city": "North Alyssa",
      "state": "HI",
      "postalCode": "96693",
      "country": "United States"
    },
    {
      "use": "work",
      "type": "both",
      "line": ["59805 Raymond Terrace"],
      "city": "West Bethhaven",
      "state": "MA",
      "postalCode": "89511",
      "country": "United States"
    }
  ],
  "birthDate": "1990-05-04",
  "photo": [
    {
      "url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Dr._Strangelove.png",
      "title": "Profile photo 1"
    },
    {
      "url": "https://images.halloweencostumes.com/products/82273/1-1/pet-doctor-costume.jpg"
    }
  ],
  "qualification": [
    {
      "identifier": [
        {
          "system": "http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-url",
          "value": "A60695"
        }
      ],
      "code": {
        "text": "License"
      },
      "period": {
        "start": "2020-01-01",
        "end": "2024-05-05"
      },
      "issuer": {
        "display": "MEDICAL BOARD OF MASSACHUSETTS (LONG NAME)",
        "extension": [
          {
            "url": "http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-short-name",
            "valueString": "MEDICAL BOARD OF MASSACHUSETTS"
          },
          {
            "url": "http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-state",
            "valueString": "CA"
          },
          {
            "url": "http://schemas.canvasmedical.com/fhir/extensions/license-primary",
            "valueBoolean": true
          }
        ]
      }
    }
  ]
}
```

## Usage Notes

1. **NPI Required**: Always include National Provider Identifier (NPI) for US practitioners.

2. **License Tracking**: Document all active licenses including:
   - License number and issuing state
   - Expiration dates
   - Primary license designation

3. **Contact Information**: Include multiple contact methods with rank to indicate preference.

4. **Telemedicine**: Include personal meeting room link for practitioners who perform virtual visits.

5. **Digital Signature**: Store signature image as base64-encoded data for use on clinical documents.

6. **Multiple Addresses**: Practitioners may work at multiple locations - include all relevant work addresses.

7. **Roles**: Use role extensions to indicate clinical capabilities (MD, DO, NP, PA, RN, etc.).

## Common Provider Roles

- **MD**: Doctor of Medicine
- **DO**: Doctor of Osteopathic Medicine
- **NP**: Nurse Practitioner
- **PA**: Physician Assistant
- **RN**: Registered Nurse
- **PharmD**: Pharmacist
- **LCSW**: Licensed Clinical Social Worker
- **PhD**: Psychologist

## FHIR Specification References

- [Practitioner Resource](https://hl7.org/fhir/practitioner.html)
- [US Core Practitioner Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-practitioner.html)
- [NPI System](https://hl7.org/fhir/sid/us-npi)
- [DEA System](https://hl7.org/fhir/sid/us-dea)
