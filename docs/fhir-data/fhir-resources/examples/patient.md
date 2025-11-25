# Patient

Contains demographic and administrative information about an individual receiving healthcare services.

## Resource Overview

The Patient resource represents demographic and other administrative information about an individual receiving care or other health-related services. This is one of the most fundamental FHIR resources.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Patient"`

### Important Optional Fields

- **identifier**: External identifiers (MRN, SSN, etc.)
- **active**: Whether the patient record is active
- **name**: Patient's name(s)
- **telecom**: Contact information (phone, email)
- **gender**: Administrative gender
- **birthDate**: Date of birth
- **address**: Physical addresses
- **contact**: Emergency contacts and related persons
- **communication**: Preferred languages
- **extension**: US Core extensions for race, ethnicity, birthsex

## Field Descriptions

### identifier

Business identifiers for the patient from external systems:

- **use**: usual, official, temp, secondary
- **system**: Namespace for the identifier (e.g., hospital MRN system)
- **value**: The actual identifier value

```json
{
  "identifier": [
    {
      "use": "usual",
      "system": "HealthCo",
      "value": "s07960990"
    }
  ]
}
```

### name

Patient's names (legal name, nickname, etc.):

- **use**: usual, official, temp, nickname, old, maiden
- **family**: Last name
- **given**: First and middle names (array)
- **prefix**: Prefixes like Dr., Mr., Ms.
- **suffix**: Suffixes like Jr., Sr., III

### telecom

Contact points:

- **system**: phone, email, fax, pager, url, sms
- **value**: The actual phone number or email
- **use**: home, work, temp, old, mobile
- **rank**: Order of preference (1 = highest)

### gender

Administrative gender:

- **male**
- **female**
- **other**
- **unknown**

### address

Physical addresses:

- **use**: home, work, temp, old, billing
- **type**: postal, physical, both
- **text**: Full address as display string
- **line**: Street address lines (array)
- **city**: City name
- **state**: State/province
- **postalCode**: Postal/ZIP code
- **country**: Country

### contact

Emergency contacts and related persons:

- **name**: Contact's name
- **telecom**: Contact's phone/email
- **relationship**: Relationship to patient (spouse, parent, emergency contact, etc.)
- **address**: Contact's address

### communication

Languages the patient can communicate in:

- **language**: Language code (BCP-47 format like "en", "es")
- **preferred**: Whether this is the preferred language

## US Core Extensions

### Birth Sex

```json
{
  "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
  "valueCode": "M"
}
```

Values: M (male), F (female), UNK (unknown)

### Sex for Clinical Use

```json
{
  "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-sex",
  "valueCode": "248153007"
}
```

Uses SNOMED CT codes for sex parameter for clinical use.

### Race

```json
{
  "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
  "extension": [
    {
      "url": "text",
      "valueString": "White"
    }
  ]
}
```

### Ethnicity

```json
{
  "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
  "extension": [
    {
      "url": "text",
      "valueString": "Not Hispanic or Latino"
    }
  ]
}
```

### Tribal Affiliation

```json
{
  "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation",
  "extension": [
    {
      "url": "tribalAffiliation",
      "valueCodeableConcept": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v3-TribalEntityUS",
            "code": "187",
            "display": "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada"
          }
        ]
      }
    }
  ]
}
```

### Timezone

```json
{
  "url": "http://hl7.org/fhir/StructureDefinition/tz-code",
  "valueCode": "America/New_York"
}
```

Uses IANA timezone codes.

### Preferred Pharmacy

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/extensions/preferred-pharmacy",
  "extension": [
    {
      "url": "ncpdp-id",
      "valueIdentifier": {
        "value": "1123152",
        "system": "http://terminology.hl7.org/CodeSystem/NCPDPProviderIdentificationNumber"
      }
    }
  ]
}
```

## Complete Example

```json
{
  "resourceType": "Patient",
  "extension": [
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
      "valueCode": "M"
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-sex",
      "valueCode": "248153007"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/preferred-pharmacy",
      "extension": [
        {
          "url": "ncpdp-id",
          "valueIdentifier": {
            "value": "1123152",
            "system": "http://terminology.hl7.org/CodeSystem/NCPDPProviderIdentificationNumber"
          }
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
      "extension": [
        {
          "url": "text",
          "valueString": "UNK"
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
      "extension": [
        {
          "url": "text",
          "valueString": "UNK"
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/StructureDefinition/tz-code",
      "valueCode": "America/New_York"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/clinical-note",
      "valueString": "I am a clinical caption from a Create message"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/administrative-note",
      "valueString": "I am an administrative caption from a Create message"
    }
  ],
  "identifier": [
    {
      "use": "usual",
      "system": "HealthCo",
      "value": "s07960990"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Bahar",
      "given": ["Issam", "Khuzaimah"]
    },
    {
      "use": "nickname",
      "given": ["Nick Name"]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "5554320555",
      "use": "mobile",
      "rank": 1
    },
    {
      "system": "email",
      "value": "i.k.bahar@example.com",
      "use": "work",
      "rank": 1
    }
  ],
  "gender": "male",
  "birthDate": "1949-11-13",
  "address": [
    {
      "use": "home",
      "type": "both",
      "text": "4247 Murry Street, Chesapeake, VA 23322",
      "line": ["4247 Murry Street"],
      "city": "Chesapeake",
      "state": "VA",
      "postalCode": "23322"
    }
  ],
  "contact": [
    {
      "name": {
        "text": "Test Spouse"
      },
      "telecom": [
        {
          "system": "email",
          "value": "test@me.com"
        }
      ],
      "relationship": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
          "code": "SPS",
          "display": "spouse"
        },
        {
          "system": "http://schemas.canvasmedical.com/fhir/contact-category",
          "code": "EMC",
          "display": "Emergency contact"
        }
      ]
    }
  ],
  "communication": [
    {
      "language": {
        "coding": [
          {
            "system": "urn:ietf:bcp:47",
            "code": "en",
            "display": "English"
          }
        ],
        "text": "English"
      }
    }
  ]
}
```

## Usage Notes

1. **Identifiers**: Always include external identifiers (MRN, account numbers) to enable matching with external systems.

2. **Multiple Names**: Patients may have multiple names (legal name, nickname, maiden name). Use the `use` field appropriately.

3. **Contact Ranking**: Use `rank` on telecom entries to indicate preferred contact methods.

4. **US Core Compliance**: For US implementations, include US Core extensions (birthsex, race, ethnicity) as required by regulations.

5. **Emergency Contacts**: Include at least one emergency contact with relationship coding.

6. **Language Preference**: Document preferred language for communication to ensure appropriate language services.

7. **Active Status**: Use `"active": true` for current patients, `false` for inactive records.

## Common Contact Relationship Codes

From [v3-RoleCode](https://terminology.hl7.org/CodeSystem-v3-RoleCode.html):

- **SPS**: Spouse
- **MTH**: Mother
- **FTH**: Father
- **CHILD**: Child
- **SIB**: Sibling
- **FRND**: Friend
- **GUARD**: Guardian
- **EMC**: Emergency Contact

## FHIR Specification References

- [Patient Resource](https://hl7.org/fhir/patient.html)
- [US Core Patient Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-patient.html)
- [v3-RoleCode System](https://terminology.hl7.org/CodeSystem-v3-RoleCode.html)
- [BCP-47 Language Codes](https://tools.ietf.org/html/bcp47)
