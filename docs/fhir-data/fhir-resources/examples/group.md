# Group

Represents a collection of people, organizations, or other entities for administrative or clinical purposes.

## Resource Overview

The Group resource represents a defined collection of entities. Groups can be used for many purposes including patient panels, care teams, practitioner groups, or any other collection of resources that need to be managed together. Groups can be actual (listing specific members) or definitional (defining criteria for membership).

## Key Fields

### Required Fields

- **resourceType**: Must be `"Group"`
- **type**: Type of members in the group
- **actual**: Whether this is an actual group or a definitional one

### Important Optional Fields

- **identifier**: Business identifier for the group
- **active**: Whether the group is currently active
- **code**: Kind of group (disease-based, medication-based, etc.)
- **name**: Human-readable label for the group
- **quantity**: Number of members
- **managingEntity**: Organization or practitioner managing the group
- **characteristic**: Defining characteristics for inclusion
- **member**: Actual members of the group

## Field Descriptions

### type

Type of entities in the group:

- **person**: Group contains Person resources (patients)
- **animal**: Group contains animal resources
- **practitioner**: Group contains Practitioner resources (care teams)
- **device**: Group contains Device resources
- **medication**: Group contains Medication resources
- **substance**: Group contains Substance resources

### actual

Indicates whether this is an actual group or definitional:

- **true**: The group lists actual specific members
- **false**: The group defines criteria for membership (members determined by criteria)

### active

Whether the group is currently active and in use. Inactive groups are typically historical or archived.

### code

Provides additional classification of the group:

- Disease-based groups (diabetes patients)
- Treatment-based groups (chemotherapy patients)
- Risk-based groups (fall risk patients)
- Program-based groups (care management program)

### name

A human-readable label for the group that clearly describes its purpose. Examples:

- "Diabetes Care Panel"
- "Primary Care Team A"
- "High Risk Patients"
- "Cardiology Department Staff"

### characteristic

Defines the characteristics that determine group membership. Used for definitional groups:

- **code**: The characteristic being defined
- **valueCodeableConcept**: Value of the characteristic
- **exclude**: Whether entities with this characteristic should be excluded
- **period**: Time period when the characteristic applies

Can include multiple characteristics that are combined (AND logic).

### member

Actual members of the group when `actual: true`:

- **entity**: Reference to the member resource (Patient, Practitioner, etc.)
- **period**: Time period of membership
- **inactive**: Whether this member is currently active in the group

## Group Types

### Patient Group

Used for patient panels, registries, or cohorts.

```json
{
  "resourceType": "Group",
  "type": "person",
  "actual": true,
  "name": "A Test Patient Group",
  "member": [
    {
      "entity": {
        "reference": "Patient/{{patient_id}}",
        "type": "Patient"
      }
    }
  ]
}
```

### Care Team (Practitioner Group)

Used for teams of practitioners.

```json
{
  "resourceType": "Group",
  "type": "practitioner",
  "actual": true,
  "name": "A Test Team",
  "characteristic": [
    {
      "exclude": false,
      "code": {
        "text": "responsibility"
      },
      "valueCodeableConcept": {
        "text": "COLLECT_SPECIMENS_FROM_PATIENT"
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Practitioner/{{practitioner_a_id}}",
        "type": "Practitioner"
      }
    }
  ]
}
```

## Complete Examples

### Patient Group Example

```json
{
  "resourceType": "Group",
  "type": "person",
  "actual": true,
  "name": "A Test Patient Group",
  "member": [
    {
      "entity": {
        "reference": "Patient/{{patient_id}}",
        "type": "Patient"
      }
    }
  ]
}
```

### Team Example

```json
{
  "resourceType": "Group",
  "type": "practitioner",
  "actual": true,
  "name": "A Test Team",
  "characteristic": [
    {
      "exclude": false,
      "code": {
        "text": "responsibility"
      },
      "valueCodeableConcept": {
        "text": "COLLECT_SPECIMENS_FROM_PATIENT"
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Practitioner/{{practitioner_a_id}}",
        "type": "Practitioner"
      }
    }
  ]
}
```

## Usage Notes

1. **Actual vs Definitional**: Use `actual: true` for explicit member lists. Use `actual: false` for criteria-based groups where members are dynamically determined.

2. **Patient Panels**: Create patient groups for care management panels, disease registries, or quality measure cohorts.

3. **Care Teams**: Use practitioner groups to represent care teams, departments, or clinical groups working together.

4. **Characteristics**: Use characteristics to define inclusion/exclusion criteria for definitional groups.

5. **Dynamic Membership**: For definitional groups, systems will evaluate the criteria to determine current membership.

6. **Hierarchical Groups**: Groups can contain other groups as members to create hierarchical structures.

7. **Period Tracking**: Use `member.period` to track when a member joined and left the group.

8. **Managing Entity**: Specify who is responsible for managing the group membership and purpose.

## Common Use Cases

### Disease Registry

```json
{
  "type": "person",
  "actual": false,
  "name": "Diabetes Registry",
  "code": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "73211009",
      "display": "Diabetes mellitus"
    }]
  },
  "characteristic": [
    {
      "code": {
        "coding": [{
          "system": "http://snomed.info/sct",
          "code": "73211009"
        }]
      },
      "valueBoolean": true,
      "exclude": false
    }
  ]
}
```

### Care Team

```json
{
  "type": "practitioner",
  "actual": true,
  "name": "Primary Care Team 1",
  "managingEntity": {
    "reference": "Organization/{{org_id}}"
  },
  "member": [
    {
      "entity": {
        "reference": "Practitioner/{{physician_id}}"
      }
    },
    {
      "entity": {
        "reference": "Practitioner/{{nurse_id}}"
      }
    },
    {
      "entity": {
        "reference": "Practitioner/{{ma_id}}"
      }
    }
  ]
}
```

### Program Participants

```json
{
  "type": "person",
  "actual": true,
  "name": "Chronic Care Management Program",
  "code": {
    "text": "CCM Program"
  },
  "member": [
    {
      "entity": {
        "reference": "Patient/{{patient_1}}"
      },
      "period": {
        "start": "2024-01-01"
      }
    }
  ]
}
```

## Characteristics for Definitional Groups

Characteristics can be combined to create complex criteria:

```json
{
  "characteristic": [
    {
      "code": {
        "coding": [{
          "system": "http://snomed.info/sct",
          "code": "44054006",
          "display": "Diabetes mellitus type 2"
        }]
      },
      "valueBoolean": true,
      "exclude": false
    },
    {
      "code": {
        "text": "age"
      },
      "valueRange": {
        "low": {
          "value": 65
        }
      },
      "exclude": false
    }
  ]
}
```

## FHIR Specification References

- [Group Resource](https://hl7.org/fhir/group.html)
- [Group Type Codes](http://hl7.org/fhir/valueset-group-type.html)
- [CareTeam Resource](https://hl7.org/fhir/careteam.html) - Alternative for care teams with additional structure
